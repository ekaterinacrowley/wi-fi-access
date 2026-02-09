export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateAge(birthdate) {
  if (!birthdate) return false

  const [dd, mm, yyyy] = birthdate.split('/').map(v => v.trim())
  const date = new Date(`${yyyy}-${mm}-${dd}`)

  if (isNaN(date)) return false

  const today = new Date()
  let age = today.getFullYear() - date.getFullYear()
  const m = today.getMonth() - date.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
    age--
  }

  return age >= 18
}
