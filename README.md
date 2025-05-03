## Превью разных версий

<p align="center">
  <img src="src/assets/preview.png" alt="Preview" style="height: 326px;"/>
  <img src="src/assets/preview-mobile.png" alt="Preview Mobile" style="height: 326px;"/>
</p>

## Запуск проекта

1. Установи зависимости ( лучше через ci чтоб не было конфликтов разных либ ):
     ```bash
     npm ci
     ```
2. Запусти проект в режиме разработки:

     ```bash
     npm start
     ```

     Проект будет доступен по адресу http://localhost:3000

3. Для сборки production-версии:
     ```bash
     npm run build
     ```

## Структура файлов

-    `src/`
     -    `App.tsx` — основной компонент
     -    `index.tsx` — энтри поинт
     -    `index.html` — шаблон HTML
     -    `mock.ts`, `types.ts` — мок-данные и типы для них
     -    `assets/`
          -    `icons/` — SVG-иконки
     -    `components/` — основные компоненты временной шкалы:
          -    `TimelineControls/` — кнопки переключения активного события таймлайна
          -    `TimelineDates/` — анимированные даты от и до
          -    `TimelineGrid/` — визуальная сетка
          -    `TimelineMinipoints/` — мини-точки событий ( пагинация для точек таймлайна )
          -    `TimelinePoint/` — точка события на таймлайне
          -    `TimelineSwiper/` — свайпер со слайдами текущей темы
     -    `constants/` — константы ( активный элемент по умолчанию )
     -    `hooks/` — пользовательские хуки
          -    `useAnimatedDates/` — хук для анимации дат от и до
          -    `useTimelineWheel/` — хук для анимации главного колеса
     -    `styles/` — SCSS-стили (главные + переменные)
-    `webpack.config.js` — конфиг вебпака
-    `tsconfig.json` — конфиг TypeScript
-    `package.json` — зависимости
