import { useState } from 'react'

const LinkScan = () => {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const scanLink = async () => {
    if (!url.trim()) {
      setResult('Please enter a URL before scanning.')
      return
    }

    setIsLoading(true)
    setResult('')

    try {
      // Simulate API call - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock result - replace with actual API response
      const mockResult = {
        verdict: 'safe',
        confidence: 92,
        indicators: ['Domain is legitimate', 'No suspicious redirects', 'SSL certificate valid']
      }

      setResult(`
        <div class="analysis-result">
          <h3>Scan Complete</h3>
          <p class="${mockResult.verdict}">Verdict: ${mockResult.verdict.toUpperCase()} (Confidence: ${mockResult.confidence}%)</p>
          <ul>
            ${mockResult.indicators.map(indicator => `<li>${indicator}</li>`).join('')}
          </ul>
        </div>
      `)
    } catch (error) {
      setResult('Error scanning link. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="hero hero--with-bg">
      <div className="hero-visual"></div>
      <div className="hero__content">
        <h1 className="hero__title">Link <span className="accent">Detector</span></h1>
        <p className="hero__subtitle">Check a URL for phishing indicators and risk.</p>
        <div className="form-stack">
          <textarea
            id="urlInput"
            className="input textarea textarea--no-resize url-input"
            rows="1"
            placeholder="Paste a URL (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="form-actions">
            <button 
              id="analyzeBtn" 
              className="btn btn--info" 
              type="button"
              onClick={scanLink}
              disabled={isLoading}
            >
              {isLoading ? 'Scanning...' : 'Scan Link'}
            </button>
          </div>
          {result && (
            <div 
              id="result" 
              className="result-box"
              dangerouslySetInnerHTML={{ __html: result }}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default LinkScan
