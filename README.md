# JS_Reg_OOP

Простое одностраничное приложение регистрации, написанное на чистом JavaScript с использованием объектно‑ориентированного подхода и ручной валидацией формы.

---

## Запуск

```bash
npm i
npm run dev
```

Открыть в браузере по адресу, указанному в консоли (http://localhost:5173/JS_Reg_OOP/).

---

## Стек

- Vite
- Vanilla JavaScript
- CSS (Tailwind)
- Без сторонних UI/JS‑библиотек

---

## Архитектура

- `src/registrator/` — модули, отвечающие за логику формы:

  - `input.js` — создание инпутов
  - `validators.js` — модуль валидаций
  - `form.js` — сама форма
  - `formAlert.js` — алерт по отправке формы
  - `formState.js` — хранилище состояния
  - `errorList.js` — ошибки под инпутом

- `theme.js` — переключение темы (light/dark)
