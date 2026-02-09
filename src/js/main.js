document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Elements ---------- */
  const formWrapper = document.querySelector('.form')

  // Default form
  const defaultForm = document.getElementById('wifiForm')
  const emailInput = document.getElementById('email')
  const birthdateInput = document.getElementById('birthdate')

  const emailError = document.querySelector('[data-error="email"]')
  const birthdateError = document.querySelector('[data-error="birthdate"]')

  // Code form
  const codeForm = document.getElementById('wifiFormCode')
  const codeInputs = Array.from(codeForm.querySelectorAll('.code__input'))
  const confirmBtn = codeForm.querySelector('.form__btn')

  const enteredEmailEl = document.querySelector('.entered-email')
  const resendBtn = document.querySelector('.resend')

  /* ---------- State ---------- */
  let currentEmail = ''

  /* ---------- Helpers ---------- */
  function setFieldState(input, errorEl, state, message = '') {
    input.classList.remove('error', 'success')

    if (state) {
      input.classList.add(state)
    }

    errorEl.textContent = message
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  function getAge(dateString) {
    const [day, month, year] = dateString.split(' / ').map(Number)
    const birthDate = new Date(year, month - 1, day)
    const today = new Date()

    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  function showCodeState(email) {
    currentEmail = email
    enteredEmailEl.textContent = email
    formWrapper.classList.add('is-code')
    resetCodeInputs()
    codeInputs[0].focus()
  }

  function showDefaultState() {
    formWrapper.classList.remove('is-code')
    defaultForm.reset()
    resetCodeInputs()
    clearValidation()
    currentEmail = ''
  }

  function resetCodeInputs() {
    codeInputs.forEach(input => {
      input.value = ''
      input.classList.remove('filled')
    })
    confirmBtn.disabled = true
  }

  function clearValidation() {
    setFieldState(emailInput, emailError, null)
    setFieldState(birthdateInput, birthdateError, null)
  }

  function getEnteredCode() {
    return codeInputs.map(i => i.value).join('')
  }

  function showCodeError() {
    alert(
      "It looks like the numbers you entered don't match our records. Please double-check and try again."
    )
  }

  /* ---------- Date mask DD / MM / YYYY ---------- */
  birthdateInput.addEventListener('input', () => {
    let value = birthdateInput.value.replace(/\D/g, '')
    if (value.length > 8) value = value.slice(0, 8)

    let formatted = ''
    if (value.length > 0) formatted += value.slice(0, 2)
    if (value.length >= 3) formatted += ' / ' + value.slice(2, 4)
    if (value.length >= 5) formatted += ' / ' + value.slice(4)

    birthdateInput.value = formatted
  })

  /* ---------- Validation (blur) ---------- */
  emailInput.addEventListener('blur', () => {
    const value = emailInput.value.trim()

    if (!value) {
      setFieldState(emailInput, emailError, 'error', 'Email is required')
    } else if (!isValidEmail(value)) {
      setFieldState(emailInput, emailError, 'error', 'Invalid email address')
    } else {
      setFieldState(emailInput, emailError, 'success')
    }
  })

  birthdateInput.addEventListener('blur', () => {
    const value = birthdateInput.value.trim()

    if (value.length !== 14) {
      setFieldState(
        birthdateInput,
        birthdateError,
        'error',
        'Date of birth is required'
      )
      return
    }

    const age = getAge(value)

    if (isNaN(age)) {
      setFieldState(birthdateInput, birthdateError, 'error', 'Invalid date')
    } else if (age < 18) {
      setFieldState(
        birthdateInput,
        birthdateError,
        'error',
        'You must be 18 or older to connect'
      )
    } else {
      setFieldState(birthdateInput, birthdateError, 'success')
    }
  })

  /* ---------- Default form submit ---------- */
  defaultForm.addEventListener('submit', async e => {
    e.preventDefault()

    emailInput.dispatchEvent(new Event('blur'))
    birthdateInput.dispatchEvent(new Event('blur'))

    if (
      emailInput.classList.contains('error') ||
      birthdateInput.classList.contains('error')
    ) {
      return
    }

    const email = emailInput.value.trim()
    const birthdate = birthdateInput.value.trim()

    try {
      const res = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, birthdate })
      })

      if (!res.ok) throw new Error()

      showCodeState(email)
    } catch {
      alert('Failed to send email. Please try again.')
    }
  })

  /* ---------- Code inputs ---------- */
  codeInputs.forEach((input, index) => {
    input.maxLength = 1
    input.inputMode = 'numeric'

    input.addEventListener('input', () => {
      const value = input.value.replace(/\D/g, '')
      input.value = value

      if (!value) {
        input.classList.remove('filled')
        return
      }

      input.classList.add('filled')

      if (index < codeInputs.length - 1) {
        codeInputs[index + 1].focus()
      }

      if (getEnteredCode().length === codeInputs.length) {
        validateCode()
      }
    })

    input.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !input.value && index > 0) {
        codeInputs[index - 1].focus()
      }
    })
  })

  /* ---------- Validate code ---------- */
  async function validateCode() {
    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentEmail,
          code: getEnteredCode()
        })
      })

      if (!res.ok) throw new Error()

      confirmBtn.disabled = false
    } catch {
      showCodeError()
      resetCodeInputs()
      codeInputs[0].focus()
    }
  }

  /* ---------- Confirm submit ---------- */
  codeForm.addEventListener('submit', e => {
    e.preventDefault()
    if (confirmBtn.disabled) return

    console.log('Email verified → grant Wi-Fi access')
  })

  /* ---------- Resend ---------- */
  resendBtn.addEventListener('click', async e => {
    e.preventDefault()
    if (!currentEmail) return

    await fetch('/api/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: currentEmail })
    })

    showDefaultState()
  })
})


window.addEventListener('load', () => {
  const banner = document.querySelector('.banner')
  const popupWrapper  = document.querySelector('.popup-wrapper');
  const popup = document.querySelector('.popup');
    banner.classList.add('is-loaded');
    if (popupWrapper ) {
    setTimeout(() => {
        popupWrapper .classList.add('visible');
    }, 2000);
  }
    if (popupWrapper && popup) {
    popupWrapper.addEventListener('click', (e) => {
        // если кликнули вне popup
        if (!popup.contains(e.target)) {
            popupWrapper.classList.remove('visible');
        }
    });
  }
});
