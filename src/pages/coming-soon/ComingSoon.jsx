import React from 'react';

const ComingSoon = ({ buildingName, buildingIcon, description }) => {
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

      {/* Coming Soon Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="text-center max-w-2xl">
          
          {/* Building Icon */}
          <div className="text-9xl mb-8 animate-pulse">
            {buildingIcon}
          </div>
          
          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-amber-100 mb-6">
            {buildingName}
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-amber-200 mb-8">
            {description}
          </p>
          
          {/* Coming Soon Badge */}
          <div className="bg-amber-900/30 backdrop-blur-sm rounded-lg p-8 border border-amber-600/30 mb-8">
            <h2 className="text-3xl font-bold text-amber-100 mb-4">🏗️ Under Construction</h2>
            <p className="text-amber-200 text-lg mb-4">
              Sheriff Rango and his crew are working hard to bring this building to life!
            </p>
            <div className="flex items-center justify-center gap-2 text-amber-300">
              <span className="animate-bounce">⚒️</span>
              <span className="animate-bounce delay-100">🔨</span>
              <span className="animate-bounce delay-200">⛏️</span>
            </div>
          </div>

          {/* Quote */}
          <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-600/30">
            <p className="text-amber-200 italic text-lg">
              "I may be small, but I got a big heart... and bigger plans!"
            </p>
            <p className="text-amber-300 text-sm mt-2">
              - Sheriff Rango
            </p>
          </div>

          {/* Progress Indicators (just for fun) */}
          <div className="mt-12 space-y-3">
            <div className="flex items-center justify-between text-amber-200 text-sm">
              <span>Foundation</span>
              <span>✅ Complete</span>
            </div>
            <div className="flex items-center justify-between text-amber-200 text-sm">
              <span>Planning</span>
              <span>🔄 In Progress</span>
            </div>
            <div className="flex items-center justify-between text-amber-200 text-sm">
              <span>Construction</span>
              <span>⏳ Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;