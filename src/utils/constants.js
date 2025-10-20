// Constants and default configurations

export const DEFAULT_CONFIG = {
  type: 'bar',
  orientation: 'vertical',
  title: 'My Chart',
  showLegend: true,
  showGrid: true,
  legendPosition: 'top',
  stacked: false,
  labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
  datasets: [
    { 
      name: 'Dataset 1', 
      data: [65, 59, 80, 81], 
      color: '#3b82f6', 
      borderWidth: 2,
      backgroundFill: false,
      backgroundFillColor: '#dbeafe',
      backgroundFillMax: 100
    }
  ],
  xAxis: { display: true, min: '', max: '', reverse: false, beginAtZero: true },
  yAxis: { display: true, min: '', max: '', reverse: false, beginAtZero: true }
};

export const CHART_TYPES = ['bar', 'line'];
export const ORIENTATIONS = ['vertical', 'horizontal'];
export const LEGEND_POSITIONS = ['top', 'bottom', 'left', 'right'];

export const DATASET_COLORS = ['#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e'];
export const BACKGROUND_COLORS = ['#d1fae5', '#fef3c7', '#ede9fe', '#fce7f3', '#ccfbf1', '#fecdd3'];

export const TABS = [
  { id: 'basic', label: 'Basic' },
  { id: 'axes', label: 'Axes' },
  { id: 'data', label: 'Data' },
  { id: 'advanced', label: 'Advanced' }
];