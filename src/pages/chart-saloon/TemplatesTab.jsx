import React from 'react';
import { CHART_TEMPLATES } from '../../utils/constants';

const TemplatesTab = ({ onApplyTemplate }) => {
  return (
    <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg shadow-xl p-6 space-y-4 border border-amber-600/30">
      <h2 className="text-2xl font-bold text-white">📋 Wanted Posters</h2>
      <p className="text-purple-200 text-sm">Quick start with pre-configured chart types</p>
      
      <div className="space-y-4">
        {Object.entries(CHART_TEMPLATES).map(([key, template]) => (
          <div key={key} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                <p className="text-sm text-purple-200">{template.description}</p>
              </div>
              <button
                onClick={() => onApplyTemplate(template.config)}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium shadow-lg transition text-sm"
              >
                Use Template
              </button>
            </div>
            
            {key === 'divergingBar' && (
              <div className="mt-3 p-3 bg-amber-800/30 rounded-lg">
                <div className="text-xs text-purple-200 space-y-1">
                  <div><strong>Perfect for:</strong> Performance vs Targets, Before vs After, Positive vs Negative data</div>
                  <div><strong>Features:</strong> Horizontal bars, negative/positive values, center-aligned axis</div>
                  <div><strong>Use case:</strong> Comparing opposing forces or complementary metrics</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-amber-800/30 p-4 rounded-lg">
        <h4 className="text-white font-medium mb-2">💡 Template Tips</h4>
        <ul className="text-xs text-purple-200 space-y-1">
          <li>• Templates provide a starting point - customize them in other tabs</li>
          <li>• Diverging charts work best with opposing datasets (positive/negative values)</li>
          <li>• Use horizontal orientation for better label readability with many categories</li>
          <li>• Set appropriate axis ranges for balanced visualization</li>
        </ul>
      </div>
    </div>
  );
};

export default TemplatesTab;