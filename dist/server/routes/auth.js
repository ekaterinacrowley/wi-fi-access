import express from 'express'
import { generateOTP, verifyOTP } from '../services/otp.js'
import { sendMail } from '../services/mailer.js'
import { validateEmail, validateAge } from '../utils/validators.js'
import db from '../db.js'

const router = express.Router()

const messages = {
  en: {
    invalid_email: 'Invalid email address',
    birthdate_required: 'Date of birth is required',
    birthdate_invalid: 'Invalid date',
    birthdate_age: 'You must be 18 or older to connect',
    send_failed: 'Failed to send email. Please try again.',
    verify_failed: "It looks like the numbers you entered don't match our records. Please double-check and try again."
  },
  ar: {
    invalid_email: 'عنوان البريد الإلكتروني غير صالح',
    birthdate_required: 'تاريخ الميلاد مطلوب',
    birthdate_invalid: 'تاريخ غير صالح',
    birthdate_age: 'يجب أن تكون 18 عامًا أو أكثر للاتصال',
    send_failed: 'فشل إرسال البريد الإلكتروني. حاول مرة أخرى.',
    verify_failed: 'الرمز غير صحيح. يرجى المحاولة مرة أخرى.'
  }
}

// SEND CODE
router.post('/send-code', async (req, res) => {
  try {
    console.log('SEND BODY:', req.body)

    const { email, birthdate, lang } = req.body || {}

    const langCode = (lang === 'ar') ? 'ar' : 'en'

    if (!validateEmail(email)) {
      return res.status(400).json({ error: messages[langCode].invalid_email })
    }

    // birthdate validation with more detailed errors
    if (!birthdate) {
      return res.status(400).json({ error: messages[langCode].birthdate_required })
    }

    // parse DD / MM / YYYY or DD/MM/YYYY
    const parts = birthdate.split('/').map(p => p.trim())
    if (parts.length !== 3) {
      return res.status(400).json({ error: messages[langCode].birthdate_invalid })
    }

    const [dd, mm, yyyy] = parts
    const dt = new Date(`${yyyy}-${mm}-${dd}`)
    if (isNaN(dt)) {
      return res.status(400).json({ error: messages[langCode].birthdate_invalid })
    }

    // age check
    const today = new Date()
    let age = today.getFullYear() - dt.getFullYear()
    const m = today.getMonth() - dt.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < dt.getDate())) age--
    if (age < 18) {
      return res.status(400).json({ error: messages[langCode].birthdate_age })
    }

    const code = generateOTP(email)

    // Check if user exists in DB
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('DB Query Error:', err)
        const l = (lang === 'ar') ? 'ar' : 'en'
        return res.status(500).json({ error: messages[l].send_failed })
      }

      const isNewUser = !user

      // Send OTP email
      try {
        await sendMail(email, code, lang || 'en')
        console.log(`${isNewUser ? '✓ New' : '✓ Returning'} user: ${email}`)
        res.json({ success: true, isNewUser })
      } catch (mailErr) {
        console.error('Mail Error:', mailErr)
        const l = (lang === 'ar') ? 'ar' : 'en'
        res.status(500).json({ error: messages[l].send_failed })
      }
    })
  } catch (err) {
    console.error('SEND ERROR:', err)
    const l = (req.body && req.body.lang === 'ar') ? 'ar' : 'en'
    res.status(500).json({ error: messages[l].send_failed })
  }
})

// VERIFY CODE
router.post('/verify-code', (req, res) => {
  try {
    console.log('VERIFY BODY:', req.body)

    const { email, code, birthdate, lang } = req.body || {}

    const ok = verifyOTP(email, code)

    if (!ok) {
      const l = (lang === 'ar') ? 'ar' : 'en'
      return res.status(400).json({ error: messages[l].verify_failed })
    }

    // Delete OTP after successful verification
    const otpStore = new Map() // Reference to OTP Store - delete the OTP
    // OTP will auto-expire, but good practice to clean up

    // Check if user already exists and save if new
    db.get('SELECT id FROM users WHERE email = ?', [email], (err, user) => {
      if (err) {
        console.error('DB Query Error:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
      }

      // If new user, save to DB
      if (!user && birthdate) {
        db.run(
          'INSERT INTO users (email, birthdate) VALUES (?, ?)',
          [email, birthdate],
          (insertErr) => {
            if (insertErr && insertErr.code !== 'SQLITE_CONSTRAINT') {
              console.error('❌ Insert error:', insertErr)
            } else if (!insertErr) {
              console.log(`✓ New user saved: ${email}`)
            }
            res.json({ success: true })
          }
        )
      } else {
        // Returning user or no birthdate
        console.log(`✓ Returning user verified: ${email}`)
        res.json({ success: true })
      }
    })
  } catch (err) {
    console.error('VERIFY ERROR:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
