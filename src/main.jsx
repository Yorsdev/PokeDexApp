import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { NameProvider } from './context/nameContext.jsx'
import App from './routes/App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NameProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </NameProvider>
  </StrictMode>,
)
