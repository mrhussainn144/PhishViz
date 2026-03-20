import { useState } from 'react'

const StegoKit = () => {
  const [image, setImage] = useState(null)
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
    setResult('')
  }

  const scanImage = async () => {
    if (!image) {
      setResult('Please select an image before scanning.')
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
        confidence: 94,
        indicators: ['No hidden data detected', 'Image metadata is normal', 'No steganographic signatures found']
      }

      setResult(`
        <div class="analysis-result">
          <h3>Scan Complete</h3>
          <p><strong>Image:</strong> ${image.name}</p>
          <p class="${mockResult.verdict}">Verdict: ${mockResult.verdict.toUpperCase()} (Confidence: ${mockResult.confidence}%)</p>
          <ul>
            ${mockResult.indicators.map(indicator => `<li>${indicator}</li>`).join('')}
          </ul>
        </div>
      `)
    } catch (error) {
      setResult('Error scanning image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="hero hero--with-bg">
      <div className="hero-visual"></div>
      <div className="hero__content">
        <h1 className="hero__title">Steganography <span className="accent">Kit</span></h1>
        <p className="hero__subtitle">Upload an image to detect potential hidden data signals.</p>
        <div className="form-stack">
          <input 
            id="imageInput" 
            className="input file-input stego-input" 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="form-actions">
            <button 
              id="analyzeBtn" 
              className="btn btn--secondary" 
              type="button"
              onClick={scanImage}
              disabled={isLoading}
            >
              {isLoading ? 'Scanning...' : 'Scan Image'}
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

export default StegoKit
