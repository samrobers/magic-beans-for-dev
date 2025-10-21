import React from 'react';

const DesertOutpost = () => {
  const buildings = [
    {
      id: 'chart-saloon',
      title: 'The Chart Saloon',
      icon: '🍺',
      description: 'Create stunning charts and visualizations',
      status: 'open',
      path: '/chart-saloon',
      subtext: 'Where data comes to drink'
    },
    {
      id: 'data-casino',
      title: 'Data Casino',
      icon: '🎰',
      description: 'Analytics and statistical tools',
      status: 'coming-soon',
      path: '/data-casino',
      subtext: 'Roll the dice on insights'
    },
    {
      id: 'trading-post',
      title: 'Trading Post',
      icon: '🏪',
      description: 'Data exchange and import/export',
      status: 'coming-soon',
      path: '/trading-post',
      subtext: 'Trade your data goods'
    },
    {
      id: 'sheriffs-office',
      title: "Sheriff's Office",
      icon: '🏛️',
      description: 'Admin dashboard and settings',
      status: 'coming-soon',
      path: '/sheriffs-office',
      subtext: 'Keep the peace in your data'
    }
  ];

  const handleBuildingClick = (building) => {
    if (building.status === 'open' || building.status === 'coming-soon') {
      // Handle GitHub Pages base path
      const basePath = window.location.pathname.includes('/magic-beans-for-dev') ? '/magic-beans-for-dev' : '';
      window.location.href = basePath + building.path;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900">
      {/* Desert Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-300 via-amber-500 to-amber-900 opacity-20"></div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="text-center py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold text-amber-100 mb-4 drop-shadow-lg">
              🦎 Rango's Desert Outpost
            </h1>
            <p className="text-xl md:text-2xl text-amber-200 mb-2">
              Sheriff of the Digital Frontier
            </p>
            <p className="text-lg text-amber-300">
              "In the vast digital desert, every byte tells a story..."
            </p>
          </div>
        </header>

        {/* Town Buildings Grid */}
        <main className="flex-1 px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            
            {/* Town Description */}
            <div className="text-center mb-12">
              <div className="bg-amber-900/30 backdrop-blur-sm rounded-lg p-6 border border-amber-600/30 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-amber-100 mb-3">Welcome to the Outpost</h2>
                <p className="text-amber-200">
                  A dusty frontier town where data meets the wild west. Each building offers unique tools to wrangle your information like a true digital cowpoke.
                </p>
              </div>
            </div>

            {/* Buildings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {buildings.map((building) => (
                <div
                  key={building.id}
                  onClick={() => handleBuildingClick(building)}
                  className={`
                    group relative bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-600/30 
                    transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                    ${building.status === 'open' 
                      ? 'cursor-pointer hover:bg-amber-800/30 hover:border-amber-500/50' 
                      : building.status === 'coming-soon'
                      ? 'cursor-pointer hover:bg-amber-800/20 hover:border-amber-600/40'
                      : 'opacity-60 cursor-not-allowed'
                    }
                  `}
                >
                  
                  {/* Building Icon */}
                  <div className="text-6xl mb-4 text-center transform group-hover:scale-110 transition-transform">
                    {building.icon}
                  </div>
                  
                  {/* Building Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-amber-100 mb-2">
                      {building.title}
                    </h3>
                    <p className="text-sm text-amber-200 mb-3">
                      {building.description}
                    </p>
                    <p className="text-xs text-amber-300 italic">
                      {building.subtext}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    {building.status === 'open' && (
                      <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/30">
                        Open
                      </div>
                    )}
                    {building.status === 'coming-soon' && (
                      <div className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs border border-orange-500/30">
                        Soon
                      </div>
                    )}
                  </div>

                  {/* Hover Effect */}
                  {(building.status === 'open' || building.status === 'coming-soon') && (
                    <div className="absolute inset-0 bg-amber-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer Quote */}
            <div className="text-center mt-16">
              <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg p-6 border border-amber-600/30 max-w-xl mx-auto">
                <p className="text-amber-200 italic text-lg">
                  "No man can walk out of his own story"
                </p>
                <p className="text-amber-300 text-sm mt-2">
                  - Sheriff Rango
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DesertOutpost;