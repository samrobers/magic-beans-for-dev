import React from 'react';
import { CHART_TYPES, ORIENTATIONS, LEGEND_POSITIONS } from '../utils/constants';

const BasicSettingsTab = ({ config, updateConfig }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-6 space-y-4 border border-white/20">
      <h2 className="text-2xl font-bold text-white">⚙️ Basic Settings</h2>
      
      <div>
        <label className="block text-sm font-medium text-purple-200 mb-2">Chart Type</label>
        <div className="grid grid-cols-2 gap-2">
          {CHART_TYPES.map(type => (
            <button
              key={type}
              onClick={() => updateConfig('type', type)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                config.type === type 
                  ? 'bg-purple-500 text-white shadow-lg' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {config.type === 'bar' && (
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">Orientation</label>
          <div className="grid grid-cols-2 gap-2">
            {ORIENTATIONS.map(orient => (
              <button
                key={orient}
                onClick={() => updateConfig('orientation', orient)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  config.orientation === orient 
                    ? 'bg-purple-500 text-white shadow-lg' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {orient === 'vertical' ? '↕ Vertical' : '↔ Horizontal'}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-purple-200 mb-2">Chart Title</label>
        <input
          type="text"
          value={config.title}
          onChange={(e) => updateConfig('title', e.target.value)}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-200 mb-2">Legend Position</label>
        <select
          value={config.legendPosition}
          onChange={(e) => updateConfig('legendPosition', e.target.value)}
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
        >
          {LEGEND_POSITIONS.map(position => (
            <option key={position} value={position}>
              {position.charAt(0).toUpperCase() + position.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { key: 'showLegend', label: 'Show Legend' },
          { key: 'showGrid', label: 'Show Grid' },
          { key: 'stacked', label: 'Stacked' },
          { key: 'diverging', label: 'Diverging (Center-aligned)' }
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer bg-white/5 p-2 rounded">
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
        <div className="bg-purple-900/30 p-3 rounded-lg">
          <div className="text-xs text-purple-200">
            💡 <strong>Diverging Mode:</strong> Perfect for charts with positive and negative values that extend from a center axis (like Risk vs Resiliency). Use negative values for one dataset and positive for the other.
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicSettingsTab;