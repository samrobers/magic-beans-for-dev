# Chart.js Builder

A visual configuration tool for Chart.js that allows you to create charts interactively and generate the corresponding Chart.js configuration code.

## Features

- 📊 **Interactive Chart Builder**: Create bar and line charts with real-time preview
- ⚙️ **Comprehensive Configuration**: Basic settings, axes configuration, data management, and advanced styling
- 🎨 **Visual Interface**: Intuitive tabbed interface for different configuration aspects
- 📋 **Code Generation**: Generates clean Chart.js configuration code
- 🔄 **Live Preview**: See your changes reflected immediately using Recharts
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── components/          # React components
│   ├── ChartJSBuilder.jsx    # Main component
│   ├── TabNavigation.jsx     # Tab navigation
│   ├── BasicSettingsTab.jsx  # Basic chart settings
│   ├── AxesTab.jsx           # Axes configuration
│   ├── DataTab.jsx           # Data management
│   ├── AdvancedTab.jsx       # Advanced styling
│   ├── ChartPreview.jsx      # Live chart preview
│   └── CodeOutput.jsx        # Generated code display
├── hooks/               # Custom React hooks
│   └── useChartConfig.js     # Chart configuration management
├── utils/               # Utility functions
│   ├── chartUtils.js         # Chart generation utilities
│   └── constants.js          # App constants
├── App.jsx             # Main App component
├── main.jsx            # Application entry point
└── index.css           # Global styles (Tailwind)
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Recharts** - Chart library for preview
- **ESLint** - Code linting

## Usage

1. **Basic Settings**: Choose chart type, orientation, title, and legend settings
2. **Axes Configuration**: Configure X and Y axis properties
3. **Data Management**: Add/remove labels and datasets, modify data values
4. **Advanced Styling**: Customize border width, background fills, and other visual properties
5. **Preview**: See your chart rendered in real-time
6. **Export**: Copy the generated Chart.js configuration code

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).