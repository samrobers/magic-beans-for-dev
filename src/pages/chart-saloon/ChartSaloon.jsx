import React from 'react';
import ChartJSBuilder from './ChartJSBuilder.jsx';

const ChartSaloon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900">
      {/* Desert Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-amber-500 to-amber-900 opacity-20"></div>
      
      {/* Back to Outpost Navigation */}
      <nav className="relative z-20 p-4">
        <button 
          onClick={() => window.location.href = './'}
          className="flex items-center gap-2 px-4 py-2 bg-amber-800/30 hover:bg-amber-700/40 text-amber-200 rounded-lg border border-amber-600/30 transition-all"
        >
          ⬅️ Back to Desert Outpost
        </button>
      </nav>

      {/* Chart Builder Content */}
      <div className="relative z-10">
        <ChartJSBuilder />
      </div>
    </div>
  );
};

export default ChartSaloon;