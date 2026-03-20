import { Link } from 'react-router-dom'
import { Link as LinkIcon, Mail, FileText, Lock } from 'lucide-react'

const Home = () => {
  return (
    <section className="hero hero--with-bg">
      <div className="hero-visual"></div>
      <div className="hero__content">
        <h1 className="hero__title">Advanced <span className="accent">Phishing</span> Detection System</h1>
        <p className="hero__subtitle">Detect Phishing Before It Detects You.</p>
        
        <div className="actions container grid-2" style={{ marginTop: '60px' }}>
          <div className="card glass">
            <div className="card__header">Scan a Link</div>
            <div className="card__icon">
              <LinkIcon className="card__art" size={60} />
            </div>
            <h3 className="card__title sr-only">Scan a Link</h3>
            <p className="card__desc">Check URLs against heuristics and known-bad lists.</p>
            <Link to="/link-scan" className="btn btn--info">Check URL</Link>
          </div>

          <div className="card glass">
            <div className="card__header">Analyze an Email</div>
            <div className="card__icon">
              <Mail className="card__art" size={60} />
            </div>
            <h3 className="card__title sr-only">Analyze an Email</h3>
            <p className="card__desc">Run our ML model to classify emails safely.</p>
            <Link to="/email-scan" className="btn btn--success">Upload Email</Link>
          </div>

          <div className="card glass">
            <div className="card__header">Scan a Document</div>
            <div className="card__icon">
              <FileText className="card__art" size={60} />
            </div>
            <h3 className="card__title sr-only">Scan a Document</h3>
            <p className="card__desc">Detect macros, embedded links and hidden threats.</p>
            <Link to="/document-scan" className="btn btn--success">Upload File</Link>
          </div>

          <div className="card glass">
            <div className="card__header">Steganography Kit</div>
            <div className="card__icon">
              <Lock className="card__art" size={60} />
            </div>
            <h3 className="card__title sr-only">Steganography Kit</h3>
            <p className="card__desc">Detect hidden data and signals in images.</p>
            <Link to="/stego-kit" className="btn btn--info">Scan Image</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
