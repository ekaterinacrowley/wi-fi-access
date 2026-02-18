import Swiper from 'swiper'
import { Pagination, Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

/* ---------- Localization ---------- */
const translations = {
  en: {
    'header.logo': 'Local Café',
    'header.label': 'Free Wi-Fi Connected',
    'banner.label': 'Sponsored',
    'banner.title': 'EXCLUSIVE VIP PROGRAM',
    'banner.text': 'Personal manager • Higher limits • Special bonuses for VIP members',
    'banner.btn1': 'Join VIP Club',
    'banner.btn2': 'Learn More',
    'banner.infographics.text1': 'SSL Encryption',
    'banner.infographics.text2': 'Licensed & Regulated',
    'banner.infographics.text3': 'Fast Payouts',
    'cafe.banner.title': 'Your local place for fresh coffee and daily essentials',
    'cafe.banner.text': 'Welcome! Enjoy free Wi-Fi and explore our selection.',
    'cafe.banner.btn': 'Explore',
    'cafe.title': 'Fresh Daily',
    'cafe.text': 'Quality products for every taste',
    'footer.logo': 'Local Café',
    'footer.text': 'Enjoy your free Wi-Fi connection and explore our selection.',
    'form.title.default': 'Free Wi-Fi Access',
    'form.text.default': 'Complete a quick registration to connect to the internet',
    'form.btn.default': 'Connect to Wi-Fi',
    'form.btn.code': 'Confirm',
    'form.title.code': 'Check your email',
    'form.text.code1': 'We\'ve sent a one-time code to ',
    'form.text.code2': '. Please enter the code below to get access to free Wi-Fi.',
    'error.email_required': 'Email is required',
    'error.email_invalid': 'Invalid email address',
    'error.birthdate_required': 'Date of birth is required',
    'error.birthdate_invalid': 'Invalid date',
    'error.birthdate_age': 'You must be 18 or older to connect',
    'error.send_failed': 'Failed to send email. Please try again.',
    'error.verify_failed': "It looks like the numbers you entered don't match our records. Please double-check and try again.",
    'email.subject': 'Your Wi-Fi Access Code',
    'email.body': 'Your one-time code: {code} — valid for 5 minutes.',
    'form.email': 'Email Address',
    'form.birthdate': 'Date of birth',
    'form.note.default': 'You have 5 minutes of free internet access. Confirm you are 18+, accept our terms, and verify your email to continue.',
    'form.note.code': 'Resend email',
    'form.resend.title': 'Resend email',
    'form.resend.text': 'The code is valid for 5 minutes',
    'popup.title': 'Exclusive welcome offer!',
    'popup.label': 'GET 100% BONUS UP TO $100',
    'popup.text': 'Limited time offer for new users! Don\'t miss out on this amazing deal.',
    'popup.btn': 'CLAIM MY BONUS NOW',
    'wifi.title': 'Your Wi-Fi Connection Details',
    'wifi.ssid': 'Network Name (SSID)',
    'wifi.password': 'Password',
    'wifi.copy': 'Copy'
  },
  ar: {
    'header.logo': 'Local Café',
    'header.label': 'اتصال Wi-Fi مجاني',
    'banner.label': 'ممول',
    'banner.title': 'برنامج VIP الحصري',
    'banner.text': 'مدير شخصي • حدود أعلى • مكافآت خاصة لأعضاء VIP',
    'banner.btn1': 'انضم إلى VIP Club',
    'banner.btn2': 'تعرف على المزيد',
    'banner.infographics.text1': 'تشفير SSL',
    'banner.infographics.text2': 'مرخص ومنظم',
    'banner.infographics.text3': 'دفع سريع',
    'cafe.banner.title': 'مقهاك المحلي للقهوة الطازجة والضروريات اليومية',
    'cafe.banner.text': 'أهلا وسهلا! استمتع بـ Wi-Fi مجاني واستكشف تشكيلتنا.',
    'cafe.banner.btn': 'استكشف',
    'cafe.title': 'طازج يوميا',
    'cafe.text': 'منتجات جودة لكل الأذواق',
    'footer.logo': 'Local Café',
    'footer.text': 'استمتع باتصال Wi-Fi المجاني واستكشف تشكيلتنا.',
    'form.title.default': 'الوصول المجاني إلى Wi-Fi',
    'form.text.default': 'أكمل التسجيل السريع للاتصال بالإنترنت',
    'form.btn.default': 'الاتصال بشبكة Wi-Fi',
    'form.btn.code': 'تأكيد',
    'form.title.code': 'تحقق من بريدك الإلكتروني',
    'form.text.code1': 'لقد أرسلنا رمزًا لمرة واحدة إلى',
    'form.text.code2': '. يرجى إدخال الرمز أدناه للحصول على الوصول إلى Wi-Fi المجاني.',
    'error.email_required': 'البريد الإلكتروني مطلوب',
    'error.email_invalid': 'عنوان البريد الإلكتروني غير صالح',
    'error.birthdate_required': 'تاريخ الميلاد مطلوب',
    'error.birthdate_invalid': 'تاريخ غير صالح',
    'error.birthdate_age': 'يجب أن تكون 18 عامًا أو أكثر للاتصال',
    'error.send_failed': 'فشل إرسال البريد الإلكتروني. حاول مرة أخرى.',
    'error.verify_failed': 'الرمز غير صحيح. يرجى المحاولة مرة أخرى.',
    'email.subject': 'رمز الوصول إلى Wi-Fi',
    'email.body': 'الرمز لمرة واحدة: {code} — صالح لمدة 5 دقائق.',
    'form.email': 'عنوان البريد الإلكتروني',
    'form.birthdate': 'تاريخ الميلاد',
    'form.note.default': 'لديك 5 دقائق من الوصول المجاني للإنترنت. تأكد أنك تبلغ 18 سنة أو أكثر واقبل شروطنا وتحقق من بريدك الإلكتروني للمتابعة.',
    'form.note.code': 'إعادة إرسال البريد الإلكتروني',
    'form.resend.title': 'إعادة إرسال البريد الإلكتروني',
    'form.resend.text': 'الرمز صالح لمدة 5 دقائق',
    'popup.title': 'عرض ترحيب حصري!',
    'popup.label': 'احصل على 100٪ مكافأة حتى $100',
    'popup.text': 'عرض محدود الوقت للمستخدمين الجدد! لا تفوت هذا العرض الرائع.',
    'popup.btn': 'اطلب مكافأتي الآن',
    'wifi.title': 'تفاصيل اتصال Wi-Fi الخاص بك',
    'wifi.ssid': 'اسم الشبكة (SSID)',
    'wifi.password': 'كلمة المرور',
    'wifi.copy': 'نسخ'
  }
}

/* ---------- Device Fingerprinting ---------- */
async function generateDeviceFingerprint() {
  try {
    // Collect device information
    const screenData = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;
    const platform = navigator.platform;
    const userAgent = navigator.userAgent;
    
    // Check for available plugins (limited for privacy)
    const plugins = Array.from(navigator.plugins || []).map(p => p.name).join(',');
    
    // Create fingerprint string
    const fingerprintData = [
      screenData,
      timezone,
      language,
      platform,
      userAgent,
      plugins
    ].join('###');
    
    // Generate hash using Web Crypto API
    const msgUint8 = new TextEncoder().encode(fingerprintData);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  } catch (error) {
    console.error('Error generating fingerprint:', error);
    // Fallback to simpler fingerprint if Web Crypto fails
    return generateSimpleFingerprint();
  }
}

function generateSimpleFingerprint() {
  const screenData = `${window.screen.width}x${window.screen.height}`;
  const timestamp = new Date().getTimezoneOffset();
  const userAgent = navigator.userAgent;
  return btoa(`${screenData}-${timestamp}-${userAgent}`).substring(0, 32);
}

/* ---------- Device Access Management ---------- */
const DEVICE_STORAGE_KEY = 'wifi_device_id';
const DEVICE_ACCESS_KEY = 'wifi_device_approved';
const DEVICE_ACCESS_EXPIRY = 'wifi_device_expiry';

async function getOrCreateDeviceId() {
  let deviceId = localStorage.getItem(DEVICE_STORAGE_KEY);
  
  if (!deviceId) {
    deviceId = await generateDeviceFingerprint();
    localStorage.setItem(DEVICE_STORAGE_KEY, deviceId);
  }
  
  return deviceId;
}

function setDeviceApproved(email, expiryTime = null) {
  // Default expiry: 30 days if not specified
  const expiry = expiryTime || Date.now() + (30 * 24 * 60 * 60 * 1000);
  
  localStorage.setItem(DEVICE_ACCESS_KEY, 'true');
  localStorage.setItem(DEVICE_ACCESS_EXPIRY, expiry.toString());
  localStorage.setItem('last_verified_email', email);
  
  console.log('✓ Device approved and remembered');
}

function isDeviceApproved() {
  const isApproved = localStorage.getItem(DEVICE_ACCESS_KEY) === 'true';
  const expiry = parseInt(localStorage.getItem(DEVICE_ACCESS_EXPIRY) || '0');
  
  if (!isApproved) return false;
  
  // Check if approval hasn't expired
  if (expiry < Date.now()) {
    console.log('Device approval expired');
    clearDeviceApproval();
    return false;
  }
  
  return true;
}

function clearDeviceApproval() {
  localStorage.removeItem(DEVICE_ACCESS_KEY);
  localStorage.removeItem(DEVICE_ACCESS_EXPIRY);
  // Don't remove device ID, we want to keep it for future logins
}

async function checkDeviceWithServer(email) {
  try {
    const deviceId = await getOrCreateDeviceId();
    
    const res = await fetch('/api/check-device', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        deviceId,
        timestamp: Date.now()
      })
    });
    
    if (!res.ok) return false;
    
    const data = await res.json();
    return data.approved || false;
  } catch (err) {
    console.error('Device check failed:', err);
    return false;
  }
}

