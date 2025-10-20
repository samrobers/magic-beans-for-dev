// Chart generation utilities

export const generateChartJSConfig = (config) => {
  const datasetsWithBg = [];
  
  config.datasets.forEach(ds => {
    if (ds.backgroundFill) {
      datasetsWithBg.push({
        label: `${ds.name} (Max)`,
        data: Array(config.labels.length).fill(ds.backgroundFillMax),
        backgroundColor: ds.backgroundFillColor,
        borderColor: ds.backgroundFillColor,
        borderWidth: 0,
        order: 2
      });
    }
    
    datasetsWithBg.push({
      label: ds.name,
      data: ds.data,
      backgroundColor: ds.color + 'CC',
      borderColor: ds.color,
      borderWidth: ds.borderWidth,
      order: 1
    });
  });

  const chartConfig = {
    type: config.type === 'line' ? 'line' : (config.orientation === 'horizontal' ? 'horizontalBar' : 'bar'),
    data: {
      labels: config.labels,
      datasets: datasetsWithBg
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: config.title,
          font: { size: 20 }
        },
        legend: {
          display: config.showLegend,
          position: config.legendPosition
        }
      },
      scales: {}
    }
  };

  if (config.orientation === 'horizontal' && config.type === 'bar') {
    chartConfig.options.scales.xAxes = [{
      display: config.xAxis.display,
      grid: { display: config.showGrid },
      ticks: {
        reverse: config.xAxis.reverse,
        beginAtZero: config.xAxis.beginAtZero
      }
    }];
    if (config.xAxis.min !== '') chartConfig.options.scales.xAxes[0].ticks.min = parseFloat(config.xAxis.min);
    if (config.xAxis.max !== '') chartConfig.options.scales.xAxes[0].ticks.max = parseFloat(config.xAxis.max);
    
    chartConfig.options.scales.yAxes = [{
      display: config.yAxis.display,
      stacked: config.stacked,
      grid: { display: false }
    }];
  } else {
    chartConfig.options.scales.x = {
      display: config.xAxis.display,
      grid: { display: config.showGrid },
      stacked: config.stacked
    };
    
    chartConfig.options.scales.y = {
      display: config.yAxis.display,
      grid: { display: config.showGrid },
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