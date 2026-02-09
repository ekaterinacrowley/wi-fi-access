import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5000

app.use(express.json())

app.use('/api', authRoutes)

app.use(express.static(path.join(__dirname, '../dist')))

app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
