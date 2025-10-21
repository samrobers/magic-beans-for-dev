import React from 'react';
import DesertOutpost from './pages/DesertOutpost';
import ChartSaloonApp from './apps/chart-saloon/index.jsx';
import ComingSoon from './pages/coming-soon/ComingSoon';

const App = () => {
  // Simple routing based on pathname
  const path = window.location.pathname;
  
  // Clean path for easier matching (remove trailing slashes)
  const cleanPath = path.replace(/\/$/, '');
  
  // Check for chart-saloon route
  if (cleanPath.includes('/chart-saloon')) {
    return <ChartSaloonApp />;
  }
  
  if (cleanPath.includes('/ditch-rider-academy')) {
    return (
      <ComingSoon 
        buildingName="Ditch Rider Academy"
        buildingIcon="�"
        description="Master Angular pipes and data flow - Channel data through the digital frontier"
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