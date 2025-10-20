import React from 'react';

const AdvancedTab = ({ config, updateDatasetProp }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-6 space-y-4 border border-white/20 max-h-[600px] overflow-y-auto">
      <h2 className="text-2xl font-bold text-white">🎨 Advanced Styling</h2>
      
      {config.datasets.map((ds, i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4">
          <h3 className="font-semibold text-white mb-3">{ds.name}</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-purple-200 mb-1">
                Border Width: {ds.borderWidth}px
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={ds.borderWidth}
                onChange={(e) => updateDatasetProp(i, 'borderWidth', parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="bg-white/5 p-3 rounded-lg">
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={ds.backgroundFill}
                  onChange={(e) => updateDatasetProp(i, 'backgroundFill', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-white">Enable Background Fill</span>
              </label>
              
              {ds.backgroundFill && (
                <div className="space-y-3 pl-4 border-l-2 border-purple-500">
                  <div>
                    <label className="block text-xs text-purple-200 mb-1">Background Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={ds.backgroundFillColor}
                        onChange={(e) => updateDatasetProp(i, 'backgroundFillColor', e.target.value)}
                        className="w-10 h-8 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={ds.backgroundFillColor}
                        onChange={(e) => updateDatasetProp(i, 'backgroundFillColor', e.target.value)}
                        className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-purple-200 mb-1">Max Value (100% bar width)</label>
                    <input
                      type="number"
                      value={ds.backgroundFillMax}
                      onChange={(e) => updateDatasetProp(i, 'backgroundFillMax', parseFloat(e.target.value) || 100)}
                      className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-sm text-white"
                    />
                  </div>
                  <div className="text-xs text-purple-200 bg-purple-900/30 p-2 rounded">
                    💡 Shows the remaining space from your value to max (great for progress bars!)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdvancedTab;