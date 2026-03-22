import { useState, useRef } from 'react'
import { useThreatContext } from '../context/ThreatContext'
import './ScannerLayout.css'

const DocumentScan = () => {
  const { addScanResult } = useThreatContext()
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResult(null)
    }
  }

  const scanDocument = async () => {
    if (!file) return

    setIsLoading(true)
    setResult(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResult = {
        verdict: 'safe',
        confidence: 88,
        indicators: [
          { text: 'No malicious macros found', type: 'positive' },
          { text: 'No suspicious embedded links', type: 'positive' },
          { text: 'File structure is normal', type: 'positive' }
        ]
      }
      setResult(mockResult)
      addScanResult('document', mockResult, file.name)
    } catch (error) {
      console.error('Error scanning document', error)
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

  const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  )

  const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
      <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
  )

  return (
    <section className="hero hero--with-bg">
      <div className="hero-visual"></div>
      <div className="hero__content" style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 1rem' }}>
        <h1 className="hero__title">Document <span className="accent">Scanner</span></h1>
        <p className="hero__subtitle">Upload a file to detect macros, embedded links, and anomalies.</p>
        
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
                  textAlign: 'center'
                }}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                {!file ? (
                  <>
                    <UploadIcon />
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Click to Upload Document</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Supports PDF, DOCX, XLSX, etc.</p>
                  </>
                ) : (
                  <>
                    <FileIcon />
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)', wordBreak: 'break-all' }}>{file.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ready to scan</p>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />

                <div className="scanner-actions" style={{ position: 'absolute', bottom: '1.5rem', left: '0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <button 
                    id="analyzeBtn" 
                    className="btn btn--success" 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); scanDocument(); }}
                    disabled={isLoading || !file}
                    style={{ opacity: (!file || isLoading) ? 0.7 : 1 }}
                  >
                    <ShieldIcon />
                    {isLoading ? 'Scanning...' : 'Scan Document'}
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
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <h3 className="scanner-empty-title">Waiting for File</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Upload a document to extract hidden threats.</p>
                  
                  <ul className="scanner-empty-list" style={{ marginTop: '1rem' }}>
                    <li className="scanner-empty-item">
                      <ShieldIcon /> Malicious Macro Detection
                    </li>
                    <li className="scanner-empty-item">
                      <ShieldIcon /> Embedded Link Extraction
                    </li>
                    <li className="scanner-empty-item">
                      <ShieldIcon /> Structural Anomaly Checks
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
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                  <div className="loading-text">EXTRACTING METADATA...</div>
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

export default DocumentScan
