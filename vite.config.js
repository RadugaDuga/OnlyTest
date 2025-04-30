// Импортируем функцию defineConfig из Vite
import { defineConfig } from 'vite'
// Импортируем плагин React для Vite
import react from '@vitejs/plugin-react'

// Экспортируем конфигурацию Vite
export default defineConfig({
  // Подключаем плагины
  plugins: [react()],
})
