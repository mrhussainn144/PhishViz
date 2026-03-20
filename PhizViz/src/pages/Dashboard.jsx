import { useState, useEffect } from 'react'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    // Load dashboard data
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Simulate API call - replace with actual backend call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data - replace with actual API response
      const mockStats = {
        totalScans: 1247,
        safeScans: 1098,
        suspiciousScans: 89,
        phishingScans: 60,
        threatLevel: 'Low'
      }

      const mockHistory = [
        { id: 1, type: 'email', result: 'safe', timestamp: '2024-01-15 14:30' },
        { id: 2, type: 'link', result: 'suspicious', timestamp: '2024-01-15 13:45' },
        { id: 3, type: 'document', result: 'safe', timestamp: '2024-01-15 12:20' },
        { id: 4, type: 'image', result: 'safe', timestamp: '2024-01-15 11:15' },
        { id: 5, type: 'link', result: 'phishing', timestamp: '2024-01-15 10:30' }
      ]

      setStats(mockStats)
      setHistory(mockHistory)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    }
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
        <h1 className="hero__title">Threat <span className="accent">Dashboard</span></h1>
        <p className="hero__subtitle">Recent scans and overall risk trends.</p>
        <div className="form-stack">
          <div id="dashboardStats">
            {stats ? (
              <div className="grid-2" style={{ marginBottom: '30px' }}>
                <div className="card glass">
                  <div className="card__header">Scan Statistics</div>
                  <div className="card__desc">
                    <p><strong>Total Scans:</strong> {stats.totalScans}</p>
                    <p><strong>Safe:</strong> <span className="safe">{stats.safeScans}</span></p>
                    <p><strong>Suspicious:</strong> <span className="suspicious">{stats.suspiciousScans}</span></p>
                    <p><strong>Phishing:</strong> <span className="phishing">{stats.phishingScans}</span></p>
                  </div>
                </div>
                <div className="card glass">
                  <div className="card__header">Threat Level</div>
                  <div className="card__desc">
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>
                      {stats.threatLevel}
                    </p>
                    <p style={{ textAlign: 'center', marginTop: '10px' }}>
                      Overall system risk assessment
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card glass">
                <div className="card__header">Loading Statistics...</div>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p>Loading dashboard data...</p>
                </div>
              </div>
            )}
          </div>
          
          <div id="dashboardHistory">
            {history.length > 0 && (
              <div className="card glass">
                <div className="card__header">Recent Scan History</div>
                <div className="card__desc">
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {history.map(item => (
                      <div key={item.id} style={{ 
                        padding: '10px', 
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <strong>{item.type.toUpperCase()}</strong> - {item.timestamp}
                        </div>
                        <span className={getResultClass(item.result)}>
                          {item.result.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
