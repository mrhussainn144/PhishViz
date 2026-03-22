import { Link } from 'react-router-dom'
import { Link as LinkIcon, Mail, FileText, Lock, Shield, Activity, Eye, Zap } from 'lucide-react'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      {/* Background Orbs Effect */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Dynamic Hero Section */}
        <section className="hero-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '30px', marginBottom: '2rem', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
            <Zap size={14} fill="currentColor" /> Intelligence Platform Version 3.0
          </div>
          
          <h1 className="hero-title-modern">
            Detect Phishing <br />
            <span className="text-gradient">Before It Detects You.</span>
          </h1>
          
          <p className="hero-subtitle-modern">
            Harness the power of AI to analyze emails, URLs, and files instantly. Ensure enterprise-grade security against zero-day social engineering and covert threat channels.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/email-scan" className="btn btn--primary" style={{ padding: '14px 32px', fontSize: '1.1rem', borderRadius: '12px' }}>
              Start Scanning Now
            </Link>
            <Link to="/reports" className="btn btn--secondary" style={{ padding: '14px 32px', fontSize: '1.1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
              View Threat Reports
            </Link>
          </div>

          <div className="trust-banner">
            <div className="trust-item">
              <span className="trust-number">2.4M+</span>
              <span className="trust-label">Threats Blocked</span>
            </div>
            <div className="trust-item">
              <span className="trust-number">99.9%</span>
              <span className="trust-label">AI Accuracy</span>
            </div>
            <div className="trust-item">
              <span className="trust-number">&lt;2s</span>
              <span className="trust-label">Avg. Scan Time</span>
            </div>
          </div>
        </section>

        {/* Action Feature Cards Grid */}
        <section className="features-grid">
          
          {/* Link Scanner */}
          <div className="feature-card">
            <div className="feature-title" style={{ color: 'var(--accent-cyan)' }}>Link Scanner</div>
            <div className="icon-wrapper cyan-glow">
              <LinkIcon size={40} color="var(--accent-cyan)" />
            </div>
            <p className="feature-desc">Instantly evaluate URLs against advanced heuristics, redirect tracing logic, and global known-bad threat intelligence databases.</p>
            <div style={{ marginTop: 'auto' }}>
              <Link to="/link-scan" className="btn btn--info" style={{ width: '100%', borderRadius: '12px' }}>Analyze URL</Link>
            </div>
          </div>

          {/* Email Analyzer */}
          <div className="feature-card">
            <div className="feature-title" style={{ color: 'var(--accent-pink)' }}>Email Analyzer</div>
            <div className="icon-wrapper pink-glow">
              <Mail size={40} color="var(--accent-pink)" />
            </div>
            <p className="feature-desc">Run our deep NLP intelligence model to safely parse raw email content, flagging psychological manipulation and spoofing attempts.</p>
            <div style={{ marginTop: 'auto' }}>
              <Link to="/email-scan" className="btn btn--secondary" style={{ width: '100%', borderRadius: '12px' }}>Upload Email</Link>
            </div>
          </div>

          {/* Document Scanner */}
          <div className="feature-card">
            <div className="feature-title" style={{ color: '#4caf50' }}>Document Scanner</div>
            <div className="icon-wrapper green-glow">
              <FileText size={40} color="#4caf50" />
            </div>
            <p className="feature-desc">Deep-scan attachments for malicious macros, embedded tracking infrastructure, and structural file anomalies before opening.</p>
            <div style={{ marginTop: 'auto' }}>
              <Link to="/document-scan" className="btn btn--success" style={{ width: '100%', borderRadius: '12px' }}>Scan Document</Link>
            </div>
          </div>

          {/* Steganography Kit */}
          <div className="feature-card">
            <div className="feature-title" style={{ color: '#a78bfa' }}>Stego Kit</div>
            <div className="icon-wrapper purple-glow">
              <Lock size={40} color="#a78bfa" />
            </div>
            <p className="feature-desc">Utilize pixel-level analysis to detect covert communication channels, LSB manipulation, and hidden payloads inside images.</p>
            <div style={{ marginTop: 'auto' }}>
              <Link to="/stego-kit" className="btn btn--primary" style={{ width: '100%', borderRadius: '12px' }}>Analyze Image</Link>
            </div>
          </div>

        </section>
      </div>
    </div>
  )
}

export default Home