async function registerDeviceWithServer(email) {
  try {
    const deviceId = await getOrCreateDeviceId();
    
    const res = await fetch('/api/register-device', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        deviceId,
        timestamp: Date.now()
      })
    });
    
    if (!res.ok) throw new Error('Failed to register device');
    
    const data = await res.json();
    return data.success || false;
  } catch (err) {
    console.error('Device registration failed:', err);
    return false;
  }
}

function getCurrentLanguage() {
  return localStorage.getItem('lang') || 'en'
}

function setLanguage(lang) {
  localStorage.setItem('lang', lang)
  updatePageLanguage(lang)
  updateLangSwitcherButtons(lang)
  
  // Trigger revalidation of fields with new language
  revalidateFields()
}

function revalidateFields() {
  const emailInput = document.getElementById('email')
  const birthdateInput = document.getElementById('birthdate')
  
  if (emailInput) {
    emailInput.dispatchEvent(new Event('blur'))
  }
  if (birthdateInput) {
    birthdateInput.dispatchEvent(new Event('blur'))
  }
}

function updatePageLanguage(lang) {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  
  const elements = document.querySelectorAll('[data-i18n]')
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n')
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key]
    }
  })
}

function updateLangSwitcherButtons(lang) {
  document.querySelectorAll('.lang-switcher__btn').forEach(btn => {
    btn.classList.remove('lang-switcher__btn--active')
  })
   
  if (lang === 'en') {
    document.querySelectorAll('.lang-switcher__btn--en').forEach(btn => btn.classList.add('lang-switcher__btn--active'))
  } else if (lang === 'ar') {
    document.querySelectorAll('.lang-switcher__btn--ar').forEach(btn => btn.classList.add('lang-switcher__btn--active'))
  }
}

