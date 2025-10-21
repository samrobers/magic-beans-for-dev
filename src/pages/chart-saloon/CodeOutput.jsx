import React from 'react';

const CodeOutput = ({ config, generateChartJSConfig, copyToClipboard }) => {
  const handleCopy = () => {
    const configCode = generateChartJSConfig(config);
    copyToClipboard(configCode);
  };

  return (
    <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-amber-600/30">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-amber-100">📋 Chart.js Config</h2>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium shadow-lg transition"
        >
          📋 Copy Code
        </button>
      </div>
      <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs max-h-96 overflow-y-auto font-mono">
        {generateChartJSConfig(config)}
      </pre>
    </div>
  );
};

export default CodeOutput;