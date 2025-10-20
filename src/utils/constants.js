// Constants and default configurations

export const DEFAULT_CONFIG = {
  type: 'bar',
  orientation: 'vertical',
  title: 'My Chart',
  showLegend: true,
  showGrid: true,
  legendPosition: 'top',
  stacked: false,
  diverging: false,
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
  yAxis: { display: true, min: '', max: '', reverse: false, beginAtZero: true },
  // Additional Chart.js options
  animations: {
    enabled: true,
    duration: 1000,
    easing: 'easeInOutQuart'
  },
  tooltip: {
    enabled: true,
    mode: 'index',
    intersect: false,
    backgroundColor: 'rgba(0,0,0,0.8)',
    titleColor: '#fff',
    bodyColor: '#fff'
  },
  interaction: {
    mode: 'nearest',
    intersect: false
  },
  elements: {
    point: {
      radius: 4,
      hoverRadius: 6
    },
    line: {
      tension: 0.1
    }
  }
};

export const CHART_TYPES = ['bar', 'line', 'pie', 'doughnut'];
export const ORIENTATIONS = ['vertical', 'horizontal'];
export const LEGEND_POSITIONS = ['top', 'bottom', 'left', 'right'];

export const DATASET_COLORS = ['#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e'];
export const BACKGROUND_COLORS = ['#d1fae5', '#fef3c7', '#ede9fe', '#fce7f3', '#ccfbf1', '#fecdd3'];

export const TABS = [
  { id: 'templates', label: 'Templates' },
  { id: 'basic', label: 'Basic' },
  { id: 'axes', label: 'Axes' },
  { id: 'data', label: 'Data' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'animations', label: 'Animations' }
];

export const ANIMATION_EASINGS = [
  'linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad',
  'easeInCubic', 'easeOutCubic', 'easeInOutCubic',
  'easeInQuart', 'easeOutQuart', 'easeInOutQuart',
  'easeInQuint', 'easeOutQuint', 'easeInOutQuint',
  'easeInSine', 'easeOutSine', 'easeInOutSine',
  'easeInExpo', 'easeOutExpo', 'easeInOutExpo',
  'easeInCirc', 'easeOutCirc', 'easeInOutCirc',
  'easeInElastic', 'easeOutElastic', 'easeInOutElastic',
  'easeInBack', 'easeOutBack', 'easeInOutBack',
  'easeInBounce', 'easeOutBounce', 'easeInOutBounce'
];

export const TOOLTIP_MODES = ['point', 'nearest', 'index', 'dataset', 'x', 'y'];
export const INTERACTION_MODES = ['point', 'nearest', 'index', 'dataset', 'x', 'y'];

// Chart Templates
export const CHART_TEMPLATES = {
  divergingBar: {
    name: 'Diverging Bar Chart',
    description: 'Perfect for risk vs. resiliency, before vs. after comparisons',
    config: {
      type: 'bar',
      orientation: 'horizontal',
      title: 'Risk & Resiliency Calculator',
      showLegend: true,
      showGrid: true,
      legendPosition: 'top',
      stacked: false,
      diverging: true,
      labels: ['Fighter', 'Fidelity', 'Fitness', 'Family', 'Finances', 'Future', 'Critical Stressors'],
      datasets: [
        {
          name: 'Risk Factors',
          data: [-50, -60, -30, -40, -70, -50, -80],
          color: '#ef4444',
          borderWidth: 0,
          backgroundFill: false,
          backgroundFillColor: '#fecaca',
          backgroundFillMax: 100
        },
        {
          name: 'Resiliency',
          data: [70, 80, 85, 60, 40, 65, 30],
          color: '#10b981',
          borderWidth: 0,
          backgroundFill: false,
          backgroundFillColor: '#d1fae5',
          backgroundFillMax: 100
        }
      ],
      xAxis: { display: true, min: '-100', max: '100', reverse: false, beginAtZero: true },
      yAxis: { display: true, min: '', max: '', reverse: false, beginAtZero: true }
    }
  },
  simpleBar: {
    name: 'Simple Bar Chart',
    description: 'Basic vertical bar chart',
    config: DEFAULT_CONFIG
  },
  simplePie: {
    name: 'Pie Chart',
    description: 'Classic pie chart for showing proportions',
    config: {
      type: 'pie',
      orientation: 'vertical',
      title: 'Market Share Distribution',
      showLegend: true,
      showGrid: false,
      legendPosition: 'right',
      stacked: false,
      diverging: false,
      labels: ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'],
      datasets: [
        {
          name: 'Browser Usage',
          data: [65, 20, 8, 5, 2],
          color: '#3b82f6',
          borderWidth: 2,
          backgroundFill: false,
          backgroundFillColor: '#dbeafe',
          backgroundFillMax: 100,
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
        }
      ],
      xAxis: { display: false, min: '', max: '', reverse: false, beginAtZero: true },
      yAxis: { display: false, min: '', max: '', reverse: false, beginAtZero: true }
    }
  },
  doughnutChart: {
    name: 'Doughnut Chart',
    description: 'Doughnut chart with center cutout',
    config: {
      type: 'doughnut',
      orientation: 'vertical',
      title: 'Revenue by Category',
      showLegend: true,
      showGrid: false,
      legendPosition: 'bottom',
      stacked: false,
      diverging: false,
      labels: ['Product Sales', 'Services', 'Subscriptions', 'Other'],
      datasets: [
        {
          name: 'Revenue',
          data: [450, 320, 180, 50],
          color: '#10b981',
          borderWidth: 2,
          backgroundFill: false,
          backgroundFillColor: '#d1fae5',
          backgroundFillMax: 100,
          backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']
        }
      ],
      xAxis: { display: false, min: '', max: '', reverse: false, beginAtZero: true },
      yAxis: { display: false, min: '', max: '', reverse: false, beginAtZero: true }
    }
  }
};