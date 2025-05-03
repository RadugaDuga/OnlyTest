## Overview и Mobile версия

<p align="center">
  <img src="src/assets/overview.png" alt="Overview" width="45%" style="display:inline-block; margin-right: 10px;"/>
  <img src="src/assets/overview-mobile.png" alt="Overview Mobile" width="45%" style="display:inline-block;"/>
</p>

## Запуск проекта

1. Установите зависимости ( лучше через ci чтоб не было конфликтов разных либ ):
     ```bash
     npm ci
     ```
2. Запусти проект в режиме разработки:

     ```bash
     npm start
     ```

     Проект будет доступен тебе по адресу http://localhost:3000

3. Для сборки production-версии:
     ```bash
     npm run build
     ```

**Структура проекта:**

-    `src/` — исходный код приложения
     -    `App.tsx` — основной компонент приложения
     -    `index.tsx` — точка входа
     -    `index.html` — шаблон HTML
     -    `mock.ts`, `types.ts` — мок-данные и типы
     -    `assets/` — статические ресурсы
          -    `icons/` — SVG-иконки (ChevronLeft, ChevronRight, TimelineCircle)
     -    `components/` — основные компоненты временной шкалы:
          -    `TimelineControls/` — элементы управления (кнопки навигации и т.д.)
          -    `TimelineDates/` — отображение дат на шкале
          -    `TimelineGrid/` — сетка временной шкалы
          -    `TimelineMinipoints/` — мини-точки событий
          -    `TimelinePoint/` — основная точка события
          -    `TimelineSwiper/` — свайпер для прокрутки шкалы
     -    `constants/` — константы приложения
     -    `hooks/` — пользовательские хуки (useAnimatedDates, useTimelineWheel)
     -    `styles/` — SCSS-стили (общие, сброс, переменные)
-    `webpack.config.js` — конфигурация сборки
-    `tsconfig.json` — настройки TypeScript
-    `package.json` — зависимости и скрипты

