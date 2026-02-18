import express from 'express'

const router = express.Router()

// Временное хранилище в памяти (в продакшене используй БД)
// Структура: email -> Map<deviceId, { firstSeen: timestamp, lastSeen: timestamp }>
const deviceStorage = new Map()

// Очистка старых записей (устройства, не видевшиеся больше 90 дней)
const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000 // 1 день
const DEVICE_EXPIRY = 90 * 24 * 60 * 60 * 1000 // 90 дней

setInterval(() => {
  const now = Date.now()
  for (const [email, devices] of deviceStorage.entries()) {
    for (const [deviceId, data] of devices.entries()) {
      if (now - data.lastSeen > DEVICE_EXPIRY) {
        devices.delete(deviceId)
        console.log(`🧹 Removed expired device ${deviceId} for ${email}`)
      }
    }
    if (devices.size === 0) {
      deviceStorage.delete(email)
    }
  }
}, CLEANUP_INTERVAL)

/**
 * Проверка устройства
 * POST /api/check-device
 * Body: { email, deviceId, timestamp }
 */
router.post('/check-device', (req, res) => {
  try {
    const { email, deviceId, timestamp } = req.body
    
    if (!email || !deviceId) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      })
    }

    // Нормализуем email (приводим к нижнему регистру)
    const normalizedEmail = email.toLowerCase().trim()
    
    // Получаем устройства пользователя
    const userDevices = deviceStorage.get(normalizedEmail) || new Map()
    
    // Проверяем, есть ли такое устройство
    const deviceData = userDevices.get(deviceId)
    
    if (deviceData) {
      // Обновляем время последнего визита
      deviceData.lastSeen = timestamp || Date.now()
      userDevices.set(deviceId, deviceData)
      
      console.log(`✓ Device ${deviceId} verified for ${normalizedEmail}`)
      
      return res.json({ 
        success: true,
        approved: true,
        firstSeen: deviceData.firstSeen,
        lastSeen: deviceData.lastSeen
      })
    } else {
      console.log(`✗ Device ${deviceId} not found for ${normalizedEmail}`)
      
      return res.json({ 
        success: true,
        approved: false
      })
    }
  } catch (error) {
    console.error('Error in check-device:', error)
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
})

/**
 * Регистрация нового устройства
 * POST /api/register-device
 * Body: { email, deviceId, timestamp }
 */
router.post('/register-device', (req, res) => {
  try {
    const { email, deviceId, timestamp } = req.body
    
    if (!email || !deviceId) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      })
    }

    // Нормализуем email
    const normalizedEmail = email.toLowerCase().trim()
    
    // Получаем или создаем Map устройств для пользователя
    if (!deviceStorage.has(normalizedEmail)) {
      deviceStorage.set(normalizedEmail, new Map())
    }
    
    const userDevices = deviceStorage.get(normalizedEmail)
    const now = timestamp || Date.now()
    
    // Сохраняем устройство
    userDevices.set(deviceId, {
      firstSeen: now,
      lastSeen: now
    })
    
    console.log(`✅ New device registered for ${normalizedEmail}`)
    console.log(`   Device ID: ${deviceId.substring(0, 8)}...`)
    console.log(`   Total devices for this user: ${userDevices.size}`)
    
    res.json({ 
      success: true,
      deviceCount: userDevices.size
    })
  } catch (error) {
    console.error('Error in register-device:', error)
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
})

/**
 * Удаление устройства (например, при выходе из аккаунта)
 * POST /api/remove-device
 * Body: { email, deviceId }
 */
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
    const userDevices = deviceStorage.get(normalizedEmail)
    
    if (userDevices && userDevices.has(deviceId)) {
      userDevices.delete(deviceId)
      console.log(`🗑️ Device removed for ${normalizedEmail}`)
      
      if (userDevices.size === 0) {
        deviceStorage.delete(normalizedEmail)
      }
    }
    
    res.json({ success: true })
  } catch (error) {
    console.error('Error in remove-device:', error)
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
})

/**
 * Получение списка устройств пользователя (для админки или личного кабинета)
 * GET /api/user-devices?email=user@example.com
 */
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
    const userDevices = deviceStorage.get(normalizedEmail)
    
    if (!userDevices) {
      return res.json({ 
        success: true,
        devices: [] 
      })
    }
    
    // Преобразуем Map в массив для отправки клиенту
    const devices = Array.from(userDevices.entries()).map(([deviceId, data]) => ({
      deviceId: deviceId.substring(0, 16) + '...', // Обрезаем для безопасности
      firstSeen: data.firstSeen,
      lastSeen: data.lastSeen,
      isActive: Date.now() - data.lastSeen < 30 * 24 * 60 * 60 * 1000 // активно если было за последние 30 дней
    }))
    
    res.json({ 
      success: true,
      devices,
      total: devices.length
    })
  } catch (error) {
    console.error('Error in user-devices:', error)
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
})

/**
 * Очистка всех устройств пользователя (например, при смене пароля)
 * POST /api/clear-user-devices
 * Body: { email }
 */
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
    const deviceCount = deviceStorage.get(normalizedEmail)?.size || 0
    
    deviceStorage.delete(normalizedEmail)
    
    console.log(`🧹 Cleared ${deviceCount} devices for ${normalizedEmail}`)
    
    res.json({ 
      success: true,
      removedCount: deviceCount
    })
  } catch (error) {
    console.error('Error in clear-user-devices:', error)
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    })
  }
})

// Для отладки: получить статистику (только в开发 режиме)
if (process.env.NODE_ENV !== 'production') {
  router.get('/devices-stats', (req, res) => {
    const stats = {
      totalUsers: deviceStorage.size,
      totalDevices: 0,
      usersWithMultipleDevices: 0
    }
    
    for (const devices of deviceStorage.values()) {
      stats.totalDevices += devices.size
      if (devices.size > 1) {
        stats.usersWithMultipleDevices++
      }
    }
    
    res.json(stats)
  })
}

export default router