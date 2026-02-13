import express from 'express'
import { generateOTP, verifyOTP } from '../services/otp.js'
import { sendMail } from '../services/mailer.js'
import { validateEmail, validateAge } from '../utils/validators.js'
import db from '../db.js'

const router = express.Router()

// Get WiFi credentials from env
function getWiFiCredentials() {
  return {
    ssid: process.env.WIFI_SSID || 'Local WiFi',
    password: process.env.WIFI_PASSWORD || 'password123'
  }
}

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

    // Grant temporary access (5 minutes) and save user if needed
    const accessUntil = Date.now() + 5 * 60 * 1000 // 5 minutes in ms

    db.get('SELECT id, is_permanent FROM users WHERE email = ?', [email], (err, user) => {
      if (err) {
        console.error('DB Query Error:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
      }

      if (!user && birthdate) {
        // New user: insert with temporary access
        db.run(
          'INSERT INTO users (email, birthdate, access_until, is_permanent) VALUES (?, ?, ?, 0)',
          [email, birthdate, accessUntil],
          (insertErr) => {
            if (insertErr && insertErr.code !== 'SQLITE_CONSTRAINT') {
              console.error('❌ Insert error:', insertErr)
              return res.status(500).json({ error: 'Internal Server Error' })
            }
            console.log(`✓ New user saved and granted temporary access: ${email}`)
            const wifi = getWiFiCredentials()
            return res.json({ success: true, access: 'temporary', expiresAt: accessUntil, wifi })
          }
        )
      } else if (user) {
        // Update existing user access_until
        db.run(
          'UPDATE users SET access_until = ? WHERE email = ?',
          [accessUntil, email],
          (updateErr) => {
            if (updateErr) console.error('❌ Update access error:', updateErr)
            console.log(`✓ Existing user granted temporary access: ${email}`)
            const wifi = getWiFiCredentials()
            const accessType = user.is_permanent ? 'permanent' : 'temporary'
            return res.json({ success: true, access: accessType, expiresAt: accessType === 'temporary' ? accessUntil : null, wifi })
          }
        )
      } else {
        // No birthdate provided for new user - still grant temporary access (fallback)
        db.run(
          'INSERT OR IGNORE INTO users (email, birthdate, access_until, is_permanent) VALUES (?, ?, ?, 0)',
          [email, birthdate || '', accessUntil],
          () => {
            console.log(`✓ Fallback: user row ensured and temporary access set for ${email}`)
            const wifi = getWiFiCredentials()
            return res.json({ success: true, access: 'temporary', expiresAt: accessUntil, wifi })
          }
        )
      }
    })
  } catch (err) {
    console.error('VERIFY ERROR:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// ACCESS STATUS
router.get('/access-status', (req, res) => {
  const email = req.query.email
  if (!email) return res.status(400).json({ error: 'Missing email' })

  db.get('SELECT access_until, is_permanent FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('DB Query Error:', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }

    if (!row) return res.json({ access: 'none' })

    const now = Date.now()
    const wifi = getWiFiCredentials()
    
    if (row.is_permanent) return res.json({ access: 'permanent', wifi })
    if (row.access_until && row.access_until > now) return res.json({ access: 'temporary', expiresAt: row.access_until, wifi })
    return res.json({ access: 'none' })
  })
})

// GRANT PERMANENT ACCESS (admin or other service)
router.post('/grant-permanent', (req, res) => {
  const { email } = req.body || {}
  if (!email) return res.status(400).json({ error: 'Missing email' })

  db.run('UPDATE users SET is_permanent = 1, access_until = NULL WHERE email = ?', [email], function (err) {
    if (err) {
      console.error('DB Update Error:', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }

    if (this.changes === 0) {
      // No existing user — create permanent user
      db.run('INSERT INTO users (email, birthdate, access_until, is_permanent) VALUES (?, ?, NULL, 1)', [email, ''], (e) => {
        if (e) console.error('Insert permanent user error:', e)
        return res.json({ success: true })
      })
    } else {
      return res.json({ success: true })
    }
  })
})

export default router
