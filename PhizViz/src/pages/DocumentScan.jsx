import { useState } from 'react'

const DocumentScan = () => {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setResult('')
  }

  const scanDocument = async () => {
    if (!file) {
      setResult('Please select a file before scanning.')
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
        confidence: 88,
        indicators: ['No malicious macros found', 'No suspicious embedded links', 'File structure is normal']
      }

      setResult(`
        <div class="analysis-result">
          <h3>Scan Complete</h3>
          <p><strong>File:</strong> ${file.name}</p>
          <p class="${mockResult.verdict}">Verdict: ${mockResult.verdict.toUpperCase()} (Confidence: ${mockResult.confidence}%)</p>
          <ul>
            ${mockResult.indicators.map(indicator => `<li>${indicator}</li>`).join('')}
          </ul>
        </div>
      `)
    } catch (error) {
      setResult('Error scanning document. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="hero hero--with-bg">
      <div className="hero-visual"></div>
      <div className="hero__content">
        <h1 className="hero__title">Document <span className="accent">Scanner</span></h1>
        <p className="hero__subtitle">Upload a file to detect macros, embedded links, and anomalies.</p>
        <div className="form-stack">
          <input 
            id="fileInput" 
            className="input file-input doc-input" 
            type="file" 
            onChange={handleFileChange}
          />
          <div className="form-actions">
            <button 
              id="analyzeBtn" 
              className="btn btn--success" 
              type="button"
              onClick={scanDocument}
              disabled={isLoading}
            >
              {isLoading ? 'Scanning...' : 'Scan Document'}
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

export default DocumentScan
