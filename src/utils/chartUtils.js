// Chart generation utilities
import { DATASET_COLORS } from './constants';

export const generateChartJSConfig = (config) => {
  const datasetsWithBg = [];
  
  // Handle pie/doughnut charts differently
  if (config.type === 'pie' || config.type === 'doughnut') {
    config.datasets.forEach(ds => {
      datasetsWithBg.push({
        label: ds.name,
        data: ds.data,
        backgroundColor: ds.backgroundColor || DATASET_COLORS.slice(0, ds.data.length),
        borderColor: ds.color,
        borderWidth: ds.borderWidth || 2
      });
    });
  } else {
    // Handle bar/line charts - use grouped: false for true overlap
    config.datasets.forEach(ds => {
      if (ds.backgroundFill) {
        datasetsWithBg.push({
          type: 'bar',
          label: `${ds.name} (Max Range)`,
          data: Array(config.labels.length).fill(ds.backgroundFillMax),
          backgroundColor: ds.backgroundFillColor + '50',
          borderColor: ds.backgroundFillColor,
          borderWidth: 1,
          order: 10, // Render behind other bars
          barPercentage: 1.0, // Full width
          categoryPercentage: 0.8,
          grouped: false // Don't group - allows overlap
        });
      }
      
      datasetsWithBg.push({
        type: config.type === 'line' ? 'line' : 'bar',
        label: ds.name,
        data: ds.data,
        backgroundColor: ds.color + (config.type === 'line' ? '00' : 'CC'),
        borderColor: ds.color,
        borderWidth: ds.borderWidth,
        order: ds.backgroundFill ? 1 : 5, // Render in front if has background
        barPercentage: ds.backgroundFill ? 0.8 : 1.0, // Narrower if has background
        categoryPercentage: 0.8,
        grouped: ds.backgroundFill ? false : undefined, // Don't group if has background
        fill: config.type === 'line' ? false : undefined,
        tension: config.type === 'line' ? 0.1 : undefined
      });
    });
  }

  // Updated chart type for Chart.js v3+
  const chartType = config.type;

  const chartConfig = {
    type: chartType,
    data: {
      labels: config.labels,
      datasets: datasetsWithBg
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      ...(config.type !== 'pie' && config.type !== 'doughnut' && {
        indexAxis: config.orientation === 'horizontal' && config.type === 'bar' ? 'y' : 'x'
      }),
      animation: config.animations?.enabled ? {
        duration: config.animations.duration || 1000,
        easing: config.animations.easing || 'easeInOutQuart'
      } : false,
      plugins: {
        title: {
          display: true,
          text: config.title,
          font: { size: 20 }
        },
        legend: {
          display: config.showLegend,
          position: config.legendPosition
        },
        tooltip: config.tooltip?.enabled !== false ? {
          enabled: true,
          mode: config.tooltip?.mode || 'index',
          intersect: config.tooltip?.intersect || false,
          backgroundColor: config.tooltip?.backgroundColor || 'rgba(0,0,0,0.8)',
          titleColor: config.tooltip?.titleColor || '#fff',
          bodyColor: config.tooltip?.bodyColor || '#fff'
        } : { enabled: false }
      },
      interaction: {
        mode: config.interaction?.mode || 'nearest',
        intersect: config.interaction?.intersect || false
      },
      elements: config.elements || {},
      ...(config.type !== 'pie' && config.type !== 'doughnut' && { scales: {} })
    }
  };

  // Configure scales for Chart.js v3+ syntax (only for bar/line charts)
  // Disable stacking if any dataset has background fill (for proper overlapping)
  const hasBackgroundFill = config.datasets.some(ds => ds.backgroundFill);
  const useStacking = config.stacked && !hasBackgroundFill;
  
  if (config.type !== 'pie' && config.type !== 'doughnut') {
    if (config.orientation === 'horizontal' && config.type === 'bar') {
    chartConfig.options.scales.x = {
      type: 'linear',
      display: config.xAxis.display,
      grid: { display: config.showGrid },
      beginAtZero: config.xAxis.beginAtZero,
      reverse: config.xAxis.reverse,
      stacked: useStacking,
      // Add center line for diverging charts
      ...(config.diverging && {
        grid: {
          display: config.showGrid,
          color: (context) => {
            return context.tick.value === 0 ? '#374151' : '#e5e7eb40';
          },
          lineWidth: (context) => {
            return context.tick.value === 0 ? 2 : 1;
          }
        }
      })
    };
    if (config.xAxis.min !== '') chartConfig.options.scales.x.min = parseFloat(config.xAxis.min);
    if (config.xAxis.max !== '') chartConfig.options.scales.x.max = parseFloat(config.xAxis.max);
    
    chartConfig.options.scales.y = {
      type: 'category',
      display: config.yAxis.display,
      stacked: useStacking,
      grid: { display: false },
      reverse: config.yAxis.reverse
    };
  } else {
    chartConfig.options.scales.x = {
      type: config.type === 'line' ? 'category' : 'category',
      display: config.xAxis.display,
      grid: { display: config.showGrid },
      stacked: useStacking,
      reverse: config.xAxis.reverse
    };
    
    chartConfig.options.scales.y = {
      type: 'linear',
      display: config.yAxis.display,
      grid: { 
        display: config.showGrid,
        // Add center line for diverging vertical charts
        ...(config.diverging && {
          color: (context) => {
            return context.tick.value === 0 ? '#374151' : '#e5e7eb40';
          },
          lineWidth: (context) => {
            return context.tick.value === 0 ? 2 : 1;
          }
        })
      },
      beginAtZero: config.yAxis.beginAtZero,
      reverse: config.yAxis.reverse,
      stacked: useStacking
    };
    if (config.yAxis.min !== '') chartConfig.options.scales.y.min = parseFloat(config.yAxis.min);
    if (config.yAxis.max !== '') chartConfig.options.scales.y.max = parseFloat(config.yAxis.max);
  }
  }

  return JSON.stringify(chartConfig, null, 2);
};

export const buildChartData = (config) => {
  return config.labels.map((label, i) => {
    const point = { name: label };
    config.datasets.forEach(ds => {
      point[ds.name] = ds.data[i] || 0;
      if (ds.backgroundFill) {
        point[`${ds.name}_bg`] = ds.backgroundFillMax;
      }
    });
    return point;
  });
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  alert('✅ Chart.js configuration copied to clipboard!');
};