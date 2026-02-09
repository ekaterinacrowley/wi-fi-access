import nodemailer from 'nodemailer'

const hasSMTP =
  process.env.SMTP_HOST &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS

let transporter = null

if (hasSMTP) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
}

export async function sendMail(email, code) {
  // DEV MODE — без SMTP
  if (!transporter) {
    console.log('DEV MAIL:', email, code)
    return
  }

  await transporter.sendMail({
    from: `"WiFi Access" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Your Wi-Fi code',
    text: `Your code: ${code}`
  })
}
