import React from 'react';
import DesertOutpost from './pages/DesertOutpost';
import ChartSaloon from './pages/chart-saloon/ChartSaloon';
import ComingSoon from './pages/coming-soon/ComingSoon';

const App = () => {
  // Simple routing based on pathname
  const path = window.location.pathname;
  
  // For GitHub Pages, Vite handles the base path automatically
  // We just need to check the routes relative to the base
  if (path.endsWith('/chart-saloon') || path.endsWith('/chart-saloon/')) {
    return <ChartSaloon />;
  }
  
  if (path.endsWith('/data-casino') || path.endsWith('/data-casino/')) {
    return (
      <ComingSoon 
        buildingName="Data Casino"
        buildingIcon="🎰"
        description="Roll the dice on insights - Analytics and statistical tools"
      />
    );
  }
  
  if (path.endsWith('/trading-post') || path.endsWith('/trading-post/')) {
    return (
      <ComingSoon 
        buildingName="Trading Post"
        buildingIcon="🏪"
        description="Trade your data goods - Data exchange and import/export tools"
      />
    );
  }
  
  if (path.endsWith('/sheriffs-office') || path.endsWith('/sheriffs-office/')) {
    return (
      <ComingSoon 
        buildingName="Sheriff's Office"
        buildingIcon="🏛️"
        description="Keep the peace in your data - Admin dashboard and settings"
      />
    );
  }
  
  // Default to Desert Outpost
  return <DesertOutpost />;
};

export default App;