import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter } from 'react-router-dom';
import { PortfolioProvider } from './contexts/PortfolioContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PortfolioProvider>
  </StrictMode>,
)
