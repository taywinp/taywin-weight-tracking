# 📊 Pantagon Weight Tracking

<div align="center">

![Weight Tracking App](https://img.shields.io/badge/Weight-Tracker-emerald?style=for-the-badge&logo=chart-line)
![React](https://img.shields.io/badge/React-19.0.0-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.1-646cff?style=for-the-badge&logo=vite)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-purple?style=for-the-badge&logo=pwa)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?style=for-the-badge&logo=supabase)

**A sleek, modern weight tracking progressive web app built with React and powered by Supabase**

[🚀 Features](#-features) • [📱 Screenshots](#-app-preview) • [🛠️ Tech Stack](#️-tech-stack) • [⚡ Quick Start](#-quick-start) • [📖 Usage](#-usage)

</div>

---

## ✨ Features

### 🎯 Core Functionality
- **📈 Real-time Weight Tracking** - Log your daily weight with precision (0.1kg accuracy)
- **📊 Interactive Charts** - Beautiful line charts showing your weight progress over time
- **🏃‍♂️ Exercise Tracking** - Mark whether you exercised on weigh-in days
- **📝 Personal Notes** - Add contextual notes to each weight entry
- **📅 Flexible Dating** - Record weights for any date and time

### 🎨 User Experience
- **🌙 Dark Mode Design** - Elegant dark theme with emerald accents
- **📱 Mobile-First** - Optimized for mobile devices with responsive design
- **🔄 Real-time Updates** - Instant feedback and smooth animations
- **💾 Offline Ready** - PWA support for offline functionality
- **🎛️ Intuitive Controls** - Easy-to-use dropdown selectors for weight input

### 📊 Analytics & Insights
- **📉 Progress Visualization** - Clear trend lines showing weight changes
- **🔢 Smart Statistics** - Total change, average, minimum, and maximum weight
- **🎯 Latest vs Previous** - Quick comparison between recent entries
- **🏷️ Color-coded Indicators** - Green for loss, red for gain visual feedback
- **📈 Historical Data** - Complete chronological entry history

---

## 📱 App Preview

### 🎨 Modern Interface
- **Gradient backgrounds** with glass-morphism effects
- **Emerald color scheme** for a fresh, healthy vibe
- **Smooth animations** and hover effects
- **Clean typography** with proper spacing
- **Interactive elements** with visual feedback

### 📊 Chart Features
- **Responsive line charts** using Recharts library
- **Dynamic Y-axis scaling** based on your weight range
- **Hover tooltips** for detailed data points
- **Data point labels** showing exact weights
- **Smart X-axis** with rotated labels for better readability

---

## 🛠️ Tech Stack

### Frontend Framework
- **⚛️ React 19.0.0** - Latest React with modern hooks and features
- **⚡ Vite 6.3.1** - Lightning-fast build tool and dev server
- **🎨 Tailwind CSS 4.1.4** - Utility-first CSS framework with latest features

### Database & Backend
- **🗄️ Supabase** - PostgreSQL database with real-time capabilities
- **🔐 Row Level Security** - Built-in authentication and authorization
- **📡 REST API** - Auto-generated API endpoints

### Charts & Visualization  
- **📊 Recharts 2.15.3** - Composable charting library built on D3
- **📈 Responsive Charts** - Auto-scaling charts for all screen sizes
- **🎨 Custom Styling** - Themed to match app design

### PWA & Performance
- **📱 PWA Support** - Install as native app on any device
- **⚡ Vite PWA Plugin** - Automatic service worker generation
- **🔄 Auto Updates** - Background updates for new versions
- **💾 Offline Caching** - Core functionality available offline

### Development Tools
- **🔍 ESLint** - Code linting with React-specific rules
- **🚀 SWC** - Super-fast JavaScript/TypeScript compiler
- **📋 JSDoc Types** - Type definitions for better IDE support

---

## ⚡ Quick Start

### Prerequisites
- **Node.js 18+** (recommended: latest LTS version)
- **npm** or **yarn** package manager
- **Supabase account** (free tier available)

### 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/realpantagon/PantagonWeightTracking.git
   cd PantagonWeightTracking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Create a table named `Pantagon_Weight` with columns:
     ```sql
     CREATE TABLE Pantagon_Weight (
       id SERIAL PRIMARY KEY,
       weight_kg DECIMAL(5,2) NOT NULL,
       recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
       details TEXT,
       exercised BOOLEAN DEFAULT FALSE
     );
     ```
   - Update `src/api.js` with your Supabase URL and API key

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### 🏗️ Build for Production
```bash
npm run build
npm run preview
```

---

## 📖 Usage

### 📝 Adding Weight Entries

1. **Click the "Add Weight Entry" button**
2. **Set exercise status** - Toggle whether you exercised
3. **Select date/time** - Default is current date/time
4. **Choose your weight** - Use dropdown menus for precision
   - Main weight (kg): Range 30-130kg
   - Decimal place: 0.0-0.9kg precision
5. **Add optional notes** - Context about your weigh-in
6. **Save entry** - Data syncs to Supabase instantly

### 📊 Viewing Progress

- **📈 Chart View** - Visual trend line of your weight journey
- **🔢 Statistics Cards** - Key metrics at a glance
- **📋 Entry History** - Chronological list with details
- **🎯 Latest Comparison** - Quick view of recent changes

### 📱 Mobile Experience

- **Touch-friendly** interface optimized for mobile
- **Swipe gestures** supported where appropriate  
- **Install as PWA** - Add to home screen for app-like experience
- **Offline functionality** - View data even without internet

---

## 🏗️ Project Structure

```
PantagonWeightTracking/
├── 📁 public/
│   ├── 🖼️ pwa-192x192.png      # PWA icons
│   ├── 🖼️ pwa-512x512.png
│   └── 🖼️ apple-touch-icon.png
├── 📁 src/
│   ├── 📄 App.jsx              # Main application component
│   ├── 📄 AddWeightModal.jsx   # Weight entry modal
│   ├── 📄 WeightScrollPicker.jsx # Custom weight picker (unused)
│   ├── 📄 api.js               # Supabase API functions  
│   ├── 📄 types.js             # JSDoc type definitions
│   ├── 📄 main.jsx             # React app entry point
│   └── 🎨 index.css            # Tailwind CSS imports
├── ⚙️ vite.config.js           # Vite configuration
├── ⚙️ package.json             # Dependencies and scripts
└── 📖 README.md                # This file
```

---

## 🎯 Key Components

### 🧩 App.jsx
- **Main application logic**
- **State management** for weights and modal
- **Chart rendering** with Recharts
- **Statistics calculation**
- **Responsive layout** with Tailwind CSS

### 📝 AddWeightModal.jsx  
- **Weight entry form** with validation
- **Exercise tracking toggle**
- **Date/time picker**
- **Smart default values** based on previous entries
- **Loading states** and error handling

### 🔌 api.js
- **Supabase client** configuration  
- **CRUD operations** for weight entries
- **Data transformation** between database and UI formats
- **Error handling** with detailed messages

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm install -g gh-pages
npm run build
gh-pages -d dist
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### 📋 Development Guidelines
1. **Follow existing code style** 
2. **Add JSDoc comments** for new functions
3. **Test on multiple devices** 
4. **Update README** if needed

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Pantagon**
- GitHub: [@realpantagon](https://github.com/realpantagon)

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ and ⚛️ React

</div>
