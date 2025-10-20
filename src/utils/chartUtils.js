// Chart generation utilities

export const generateChartJSConfig = (config) => {
  const datasetsWithBg = [];
  
  config.datasets.forEach(ds => {
    if (ds.backgroundFill) {
      datasetsWithBg.push({
        label: `${ds.name} (Background)`,
        data: Array(config.labels.length).fill(ds.backgroundFillMax),
        backgroundColor: ds.backgroundFillColor,
        borderColor: ds.backgroundFillColor,
        borderWidth: 0,
        order: 2,
        barPercentage: 1.0,
        categoryPercentage: 1.0
      });
    }
    
    datasetsWithBg.push({
      label: ds.name,
      data: ds.data,
      backgroundColor: ds.color + (config.type === 'line' ? '00' : 'CC'),
      borderColor: ds.color,
      borderWidth: ds.borderWidth,
      order: 1,
      fill: config.type === 'line' ? false : undefined,
      tension: config.type === 'line' ? 0.1 : undefined
    });
  });

  // Updated chart type for Chart.js v3+
  const chartType = config.type === 'line' ? 'line' : 'bar';

  const chartConfig = {
    type: chartType,
    data: {
      labels: config.labels,
      datasets: datasetsWithBg
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: config.orientation === 'horizontal' && config.type === 'bar' ? 'y' : 'x',
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
      scales: {}
    }
  };

  // Configure scales for Chart.js v3+ syntax
  if (config.orientation === 'horizontal' && config.type === 'bar') {
    chartConfig.options.scales.x = {
      type: 'linear',
      display: config.xAxis.display,
      grid: { display: config.showGrid },
      beginAtZero: config.xAxis.beginAtZero,
      reverse: config.xAxis.reverse,
      stacked: config.stacked,
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
      stacked: config.stacked,
      grid: { display: false }
    };
  } else {
    chartConfig.options.scales.x = {
      type: config.type === 'line' ? 'category' : 'category',
      display: config.xAxis.display,
      grid: { display: config.showGrid },
      stacked: config.stacked
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
      stacked: config.stacked
    };
    if (config.yAxis.min !== '') chartConfig.options.scales.y.min = parseFloat(config.yAxis.min);
    if (config.yAxis.max !== '') chartConfig.options.scales.y.max = parseFloat(config.yAxis.max);
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