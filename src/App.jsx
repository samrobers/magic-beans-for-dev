import React from 'react';
import DesertOutpost from './pages/DesertOutpost';
import ChartSaloon from './pages/chart-saloon/ChartSaloon';
import ComingSoon from './pages/coming-soon/ComingSoon';

const App = () => {
  // Simple routing based on pathname
  const path = window.location.pathname;
  
  if (path === '/chart-saloon' || path === '/chart-saloon/') {
    return <ChartSaloon />;
  }
  
  if (path === '/data-casino' || path === '/data-casino/') {
    return (
      <ComingSoon 
        buildingName="Data Casino"
        buildingIcon="🎰"
        description="Roll the dice on insights - Analytics and statistical tools"
      />
    );
  }
  
  if (path === '/trading-post' || path === '/trading-post/') {
    return (
      <ComingSoon 
        buildingName="Trading Post"
        buildingIcon="🏪"
        description="Trade your data goods - Data exchange and import/export tools"
      />
    );
  }
  
  if (path === '/sheriffs-office' || path === '/sheriffs-office/') {
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