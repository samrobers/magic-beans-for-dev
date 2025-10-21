import React from 'react';
import DesertOutpost from './pages/DesertOutpost';
import ChartSaloon from './pages/chart-saloon/ChartSaloon';
import ComingSoon from './pages/coming-soon/ComingSoon';

const App = () => {
  // Simple routing based on pathname
  const path = window.location.pathname;
  const basePath = '/magic-beans-for-dev';
  
  // Remove base path for comparison
  const routePath = path.startsWith(basePath) ? path.substring(basePath.length) : path;
  
  if (routePath === '/chart-saloon' || routePath === '/chart-saloon/') {
    return <ChartSaloon />;
  }
  
  if (routePath === '/data-casino' || routePath === '/data-casino/') {
    return (
      <ComingSoon 
        buildingName="Data Casino"
        buildingIcon="🎰"
        description="Roll the dice on insights - Analytics and statistical tools"
      />
    );
  }
  
  if (routePath === '/trading-post' || routePath === '/trading-post/') {
    return (
      <ComingSoon 
        buildingName="Trading Post"
        buildingIcon="🏪"
        description="Trade your data goods - Data exchange and import/export tools"
      />
    );
  }
  
  if (routePath === '/sheriffs-office' || routePath === '/sheriffs-office/') {
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