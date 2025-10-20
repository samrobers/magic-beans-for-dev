# 🦎 Rango Chart Js Builder

*One tough lizard, one powerful chart builder*

A modern, visual configuration tool for Chart.js that makes creating beautiful charts as easy as a desert showdown. Built with the spirit of the desert - tough, reliable, and always ready for action.

## 🌵 Features

- **Real-time Chart.js Preview**: Uses actual Chart.js rendering for 100% accuracy
- **Comprehensive Chart Types**: Bar, line, pie, doughnut charts with full customization
- **Diverging Charts**: Perfect for Risk & Resiliency calculations and bipolar data
- **Background Fill**: Show data progress against maximum ranges
- **Advanced Styling**: Colors, animations, axes, and more
- **Code Generation**: Export clean, production-ready Chart.js configuration

## 🏜️ Getting Started

```bash
npm install
npm run dev
```

## 🦎 Chart Types Supported

- **Bar Charts**: Vertical and horizontal orientations with overlapping background fill
- **Line Charts**: With customizable tension and fill options  
- **Pie Charts**: With individual segment color controls
- **Doughnut Charts**: Perfect for progress indicators
- **Diverging Charts**: For positive/negative data visualization (Risk vs Resiliency)

## 🌡️ Key Features

### Background Fill
Show the remaining space from your current value to the maximum - great for progress bars and capacity indicators. Uses overlapping bars with transparency for true layered effect.

### Diverging Mode
Perfect for charts with positive and negative values that extend from a center axis. Great for Risk vs Resiliency calculations and tornado charts.

### Real Chart.js Preview
Unlike other tools, this uses actual Chart.js rendering so what you see is exactly what you get - no preview discrepancies.

### Axis Reversal
Full support for reversing both X and Y axes on all chart types, including category scales.

## 🌵 Recent Updates

### Fixed Issues
- ✅ **Y-axis Reverse**: Fixed Y-axis reversal for horizontal bar charts
- ✅ **Background Fill Overlap**: Implemented true overlapping bars using `grouped: false`
- ✅ **Chart.js Controllers**: Added proper controller registration for all chart types
- ✅ **Legend Dropdown**: Custom dropdown with proper dark theme visibility

### New Rango Theme
- 🦎 **Branding**: Updated to "Rango Chart Js Builder" with lizard theme
- 🌵 **Desert Icons**: Themed emojis throughout the interface
- 🏜️ **Styled Components**: Desert-themed section headers and icons

## 🎯 Current Features

- 📊 **Interactive Chart Builder**: Create bar and line charts with real-time preview
- ⚙️ **Comprehensive Configuration**: Basic settings, axes configuration, data management, and advanced styling
- 🎨 **Visual Interface**: Intuitive tabbed interface for different configuration aspects
- 📋 **Code Generation**: Generates clean Chart.js v3+ configuration code
- 🔄 **Live Preview**: See your changes reflected immediately using Recharts
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎯 **Diverging Charts**: Support for bipolar/tornado charts (Risk vs Resiliency patterns)
- ✨ **Animation Controls**: Comprehensive animation and interaction settings
- 📋 **Chart Templates**: Pre-built templates for common chart patterns

## 🚀 Development Roadmap

### Phase 1: Core Improvements ⭐ HIGH PRIORITY
- [ ] **Real Chart.js Preview** - Replace Recharts with actual Chart.js rendering for 100% accuracy
- [ ] **Pie & Doughnut Charts** - Add circular chart types with customization options
- [ ] **Scatter Plot Charts** - Support for X/Y coordinate plotting with bubble variations
- [ ] **Radar/Spider Charts** - Multi-dimensional data visualization
- [ ] **Mixed Charts** - Combine different chart types (bar + line)
- [ ] **CSV Data Import/Export** - Load data from files and export configurations
- [ ] **Advanced Color Palette System** - Pre-built color schemes and palette management
- [ ] **More Chart Templates** - Industry-specific and pattern-based templates

### Phase 2: User Experience Enhancements 🎨 MEDIUM PRIORITY
- [ ] **Drag & Drop Interface** - Visual manipulation of chart elements and data
- [ ] **Data Transformation Tools** - Aggregation, filtering, sorting, calculated fields
- [ ] **Multi-axis Charts** - Dual Y-axes for complex data relationships
- [ ] **Time Series Support** - Date/time x-axis with proper scaling
- [ ] **Logarithmic Scales** - Advanced mathematical scaling options
- [ ] **Percentage Stacking** - Normalized stacking to 100%
- [ ] **Better Mobile Support** - Touch-optimized interface and responsive charts
- [ ] **Performance Optimization** - Handle large datasets efficiently

