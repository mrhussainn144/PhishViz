import { useThreatContext } from '../context/ThreatContext'

const Dashboard = () => {
  const { stats, history } = useThreatContext()

  const getResultClass = (result) => {
    switch (result) {
      case 'safe': return 'safe'
      case 'suspicious': return 'suspicious'
      case 'phishing': return 'phishing'
      default: return ''
    }
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
      <div className="hero__content" style={{ maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
        <h1 className="hero__title">Threat <span className="accent">Dashboard</span></h1>
        <p className="hero__subtitle">Real-time overview of scanning activities and risks.</p>
        
        <div style={{ marginTop: '3rem' }}>
          {stats ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div className="card glass" style={{ textAlign: 'left', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                  Scan Statistics
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Scans</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{stats.totalScans}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Safe Scans</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4caf50' }}>{stats.safeScans}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Suspicious</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffca28' }}>{stats.suspiciousScans}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Phishing</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef5350' }}>{stats.phishingScans}</div>
                  </div>
                </div>
              </div>

              <div className="card glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Current Threat Level</h3>
                <div style={{ 
                  width: '180px', height: '180px', borderRadius: '50%', 
                  background: 'conic-gradient(#4caf50 0% 80%, rgba(255,255,255,0.1) 80% 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(76, 175, 80, 0.2)'
                }}>
                  <div style={{ 
                    width: '150px', height: '150px', borderRadius: '50%', 
                    background: 'var(--bg-secondary)', 
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' 
                  }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#4caf50' }}>{stats.threatLevel}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Risk Factor</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card glass" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--accent-cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <div style={{ color: 'var(--text-muted)' }}>Summoning metrics...</div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div className="card glass" style={{ textAlign: 'left', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Activity Log
                </h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {history.map(item => (
                  <div key={item.id} style={{ 
                    padding: '16px', 
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    transition: 'transform 0.2s, background 0.2s'
                  }} className="history-row">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ 
                          width: '40px', height: '40px', borderRadius: '10px', 
                          background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--text-primary)'
                        }}>
                          {item.type === 'email' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 22 5-5"/><path d="m22 22-5-5"/><path d="m2 4 10 8 10-8"/></svg>}
                          {item.type === 'link' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>}
                          {item.type === 'document' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>}
                          {item.type === 'image' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: 'var(--text-primary)', textTransform: 'capitalize' }}>{item.type} Scan</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.timestamp}</div>
                        </div>
                      </div>
                      <div style={getBadgeStyle(item.result)}>
                        {item.result.toUpperCase()}
                      </div>
                    </div>
                    {item.content && (
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '10px 14px', borderRadius: '8px', wordBreak: 'break-all', whiteSpace: 'pre-wrap' }}>
                        <span style={{fontWeight: '600', color: 'var(--text-secondary)'}}>Input Snapshot:</span> {item.content.length > 200 ? item.content.slice(0, 200) + '...' : item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <style>{`
                .history-row:hover { transform: translateX(5px); background: rgba(255,255,255,0.06) !important; }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Dashboard
