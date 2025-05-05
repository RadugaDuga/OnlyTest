# 🎥 Превью

[![Смотреть видео-превью](src/assets/preview.png)](https://drive.google.com/file/d/1-7ZU9aGZnCmj4bY-RcmQ2RaHXv4hkySa/view?usp=drive_link)

<br>

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=swiper&logoColor=white)

<br>

# 🏁 Запуск проекта


1. 📥 Склонируй репозиторий или скачай архив с GitHub Releases и распакуй.
     ```bash
     Invoke-WebRequest -Uri "https://github.com/RadugaDuga/OnlyTest/archive/refs/heads/main.zip" -OutFile "OnlyTest-main.zip"
     ```
2. 📦 Установи зависимости (лучше через ci чтоб не было конфликтов разных либ ):

     ```bash
     npm ci
     ```

3. 🚀 Запусти проект в режиме разработки (адрес - http://localhost:3000):

     ```bash
     npm start
     ```

4. 🛠️ Для сборки production-версии используй:
     ```bash
     npm run build
     ```

<br>

# 📁 Структура файлов

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
