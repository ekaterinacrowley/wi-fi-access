const store = new Map()

export function generateOTP(email) {
  const code = Math.floor(1000 + Math.random() * 9000).toString()

  store.set(email, {
    code,
    expires: Date.now() + 5 * 60 * 1000 // 5 минут
  })

  console.log('OTP GENERATED:', email, code)

  return code
}

export function verifyOTP(email, input) {
  const record = store.get(email)

  if (!record) return false
  if (Date.now() > record.expires) {
    store.delete(email)
    return false
  }

  const ok = record.code === input

  if (ok) store.delete(email)

  return ok
}
