import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ThreatProvider } from './context/ThreatContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThreatProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThreatProvider>
  </React.StrictMode>,
)
