# Wi-Fi Access System

## Описание
Система получения доступа к Wi-Fi через email верификацию с одноразовым кодом.

## Установка и запуск

```bash
npm install
npm run dev
```

Сервер запустится на `http://localhost:5000`

## Функциональность

### 1. Переключение языков
- **2 языка:** English (EN) и العربية (AR)
- Языки переключаются через кнопки в правом верхнем углу
- Выбранный язык сохраняется в localStorage

### 2. Отправка одноразового кода

**Режим разработки (DEV):**
- Коды логируются в консоль сервера
- Формат: `DEV MODE - Email Code: test@example.com → 1234`

**Режим продакшена:**
- Требуется SMTP конфигурация в `.env`
- Письма отправляются через SMTP сервер

#### Переменные окружения (`.env`)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SECURE=false
SMTP_FROM=your-email@gmail.com
```

### 3. Верификация кода
- Код валиден 5 минут
- После ввода всех цифр автоматическое подтверждение

### 4. Валидация
- Email: стандартный формат
- Дата рождения: формат DD / MM / YYYY
- Возраст: минимум 18 лет

## API Endpoints

### POST `/api/send-code`
Отправка кода на email

**Request:**
```json
{
  "email": "user@example.com",
  "birthdate": "15 / 03 / 2000"
}
```

**Response:**
```json
{
  "success": true
}
```

**Ошибки:**
- `400` - Invalid email или Age restriction
- `500` - Failed to send email

### POST `/api/verify-code`
Проверка кода

**Request:**
```json
{
  "email": "user@example.com",
  "code": "1234"
}
```

**Response:**
```json
{
  "success": true
}
```

**Ошибки:**
- `400` - Invalid code

## Тестирование

### Тест отправки кода
```bash
curl -X POST http://localhost:5000/api/send-code \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","birthdate":"15 / 03 / 2000"}'
```

### Тест проверки кода
```bash
curl -X POST http://localhost:5000/api/verify-code \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","code":"1234"}'
```

## Dev vs Prod

| Функция | Dev | Prod |
|---------|-----|------|
| Коды | В консоль | Email |
| SMTP | Не требуется | Требуется |
| Хранение кодов | В памяти* | В памяти* |

*В production рекомендуется использовать Redis или БД

## Структура проекта

```
├── server/
│   ├── index.js              # Express сервер
│   ├── routes/
│   │   └── auth.js           # API роуты
│   ├── services/
│   │   ├── otp.js            # Генерация и проверка кодов
│   │   └── mailer.js         # Отправка emails
│   └── utils/
│       └── validators.js     # Валидация email и возраста
├── src/
│   ├── index.html
│   ├── components/
│   │   ├── form.html
│   │   ├── popup.html
│   │   └── success.html
│   ├── js/
│   │   └── main.js           # Главный скрипт + i18n
│   └── scss/
│       └── *.scss            # Стили
└── dist/                     # Собранные файлы
```

## Локализация (i18n)

Все текстовые элементы имеют атрибут `data-i18n`:

```html
<h1 data-i18n="header.title">Title</h1>
```

Переводы добавляются в объект `translations` в `main.js`.

## Автор
Ekaterina Crowley
