import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeContextProvider } from './context/ThemeContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </ThemeContextProvider>
)
