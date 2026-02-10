(() => {
  // src/js/main.js
  var translations = {
    en: {
      "header.logo": "Local Caf\xE9",
      "header.label": "Free Wi-Fi Connected",
      "banner.label": "Sponsored",
      "banner.title": "EXCLUSIVE VIP PROGRAM",
      "banner.text": "Personal manager \u2022 Higher limits \u2022 Special bonuses for VIP members",
      "banner.btn1": "Join VIP Club",
      "banner.btn2": "Learn More",
      "banner.infographics.text1": "SSL Encryption",
      "banner.infographics.text2": "Licensed & Regulated",
      "banner.infographics.text3": "Fast Payouts",
      "cafe.banner.title": "Your local place for fresh coffee and daily essentials",
      "cafe.banner.text": "Welcome! Enjoy free Wi-Fi and explore our selection.",
      "cafe.banner.btn": "Explore",
      "cafe.title": "Fresh Daily",
      "cafe.text": "Quality products for every taste",
      "footer.logo": "Local Caf\xE9",
      "footer.text": "Enjoy your free Wi-Fi connection and explore our selection.",
      "form.title.default": "Free Wi-Fi Access",
      "form.text.default": "Complete a quick registration to connect to the internet",
      "form.btn.default": "Connect to Wi-Fi",
      "form.btn.code": "Confirm",
      "form.title.code": "Check your email",
      "form.text.code1": "We've sent a one-time code to ",
      "form.text.code2": ". Please enter the code below to get access to free Wi-Fi.",
      "error.email_required": "Email is required",
      "error.email_invalid": "Invalid email address",
      "error.birthdate_required": "Date of birth is required",
      "error.birthdate_invalid": "Invalid date",
      "error.birthdate_age": "You must be 18 or older to connect",
      "error.send_failed": "Failed to send email. Please try again.",
      "error.verify_failed": "It looks like the numbers you entered don't match our records. Please double-check and try again.",
      "email.subject": "Your Wi-Fi Access Code",
      "email.body": "Your one-time code: {code} \u2014 valid for 10 minutes.",
      "form.email": "Email Address",
      "form.birthdate": "Date of birth",
      "form.note.default": "You have 5 minutes of free internet access. Confirm you are 18+, accept our terms, and verify your email to continue.",
      "form.note.code": "Resend email",
      "form.resend.title": "Resend email",
      "form.resend.text": "The code is valid for 10 minutes",
      "popup.title": "Exclusive welcome offer!",
      "popup.label": "GET 100% BONUS UP TO $100",
      "popup.text": "Limited time offer for new users! Don't miss out on this amazing deal.",
      "popup.btn": "CLAIM MY BONUS NOW"
    },
    ar: {
      "header.logo": "Local Caf\xE9",
      "header.label": "\u0627\u062A\u0635\u0627\u0644 Wi-Fi \u0645\u062C\u0627\u0646\u064A",
      "banner.label": "\u0645\u0645\u0648\u0644",
      "banner.title": "\u0628\u0631\u0646\u0627\u0645\u062C VIP \u0627\u0644\u062D\u0635\u0631\u064A",
      "banner.text": "\u0645\u062F\u064A\u0631 \u0634\u062E\u0635\u064A \u2022 \u062D\u062F\u0648\u062F \u0623\u0639\u0644\u0649 \u2022 \u0645\u0643\u0627\u0641\u0622\u062A \u062E\u0627\u0635\u0629 \u0644\u0623\u0639\u0636\u0627\u0621 VIP",
      "banner.btn1": "\u0627\u0646\u0636\u0645 \u0625\u0644\u0649 VIP Club",
      "banner.btn2": "\u062A\u0639\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0645\u0632\u064A\u062F",
      "banner.infographics.text1": "\u062A\u0634\u0641\u064A\u0631 SSL",
      "banner.infographics.text2": "\u0645\u0631\u062E\u0635 \u0648\u0645\u0646\u0638\u0645",
      "banner.infographics.text3": "\u062F\u0641\u0639 \u0633\u0631\u064A\u0639",
      "cafe.banner.title": "\u0645\u0642\u0647\u0627\u0643 \u0627\u0644\u0645\u062D\u0644\u064A \u0644\u0644\u0642\u0647\u0648\u0629 \u0627\u0644\u0637\u0627\u0632\u062C\u0629 \u0648\u0627\u0644\u0636\u0631\u0648\u0631\u064A\u0627\u062A \u0627\u0644\u064A\u0648\u0645\u064A\u0629",
      "cafe.banner.text": "\u0623\u0647\u0644\u0627 \u0648\u0633\u0647\u0644\u0627! \u0627\u0633\u062A\u0645\u062A\u0639 \u0628\u0640 Wi-Fi \u0645\u062C\u0627\u0646\u064A \u0648\u0627\u0633\u062A\u0643\u0634\u0641 \u062A\u0634\u0643\u064A\u0644\u062A\u0646\u0627.",
      "cafe.banner.btn": "\u0627\u0633\u062A\u0643\u0634\u0641",
      "cafe.title": "\u0637\u0627\u0632\u062C \u064A\u0648\u0645\u064A\u0627",
      "cafe.text": "\u0645\u0646\u062A\u062C\u0627\u062A \u062C\u0648\u062F\u0629 \u0644\u0643\u0644 \u0627\u0644\u0623\u0630\u0648\u0627\u0642",
      "footer.logo": "Local Caf\xE9",
      "footer.text": "\u0627\u0633\u062A\u0645\u062A\u0639 \u0628\u0627\u062A\u0635\u0627\u0644 Wi-Fi \u0627\u0644\u0645\u062C\u0627\u0646\u064A \u0648\u0627\u0633\u062A\u0643\u0634\u0641 \u062A\u0634\u0643\u064A\u0644\u062A\u0646\u0627.",
      "form.title.default": "\u0627\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0645\u062C\u0627\u0646\u064A \u0625\u0644\u0649 Wi-Fi",
      "form.text.default": "\u0623\u0643\u0645\u0644 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0633\u0631\u064A\u0639 \u0644\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062A\u0631\u0646\u062A",
      "form.btn.default": "\u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0634\u0628\u0643\u0629 Wi-Fi",
      "form.btn.code": "\u062A\u0623\u0643\u064A\u062F",
      "form.title.code": "\u062A\u062D\u0642\u0642 \u0645\u0646 \u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
      "form.text.code1": "\u0644\u0642\u062F \u0623\u0631\u0633\u0644\u0646\u0627 \u0631\u0645\u0632\u064B\u0627 \u0644\u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0625\u0644\u0649",
      "form.text.code2": ". \u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0631\u0645\u0632 \u0623\u062F\u0646\u0627\u0647 \u0644\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 Wi-Fi \u0627\u0644\u0645\u062C\u0627\u0646\u064A.",
      "error.email_required": "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0637\u0644\u0648\u0628",
      "error.email_invalid": "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u063A\u064A\u0631 \u0635\u0627\u0644\u062D",
      "error.birthdate_required": "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F \u0645\u0637\u0644\u0648\u0628",
      "error.birthdate_invalid": "\u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0635\u0627\u0644\u062D",
      "error.birthdate_age": "\u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 18 \u0639\u0627\u0645\u064B\u0627 \u0623\u0648 \u0623\u0643\u062B\u0631 \u0644\u0644\u0627\u062A\u0635\u0627\u0644",
      "error.send_failed": "\u0641\u0634\u0644 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A. \u062D\u0627\u0648\u0644 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",
      "error.verify_failed": "\u0627\u0644\u0631\u0645\u0632 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D. \u064A\u0631\u062C\u0649 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.",
      "email.subject": "\u0631\u0645\u0632 \u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 Wi-Fi",
      "email.body": "\u0627\u0644\u0631\u0645\u0632 \u0644\u0645\u0631\u0629 \u0648\u0627\u062D\u062F\u0629: {code} \u2014 \u0635\u0627\u0644\u062D \u0644\u0645\u062F\u0629 10 \u062F\u0642\u0627\u0626\u0642.",
      "form.email": "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
      "form.birthdate": "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0645\u064A\u0644\u0627\u062F",
      "form.note.default": "\u0644\u062F\u064A\u0643 5 \u062F\u0642\u0627\u0626\u0642 \u0645\u0646 \u0627\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0645\u062C\u0627\u0646\u064A \u0644\u0644\u0625\u0646\u062A\u0631\u0646\u062A. \u062A\u0623\u0643\u062F \u0623\u0646\u0643 \u062A\u0628\u0644\u063A 18 \u0633\u0646\u0629 \u0623\u0648 \u0623\u0643\u062B\u0631 \u0648\u0627\u0642\u0628\u0644 \u0634\u0631\u0648\u0637\u0646\u0627 \u0648\u062A\u062D\u0642\u0642 \u0645\u0646 \u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0644\u0644\u0645\u062A\u0627\u0628\u0639\u0629.",
      "form.note.code": "\u0625\u0639\u0627\u062F\u0629 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
      "form.resend.title": "\u0625\u0639\u0627\u062F\u0629 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
      "form.resend.text": "\u0627\u0644\u0631\u0645\u0632 \u0635\u0627\u0644\u062D \u0644\u0645\u062F\u0629 10 \u062F\u0642\u0627\u0626\u0642",
      "popup.title": "\u0639\u0631\u0636 \u062A\u0631\u062D\u064A\u0628 \u062D\u0635\u0631\u064A!",
      "popup.label": "\u0627\u062D\u0635\u0644 \u0639\u0644\u0649 100\u066A \u0645\u0643\u0627\u0641\u0623\u0629 \u062D\u062A\u0649 $100",
      "popup.text": "\u0639\u0631\u0636 \u0645\u062D\u062F\u0648\u062F \u0627\u0644\u0648\u0642\u062A \u0644\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u0627\u0644\u062C\u062F\u062F! \u0644\u0627 \u062A\u0641\u0648\u062A \u0647\u0630\u0627 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0631\u0627\u0626\u0639.",
      "popup.btn": "\u0627\u0637\u0644\u0628 \u0645\u0643\u0627\u0641\u0623\u062A\u064A \u0627\u0644\u0622\u0646"
    }
  };
  function getCurrentLanguage() {
    return localStorage.getItem("lang") || "en";
  }
  function setLanguage(lang) {
    localStorage.setItem("lang", lang);
    updatePageLanguage(lang);
    updateLangSwitcherButtons(lang);
    revalidateFields();
  }
  function revalidateFields() {
    const emailInput = document.getElementById("email");
    const birthdateInput = document.getElementById("birthdate");
    if (emailInput) {
      emailInput.dispatchEvent(new Event("blur"));
    }
    if (birthdateInput) {
      birthdateInput.dispatchEvent(new Event("blur"));
    }
  }
  function updatePageLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }
  function updateLangSwitcherButtons(lang) {
    document.querySelectorAll(".lang-switcher__btn").forEach((btn) => {
      btn.classList.remove("lang-switcher__btn--active");
    });
    if (lang === "en") {
      document.querySelectorAll(".lang-switcher__btn--en").forEach((btn) => btn.classList.add("lang-switcher__btn--active"));
    } else if (lang === "ar") {
      document.querySelectorAll(".lang-switcher__btn--ar").forEach((btn) => btn.classList.add("lang-switcher__btn--active"));
    }
  }
  function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll(".lang-switcher__btn");
    langButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = btn.classList.contains("lang-switcher__btn--en") ? "en" : "ar";
        setLanguage(lang);
      });
    });
  }
  async function checkAccessStatus(email) {
    try {
      const res = await fetch(`/api/access-status?email=${encodeURIComponent(email)}`);
      if (!res.ok)
        throw new Error("Failed to check access");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Access status check failed:", err);
      return { access: "none" };
    }
  }
  function grantTemporaryWiFiAccess() {
    const existingAccess = parseInt(localStorage.getItem("wifi_access_until") || "0");
    if (existingAccess > Date.now()) {
      console.log("\u2713 Active Wi-Fi access found, expires in", Math.ceil((existingAccess - Date.now()) / 1e3), "seconds");
      return;
    }
    const expireTime = Date.now() + 5 * 60 * 1e3;
    localStorage.setItem("wifi_access_until", expireTime);
    console.log("\u2713 5-minute Wi-Fi access granted, expires at", new Date(expireTime).toLocaleTimeString());
  }
  function startAccessTimer() {
    const updateTimer = () => {
      const expireTime = parseInt(localStorage.getItem("wifi_access_until") || "0");
      const now = Date.now();
      const remaining = Math.max(0, expireTime - now);
      if (remaining > 0) {
        const mins = Math.floor(remaining / 6e4);
        const secs = Math.floor(remaining % 6e4 / 1e3);
        console.log(`\u23F1 Wi-Fi access expires in: ${mins}:${secs.toString().padStart(2, "0")}`);
        setTimeout(updateTimer, 1e3);
      } else {
        console.log("\u23F1 Wi-Fi access expired");
        localStorage.removeItem("wifi_access_until");
      }
    };
    updateTimer();
  }
  document.addEventListener("DOMContentLoaded", async () => {
    grantTemporaryWiFiAccess();
    startAccessTimer();
    const currentLang = getCurrentLanguage();
    initLanguageSwitcher();
    updatePageLanguage(currentLang);
    updateLangSwitcherButtons(currentLang);
    const savedEmail = localStorage.getItem("last_verified_email");
    if (savedEmail) {
      const accessStatus = await checkAccessStatus(savedEmail);
      if (accessStatus.access === "temporary" || accessStatus.access === "permanent") {
        console.log(`\u2713 Found existing ${accessStatus.access} access for ${savedEmail}`);
        showSuccessPage();
        return;
      }
    }
    const formWrapper = document.querySelector(".form");
    const defaultForm = document.getElementById("wifiForm");
    const emailInput = document.getElementById("email");
    const birthdateInput = document.getElementById("birthdate");
    const emailError = document.querySelector('[data-error="email"]');
    const birthdateError = document.querySelector('[data-error="birthdate"]');
    const codeError = document.querySelector('[data-error="code"]');
    const codeForm = document.getElementById("wifiFormCode");
    const codeInputs = codeForm ? Array.from(codeForm.querySelectorAll(".code__input")) : [];
    const confirmBtn = codeForm ? codeForm.querySelector(".form__btn") : null;
    const enteredEmailEl = document.querySelector(".entered-email");
    const resendBtn = document.querySelector(".resend");
    let currentEmail = "";
    let currentBirthdate = "";
    function setFieldState(input, errorEl, state, message = "") {
      input.classList.remove("error", "success");
      if (state) {
        input.classList.add(state);
      }
      errorEl.textContent = message;
    }
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function getAge(dateString) {
      const [day, month, year] = dateString.split(" / ").map(Number);
      const birthDate = new Date(year, month - 1, day);
      const today = /* @__PURE__ */ new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
        age--;
      }
      return age;
    }
    function showCodeState(email) {
      currentEmail = email;
      if (enteredEmailEl) {
        enteredEmailEl.textContent = email;
      }
      formWrapper.classList.add("is-code");
      resetCodeInputs();
      if (codeInputs[0]) {
        codeInputs[0].focus();
      }
    }
    function showDefaultState() {
      formWrapper.classList.remove("is-code");
      defaultForm.reset();
      resetCodeInputs();
      clearValidation();
      currentEmail = "";
      currentBirthdate = "";
    }
    function showSuccessPage() {
      const formContainer = document.querySelector(".form-container");
      const successContainer = document.querySelector(".success-container");
      if (formContainer) {
        formContainer.style.display = "none";
      }
      if (successContainer) {
        successContainer.style.display = "block";
        updatePageLanguage(getCurrentLanguage());
        updateLangSwitcherButtons(getCurrentLanguage());
        initSuccessPage();
      }
    }
    function initSuccessPage() {
      const banner = document.querySelector(".banner");
      const popupWrapper = document.querySelector(".popup-wrapper");
      const popup = document.querySelector(".popup");
      if (banner) {
        setTimeout(() => {
          banner.classList.add("is-loaded");
        }, 200);
      }
      if (popupWrapper) {
        setTimeout(() => {
          popupWrapper.classList.add("visible");
        }, 2e3);
      }
      if (popupWrapper && popup) {
        popupWrapper.addEventListener("click", (e) => {
          if (!popup.contains(e.target)) {
            popupWrapper.classList.remove("visible");
          }
        });
      }
    }
    function resetCodeInputs() {
      codeInputs.forEach((input) => {
        input.value = "";
        input.classList.remove("filled");
      });
      if (confirmBtn) {
        confirmBtn.disabled = true;
      }
    }
    function clearValidation() {
      setFieldState(emailInput, emailError, null);
      setFieldState(birthdateInput, birthdateError, null);
    }
    function getEnteredCode() {
      return codeInputs.map((i) => i.value).join("");
    }
    function showCodeError() {
      const lang = getCurrentLanguage();
      const codeContaniner = document.querySelector(".code");
      const message = translations[lang]["error.verify_failed"];
      if (codeError) {
        codeContaniner.classList.add("error");
        codeError.textContent = message;
        codeError.style.display = "flex";
      }
    }
    if (birthdateInput) {
      birthdateInput.addEventListener("input", () => {
        let value = birthdateInput.value.replace(/\D/g, "");
        if (value.length > 8)
          value = value.slice(0, 8);
        let formatted = "";
        if (value.length > 0)
          formatted += value.slice(0, 2);
        if (value.length >= 3)
          formatted += " / " + value.slice(2, 4);
        if (value.length >= 5)
          formatted += " / " + value.slice(4);
        birthdateInput.value = formatted;
      });
    }
    if (emailInput) {
      emailInput.addEventListener("blur", () => {
        const value = emailInput.value.trim();
        const lang = getCurrentLanguage();
        if (!value) {
          setFieldState(emailInput, emailError, "error", translations[lang]["error.email_required"]);
        } else if (!isValidEmail(value)) {
          setFieldState(emailInput, emailError, "error", translations[lang]["error.email_invalid"]);
        } else {
          setFieldState(emailInput, emailError, "success");
        }
      });
    }
    if (birthdateInput) {
      birthdateInput.addEventListener("blur", () => {
        const value = birthdateInput.value.trim();
        const lang = getCurrentLanguage();
        if (value.length !== 14) {
          setFieldState(
            birthdateInput,
            birthdateError,
            "error",
            translations[lang]["error.birthdate_required"]
          );
          return;
        }
        const age = getAge(value);
        if (isNaN(age)) {
          setFieldState(birthdateInput, birthdateError, "error", translations[lang]["error.birthdate_invalid"]);
        } else if (age < 18) {
          setFieldState(
            birthdateInput,
            birthdateError,
            "error",
            translations[lang]["error.birthdate_age"]
          );
        } else {
          setFieldState(birthdateInput, birthdateError, "success");
        }
      });
    }
    if (defaultForm) {
      defaultForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        emailInput.dispatchEvent(new Event("blur"));
        birthdateInput.dispatchEvent(new Event("blur"));
        if (emailInput.classList.contains("error") || birthdateInput.classList.contains("error")) {
          return;
        }
        const email = emailInput.value.trim();
        const birthdate = birthdateInput.value.trim();
        try {
          const res = await fetch("/api/send-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, birthdate, lang: getCurrentLanguage() })
          });
          if (!res.ok) {
            const data = await res.json();
            setFieldState(emailInput, emailError, "error", data.error || translations[getCurrentLanguage()]["error.send_failed"]);
            return;
          }
          currentBirthdate = birthdate;
          showCodeState(email);
        } catch (err) {
          console.error("Error:", err);
          setFieldState(emailInput, emailError, "error", translations[getCurrentLanguage()]["error.send_failed"]);
        }
      });
    }
    if (codeInputs.length > 0) {
      if (codeInputs[0]) {
        codeInputs[0].addEventListener("paste", async (e) => {
          e.preventDefault();
          if (codeError) {
            codeError.textContent = "";
            codeError.style.display = "none";
          }
          const pastedText = (e.clipboardData || window.clipboardData).getData("text");
          const digits = pastedText.replace(/\D/g, "").slice(0, 4);
          for (let i = 0; i < digits.length && i < codeInputs.length; i++) {
            codeInputs[i].value = digits[i];
            codeInputs[i].classList.add("filled");
          }
          if (digits.length === codeInputs.length) {
            validateCode();
          } else if (digits.length > 0) {
            codeInputs[Math.min(digits.length, codeInputs.length - 1)].focus();
          }
        });
      }
      codeInputs.forEach((input, index) => {
        input.maxLength = 1;
        input.inputMode = "numeric";
        input.addEventListener("input", () => {
          if (codeError) {
            codeError.textContent = "";
            codeError.style.display = "none";
          }
          const value = input.value.replace(/\D/g, "");
          input.value = value;
          if (!value) {
            input.classList.remove("filled");
            return;
          }
          input.classList.add("filled");
          if (index < codeInputs.length - 1) {
            codeInputs[index + 1].focus();
          }
          if (getEnteredCode().length === codeInputs.length) {
            validateCode();
          }
        });
        input.addEventListener("keydown", (e) => {
          if (e.key === "Backspace" && !input.value && index > 0) {
            codeInputs[index - 1].focus();
          }
        });
      });
    }
    async function validateCode() {
      try {
        const res = await fetch("/api/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: currentEmail,
            code: getEnteredCode(),
            birthdate: currentBirthdate,
            lang: getCurrentLanguage()
          })
        });
        if (!res.ok)
          throw new Error();
        if (confirmBtn) {
          confirmBtn.disabled = false;
        }
      } catch {
        showCodeError();
        resetCodeInputs();
        if (codeInputs[0]) {
          codeInputs[0].focus();
        }
      }
    }
    if (codeForm) {
      codeForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!confirmBtn || confirmBtn.disabled)
          return;
        localStorage.setItem("last_verified_email", currentEmail);
        console.log("Email verified \u2192 grant Wi-Fi access");
        showSuccessPage();
      });
    }
    if (resendBtn) {
      resendBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if (!currentEmail || !currentBirthdate)
          return;
        try {
          const res = await fetch("/api/send-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: currentEmail, birthdate: currentBirthdate, lang: getCurrentLanguage() })
          });
          if (!res.ok) {
            const data = await res.json();
            if (codeError) {
              setFieldState(codeInputs[0] || emailInput, codeError, "error", data.error || translations[getCurrentLanguage()]["error.send_failed"]);
            } else {
              setFieldState(emailInput, emailError, "error", data.error || translations[getCurrentLanguage()]["error.send_failed"]);
            }
            return;
          }
          showDefaultState();
        } catch (err) {
          console.error("Error:", err);
          if (codeError) {
            setFieldState(codeInputs[0] || emailInput, codeError, "error", translations[getCurrentLanguage()]["error.send_failed"]);
          } else {
            setFieldState(emailInput, emailError, "error", translations[getCurrentLanguage()]["error.send_failed"]);
          }
        }
      });
    }
  });
})();
