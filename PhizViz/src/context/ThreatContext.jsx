import React, { createContext, useContext, useState, useEffect } from 'react';

const ThreatContext = createContext();

export const useThreatContext = () => {
  const context = useContext(ThreatContext);
  if (!context) {
    throw new Error('useThreatContext must be used within a ThreatProvider');
  }
  return context;
};

export const ThreatProvider = ({ children }) => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('phizviz_stats');
    if (saved) return JSON.parse(saved);
    return {
      totalScans: 1247,
      safeScans: 1098,
      suspiciousScans: 89,
      phishingScans: 60,
      threatLevel: 'Low'
    };
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('phizviz_history');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, type: 'email', result: 'safe', timestamp: new Date(Date.now() - 60000).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' }) },
      { id: 2, type: 'link', result: 'suspicious', timestamp: new Date(Date.now() - 3600000).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' }) },
      { id: 3, type: 'document', result: 'safe', timestamp: new Date(Date.now() - 7200000).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' }) },
      { id: 4, type: 'image', result: 'safe', timestamp: new Date(Date.now() - 10800000).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' }) },
      { id: 5, type: 'link', result: 'phishing', timestamp: new Date(Date.now() - 14400000).toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' }) }
    ];
  });

  useEffect(() => {
    localStorage.setItem('phizviz_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('phizviz_history', JSON.stringify(history));
  }, [history]);

  const addScanResult = (type, resultPayload, content = null) => {
    const result = resultPayload.verdict; // 'safe', 'suspicious', 'phishing'

    const newEntry = {
      id: Date.now(),
      type,
      result,
      timestamp: new Date().toLocaleString([], { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' }),
      details: resultPayload,
      content: content
    };
    
    setHistory(prev => [newEntry, ...prev].slice(0, 50)); 

    setStats(prev => {
      const isSafe = result === 'safe';
      const isSuspicious = result === 'suspicious';
      const isPhishing = result === 'phishing';

      const newStats = {
        ...prev,
        totalScans: prev.totalScans + 1,
        safeScans: isSafe ? prev.safeScans + 1 : prev.safeScans,
        suspiciousScans: isSuspicious ? prev.suspiciousScans + 1 : prev.suspiciousScans,
        phishingScans: isPhishing ? prev.phishingScans + 1 : prev.phishingScans,
      };

      const threatRatio = (newStats.phishingScans + (newStats.suspiciousScans * 0.5)) / Math.max(newStats.totalScans, 1);
      if (threatRatio > 0.08) newStats.threatLevel = 'Critical';
      else if (threatRatio > 0.04) newStats.threatLevel = 'Elevated';
      else newStats.threatLevel = 'Low';

      return newStats;
    });
  };

  return (
    <ThreatContext.Provider value={{ stats, history, addScanResult }}>
      {children}
    </ThreatContext.Provider>
  );
};