function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll('.lang-switcher__btn')
  
  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      const lang = btn.classList.contains('lang-switcher__btn--en') ? 'en' : 'ar'
      setLanguage(lang)
    })
  })
}

/* ---------- Access Status (Server-backed) ---------- */
async function checkAccessStatus(email) {
  try {
    const res = await fetch(`/api/access-status?email=${encodeURIComponent(email)}`)
    if (!res.ok) throw new Error('Failed to check access')
    const data = await res.json()
    return data // { access: 'none' | 'temporary' | 'permanent', expiresAt?: number }
  } catch (err) {
    console.error('Access status check failed:', err)
    return { access: 'none' }
  }
}

async function grantPermanentAccess(email) {
  try {
    const res = await fetch('/api/grant-permanent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    if (!res.ok) throw new Error('Failed to grant permanent access')
    const data = await res.json()
    console.log('✓ Permanent access granted:', data)
    return data.success
  } catch (err) {
    console.error('Failed to grant permanent access:', err)
    return false
  }
}

/* ---------- Temporary Wi-Fi Access (5 minutes) ---------- */
function grantTemporaryWiFiAccess() {
  // Check if user already has active access
  const existingAccess = parseInt(localStorage.getItem('wifi_access_until') || '0')
  if (existingAccess > Date.now()) {
    console.log('✓ Active Wi-Fi access found, expires in', Math.ceil((existingAccess - Date.now()) / 1000), 'seconds')
    return
  }

  // Grant 5 minutes of access
  const expireTime = Date.now() + 5 * 60 * 1000 // 5 minutes
  localStorage.setItem('wifi_access_until', expireTime)
  console.log('✓ 5-minute Wi-Fi access granted, expires at', new Date(expireTime).toLocaleTimeString())
}

function startAccessTimer() {
  const updateTimer = () => {
    const expireTime = parseInt(localStorage.getItem('wifi_access_until') || '0')
    const now = Date.now()
    const remaining = Math.max(0, expireTime - now)

    if (remaining > 0) {
      const mins = Math.floor(remaining / 60000)
      const secs = Math.floor((remaining % 60000) / 1000)
      // console.log(`⏱ Wi-Fi access expires in: ${mins}:${secs.toString().padStart(2, '0')}`)
      setTimeout(updateTimer, 1000)
    } else {
      console.log('⏱ Wi-Fi access expired')
      localStorage.removeItem('wifi_access_until')
    }
  }
  updateTimer()
}

document.addEventListener('DOMContentLoaded', async () => {
  /* Grant temporary Wi-Fi access */
  grantTemporaryWiFiAccess()
  startAccessTimer()
  
  /* Initialize language after DOM is ready */
  const currentLang = getCurrentLanguage()
  
  initLanguageSwitcher()
  updatePageLanguage(currentLang)
  updateLangSwitcherButtons(currentLang)
  
  /* Initialize Swiper if banner is visible */
  initBannerSwiper()
  
  /* Check if device is already approved */
  const savedEmail = localStorage.getItem('last_verified_email')
  
  if (savedEmail && isDeviceApproved()) {
    // Device is approved locally, verify with server
    const serverApproved = await checkDeviceWithServer(savedEmail)
    if (serverApproved) {
      console.log(`✓ Device already approved for ${savedEmail}`)
      showSuccessPage()
      return
    } else {
      // Server says device not approved, clear local approval
      clearDeviceApproval()
    }
  }
  
  /* ---------- Elements ---------- */
  const formWrapper = document.querySelector('.form')

  // Default form
  const defaultForm = document.getElementById('wifiForm')
  const emailInput = document.getElementById('email')
  const birthdateInput = document.getElementById('birthdate')

  const emailError = document.querySelector('[data-error="email"]')
  const birthdateError = document.querySelector('[data-error="birthdate"]')
  const codeError = document.querySelector('[data-error="code"]')

  // Code form
  const codeForm = document.getElementById('wifiFormCode')
  const codeInputs = codeForm ? Array.from(codeForm.querySelectorAll('.code__input')) : []
  const confirmBtn = codeForm ? codeForm.querySelector('.form__btn') : null

  const enteredEmailEl = document.querySelector('.entered-email')
  const resendBtn = document.querySelector('.resend')

  /* ---------- State ---------- */
  let currentEmail = ''
  let currentBirthdate = ''

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
    if (enteredEmailEl) {
      enteredEmailEl.textContent = email
    }
    formWrapper.classList.add('is-code')
    resetCodeInputs()
    if (codeInputs[0]) {
      codeInputs[0].focus()
    }
  }

  function showDefaultState() {
    formWrapper.classList.remove('is-code')
    defaultForm.reset()
    resetCodeInputs()
    clearValidation()
    currentEmail = ''
    currentBirthdate = ''
  }

  function showSuccessPage() {
    console.log('showSuccessPage called')
    const formContainer = document.querySelector('.form-container')
    const successContainer = document.querySelector('.success-container')
    
    if (formContainer) {
      formContainer.style.display = 'none'
    }
    if (successContainer) {
      successContainer.style.display = 'block'
      // re-apply translations for newly visible content
      updatePageLanguage(getCurrentLanguage())
      updateLangSwitcherButtons(getCurrentLanguage())
      initSuccessPage()
      // Re-init swiper if needed
      setTimeout(() => initBannerSwiper(), 100)
    }
  }
 
 
  function initBannerSwiper() {
    const swiperEl = document.querySelector('.banner .swiper')
    const successContainer = document.querySelector('.success-container')
    if (swiperEl && successContainer && successContainer.style.display === 'block') {
      console.log('Initializing banner Swiper')
      const bannerSwiper = new Swiper('.banner .swiper', {
        modules: [Pagination, Navigation, EffectFade],
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
          el: '.banner .swiper-pagination',
          clickable: true, 
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        loop: true,
      })
      console.log('Banner Swiper initialized:', bannerSwiper)
    } else {
      console.log('Banner swiper element not found or not visible')
    }
  }
 
  function initSuccessPage() {
    const banner = document.querySelector('.banner')
    const popupWrapper = document.querySelector('.popup-wrapper')
    const popup = document.querySelector('.popup')
    
    console.log('initSuccessPage called')
    console.log('banner element:', banner)
    const swiperEl = document.querySelector('.swiper')
    console.log('swiper element:', swiperEl)
    
    if (banner) {
      setTimeout(() => {
        banner.classList.add('is-loaded')
      }, 200)
    }
    
    if (popupWrapper) {
      setTimeout(() => {
        popupWrapper.classList.add('visible')
      }, 2000)
    }
    
    if (popupWrapper && popup) {
      popupWrapper.addEventListener('click', (e) => {
        // если кликнули вне popup
        if (!popup.contains(e.target)) {
          popupWrapper.classList.remove('visible')
        }
      })
    }
  }

  function resetCodeInputs() {
    codeInputs.forEach(input => {
      input.value = ''
      input.classList.remove('filled')
    })
    if (confirmBtn) {
      confirmBtn.disabled = true
    }
  }

  function clearValidation() {
    setFieldState(emailInput, emailError, null)
    setFieldState(birthdateInput, birthdateError, null)
  }

  function getEnteredCode() {
    return codeInputs.map(i => i.value).join('')
  }

  function showCodeError() {
    const lang = getCurrentLanguage()
    const codeContaniner = document.querySelector('.code')
    const message = translations[lang]['error.verify_failed']
    
    if (codeError) {
      codeContaniner.classList.add('error')
      codeError.textContent = message
      codeError.style.display = 'flex'
    }
  }

  /* ---------- Date mask DD / MM / YYYY ---------- */
  if (birthdateInput) {
    birthdateInput.addEventListener('input', () => {
      let value = birthdateInput.value.replace(/\D/g, '')
      if (value.length > 8) value = value.slice(0, 8)

      let formatted = ''
      if (value.length > 0) formatted += value.slice(0, 2)
      if (value.length >= 3) formatted += ' / ' + value.slice(2, 4)
      if (value.length >= 5) formatted += ' / ' + value.slice(4)

      birthdateInput.value = formatted
    })
  }

  /* ---------- Validation (blur) ---------- */
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      const value = emailInput.value.trim()
      const lang = getCurrentLanguage()

      if (!value) {
        setFieldState(emailInput, emailError, 'error', translations[lang]['error.email_required'])
      } else if (!isValidEmail(value)) {
        setFieldState(emailInput, emailError, 'error', translations[lang]['error.email_invalid'])
      } else {
        setFieldState(emailInput, emailError, 'success')
      }
    })
  }

  if (birthdateInput) {
    birthdateInput.addEventListener('blur', () => {
      const value = birthdateInput.value.trim()
      const lang = getCurrentLanguage()

      if (value.length !== 14) {
        setFieldState(
          birthdateInput,
          birthdateError,
          'error',
          translations[lang]['error.birthdate_required']
        )
        return
      }

      const age = getAge(value)

      if (isNaN(age)) {
        setFieldState(birthdateInput, birthdateError, 'error', translations[lang]['error.birthdate_invalid'])
      } else if (age < 18) {
        setFieldState(
          birthdateInput,
          birthdateError,
          'error',
          translations[lang]['error.birthdate_age']
        )
      } else {
        setFieldState(birthdateInput, birthdateError, 'success')
      }
    })
  }

  /* ---------- Default form submit ---------- */
  if (defaultForm) {
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
          body: JSON.stringify({ email, birthdate, lang: getCurrentLanguage() })
        })

        if (!res.ok) {
          const data = await res.json()
          setFieldState(emailInput, emailError, 'error', data.error || translations[getCurrentLanguage()]['error.send_failed'])
          return
        }

        currentBirthdate = birthdate
        showCodeState(email)
      } catch (err) {
        console.error('Error:', err)
        setFieldState(emailInput, emailError, 'error', translations[getCurrentLanguage()]['error.send_failed'])
      }
    })
  }

  /* ---------- Code inputs ---------- */
  if (codeInputs.length > 0) {
    // Обработчик paste на первое поле для вставки полного кода
    if (codeInputs[0]) {
      codeInputs[0].addEventListener('paste', async (e) => {
        e.preventDefault()
        
        // Очищаем ошибку при вставке
        if (codeError) {
          codeError.textContent = ''
          codeError.style.display = 'none'
        }

        const pastedText = (e.clipboardData || window.clipboardData).getData('text')
        const digits = pastedText.replace(/\D/g, '').slice(0, 4)

        // Вводим каждую цифру в соответствующее поле
        for (let i = 0; i < digits.length && i < codeInputs.length; i++) {
          codeInputs[i].value = digits[i]
          codeInputs[i].classList.add('filled')
        }

        // Если вставлены все 4 цифры, отправляем на проверку
        if (digits.length === codeInputs.length) {
          validateCode()
        } else if (digits.length > 0) {
          // Фокус на следующее поле после последней вставленной цифры
          codeInputs[Math.min(digits.length, codeInputs.length - 1)].focus()
        }
      })
    }

    codeInputs.forEach((input, index) => {
      input.maxLength = 1
      input.inputMode = 'numeric'

      input.addEventListener('input', () => {
        // Очищаем ошибку при вводе
        if (codeError) {
          codeError.textContent = ''
          codeError.style.display = 'none'
        }

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
  }

  /* ---------- Validate code ---------- */
  async function validateCode() {
    try {
      const res = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentEmail,
          code: getEnteredCode(),
          birthdate: currentBirthdate,
          lang: getCurrentLanguage()
        })
      })

      if (!res.ok) throw new Error()

      console.log('Code verified successfully')
      if (confirmBtn) {
        confirmBtn.disabled = false
        console.log('Confirm button enabled')
      }
    } catch {
      showCodeError()
      resetCodeInputs()
      if (codeInputs[0]) {
        codeInputs[0].focus()
      }
    }
  }

  /* ---------- Confirm submit ---------- */
  if (codeForm) {
    codeForm.addEventListener('submit', async e => {
      e.preventDefault()
      console.log('Code form submitted')
      if (!confirmBtn || confirmBtn.disabled) {
        console.log('Confirm button disabled or not found')
        return
      }

      // Register device for future automatic login
      await registerDeviceWithServer(currentEmail);
      
      // Save verified email to localStorage and mark device as approved
      setDeviceApproved(currentEmail);
      
      console.log('Email verified → grant Wi-Fi access, device remembered')
      
      showSuccessPage()
    })
  }

  /* ---------- Resend ---------- */
  if (resendBtn) {
    resendBtn.addEventListener('click', async e => {
      e.preventDefault()
      if (!currentEmail || !currentBirthdate) return

      try {
        const res = await fetch('/api/send-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: currentEmail, birthdate: currentBirthdate, lang: getCurrentLanguage() })
        })

        if (!res.ok) {
          const data = await res.json()
          if (codeError) {
            setFieldState(codeInputs[0] || emailInput, codeError, 'error', data.error || translations[getCurrentLanguage()]['error.send_failed'])
          } else {
            setFieldState(emailInput, emailError, 'error', data.error || translations[getCurrentLanguage()]['error.send_failed'])
          }
          return
        } 

        // Возвращаемся к форме ввода почты
        showDefaultState()
      } catch (err) {
        console.error('Error:', err)
        if (codeError) {
          setFieldState(codeInputs[0] || emailInput, codeError, 'error', translations[getCurrentLanguage()]['error.send_failed'])
        } else {
          setFieldState(emailInput, emailError, 'error', translations[getCurrentLanguage()]['error.send_failed'])
        }
      }
    }) 
  }
})

/* window.addEventListener('load', ) больше не используется - инициализация при showSuccessPage() */