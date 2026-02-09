import express from 'express'
import { generateOTP, verifyOTP } from '../services/otp.js'
import { sendMail } from '../services/mailer.js'
import { validateEmail, validateAge } from '../utils/validators.js'

const router = express.Router()

// SEND CODE
router.post('/send-code', async (req, res) => {
  try {
    console.log('SEND BODY:', req.body)

    const { email, birthdate } = req.body || {}

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    if (!validateAge(birthdate)) {
      return res.status(400).json({ error: 'Age restriction' })
    }

    const code = generateOTP(email)

    await sendMail(email, code)

    res.json({ success: true })
  } catch (err) {
    console.error('SEND ERROR:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// VERIFY CODE
router.post('/verify-code', (req, res) => {
  try {
    console.log('VERIFY BODY:', req.body)

    const { email, code } = req.body || {}

    const ok = verifyOTP(email, code)

    if (!ok) {
      return res.status(400).json({ error: 'Invalid code' })
    }

    res.json({ success: true })
  } catch (err) {
    console.error('VERIFY ERROR:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
