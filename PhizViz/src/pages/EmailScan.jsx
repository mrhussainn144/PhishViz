import { useState } from 'react'

const EmailScan = () => {
  const [emailContent, setEmailContent] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const analyzeEmail = async () => {
    if (!emailContent.trim()) {
      setResult('Please paste email content before analyzing.')
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
        confidence: 95,
        indicators: ['No suspicious links detected', 'Sender domain verified', 'No phishing keywords found']
      }

      setResult(`
        <div class="analysis-result">
          <h3>Analysis Complete</h3>
          <p class="${mockResult.verdict}">Verdict: ${mockResult.verdict.toUpperCase()} (Confidence: ${mockResult.confidence}%)</p>
          <ul>
            ${mockResult.indicators.map(indicator => `<li>${indicator}</li>`).join('')}
          </ul>
        </div>
      `)
    } catch (error) {
      setResult('Error analyzing email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="hero hero--with-bg">
      <div className="hero-visual"></div>
      <div className="hero__content">
        <h1 className="hero__title">Email <span className="accent">Analyzer</span></h1>
        <p className="hero__subtitle">Paste an email and detect phishing signals instantly.</p>
        <div className="form-stack">
          <textarea
            id="emailInput"
            className="input textarea"
            rows="10"
            placeholder="Paste the full email content here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          />
          <div className="form-actions">
            <button 
              id="analyzeBtn" 
              className="btn btn--secondary" 
              type="button"
              onClick={analyzeEmail}
              disabled={isLoading}
            >
              {isLoading ? 'Analyzing...' : 'Analyze Email'}
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

export default EmailScan
