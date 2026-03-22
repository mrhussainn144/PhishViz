import { useState, useRef } from 'react'
import { useThreatContext } from '../context/ThreatContext'
import './ScannerLayout.css'

const StegoKit = () => {
  const { addScanResult } = useThreatContext()
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
      setResult(null)
    }
  }

  const scanImage = async () => {
    if (!image) return

    setIsLoading(true)
    setResult(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResult = {
        verdict: 'safe',
        confidence: 94,
        indicators: [
          { text: 'No hidden data detected', type: 'positive' },
          { text: 'Image metadata is normal', type: 'positive' },
          { text: 'No steganographic signatures found', type: 'positive' }
        ]
      }
      setResult(mockResult)
      addScanResult('image', mockResult, image.name)
    } catch (error) {
      console.error('Error scanning image', error)
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

  const UploadImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', color: 'var(--accent-pink)' }}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  )

  return (
    <section className="hero hero--with-bg">
      <div className="hero-visual"></div>
      <div className="hero__content" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 1rem' }}>
        <h1 className="hero__title">Steganography <span className="accent">Kit</span></h1>
        <p className="hero__subtitle">Upload an image to detect potential hidden data signals.</p>
        
        <div className="scanner-layout">
          {/* Left Column - Input area */}
          <div className="scanner-left-col">
            <div className="scanner-input-wrapper" style={{ minHeight: '300px' }}>
              
              <div 
                className="scanner-textarea" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '2px dashed var(--glass-border)',
                  paddingBottom: '5rem',
                  position: 'relative',
                  minHeight: '300px',
                  textAlign: 'center',
                  backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: imagePreview ? 'rgba(0,0,0,0.8)' : 'rgba(10, 14, 39, 0.4)'
                }}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                {!imagePreview && (
                  <>
                    <UploadImageIcon />
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Click to Upload Image</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Supports PNG, JPG, JPEG</p>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />

                <div className="scanner-actions" style={{ position: 'absolute', bottom: '1.5rem', left: '0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <button 
                    id="analyzeBtn" 
                    className="btn btn--secondary" 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); scanImage(); }}
                    disabled={isLoading || !image}
                    style={{ opacity: (!image || isLoading) ? 0.7 : 1 }}
                  >
                    <ShieldIcon />
                    {isLoading ? 'Scanning...' : 'Scan Image'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results area */}
          <div className="scanner-right-col">
            <div className="card glass scanner-state-card" style={{ width: '100%', minHeight: '350px' }}>
              
              {!isLoading && !result && (
                <div className="scanner-empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="scanner-empty-icon">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <h3 className="scanner-empty-title">Waiting for Image</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Upload an image to scan for covert channels.</p>
                  
                  <ul className="scanner-empty-list" style={{ marginTop: '1rem' }}>
                    <li className="scanner-empty-item">
                      <ShieldIcon /> LSB (Least Significant Bit) Analysis
                    </li>
                    <li className="scanner-empty-item">
                      <ShieldIcon /> Metadata Anomalies
                    </li>
                    <li className="scanner-empty-item">
                      <ShieldIcon /> Structural & Trailing Data Checks
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
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                  <div className="loading-text">PIXEL ANALYSIS...</div>
                </div>
              )}

              {!isLoading && result && (
                <div className="scanner-result-state" style={{ width: '100%' }}>
                  <div className="result-header" style={{ paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className={`verdict-badge ${result.verdict}`}>
                      {result.verdict === 'safe' ? <CheckIcon /> : <AlertIcon />}
                      VERDICT: {result.verdict}
                    </div>
                    
                    <div className="confidence-meter" style={{ marginTop: '1rem' }}>
                      <span className="confidence-score">{result.confidence}%</span>
                      <span className="confidence-label">Safety Score</span>
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

export default StegoKit
