import { useState } from 'react'
import { useThreatContext } from '../context/ThreatContext'
import './ScannerLayout.css'

const EmailScan = () => {
  const { addScanResult } = useThreatContext()
  const [emailContent, setEmailContent] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const analyzeEmail = async () => {
    if (!emailContent.trim()) {
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      // Simulate API call - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock result - replace with actual API response
      const mockResult = {
        verdict: 'safe',
        confidence: 95,
        indicators: [
          { text: 'No suspicious links detected', type: 'positive' },
          { text: 'Sender domain verified', type: 'positive' },
          { text: 'No phishing keywords found', type: 'positive' }
        ]
      }

      setResult(mockResult)
      addScanResult('email', mockResult, emailContent)
    } catch (error) {
      console.error('Error analyzing email', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Icons
  const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="indicator-icon">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  )

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="indicator-icon">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )

  const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffca28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="indicator-icon">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  )

  return (
    <section className="hero hero--with-bg">
      <div className="hero-visual"></div>
      <div className="hero__content" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 1rem' }}>
        <h1 className="hero__title">Email <span className="accent">Analyzer</span></h1>
        <p className="hero__subtitle">Paste an email and detect phishing signals instantly with AI precision.</p>
        
        <div className="scanner-layout">
          {/* Left Column - Input area */}
          <div className="scanner-left-col">
            <div className="scanner-input-wrapper">
              <textarea
                id="emailInput"
                className="scanner-textarea"
                placeholder="Paste the full email headers and content here..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
              <div className="scanner-actions" style={{ display: 'flex', justifyContent: 'center' }}>
                <button 
                  id="analyzeBtn" 
                  className="btn btn--primary" 
                  type="button"
                  onClick={analyzeEmail}
                  disabled={isLoading || !emailContent.trim()}
                  style={{ opacity: (!emailContent.trim() || isLoading) ? 0.7 : 1 }}
                >
                  <ShieldIcon />
                  {isLoading ? 'Analyzing...' : 'Analyze Email'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Results area */}
          <div className="scanner-right-col">
            <div className="card glass scanner-state-card" style={{ width: '100%' }}>
              
              {!isLoading && !result && (
                <div className="scanner-empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="scanner-empty-icon">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"></path>
                  </svg>
                  <h3 className="scanner-empty-title">Waiting for Content</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Paste an email to reveal hidden threats.</p>
                  
                  <ul className="scanner-empty-list">
                    <li className="scanner-empty-item">
                      <ShieldIcon /> AI-Powered Heuristics
                    </li>
                    <li className="scanner-empty-item">
                      <ShieldIcon /> Link & Domain Assessment
                    </li>
                    <li className="scanner-empty-item">
                      <ShieldIcon /> Urgency & Tone Analysis
                    </li>
                  </ul>
                </div>
              )}

              {isLoading && (
                <div className="scanner-loading-state">
                  <div className="scanner-loader">
                    <div className="pulse-ring"></div>
                    <div className="pulse-ring"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="loader-icon">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className="loading-text">DECODING SIGNALS...</div>
                </div>
              )}

              {!isLoading && result && (
                <div className="scanner-result-state" style={{ width: '100%' }}>
                  <div className="result-header">
                    <div className={`verdict-badge ${result.verdict}`}>
                      {result.verdict === 'safe' ? <CheckIcon /> : <AlertIcon />}
                      VERDICT: {result.verdict}
                    </div>
                    
                    <div className="confidence-meter" style={{ marginTop: '1rem' }}>
                      <span className="confidence-score">{result.confidence}%</span>
                      <span className="confidence-label">Confidence Score</span>
                    </div>
                  </div>

                  <div className="result-indicators">
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                      <ShieldIcon /> Analysis Break-down
                    </h4>
                    <div className="indicators-list">
                      {result.indicators.map((indicator, idx) => (
                        <div key={idx} className="indicator-item">
                          {indicator.type === 'positive' ? <CheckIcon /> : <AlertIcon />}
                          <span className="indicator-text">{indicator.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default EmailScan
