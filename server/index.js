import 'dotenv/config.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import deviceRoutes from './routes/device.js' // Новый импорт

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5000

app.use(express.json())

// Маршруты API
app.use('/api', authRoutes)
app.use('/api', deviceRoutes) // Добавляем маршруты для устройств

// Статические файлы
app.use(express.static(path.join(__dirname, '../dist')))

// Все остальные запросы -> index.html
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  
  // Debug: проверяем переменные окружения
  console.log('\n📧 SMTP Configuration:')
  console.log(`  SMTP_HOST: ${process.env.SMTP_HOST || 'NOT SET'}`)
  console.log(`  SMTP_PORT: ${process.env.SMTP_PORT || 'NOT SET'}`)
  console.log(`  SMTP_USER: ${process.env.SMTP_USER ? '✓ SET' : 'NOT SET'}`)
  console.log(`  SMTP_PASS: ${process.env.SMTP_PASS ? '✓ SET' : 'NOT SET'}`)
  console.log(`  SMTP_FROM: ${process.env.SMTP_FROM || 'NOT SET'}`)
  console.log('')
})