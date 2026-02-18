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
    db.get('SELECT id, is_permanent FROM users WHERE email = ?', [email.toLowerCase().trim()], async (err, user) => {
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
    const normalizedEmail = email.toLowerCase().trim()

    const ok = verifyOTP(normalizedEmail, code)

    if (!ok) {
      const l = (lang === 'ar') ? 'ar' : 'en'
      return res.status(400).json({ error: messages[l].verify_failed })
    }

    // Grant temporary access (5 minutes) and save user if needed
    const accessUntil = Date.now() + 5 * 60 * 1000 // 5 minutes in ms

    db.get('SELECT id, is_permanent FROM users WHERE email = ?', [normalizedEmail], (err, user) => {
      if (err) {
        console.error('DB Query Error:', err)
        return res.status(500).json({ error: 'Internal Server Error' })
      }

      if (!user && birthdate) {
        // New user: insert with temporary access
        db.run(
          'INSERT INTO users (email, birthdate, access_until, is_permanent) VALUES (?, ?, ?, 0)',
          [normalizedEmail, birthdate, accessUntil],
          function(insertErr) {
            if (insertErr && insertErr.code !== 'SQLITE_CONSTRAINT') {
              console.error('❌ Insert error:', insertErr)
              return res.status(500).json({ error: 'Internal Server Error' })
            }
            console.log(`✓ New user saved and granted temporary access: ${normalizedEmail}`)
            const wifi = getWiFiCredentials()
            
            // Возвращаем userId для регистрации устройства
            const userId = this?.lastID || (user?.id)
            
            return res.json({ 
              success: true, 
              access: 'temporary', 
              expiresAt: accessUntil, 
              wifi,
              userId
            })
          }
        )
      } else if (user) {
        // Update existing user access_until
        db.run(
          'UPDATE users SET access_until = ? WHERE email = ?',
          [accessUntil, normalizedEmail],
          (updateErr) => {
            if (updateErr) console.error('❌ Update access error:', updateErr)
            console.log(`✓ Existing user granted temporary access: ${normalizedEmail}`)
            const wifi = getWiFiCredentials()
            const accessType = user.is_permanent ? 'permanent' : 'temporary'
            
            return res.json({ 
              success: true, 
              access: accessType, 
              expiresAt: accessType === 'temporary' ? accessUntil : null, 
              wifi,
              userId: user.id
            })
          }
        )
      } else {
        // No birthdate provided for new user - still grant temporary access (fallback)
        db.run(
          'INSERT OR IGNORE INTO users (email, birthdate, access_until, is_permanent) VALUES (?, ?, ?, 0)',
          [normalizedEmail, birthdate || '', accessUntil],
          function() {
            console.log(`✓ Fallback: user row ensured and temporary access set for ${normalizedEmail}`)
            const wifi = getWiFiCredentials()
            
            // Получаем ID нового пользователя
            db.get('SELECT id FROM users WHERE email = ?', [normalizedEmail], (err, newUser) => {
              return res.json({ 
                success: true, 
                access: 'temporary', 
                expiresAt: accessUntil, 
                wifi,
                userId: newUser?.id
              })
            })
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

  db.get('SELECT id, access_until, is_permanent FROM users WHERE email = ?', [email.toLowerCase().trim()], (err, row) => {
    if (err) {
      console.error('DB Query Error:', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }

    if (!row) return res.json({ access: 'none' })

    const now = Date.now()
    const wifi = getWiFiCredentials()
    
    if (row.is_permanent) return res.json({ access: 'permanent', wifi, userId: row.id })
    if (row.access_until && row.access_until > now) return res.json({ access: 'temporary', expiresAt: row.access_until, wifi, userId: row.id })
    return res.json({ access: 'none' })
  })
})

// GRANT PERMANENT ACCESS (admin or other service)
router.post('/grant-permanent', (req, res) => {
  const { email } = req.body || {}
  if (!email) return res.status(400).json({ error: 'Missing email' })

  const normalizedEmail = email.toLowerCase().trim()

  db.run('UPDATE users SET is_permanent = 1, access_until = NULL WHERE email = ?', [normalizedEmail], function (err) {
    if (err) {
      console.error('DB Update Error:', err)
      return res.status(500).json({ error: 'Internal Server Error' })
    }

    if (this.changes === 0) {
      // No existing user — create permanent user
      db.run('INSERT INTO users (email, birthdate, access_until, is_permanent) VALUES (?, ?, NULL, 1)', [normalizedEmail, ''], function(e) {
        if (e) console.error('Insert permanent user error:', e)
        return res.json({ success: true, userId: this?.lastID })
      })
    } else {
      // Get user id for response
      db.get('SELECT id FROM users WHERE email = ?', [normalizedEmail], (err, user) => {
        return res.json({ success: true, userId: user?.id })
      })
    }
  })
})

// ---------- Device Management Routes ----------

// CHECK DEVICE
router.post('/check-device', (req, res) => {
  try {
    const { email, deviceId } = req.body
    
    if (!email || !deviceId) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      })
    }

    const normalizedEmail = email.toLowerCase().trim()
    
    // Check if device exists in database
    db.get(
      'SELECT id, first_seen, last_seen FROM user_devices WHERE email = ? AND device_id = ?',
      [normalizedEmail, deviceId],
      (err, row) => {
        if (err) {
          console.error('Device check error:', err)
          return res.status(500).json({ 
            success: false,
            error: 'Internal server error' 
          })
        }

        if (row) {
          // Update last seen
          const now = Date.now()
          db.run(
            'UPDATE user_devices SET last_seen = ? WHERE id = ?',
            [now, row.id],
            (updateErr) => {
              if (updateErr) console.error('Failed to update last_seen:', updateErr)
            }
          )
          
          console.log(`✓ Device verified for ${normalizedEmail}`)
          
          return res.json({ 
            success: true,
            approved: true,
            firstSeen: row.first_seen,
            lastSeen: now
          })
        } else {
          return res.json({ 
            success: true,
            approved: false
          })
        }
      }
    )
  } catch (error) {
    console.error('Check device error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
})

// REGISTER DEVICE
router.post('/register-device', (req, res) => {
  try {
    const { email, deviceId, timestamp } = req.body
    
    if (!email || !deviceId) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const now = timestamp || Date.now()
    
    // First, check if device already exists
    db.get(
      'SELECT id FROM user_devices WHERE email = ? AND device_id = ?',
      [normalizedEmail, deviceId],
      (err, existing) => {
        if (err) {
          console.error('Device check error:', err)
          return res.status(500).json({ 
            success: false,
            error: 'Internal server error' 
          })
        }

        if (existing) {
          // Update existing device
          db.run(
            'UPDATE user_devices SET last_seen = ? WHERE id = ?',
            [now, existing.id],
            (updateErr) => {
              if (updateErr) {
                console.error('Device update error:', updateErr)
                return res.status(500).json({ 
                  success: false,
                  error: 'Internal server error' 
                })
              }
              
              // Get count of user's devices
              db.get(
                'SELECT COUNT(*) as count FROM user_devices WHERE email = ?',
                [normalizedEmail],
                (countErr, countRow) => {
                  res.json({ 
                    success: true,
                    deviceCount: countRow?.count || 1,
                    isNew: false
                  })
                }
              )
            }
          )
        } else {
          // Insert new device
          db.run(
            'INSERT INTO user_devices (email, device_id, first_seen, last_seen) VALUES (?, ?, ?, ?)',
            [normalizedEmail, deviceId, now, now],
            function(insertErr) {
              if (insertErr) {
                console.error('Device registration error:', insertErr)
                return res.status(500).json({ 
                  success: false,
                  error: 'Internal server error' 
                })
              }
              
              console.log(`✅ New device registered for ${normalizedEmail}`)
              
              // Get updated device count
              db.get(
                'SELECT COUNT(*) as count FROM user_devices WHERE email = ?',
                [normalizedEmail],
                (countErr, countRow) => {
                  res.json({ 
                    success: true,
                    deviceId: this?.lastID,
                    deviceCount: countRow?.count || 1,
                    isNew: true
                  })
                }
              )
            }
          )
        }
      }
    )
  } catch (error) {
    console.error('Register device error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
})

// REMOVE DEVICE
router.post('/remove-device', (req, res) => {
  try {
    const { email, deviceId } = req.body
    
    if (!email || !deviceId) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      })
    }

    const normalizedEmail = email.toLowerCase().trim()
    
    db.run(
      'DELETE FROM user_devices WHERE email = ? AND device_id = ?',
      [normalizedEmail, deviceId],
      function(err) {
        if (err) {
          console.error('Device removal error:', err)
          return res.status(500).json({ 
            success: false,
            error: 'Internal server error' 
          })
        }
        
        console.log(`🗑️ Device removed for ${normalizedEmail} (${this.changes} device(s) removed)`)
        
        res.json({ 
          success: true,
          removed: this.changes > 0
        })
      }
    )
  } catch (error) {
    console.error('Remove device error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
})

// GET USER DEVICES
router.get('/user-devices', (req, res) => {
  try {
    const { email } = req.query
    
    if (!email) {
      return res.status(400).json({ 
        success: false,
        error: 'Email is required' 
      })
    }

    const normalizedEmail = email.toLowerCase().trim()
    
    db.all(
      `SELECT 
        id,
        device_id,
        first_seen,
        last_seen,
        CASE 
          WHEN last_seen > ? THEN 1 
          ELSE 0 
        END as is_active
      FROM user_devices 
      WHERE email = ?
      ORDER BY last_seen DESC`,
      [Date.now() - 30 * 24 * 60 * 60 * 1000, normalizedEmail], // активные за последние 30 дней
      (err, rows) => {
        if (err) {
          console.error('User devices fetch error:', err)
          return res.status(500).json({ 
            success: false,
            error: 'Internal server error' 
          })
        }
        
        // Обрезаем deviceId для безопасности
        const devices = rows.map(row => ({
          id: row.id,
          deviceId: row.device_id.substring(0, 16) + '...',
          firstSeen: row.first_seen,
          lastSeen: row.last_seen,
          isActive: row.is_active === 1
        }))
        
        res.json({ 
          success: true,
          devices,
          total: devices.length
        })
      }
    )
  } catch (error) {
    console.error('Get user devices error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
})

// CLEAR ALL USER DEVICES
router.post('/clear-user-devices', (req, res) => {
  try {
    const { email } = req.body
    
    if (!email) {
      return res.status(400).json({ 
        success: false,
        error: 'Email is required' 
      })
    }

    const normalizedEmail = email.toLowerCase().trim()
    
    db.run(
      'DELETE FROM user_devices WHERE email = ?',
      [normalizedEmail],
      function(err) {
        if (err) {
          console.error('Clear devices error:', err)
          return res.status(500).json({ 
            success: false,
            error: 'Internal server error' 
          })
        }
        
        console.log(`🧹 Cleared ${this.changes} devices for ${normalizedEmail}`)
        
        res.json({ 
          success: true,
          removedCount: this.changes
        })
      }
    )
  } catch (error) {
    console.error('Clear user devices error:', error)
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
})

// Get devices statistics (admin only - should add auth middleware)
router.get('/devices-stats', (req, res) => {
  db.get(
    `SELECT 
      COUNT(DISTINCT email) as total_users,
      COUNT(*) as total_devices,
      COUNT(CASE WHEN last_seen > ? THEN 1 END) as active_devices,
      AVG(devices_per_user) as avg_devices_per_user
    FROM user_devices
    CROSS JOIN (
      SELECT email, COUNT(*) as devices_per_user 
      FROM user_devices 
      GROUP BY email
    )`,
    [Date.now() - 7 * 24 * 60 * 60 * 1000], // активные за последние 7 дней
    (err, stats) => {
      if (err) {
        console.error('Stats error:', err)
        return res.status(500).json({ 
          success: false,
          error: 'Internal server error' 
        })
      }
      
      // Get users with multiple devices
      db.all(
        `SELECT email, COUNT(*) as device_count 
         FROM user_devices 
         GROUP BY email 
         HAVING device_count > 1
         ORDER BY device_count DESC
         LIMIT 10`,
        (multiErr, multiUsers) => {
          res.json({
            success: true,
            stats: {
              ...stats,
              usersWithMultipleDevices: multiUsers?.length || 0,
              topMultiDeviceUsers: multiUsers || []
            }
          })
        }
      )
    }
  )
})

export default router