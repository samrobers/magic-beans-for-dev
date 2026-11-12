import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DesertOutpost from './pages/DesertOutpost';
import ChartSaloonApp from './apps/chart-saloon/index.jsx';
import AngularAppWrapper from './components/AngularAppWrapper';
import HelpCorral from './pages/help-corral/HelpCorral';
import ComingSoon from './pages/coming-soon/ComingSoon';

const App = () => {
  // Only use basename in production
  const basename = import.meta.env.PROD ? '/magic-beans-for-dev' : '/';
  
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {/* Main landing page */}
        <Route path="/" element={<DesertOutpost />} />
        
        {/* Chart Saloon - React Chart.js Builder */}
        <Route path="/chart-saloon/*" element={<ChartSaloonApp />} />
        
        {/* Ditch Rider Academy - Angular App */}
        <Route path="/ditch-rider-academy/*" element={<AngularAppWrapper />} />

        {/* Help Corral - Cowboy Documentation */}
        <Route path="/help-corral" element={<HelpCorral />} />
        
        {/* Coming Soon Pages */}
        <Route 
          path="/trading-post" 
          element={
            <ComingSoon 
              buildingName="Trading Post"
              buildingIcon="🏪"
              description="Trade your data goods - Data exchange and import/export tools"
            />
          } 
        />
        
        <Route 
          path="/sheriffs-office" 
          element={
            <ComingSoon 
              buildingName="Sheriff's Office"
              buildingIcon="🏛️"
              description="Keep the peace in your data - Admin dashboard and settings"
            />
          } 
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

