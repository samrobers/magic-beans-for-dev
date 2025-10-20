import { useState } from 'react';
import { DEFAULT_CONFIG, DATASET_COLORS, BACKGROUND_COLORS } from '../utils/constants';

export const useChartConfig = () => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const updateNestedConfig = (parent, key, value) => {
    setConfig(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [key]: value }
    }));
  };

  const addLabel = () => {
    const newLabels = [...config.labels, `Label ${config.labels.length + 1}`];
    const newDatasets = config.datasets.map(ds => ({
      ...ds,
      data: [...ds.data, 0]
    }));
    setConfig(prev => ({ ...prev, labels: newLabels, datasets: newDatasets }));
  };

  const removeLabel = (index) => {
    if (config.labels.length > 1) {
      const newLabels = config.labels.filter((_, i) => i !== index);
      const newDatasets = config.datasets.map(ds => ({
        ...ds,
        data: ds.data.filter((_, i) => i !== index)
      }));
      setConfig(prev => ({ ...prev, labels: newLabels, datasets: newDatasets }));
    }
  };

  const updateLabel = (index, value) => {
    const newLabels = [...config.labels];
    newLabels[index] = value;
    updateConfig('labels', newLabels);
  };

  const addDataset = () => {
    const newDataset = {
      name: `Dataset ${config.datasets.length + 1}`,
      data: Array(config.labels.length).fill(50),
      color: DATASET_COLORS[config.datasets.length % DATASET_COLORS.length],
      borderWidth: 2,
      backgroundFill: false,
      backgroundFillColor: BACKGROUND_COLORS[config.datasets.length % BACKGROUND_COLORS.length],
      backgroundFillMax: 100
    };
    updateConfig('datasets', [...config.datasets, newDataset]);
  };

  const removeDataset = (index) => {
    if (config.datasets.length > 1) {
      updateConfig('datasets', config.datasets.filter((_, i) => i !== index));
    }
  };

  const updateDatasetProp = (index, prop, value) => {
    const newDatasets = [...config.datasets];
    newDatasets[index] = { ...newDatasets[index], [prop]: value };
    updateConfig('datasets', newDatasets);
  };

  const updateDataValue = (datasetIndex, valueIndex, value) => {
    const newDatasets = [...config.datasets];
    const numValue = value === '' ? 0 : parseFloat(value);
    newDatasets[datasetIndex].data[valueIndex] = isNaN(numValue) ? 0 : numValue;
    updateConfig('datasets', newDatasets);
  };

  const applyTemplate = (templateConfig) => {
    setConfig(templateConfig);
  };

  return {
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
  };
};