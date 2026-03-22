// Single Page Application JavaScript - Scroll Based
class PhishVizSPA {
  constructor() {
    this.currentSection = 'home';
    this.sections = ['home', 'email-analyzer', 'link-detector', 'document-scanner', 'stego-kit', 'dashboard', 'reports'];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollObserver();
    this.updateActiveSection();
    // Initialize dashboard and reports if needed
    this.initializeSectionContent('dashboard');
    this.initializeSectionContent('reports');
  }

  setupEventListeners() {
    // Navigation clicks - smooth scroll to section
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
      });
    });

    // Button clicks in cards - smooth scroll to section
    document.querySelectorAll('.card .nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
      });
    });

    // Setup form handlers
    this.setupFormHandlers();
  }

  setupScrollObserver() {
    // Use Intersection Observer to detect which section is in view
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Top 20% and bottom 70% are considered out of view
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observe all sections
    this.sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Account for fixed navbar
      const sectionTop = section.offsetTop - offset;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  }

  updateActiveSection(sectionId = null) {
    if (sectionId) {
      this.currentSection = sectionId;
    } else {
      // Determine current section based on scroll position
      const scrollPosition = window.scrollY + 150; // Offset for navbar
      
      for (let i = this.sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(this.sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          this.currentSection = this.sections[i];
          break;
        }
      }
    }

    // Update navigation active states
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${this.currentSection}`) {
        link.classList.add('active');
      }
    });

    // Update section visual states
    this.sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        if (sectionId === this.currentSection) {
          section.classList.add('section-active');
          section.classList.remove('section-hidden');
        } else {
          section.classList.remove('section-active');
          section.classList.add('section-hidden');
        }
      }
    });
  }

  setupFormHandlers() {
    // Email Analyzer
    const emailBtn = document.getElementById('analyzeEmailBtn');
    if (emailBtn) {
      emailBtn.addEventListener('click', () => this.analyzeEmail());
    }

    // Link Detector
    const linkBtn = document.getElementById('analyzeLinkBtn');
    if (linkBtn) {
      linkBtn.addEventListener('click', () => this.analyzeLink());
    }

    // Document Scanner
    const docBtn = document.getElementById('analyzeDocumentBtn');
    if (docBtn) {
      docBtn.addEventListener('click', () => this.analyzeDocument());
    }

    // Steganography Kit
    const stegoBtn = document.getElementById('analyzeStegoBtn');
    if (stegoBtn) {
      stegoBtn.addEventListener('click', () => this.analyzeStego());
    }

    // Reports
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.refreshReports());
    }

    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => this.downloadReports());
    }
  }

  initializeSectionContent(sectionId) {
    switch(sectionId) {
      case 'dashboard':
        this.loadDashboard();
        break;
      case 'reports':
        this.loadReports();
        break;
    }
  }

  async analyzeEmail() {
    const input = document.getElementById('emailInput');
    const result = document.getElementById('emailResult');
    
    if (!input.value.trim()) {
      result.innerHTML = '<div class="error">Please enter email content</div>';
      return;
    }

    result.innerHTML = '<div class="scanner-loader"><div class="scanner-ring"></div><div class="scanner-text">Analyzing...</div></div>';

    try {
      const response = await fetch('/api/analyze/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input.value })
      });

      const data = await response.json();
      this.displayResult('emailResult', data);
    } catch (error) {
      result.innerHTML = '<div class="error">Analysis failed. Please try again.</div>';
    }
  }

  async analyzeLink() {
    const input = document.getElementById('urlInput');
    const result = document.getElementById('linkResult');
    
    if (!input.value.trim()) {
      result.innerHTML = '<div class="error">Please enter a URL</div>';
      return;
    }

    result.innerHTML = '<div class="scanner-loader"><div class="scanner-ring"></div><div class="scanner-text">Scanning...</div></div>';

    try {
      const response = await fetch('/api/analyze/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: input.value })
      });

      const data = await response.json();
      this.displayResult('linkResult', data);
    } catch (error) {
      result.innerHTML = '<div class="error">Scan failed. Please try again.</div>';
    }
  }

  async analyzeDocument() {
    const input = document.getElementById('fileInput');
    const result = document.getElementById('documentResult');
    
    if (!input.files[0]) {
      result.innerHTML = '<div class="error">Please select a file</div>';
      return;
    }

    result.innerHTML = '<div class="scanner-loader"><div class="scanner-ring"></div><div class="scanner-text">Scanning...</div></div>';

    const formData = new FormData();
    formData.append('file', input.files[0]);

    try {
      const response = await fetch('/api/analyze/document', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      this.displayResult('documentResult', data);
    } catch (error) {
      result.innerHTML = '<div class="error">Scan failed. Please try again.</div>';
    }
  }

  async analyzeStego() {
    const input = document.getElementById('imageInput');
    const result = document.getElementById('stegoResult');
    
    if (!input.files[0]) {
      result.innerHTML = '<div class="error">Please select an image</div>';
      return;
    }

    result.innerHTML = '<div class="scanner-loader"><div class="scanner-ring"></div><div class="scanner-text">Analyzing...</div></div>';

    const formData = new FormData();
    formData.append('image', input.files[0]);

    try {
      const response = await fetch('/api/analyze/stego', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      this.displayResult('stegoResult', data);
    } catch (error) {
      result.innerHTML = '<div class="error">Analysis failed. Please try again.</div>';
    }
  }

  displayResult(elementId, data) {
    const result = document.getElementById(elementId);
    const verdictClass = data.verdict === 'safe' ? 'safe' : data.verdict === 'phishing' ? 'phishing' : 'suspicious';
    
    result.innerHTML = `
      <div class="result-header">
        <h3 class="verdict ${verdictClass}">Verdict: ${data.verdict.toUpperCase()}</h3>
        <p>Confidence: ${data.confidence}%</p>
      </div>
      <div class="result-details">
        ${data.details ? `<p>${data.details}</p>` : ''}
        ${data.risk_score ? `<p>Risk Score: ${data.risk_score}</p>` : ''}
      </div>
    `;
  }

  async loadDashboard() {
    const stats = document.getElementById('dashboardStats');
    const history = document.getElementById('dashboardHistory');

    if (!stats || !history) return;

    try {
      const response = await fetch('/api/dashboard');
      const data = await response.json();

      stats.innerHTML = `
        <div class="stats-grid">
          <div class="stat-card">
            <h4>Total Scans</h4>
            <p>${data.total_scans || 0}</p>
          </div>
          <div class="stat-card">
            <h4>Threats Detected</h4>
            <p>${data.threats_detected || 0}</p>
          </div>
        </div>
      `;

      history.innerHTML = `
        <h4>Recent Activity</h4>
        <div class="activity-list">
          ${data.recent_scans ? data.recent_scans.map(scan => 
            `<div class="activity-item">${scan.type} - ${scan.verdict}</div>`
          ).join('') : '<p>No recent activity</p>'}
        </div>
      `;
    } catch (error) {
      stats.innerHTML = '<p>Unable to load dashboard data</p>';
      history.innerHTML = '<p>Unable to load activity data</p>';
    }
  }

  async loadReports() {
    const content = document.getElementById('reportsContent');
    if (!content) return;
    
    try {
      const response = await fetch('/api/reports');
      const data = await response.json();

      content.innerHTML = `
        <h4>Scan Reports</h4>
        <div class="reports-list">
          ${data.reports ? data.reports.map(report => 
            `<div class="report-item">
              <strong>${report.type}</strong> - ${report.date} - ${report.verdict}
            </div>`
          ).join('') : '<p>No reports available</p>'}
        </div>
      `;
    } catch (error) {
      content.innerHTML = '<p>Unable to load reports</p>';
    }
  }

  async refreshReports() {
    this.loadReports();
  }

  async downloadReports() {
    try {
      const response = await fetch('/api/reports/download');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'phishviz-reports.json';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to download reports');
    }
  }
}

// Initialize SPA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Scroll-based SPA...');
  new PhishVizSPA();
});
