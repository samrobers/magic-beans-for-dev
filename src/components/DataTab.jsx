import React from 'react';

const DataTab = ({ 
  config, 
  addLabel, 
  removeLabel, 
  updateLabel, 
  addDataset, 
  removeDataset, 
  updateDatasetProp, 
  updateDataValue 
}) => {
  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto">
      {/* Labels */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">🏷️ Labels</h2>
          <button
            onClick={addLabel}
            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium shadow"
          >
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {config.labels.map((label, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={label}
                onChange={(e) => updateLabel(i, e.target.value)}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white"
                placeholder={`Label ${i + 1}`}
              />
              <button
                onClick={() => removeLabel(i)}
                disabled={config.labels.length === 1}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Datasets */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-white/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">📊 Datasets</h2>
          <button
            onClick={addDataset}
            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium shadow"
          >
            + Add
          </button>
        </div>
        <div className="space-y-4">
          {config.datasets.map((ds, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={ds.name}
                  onChange={(e) => updateDatasetProp(i, 'name', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white"
                  placeholder="Dataset name"
                />
                <input
                  type="color"
                  value={ds.color}
                  onChange={(e) => updateDatasetProp(i, 'color', e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer"
                  title="Dataset color"
                />
                <button
                  onClick={() => removeDataset(i)}
                  disabled={config.datasets.length === 1}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ×
                </button>
              </div>
              <div className="text-xs text-purple-200 mb-2 font-medium">Values:</div>
              <div className="grid grid-cols-4 gap-2">
                {ds.data.map((val, j) => (
                  <input
                    key={j}
                    type="number"
                    value={val}
                    onChange={(e) => updateDataValue(i, j, e.target.value)}
                    className="px-2 py-1 bg-white/10 border border-white/20 rounded text-sm text-white"
                    title={config.labels[j]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTab;