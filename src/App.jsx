import React from 'react';
import DesertOutpost from './pages/DesertOutpost';
import ChartSaloon from './pages/chart-saloon/ChartSaloon';
import ComingSoon from './pages/coming-soon/ComingSoon';

const App = () => {
  // Simple routing based on pathname
  const path = window.location.pathname;
  
  // Clean path for easier matching (remove trailing slashes)
  const cleanPath = path.replace(/\/$/, '');
  
  // Check for chart-saloon route
  if (cleanPath.includes('/chart-saloon')) {
    return <ChartSaloon />;
  }
  
  if (cleanPath.includes('/data-casino')) {
    return (
      <ComingSoon 
        buildingName="Data Casino"
        buildingIcon="🎰"
        description="Roll the dice on insights - Analytics and statistical tools"
      />
    );
  }
  
  if (cleanPath.includes('/trading-post')) {
    return (
      <ComingSoon 
        buildingName="Trading Post"
        buildingIcon="🏪"
        description="Trade your data goods - Data exchange and import/export tools"
      />
    );
  }
  
  if (cleanPath.includes('/sheriffs-office')) {
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