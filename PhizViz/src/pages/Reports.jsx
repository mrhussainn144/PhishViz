import { useState } from 'react'
import { useThreatContext } from '../context/ThreatContext'

const Reports = () => {
  const { history } = useThreatContext()
  const [isLoading, setIsLoading] = useState(false)

  // Map history to the format Reports expects
  const displayReports = history.map(item => ({
    id: item.id,
    type: item.type,
    result: item.result,
    confidence: item.details?.confidence || (item.result === 'safe' ? 99 : item.result === 'suspicious' ? 60 : 15),
    timestamp: item.timestamp,
    details: item.details?.indicators ? item.details.indicators.map(i => i.text).join(', ') : 'Generated system log entry'
  }))

  const loadReports = async () => {
    setIsLoading(true)
    // Simulate a brief refresh action for UX
    await new Promise(resolve => setTimeout(resolve, 800))
    setIsLoading(false)
  }

  const downloadJSON = () => {
    const dataStr = JSON.stringify(displayReports, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `phizviz-reports-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const getBadgeStyle = (result) => {
    switch(result) {
      case 'safe': return { background: 'rgba(76, 175, 80, 0.15)', color: '#4caf50', border: '1px solid rgba(76, 175, 80, 0.3)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }
      case 'suspicious': return { background: 'rgba(255, 202, 40, 0.15)', color: '#ffca28', border: '1px solid rgba(255, 202, 40, 0.3)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }
      case 'phishing': return { background: 'rgba(239, 83, 80, 0.15)', color: '#ef5350', border: '1px solid rgba(239, 83, 80, 0.3)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }
      default: return {}
    }
  }

  return (
    <section className="hero hero--with-bg">
      <div className="hero-visual"></div>
      <div className="hero__content" style={{ maxWidth: '1000px', width: '100%', margin: '0 auto', padding: '0 1rem' }}>
        <h1 className="hero__title">Scan <span className="accent">Reports</span></h1>
        <p className="hero__subtitle">Export recent scan results for review and analysis.</p>
        
        <div style={{ marginTop: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              id="refreshBtn" 
              className="btn btn--secondary" 
              type="button"
              onClick={loadReports}
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }}>
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/>
              </svg>
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
            <button 
              id="downloadBtn" 
              className="btn btn--info" 
              type="button"
              onClick={downloadJSON}
              disabled={displayReports.length === 0}
              style={{ opacity: displayReports.length === 0 ? 0.7 : 1 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Export JSON
            </button>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>

          <div id="reportsContent">
            {isLoading && displayReports.length === 0 ? (
              <div className="card glass" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  <div style={{ color: 'var(--text-muted)' }}>Fetching reports...</div>
                </div>
              </div>
            ) : displayReports.length > 0 ? (
              <div className="card glass" style={{ textAlign: 'left', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  Detailed Activity Log
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '1rem' }}>
                  {displayReports.map(report => (
                    <div key={report.id} style={{ 
                      padding: '1.5rem', 
                      borderRadius: '16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      transition: 'transform 0.2s, background 0.2s, box-shadow 0.2s'
                    }} className="report-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontWeight: '600', color: 'var(--text-primary)', textTransform: 'capitalize', fontSize: '1.1rem' }}>
                            {report.type} Check
                          </span>
                          <span style={getBadgeStyle(report.result)}>
                            {report.result.toUpperCase()} • {report.confidence}%
                          </span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '4px 10px', borderRadius: '12px' }}>
                          {report.timestamp}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        {report.details}
                      </div>
                    </div>
                  ))}
                </div>
                <style>{`
                  .report-card:hover { transform: translateY(-3px); background: rgba(255,255,255,0.06) !important; box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
                  /* Custom Scrollbar */
                  div::-webkit-scrollbar { width: 6px; }
                  div::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); border-radius: 4px; }
                  div::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
                  div::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
                `}</style>
              </div>
            ) : (
              <div className="card glass" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, color: 'var(--text-muted)' }}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="9" x2="15" y1="9" y2="9"/><line x1="9" x2="15" y1="15" y2="15"/></svg>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No scan reports found. Start scanning to generate data.</p>
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
