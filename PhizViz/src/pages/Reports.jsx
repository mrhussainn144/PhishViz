import { useState, useEffect } from 'react'

const Reports = () => {
  const [reports, setReports] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load initial reports
    loadReports()
  }, [])

  const loadReports = async () => {
    setIsLoading(true)
    try {
      // Simulate API call - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data - replace with actual API response
      const mockReports = [
        {
          id: 1,
          type: 'email',
          result: 'safe',
          confidence: 95,
          timestamp: '2024-01-15 14:30:22',
          details: 'Email from verified domain, no suspicious links detected'
        },
        {
          id: 2,
          type: 'link',
          result: 'suspicious',
          confidence: 78,
          timestamp: '2024-01-15 13:45:10',
          details: 'URL contains suspicious redirect patterns'
        },
        {
          id: 3,
          type: 'document',
          result: 'safe',
          confidence: 92,
          timestamp: '2024-01-15 12:20:45',
          details: 'No malicious macros found, document structure normal'
        },
        {
          id: 4,
          type: 'image',
          result: 'safe',
          confidence: 88,
          timestamp: '2024-01-15 11:15:33',
          details: 'No steganographic signatures detected'
        },
        {
          id: 5,
          type: 'link',
          result: 'phishing',
          confidence: 98,
          timestamp: '2024-01-15 10:30:15',
          details: 'Known phishing domain detected, multiple threat indicators'
        }
      ]

      setReports(mockReports)
    } catch (error) {
      console.error('Error loading reports:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadJSON = () => {
    const dataStr = JSON.stringify(reports, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `phizviz-reports-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const getResultClass = (result) => {
    switch (result) {
      case 'safe': return 'safe'
      case 'suspicious': return 'suspicious'
      case 'phishing': return 'phishing'
      default: return ''
    }
  }

  return (
    <section className="hero hero--with-bg">
      <div className="hero-visual"></div>
      <div className="hero__content">
        <h1 className="hero__title">Scan <span className="accent">Reports</span></h1>
        <p className="hero__subtitle">Export recent scan results for review.</p>
        <div className="form-stack">
          <div className="form-actions">
            <button 
              id="refreshBtn" 
              className="btn btn--secondary" 
              type="button"
              onClick={loadReports}
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button 
              id="downloadBtn" 
              className="btn btn--info" 
              type="button"
              onClick={downloadJSON}
              disabled={reports.length === 0}
            >
              Download JSON
            </button>
          </div>
          <div id="reportsContent">
            {isLoading ? (
              <div className="card glass">
                <div className="card__header">Loading Reports...</div>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p>Loading reports data...</p>
                </div>
              </div>
            ) : reports.length > 0 ? (
              <div className="card glass">
                <div className="card__header">Recent Scan Reports</div>
                <div className="card__desc">
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {reports.map(report => (
                      <div key={report.id} style={{ 
                        padding: '15px', 
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        marginBottom: '10px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.02)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <strong>{report.type.toUpperCase()}</strong>
                          <span className={getResultClass(report.result)}>
                            {report.result.toUpperCase()} ({report.confidence}%)
                          </span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'rgba(226, 232, 255, 0.7)', marginBottom: '5px' }}>
                          {report.timestamp}
                        </div>
                        <div style={{ fontSize: '0.95rem' }}>
                          {report.details}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card glass">
                <div className="card__header">No Reports Available</div>
                <div className="card__desc">
                  <p>No scan reports found. Start scanning to generate reports.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Reports
