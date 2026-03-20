import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import EmailScan from './pages/EmailScan'
import LinkScan from './pages/LinkScan'
import DocumentScan from './pages/DocumentScan'
import StegoKit from './pages/StegoKit'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import './App.css'
import './components.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/email-scan" element={<EmailScan />} />
          <Route path="/link-scan" element={<LinkScan />} />
          <Route path="/document-scan" element={<DocumentScan />} />
          <Route path="/stego-kit" element={<StegoKit />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
