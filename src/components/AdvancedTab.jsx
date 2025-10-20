import React from 'react';

const AdvancedTab = ({ config, updateDatasetProp }) => {
  return (
    <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg shadow-xl p-6 space-y-4 border border-amber-600/30 max-h-[600px] overflow-y-auto">
      <h2 className="text-2xl font-bold text-amber-100">🤺 Gunslinger's Arsenal</h2>
      
      {config.datasets.map((ds, i) => (
        <div key={i} className="bg-amber-900/15 border border-amber-600/30 rounded-lg p-4">
          <h3 className="font-semibold text-amber-100 mb-3">{ds.name}</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-amber-200 mb-1">
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

            <div className="bg-amber-900/15 p-3 rounded-lg">
              <label className="flex items-center gap-2 cursor-pointer mb-3">
                <input
                  type="checkbox"
                  checked={ds.backgroundFill}
                  onChange={(e) => updateDatasetProp(i, 'backgroundFill', e.target.checked)}
                  className="w-4 h-4 bg-amber-900/15 border-amber-600/30 rounded"
                />
                <span className="text-sm font-medium text-amber-100">Enable Background Fill</span>
              </label>
              
              {ds.backgroundFill && (
                <div className="space-y-3 pl-4 border-l-2 border-amber-600">
                  <div>
                    <label className="block text-xs text-amber-200 mb-1">Background Color</label>
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
                        className="flex-1 px-2 py-1 bg-amber-900/15 border border-amber-600/30 rounded text-xs text-amber-100 font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-amber-200 mb-1">Max Value (100% bar width)</label>
                    <input
                      type="number"
                      value={ds.backgroundFillMax}
                      onChange={(e) => updateDatasetProp(i, 'backgroundFillMax', parseFloat(e.target.value) || 100)}
                      className="w-full px-2 py-1 bg-amber-900/15 border border-amber-600/30 rounded text-sm text-amber-100"
                    />
                  </div>
                  <div className="text-xs text-amber-200 bg-amber-900/30 p-2 rounded">
                    🎯 Shows how much territory's left to claim from your current position to the max (perfect for progress tracking!)
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