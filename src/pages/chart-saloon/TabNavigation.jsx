import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg shadow-xl p-2 border border-amber-600/30">
      <div className="grid grid-cols-6 gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2 py-2 rounded-lg font-medium transition text-xs ${
              activeTab === tab.id 
                ? 'bg-amber-600 text-white shadow-lg' 
                : 'bg-amber-900/10 text-white hover:bg-amber-800/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;