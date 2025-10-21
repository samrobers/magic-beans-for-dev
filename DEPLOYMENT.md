# 🤠 Rango's Desert Outpost - Deployment Guide

## 🌵 Live Site
**GitHub Pages URL**: `https://samrobers.github.io/magic-beans-for-dev/`

## 🚀 Automated Deployment (Recommended)

### Setup:
1. **Enable GitHub Pages** in your repository:
   - Go to `Settings` → `Pages`
   - Source: `GitHub Actions`

2. **Push to main branch** - deployment happens automatically!

### Manual Deployment Steps:

#### Option 1: Using GitHub Actions (Automated)
```bash
# Just push to main branch
git add .
git commit -m "Deploy Rango's Desert Outpost"
git push origin main
```

#### Option 2: Manual Deploy with gh-pages
```bash
# Install gh-pages if not already installed
npm install -g gh-pages

# Build and deploy
npm run deploy
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── pages/
│   ├── Landing.jsx           # Main desert outpost
│   ├── chart-saloon/         # Chart builder app
│   ├── data-casino/          # Future expansion
│   ├── trading-post/         # Future expansion
│   └── sheriffs-office/      # Future expansion
├── components/
│   └── ui/                   # Shared UI components
└── utils/
    └── constants.js          # Shared constants
```

## 🌟 Features

- **Main Landing**: Rango's Desert Outpost with building navigation
- **Chart Saloon**: Full-featured Chart.js builder with western theme
- **Responsive Design**: Works on all devices
- **Ready for Expansion**: Modular structure for adding new tools

## 🔧 Configuration

The app is configured for GitHub Pages with:
- Base path: `/magic-beans-for-dev/`
- Optimized builds with Vite
- Automatic routing for SPA

## 🎯 Deployment Checklist

- [x] Vite configured for GitHub Pages
- [x] GitHub Actions workflow created
- [x] Package.json deploy script added
- [x] All imports properly resolved
- [ ] Enable GitHub Pages in repository settings
- [ ] Push to main branch for first deployment

## 🦎 Sheriff Rango Says:
*"This here's the finest chart-buildin' establishment in the whole digital frontier!"*