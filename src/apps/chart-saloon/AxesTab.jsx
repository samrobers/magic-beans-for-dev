import React from 'react';

const AxesTab = ({ config, updateNestedConfig }) => {
  return (
    <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg shadow-xl p-6 space-y-4 border border-amber-600/30 max-h-[600px] overflow-y-auto">
      <h2 className="text-2xl font-bold text-white">🧭 Surveyor's Compass</h2>
      
      {['xAxis', 'yAxis'].map(axis => (
        <div key={axis} className="bg-white/5 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-200 mb-3">
            {axis === 'xAxis' ? 'X-Axis' : 'Y-Axis'}
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config[axis].display}
                onChange={(e) => updateNestedConfig(axis, 'display', e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-white">Display Axis</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-purple-200 mb-1">Min Value</label>
                <input
                  type="number"
                  value={config[axis].min}
                  onChange={(e) => updateNestedConfig(axis, 'min', e.target.value)}
                  placeholder="Auto"
                  className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-purple-200 mb-1">Max Value</label>
                <input
                  type="number"
                  value={config[axis].max}
                  onChange={(e) => updateNestedConfig(axis, 'max', e.target.value)}
                  placeholder="Auto"
                  className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-sm text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config[axis].reverse}
                  onChange={(e) => updateNestedConfig(axis, 'reverse', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-xs font-medium text-white">Reverse</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config[axis].beginAtZero}
                  onChange={(e) => updateNestedConfig(axis, 'beginAtZero', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-xs font-medium text-white">Begin at Zero</span>
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AxesTab;