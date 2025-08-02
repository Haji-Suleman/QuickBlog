import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.tsx'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>

  </BrowserRouter>
)
