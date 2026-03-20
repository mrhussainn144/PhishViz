# PhizViz - React + Vite Version

This is the React + Vite conversion of the original PhizViz phishing detection system. The original HTML/CSS/JavaScript frontend has been converted to a modern React application with client-side routing.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 and functional components
- **Vite Build System**: Fast development and optimized builds
- **Client-Side Routing**: React Router for seamless navigation
- **Component-Based Structure**: Modular and maintainable code
- **Preserved Styling**: All original CSS animations and designs maintained
- **Interactive Components**: State management for forms and results

## 📁 Project Structure

```
PhizViz/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation component
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── EmailScan.jsx       # Email analyzer page
│   │   ├── LinkScan.jsx        # Link detector page
│   │   ├── DocumentScan.jsx    # Document scanner page
│   │   ├── StegoKit.jsx        # Steganography kit page
│   │   ├── Dashboard.jsx       # Threat dashboard page
│   │   └── Reports.jsx         # Reports page
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # App entry point
│   ├── index.css               # Global styles
│   ├── App.css                 # App-specific styles
│   └── components.css          # Component styles
├── frontend/                   # Original HTML/CSS files (preserved)
├── package.json
├── vite.config.js
└── index.html
```

## 🛠️ Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

## 🎨 Styling

The application preserves all original styling from the HTML/CSS version:

- **Glassmorphism Design**: Modern glass-like effects
- **Animated Backgrounds**: Dynamic particle animations
- **Responsive Layout**: Mobile-friendly design
- **Premium Animations**: Smooth transitions and hover effects
- **Dark Theme**: Consistent dark color scheme

## 🔧 Components

### Navbar
- Sticky navigation with active state indicators
- Smooth hover animations
- Responsive design for mobile devices

### Page Components
Each page component includes:
- Particle animation background
- Form handling with state management
- Loading states during API calls
- Result display with proper styling
- Error handling

### Features Implemented
- **Email Analysis**: Paste email content for phishing detection
- **Link Scanning**: Check URLs for malicious indicators
- **Document Scanning**: Upload files for threat analysis
- **Steganography Detection**: Image analysis for hidden data
- **Dashboard**: Statistics and recent scan history
- **Reports**: Export and view scan results

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interactions
- Optimized animations for performance

## 🔗 API Integration

Currently uses mock data for demonstration. To integrate with your backend:

1. Replace mock API calls in each component
2. Update the endpoints to match your backend API
3. Handle authentication if required
4. Implement proper error handling

## 🚦 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Technologies Used

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Vite**: Fast build tool and dev server
- **CSS3**: Advanced animations and styling
- **ES6+**: Modern JavaScript features

## 📝 Notes

- Original HTML files are preserved in the `frontend/` directory
- All CSS animations and effects have been maintained
- Images and assets are referenced from the original paths
- Component structure follows React best practices
- State management implemented with React hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project maintains the same license as the original PhizViz project.

---

**Conversion Complete**: The original HTML/CSS frontend has been successfully converted to a modern React application with enhanced maintainability and developer experience.
