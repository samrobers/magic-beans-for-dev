import React from 'react';
import { ANIMATION_EASINGS, TOOLTIP_MODES, INTERACTION_MODES } from '../../utils/constants';

const AnimationsTab = ({ config, updateConfig, updateNestedConfig }) => {
  return (
    <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg shadow-xl p-6 space-y-4 border border-amber-600/30 max-h-[600px] overflow-y-auto">
      <h2 className="text-2xl font-bold text-amber-100">🌪️ Tumbleweed Motion</h2>
      
      {/* Animation Settings */}
      <div className="bg-amber-900/15 p-4 rounded-lg">
        <h3 className="font-semibold text-amber-200 mb-3">Animation Settings</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.animations?.enabled || false}
              onChange={(e) => updateNestedConfig('animations', 'enabled', e.target.checked)}
              className="w-4 h-4 bg-amber-900/15 border-amber-600/30 rounded"
            />
            <span className="text-sm font-medium text-amber-100">Enable Animations</span>
          </label>
          
          {config.animations?.enabled && (
            <>
              <div>
                <label className="block text-xs text-amber-200 mb-1">
                  Duration: {config.animations?.duration || 1000}ms
                </label>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="100"
                  value={config.animations?.duration || 1000}
                  onChange={(e) => updateNestedConfig('animations', 'duration', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-xs text-amber-200 mb-1">Animation Easing</label>
                <select
                  value={config.animations?.easing || 'easeInOutQuart'}
                  onChange={(e) => updateNestedConfig('animations', 'easing', e.target.value)}
                  className="w-full px-2 py-1 bg-amber-900/15 border border-amber-600/30 rounded text-sm text-amber-100"
                >
                  {ANIMATION_EASINGS.map(easing => (
                    <option key={easing} value={easing} className="bg-amber-900 text-amber-100">{easing}</option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tooltip Settings */}
      <div className="bg-amber-900/15 p-4 rounded-lg">
        <h3 className="font-semibold text-amber-200 mb-3">Tooltip Settings</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.tooltip?.enabled !== false}
              onChange={(e) => updateNestedConfig('tooltip', 'enabled', e.target.checked)}
              className="w-4 h-4 bg-amber-900/15 border-amber-600/30 rounded"
            />
            <span className="text-sm font-medium text-amber-100">Enable Tooltips</span>
          </label>
          
          {config.tooltip?.enabled !== false && (
            <>
              <div>
                <label className="block text-xs text-amber-200 mb-1">Tooltip Mode</label>
                <select
                  value={config.tooltip?.mode || 'index'}
                  onChange={(e) => updateNestedConfig('tooltip', 'mode', e.target.value)}
                  className="w-full px-2 py-1 bg-amber-900/15 border border-amber-600/30 rounded text-sm text-amber-100"
                >
                  {TOOLTIP_MODES.map(mode => (
                    <option key={mode} value={mode} className="bg-amber-900 text-amber-100">{mode}</option>
                  ))}
                </select>
              </div>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={config.tooltip?.intersect || false}
                  onChange={(e) => updateNestedConfig('tooltip', 'intersect', e.target.checked)}
                  className="w-4 h-4 bg-amber-900/15 border-amber-600/30 rounded"
                />
                <span className="text-xs font-medium text-amber-100">Intersect Mode</span>
              </label>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-amber-200 mb-1">Background Color</label>
                  <input
                    type="color"
                    value={config.tooltip?.backgroundColor || '#000000'}
                    onChange={(e) => updateNestedConfig('tooltip', 'backgroundColor', e.target.value)}
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs text-purple-200 mb-1">Text Color</label>
                  <input
                    type="color"
                    value={config.tooltip?.titleColor || '#ffffff'}
                    onChange={(e) => updateNestedConfig('tooltip', 'titleColor', e.target.value)}
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Interaction Settings */}
      <div className="bg-amber-900/15 p-4 rounded-lg">
        <h3 className="font-semibold text-amber-200 mb-3">Interaction Settings</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-amber-200 mb-1">Interaction Mode</label>
            <select
              value={config.interaction?.mode || 'nearest'}
              onChange={(e) => updateNestedConfig('interaction', 'mode', e.target.value)}
              className="w-full px-2 py-1 bg-amber-900/15 border border-amber-600/30 rounded text-sm text-amber-100"
            >
              {INTERACTION_MODES.map(mode => (
                <option key={mode} value={mode} className="bg-amber-900 text-amber-100">{mode}</option>
              ))}
            </select>
          </div>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={config.interaction?.intersect || false}
              onChange={(e) => updateNestedConfig('interaction', 'intersect', e.target.checked)}
              className="w-4 h-4 bg-amber-900/15 border-amber-600/30 rounded"
            />
            <span className="text-xs font-medium text-amber-100">Intersect Mode</span>
          </label>
        </div>
      </div>

      {/* Elements Settings (for line charts) */}
      {config.type === 'line' && (
        <div className="bg-amber-900/15 p-4 rounded-lg">
          <h3 className="font-semibold text-amber-200 mb-3">Line & Point Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-amber-200 mb-1">
                Point Radius: {config.elements?.point?.radius || 4}px
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={config.elements?.point?.radius || 4}
                onChange={(e) => {
                  const elements = { ...config.elements };
                  if (!elements.point) elements.point = {};
                  elements.point.radius = parseInt(e.target.value);
                  updateConfig('elements', elements);
                }}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-xs text-amber-200 mb-1">
                Hover Radius: {config.elements?.point?.hoverRadius || 6}px
              </label>
              <input
                type="range"
                min="0"
                max="15"
                value={config.elements?.point?.hoverRadius || 6}
                onChange={(e) => {
                  const elements = { ...config.elements };
                  if (!elements.point) elements.point = {};
                  elements.point.hoverRadius = parseInt(e.target.value);
                  updateConfig('elements', elements);
                }}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-xs text-amber-200 mb-1">
                Line Tension: {((config.elements?.line?.tension || 0.1) * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.elements?.line?.tension || 0.1}
                onChange={(e) => {
                  const elements = { ...config.elements };
                  if (!elements.line) elements.line = {};
                  elements.line.tension = parseFloat(e.target.value);
                  updateConfig('elements', elements);
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimationsTab;