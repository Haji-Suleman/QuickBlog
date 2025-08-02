import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProviders } from './context/AppContext.tsx'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App /> 
  </BrowserRouter>
)
