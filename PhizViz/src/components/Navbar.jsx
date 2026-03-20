import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="brand">
          <img src="/frontend/assets/images/logo.jpeg" alt="PhishViz" className="brand__logo" />
          <span className="brand__name">PhishViz</span>
        </Link>
        <nav className="nav__links">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/email-scan" className={isActive('/email-scan')}>Email Analyzer</Link>
          <Link to="/link-scan" className={isActive('/link-scan')}>Link Detector</Link>
          <Link to="/document-scan" className={isActive('/document-scan')}>Document Scanner</Link>
          <Link to="/stego-kit" className={isActive('/stego-kit')}>Steganography Kit</Link>
          <Link to="/dashboard" className={isActive('/dashboard')}>Threat Dashboard</Link>
          <Link to="/reports" className={isActive('/reports')}>Reports</Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
