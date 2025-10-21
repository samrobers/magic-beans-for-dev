import React, { useState, useRef, useEffect } from 'react';
import { CHART_TYPES, ORIENTATIONS, LEGEND_POSITIONS } from '../../utils/constants';

const BasicSettingsTab = ({ config, updateConfig }) => {
  const [showLegendDropdown, setShowLegendDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLegendDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg shadow-xl p-6 space-y-4 border border-amber-600/30">
      <h2 className="text-2xl font-bold text-white">🍻 Saloon Settings</h2>
      
      <div>
        <label className="block text-sm font-medium text-amber-200 mb-2">Chart Type</label>
        <div className="grid grid-cols-2 gap-2">
          {CHART_TYPES.map(type => (
            <button
              key={type}
              onClick={() => updateConfig('type', type)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                config.type === type 
                  ? 'bg-amber-600 text-white shadow-lg' 
                  : 'bg-amber-900/20 text-white hover:bg-amber-800/30'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {config.type === 'bar' && (
        <div>
          <label className="block text-sm font-medium text-amber-200 mb-2">Orientation</label>
          <div className="grid grid-cols-2 gap-2">
            {ORIENTATIONS.map(orient => (
              <button
                key={orient}
                onClick={() => updateConfig('orientation', orient)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  config.orientation === orient 
                    ? 'bg-amber-600 text-white shadow-lg' 
                    : 'bg-amber-900/20 text-white hover:bg-amber-800/30'
                }`}
              >
                {orient === 'vertical' ? '↕ Vertical' : '↔ Horizontal'}
              </button>
            ))}
          </div>
        </div>
      )}

      {(config.type === 'pie' || config.type === 'doughnut') && (
        <div className="bg-amber-800/30 p-3 rounded-lg">
          <div className="text-xs text-blue-200">
            💡 <strong>Circular Charts:</strong> Pie and doughnut charts automatically distribute data as segments. 
            Configure colors for each segment in the Data tab using the individual color pickers.
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-amber-200 mb-2">Chart Title</label>
        <input
          type="text"
          value={config.title}
          onChange={(e) => updateConfig('title', e.target.value)}
          className="w-full px-3 py-2 bg-amber-900/20 border border-amber-600/30 rounded-lg focus:ring-2 focus:ring-amber-500 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-amber-200 mb-2">Legend Position</label>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowLegendDropdown(!showLegendDropdown)}
            className="w-full px-3 py-2 bg-amber-900/20 border border-amber-600/30 rounded-lg text-white focus:ring-2 focus:ring-amber-500 flex justify-between items-center"
          >
            <span>{config.legendPosition.charAt(0).toUpperCase() + config.legendPosition.slice(1)}</span>
            <span className="text-white/60">{showLegendDropdown ? '▲' : '▼'}</span>
          </button>
          
          {showLegendDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-white/20 rounded-lg shadow-xl z-10">
              {LEGEND_POSITIONS.map(position => (
                <button
                  key={position}
                  onClick={() => {
                    updateConfig('legendPosition', position);
                    setShowLegendDropdown(false);
                  }}
                  className={`w-full px-3 py-2 text-left hover:bg-white/10 transition ${
                    config.legendPosition === position ? 'bg-amber-600/30 text-amber-200' : 'text-white'
                  } ${position === LEGEND_POSITIONS[0] ? 'rounded-t-lg' : ''} ${
                    position === LEGEND_POSITIONS[LEGEND_POSITIONS.length - 1] ? 'rounded-b-lg' : ''
                  }`}
                >
                  {position.charAt(0).toUpperCase() + position.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { key: 'showLegend', label: 'Show Legend' },
          { key: 'showGrid', label: 'Show Grid' },
          { key: 'stacked', label: 'Stacked' },
          { key: 'diverging', label: 'Showdown (Center-aligned)' }
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer bg-amber-900/15 p-2 rounded">
            <input
              type="checkbox"
              checked={config[key]}
              onChange={(e) => updateConfig(key, e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-white">{label}</span>
          </label>
        ))}
      </div>

      {config.diverging && (
        <div className="bg-amber-800/30 p-3 rounded-lg">
          <div className="text-xs text-amber-200">
            🤠 <strong>Showdown Mode:</strong> Perfect for charts with positive and negative values that square off from a center line (like Risk vs Resiliency). Use negative values for one side and positive for the other.
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicSettingsTab;