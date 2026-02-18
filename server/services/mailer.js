import nodemailer from 'nodemailer'

const hasSMTP =
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS

let transporter = null

if (hasSMTP) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

const i18n = {
  en: {
    subject: 'Your Wi-Fi Access Code',
    body: 'Your one-time code: {code} — valid for 5 minutes.'
  },
  ar: {
    subject: 'رمز الوصول إلى Wi-Fi',
    body: 'الرمز لمرة واحدة: {code} — صالح لمدة 5 دقائق.'
  }
}

export async function sendMail(email, code, lang = 'en') {
  try {
    // DEV MODE - логируем код в консоль (с учетом языка)
    if (!transporter) {
      const t = i18n[lang] || i18n.en
      console.log('\n✓ DEV MODE - Email Code:')
      console.log(`  To: ${email}`)
      console.log(`  Code: ${code}`)
      console.log(`  Subject: ${t.subject}`)
      console.log(`  Body: ${t.body.replace('{code}', code)}`)
      console.log('')
      return
    }

    // PRODUCTION MODE - отправляем через SMTP
    console.log(`📧 Sending email to ${email}...`)
    console.log(`SMTP Host: ${process.env.SMTP_HOST}`)
    console.log(`SMTP Port: ${process.env.SMTP_PORT}`)
    console.log(`SMTP User: ${process.env.SMTP_USER}`)
    
    const t = i18n[lang] || i18n.en
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: t.subject,
      html: `
        <h2>${t.subject}</h2>
        <p>${t.body.replace('{code}', `<strong style="font-size: 24px; letter-spacing: 2px;">${code}</strong>`)}</p>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✓ Email sent successfully!')
    console.log('  MessageID:', info.messageId)
    console.log('  Response:', info.response)
  } catch (err) {
    console.error('✗ Failed to send email')
    console.error('  Error:', err.message)
    console.error('  Code:', err.code)
    console.error('  Full error:', JSON.stringify(err, null, 2))
    throw new Error('Failed to send email: ' + err.message)
  }
}
