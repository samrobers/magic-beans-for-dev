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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-white mb-2">📊 Chart.js Builder</h1>
          <p className="text-purple-200">Visual configuration tool for Chart.js</p>
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
            <ChartPreview config={config} chartData={chartData} />
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