import React, { useState } from 'react';
import { useChartConfig } from '../hooks/useChartConfig';
import { generateChartJSConfig, buildChartData, copyToClipboard } from '../utils/chartUtils';
import { TABS } from '../utils/constants';

import TabNavigation from './TabNavigation';
import TemplatesTab from './TemplatesTab';
import BasicSettingsTab from './BasicSettingsTab';
import AxesTab from './AxesTab';
import DataTab from './DataTab';
import AdvancedTab from './AdvancedTab';
import AnimationsTab from './AnimationsTab';
import RealChartPreview from './RealChartPreview';
import ChartPreview from './ChartPreview';
import CodeOutput from './CodeOutput';

const ChartJSBuilder = () => {
  const {
    config,
    updateConfig,
    updateNestedConfig,
    addLabel,
    removeLabel,
    updateLabel,
    addDataset,
    removeDataset,
    updateDatasetProp,
    updateDataValue,
    applyTemplate
  } = useChartConfig();

  const [activeTab, setActiveTab] = useState('templates');
  const [useRealPreview, setUseRealPreview] = useState(true);

  // Build chart data for preview
  const chartData = buildChartData(config);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'templates':
        return <TemplatesTab onApplyTemplate={applyTemplate} />;
      case 'basic':
        return <BasicSettingsTab config={config} updateConfig={updateConfig} />;
      case 'axes':
        return <AxesTab config={config} updateNestedConfig={updateNestedConfig} />;
      case 'data':
        return (
          <DataTab
            config={config}
            addLabel={addLabel}
            removeLabel={removeLabel}
            updateLabel={updateLabel}
            addDataset={addDataset}
            removeDataset={removeDataset}
            updateDatasetProp={updateDatasetProp}
            updateDataValue={updateDataValue}
          />
        );
      case 'advanced':
        return <AdvancedTab config={config} updateDatasetProp={updateDatasetProp} />;
      case 'animations':
        return <AnimationsTab config={config} updateConfig={updateConfig} updateNestedConfig={updateNestedConfig} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-900 to-amber-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-white mb-2">🦎 Sheriff Rango's Chart Saloon</h1>
          <p className="text-amber-200 mb-2 italic">"Fastest charts in the West"</p>
          <div className="inline-flex items-center gap-2 bg-amber-900/30 border border-amber-600/50 rounded-lg px-4 py-2">
            <span className="text-amber-200 text-sm font-medium">🏷️ Chart.js v4.4.0 Compatible</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Controls */}
          <div className="space-y-4">
            <TabNavigation 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              tabs={TABS} 
            />
            {renderTabContent()}
          </div>

          {/* Right Panel - Preview & Code */}
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setUseRealPreview(true)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  useRealPreview 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                🏆 Sheriff's Code
              </button>
              <button
                onClick={() => setUseRealPreview(false)}
                className={`px-3 py-1 rounded text-sm font-medium transition ${
                  !useRealPreview 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                📈 Recharts Preview
              </button>
            </div>
            
            {useRealPreview ? (
              <RealChartPreview config={config} chartData={chartData} />
            ) : (
              <ChartPreview config={config} chartData={chartData} />
            )}
            
            <CodeOutput 
              config={config} 
              generateChartJSConfig={generateChartJSConfig} 
              copyToClipboard={copyToClipboard} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartJSBuilder;