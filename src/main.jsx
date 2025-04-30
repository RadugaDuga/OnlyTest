// Импортируем React для создания приложения
import React from 'react'
// Импортируем ReactDOM для рендеринга в браузере
import ReactDOM from 'react-dom/client'
// Импортируем главный компонент приложения
import App from './App'
// Импортируем основные стили
import './index.css'

// Создаем корневой элемент React и рендерим приложение
ReactDOM.createRoot(document.getElementById('root')).render(
  // Включаем строгий режим React для выявления потенциальных проблем
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