### Phase 3: Advanced Developer Features 🔧 LOWER PRIORITY
- [ ] **Multi-framework Code Generation** - React, Vue, Angular, Vanilla JS outputs
- [ ] **TypeScript Definitions** - Full TypeScript support and type generation
- [ ] **API Integration Tools** - REST API, WebSocket, GraphQL data fetching
- [ ] **Custom Plugin Support** - Integration with Chart.js plugins
- [ ] **Webpack/Vite Integration** - Build tool configuration examples
- [ ] **Advanced Chart Interactions** - Zoom, pan, drill-down, cross-filtering
- [ ] **Custom Animation System** - Advanced easing, staggered animations
- [ ] **Export Options** - PNG, SVG, PDF high-quality exports
- [ ] **Embed Code Generation** - Ready-to-use embed snippets
- [ ] **Bundle Size Optimization** - Tree-shaking and minimal builds

### Phase 4: Data & Integration Features 📊 FUTURE
- [ ] **Database Connections** - SQLite, MySQL, PostgreSQL integration
- [ ] **JSON Data Import** - Complex data structure handling
- [ ] **Data Validation System** - Error checking and data quality warnings
- [ ] **Formula/Calculation Engine** - Excel-like formulas for computed fields
- [ ] **Custom Data Transformers** - User-defined data processing functions
- [ ] **Real-time Data Updates** - WebSocket integration for live charts
- [ ] **Caching Strategies** - Optimize data loading and processing
- [ ] **Missing Data Handling** - Smart interpolation and null value management

## 🛠️ Technical Architecture

### Current Structure
```
src/
├── components/           # React components (8 components)
│   ├── ChartJSBuilder.jsx    # Main orchestrator component
│   ├── TabNavigation.jsx     # Tab system
│   ├── TemplatesTab.jsx      # Chart templates
│   ├── BasicSettingsTab.jsx  # Core chart settings
│   ├── AxesTab.jsx           # Axis configuration
│   ├── DataTab.jsx           # Data management
│   ├── AdvancedTab.jsx       # Advanced styling
│   ├── AnimationsTab.jsx     # Animation controls
│   ├── ChartPreview.jsx      # Live preview
│   └── CodeOutput.jsx        # Generated code display
├── hooks/               # Custom React hooks
│   └── useChartConfig.js     # Chart configuration state management
├── utils/               # Utility functions and constants
│   ├── chartUtils.js         # Chart generation utilities
│   └── constants.js          # App constants and templates
├── App.jsx              # Root application component
├── main.jsx             # Application entry point
└── index.css            # Global styles (Tailwind)
```

### Planned Architecture Improvements
- **Chart Engine Abstraction** - Pluggable chart library system
- **Data Pipeline** - Modular data processing and transformation
- **Template System** - Extensible template framework
- **Export Engine** - Multi-format export system
- **State Management** - Advanced state with undo/redo
- **Plugin Architecture** - Third-party extension support

## 📋 Implementation Notes

### Dependencies Management
```json
{
  "core": ["react", "react-dom", "chart.js"],
  "development": ["vite", "tailwindcss", "eslint"],
  "planned": ["papaparse", "xlsx", "jspdf", "canvas2svg"]
}
```

### Chart.js Version Compatibility
- **Target**: Chart.js v4.x (latest)
- **Fallback**: Chart.js v3.x support
- **Features**: All modern Chart.js features and plugins

### Performance Targets
- **Bundle Size**: < 500KB gzipped
- **Load Time**: < 2s on 3G
- **Large Datasets**: Handle 10,000+ data points
- **Memory Usage**: < 100MB for complex charts

## 🔧 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Usage
1. **Templates**: Start with pre-built chart templates
2. **Basic Settings**: Configure chart type, orientation, and core options
3. **Data Management**: Add/edit datasets and data points
4. **Styling**: Customize colors, animations, and advanced features
5. **Export**: Copy generated Chart.js configuration code

## 🎯 Implementation Status

### ✅ Completed Features
- [x] Modern React + Vite setup
- [x] Comprehensive chart configuration
- [x] Bar and line chart support
- [x] Diverging/bipolar chart templates
- [x] Animation and interaction controls
- [x] Responsive design with Tailwind CSS
- [x] Chart.js v3+ compatible code generation
- [x] Template system foundation
- [x] Advanced styling options

### 🚧 In Progress
- [ ] Real Chart.js preview implementation
- [ ] Additional chart type support
- [ ] Enhanced template system

### 📋 Next Sprint
1. Replace Recharts with Chart.js for accurate preview
2. Add pie/doughnut chart support
3. Implement CSV data import functionality
4. Create advanced color palette system
5. Add scatter plot chart type

## 🤝 Contributing

This is a developer-focused tool. Contributions should prioritize:
1. **Code Generation Quality** - Ensure output is production-ready
2. **Developer Experience** - Intuitive interface for technical users
3. **Performance** - Handle complex charts efficiently
4. **Extensibility** - Modular architecture for easy feature addition

## 📄 License

MIT License - feel free to use in commercial and open-source projects.