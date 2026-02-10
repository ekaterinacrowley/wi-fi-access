import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../data/users.db')

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ DB Error:', err)
  } else {
    console.log('✓ DB connected: ' + dbPath)
  }
})

// Auto-create table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    birthdate TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Ensure access columns exist (for upgrades)
db.all(`PRAGMA table_info(users)`, (err, rows) => {
  if (err) return console.error('DB PRAGMA Error:', err)

  const cols = rows.map(r => r.name)
  if (!cols.includes('access_until')) {
    db.run(`ALTER TABLE users ADD COLUMN access_until INTEGER DEFAULT 0`, (e) => {
      if (e) console.error('ALTER TABLE add access_until failed:', e)
      else console.log('✓ Added column access_until to users')
    })
  }

  if (!cols.includes('is_permanent')) {
    db.run(`ALTER TABLE users ADD COLUMN is_permanent INTEGER DEFAULT 0`, (e) => {
      if (e) console.error('ALTER TABLE add is_permanent failed:', e)
      else console.log('✓ Added column is_permanent to users')
    })
  }
})

export default db
