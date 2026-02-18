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
    
    // Включаем поддержку внешних ключей
    db.run('PRAGMA foreign_keys = ON', (pragmaErr) => {
      if (pragmaErr) console.error('Failed to enable foreign keys:', pragmaErr)
      else console.log('✓ Foreign keys enabled')
    })
  }
})

// Автоматическое создание/обновление таблиц
db.serialize(() => {
  // Таблица пользователей
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      birthdate TEXT NOT NULL,
      created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      access_until INTEGER DEFAULT 0,
      is_permanent INTEGER DEFAULT 0
    )
  `)

  // Проверяем и добавляем пропущенные колонки в users
  db.all(`PRAGMA table_info(users)`, (err, rows) => {
    if (err) return console.error('DB PRAGMA Error:', err)

    const cols = rows.map(r => r.name)
    
    // Добавляем access_until если нет
    if (!cols.includes('access_until')) {
      db.run(`ALTER TABLE users ADD COLUMN access_until INTEGER DEFAULT 0`, (e) => {
        if (e) console.error('ALTER TABLE add access_until failed:', e)
        else console.log('✓ Added column access_until to users')
      })
    }

    // Добавляем is_permanent если нет
    if (!cols.includes('is_permanent')) {
      db.run(`ALTER TABLE users ADD COLUMN is_permanent INTEGER DEFAULT 0`, (e) => {
        if (e) console.error('ALTER TABLE add is_permanent failed:', e)
        else console.log('✓ Added column is_permanent to users')
      })
    }

    // Добавляем updated_at для отслеживания изменений
    if (!cols.includes('updated_at')) {
      db.run(`ALTER TABLE users ADD COLUMN updated_at INTEGER DEFAULT 0`, (e) => {
        if (e) console.error('ALTER TABLE add updated_at failed:', e)
        else console.log('✓ Added column updated_at to users')
      })
    }
  })

  // Таблица устройств пользователей
  db.run(`
    CREATE TABLE IF NOT EXISTS user_devices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      device_id TEXT NOT NULL,
      first_seen INTEGER NOT NULL,
      last_seen INTEGER NOT NULL,
      user_agent TEXT,
      ip_address TEXT,
      created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE,
      UNIQUE(email, device_id)
    )
  `, (err) => {
    if (err) {
      console.error('❌ Failed to create user_devices table:', err)
    } else {
      console.log('✓ Table user_devices ready')
      
      // Создаем индексы для оптимизации
      db.run(`CREATE INDEX IF NOT EXISTS idx_user_devices_email ON user_devices(email)`)
      db.run(`CREATE INDEX IF NOT EXISTS idx_user_devices_last_seen ON user_devices(last_seen)`)
      db.run(`CREATE INDEX IF NOT EXISTS idx_user_devices_device ON user_devices(device_id)`)
      console.log('✓ Indexes for user_devices created')
    }
  })

  // Таблица для логов авторизаций (опционально)
  db.run(`
    CREATE TABLE IF NOT EXISTS auth_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      action TEXT NOT NULL,
      ip_address TEXT,
      user_agent TEXT,
      success INTEGER DEFAULT 1,
      created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
    )
  `, (err) => {
    if (err) {
      console.error('❌ Failed to create auth_logs table:', err)
    } else {
      console.log('✓ Table auth_logs ready')
      db.run(`CREATE INDEX IF NOT EXISTS idx_auth_logs_email ON auth_logs(email)`)
      db.run(`CREATE INDEX IF NOT EXISTS idx_auth_logs_created ON auth_logs(created_at)`)
    }
  })

  // Таблица для хранения OTP кодов (если не используете in-memory)
  db.run(`
    CREATE TABLE IF NOT EXISTS otp_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      code TEXT NOT NULL,
      birthdate TEXT,
      expires_at INTEGER NOT NULL,
      created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
      UNIQUE(email, code)
    )
  `, (err) => {
    if (err) {
      console.error('❌ Failed to create otp_codes table:', err)
    } else {
      console.log('✓ Table otp_codes ready')
      db.run(`CREATE INDEX IF NOT EXISTS idx_otp_codes_email ON otp_codes(email)`)
      db.run(`CREATE INDEX IF NOT EXISTS idx_otp_codes_expires ON otp_codes(expires_at)`)
    }
  })
})

// Хелпер для автоматического обновления updated_at
function addTimestampTriggers() {
  // Триггер для автоматического обновления updated_at при изменении пользователя
  db.run(`
    CREATE TRIGGER IF NOT EXISTS update_users_timestamp 
    AFTER UPDATE ON users
    BEGIN
      UPDATE users SET updated_at = (strftime('%s', 'now') * 1000) WHERE id = NEW.id;
    END;
  `, (err) => {
    if (err) console.error('Failed to create timestamp trigger:', err)
  })
}

// Функция для очистки старых OTP кодов (можно вызывать периодически)
function cleanupExpiredOtps() {
  const now = Date.now()
  db.run('DELETE FROM otp_codes WHERE expires_at < ?', [now], (err) => {
    if (err) console.error('OTP cleanup error:', err)
  })
}

// Запускаем очистку каждые 10 минут
setInterval(cleanupExpiredOtps, 10 * 60 * 1000)

// Функция для получения статистики по устройствам пользователя
export function getUserDevicesStats(email, callback) {
  db.all(`
    SELECT 
      COUNT(*) as total_devices,
      MAX(last_seen) as last_active,
      COUNT(CASE WHEN last_seen > ? THEN 1 END) as active_last_30days
    FROM user_devices 
    WHERE email = ?
  `, [Date.now() - 30 * 24 * 60 * 60 * 1000, email], callback)
}

// Функция для логирования действий
export function logAuthAction(email, action, ip, userAgent, success = 1) {
  db.run(
    'INSERT INTO auth_logs (email, action, ip_address, user_agent, success) VALUES (?, ?, ?, ?, ?)',
    [email, action, ip, userAgent, success],
    (err) => {
      if (err) console.error('Failed to log auth action:', err)
    }
  )
}

// Функция для получения или создания пользователя
export function getOrCreateUser(email, birthdate, callback) {
  const normalizedEmail = email.toLowerCase().trim()
  
  db.get('SELECT * FROM users WHERE email = ?', [normalizedEmail], (err, user) => {
    if (err) return callback(err)
    
    if (user) {
      callback(null, user, false)
    } else {
      db.run(
        'INSERT INTO users (email, birthdate, created_at) VALUES (?, ?, ?)',
        [normalizedEmail, birthdate, Date.now()],
        function(insertErr) {
          if (insertErr) return callback(insertErr)
          
          db.get('SELECT * FROM users WHERE email = ?', [normalizedEmail], (getErr, newUser) => {
            callback(getErr, newUser, true)
          })
        }
      )
    }
  })
}

// Функция для обновления доступа пользователя
export function updateUserAccess(email, accessUntil, isPermanent = false, callback) {
  const normalizedEmail = email.toLowerCase().trim()
  
  db.run(
    'UPDATE users SET access_until = ?, is_permanent = ?, updated_at = ? WHERE email = ?',
    [accessUntil, isPermanent ? 1 : 0, Date.now(), normalizedEmail],
    function(err) {
      if (err) return callback(err)
      callback(null, this.changes > 0)
    }
  )
}

// Включаем триггеры после создания таблиц
setTimeout(addTimestampTriggers, 1000)

export default db