import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-2 border border-white/20">
      <div className="grid grid-cols-6 gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2 py-2 rounded-lg font-medium transition text-xs ${
              activeTab === tab.id 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'bg-white/5 text-white hover:bg-white/10'
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