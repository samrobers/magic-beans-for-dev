import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  LineController,
  PieController,
  DoughnutController,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  LineController,
  PieController,
  DoughnutController,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const RealChartPreview = ({ config, chartData }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart first
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    // Clear canvas context
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Prepare datasets for Chart.js
    const datasets = [];
    
    // Handle pie/doughnut charts differently
    if (config.type === 'pie' || config.type === 'doughnut') {
      config.datasets.forEach(ds => {
        datasets.push({
          label: ds.name,
          data: ds.data,
          backgroundColor: ds.backgroundColor || ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].slice(0, ds.data.length),
          borderColor: ds.color,
          borderWidth: ds.borderWidth || 2
        });
      });
    } else {
      // Handle bar/line charts - use absolute positioning for true overlap
      config.datasets.forEach((ds, datasetIndex) => {
        if (ds.backgroundFill && config.type === 'bar') {
          // Background dataset - positioned as base layer
          datasets.push({
            type: 'bar',
            label: `${ds.name} (Max Range)`,
            data: Array(config.labels.length).fill(ds.backgroundFillMax),
            backgroundColor: ds.backgroundFillColor + '50',
            borderColor: ds.backgroundFillColor,
            borderWidth: 1,
            order: 10, // Higher order = rendered behind
            barPercentage: 1.0, // Full width
            categoryPercentage: 0.8,
            grouped: false // Don't group with other datasets
          });
          
          // Foreground dataset - positioned to overlap
          datasets.push({
            type: 'bar',
            label: ds.name,
            data: ds.data,
            backgroundColor: ds.color + (config.type === 'line' ? '00' : 'CC'),
            borderColor: ds.color,
            borderWidth: ds.borderWidth,
            order: 1, // Lower order = rendered in front
            barPercentage: 0.8, // Narrower to show background edges
            categoryPercentage: 0.8,
            grouped: false, // Don't group with other datasets
            fill: config.type === 'line' ? false : undefined,
            tension: config.type === 'line' ? 0.1 : undefined
          });
        } else {
          datasets.push({
            label: ds.name,
            data: ds.data,
            backgroundColor: ds.color + (config.type === 'line' ? '00' : 'CC'),
            borderColor: ds.color,
            borderWidth: ds.borderWidth,
            order: 1,
            fill: config.type === 'line' ? false : undefined,
            tension: config.type === 'line' ? 0.1 : undefined
          });
        }
      });
    }

    // Chart.js configuration
    const chartConfig = {
      type: config.type,
      data: {
        labels: config.labels,
        datasets: datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: config.orientation === 'horizontal' && config.type === 'bar' ? 'y' : 'x',
        animation: config.animations?.enabled ? {
          duration: config.animations.duration || 1000,
          easing: config.animations.easing || 'easeInOutQuart'
        } : false,
        // Enable overlapping for background fill
        layout: {
          padding: 0
        },
        plugins: {
          title: {
            display: true,
            text: config.title,
            font: { size: 16 }
          },
          legend: {
            display: config.showLegend,
            position: config.legendPosition
          },
          tooltip: config.tooltip?.enabled !== false ? {
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
        ...(config.type !== 'pie' && config.type !== 'doughnut' && {
          scales: {}
        })
      }
    };

    // Configure scales only for chart types that use them
    // Disable stacking if any dataset has background fill (for proper overlapping)
    const hasBackgroundFill = config.datasets.some(ds => ds.backgroundFill);
    const useStacking = config.stacked && !hasBackgroundFill;
    
    if (config.type !== 'pie' && config.type !== 'doughnut') {
      if (config.orientation === 'horizontal' && config.type === 'bar') {
      chartConfig.options.scales.x = {
        type: 'linear',
        display: config.xAxis.display,
        grid: { 
          display: config.showGrid,
          ...(config.diverging && {
            color: (context) => {
              return context.tick.value === 0 ? '#374151' : '#e5e7eb40';
            },
            lineWidth: (context) => {
              return context.tick.value === 0 ? 2 : 1;
            }
          })
        },
        beginAtZero: config.xAxis.beginAtZero,
        reverse: config.xAxis.reverse,
        stacked: useStacking
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
        type: 'category',
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

    // Create new chart
    chartRef.current = new ChartJS(canvasRef.current, chartConfig);

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [config, chartData]);

  return (
    <div className="bg-amber-900/20 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-amber-600/30">
      <h2 className="text-xl font-bold text-white mb-4">🏆 Sheriff's Official View</h2>
      <div className="text-xs text-green-200 mb-2 bg-green-900/30 p-2 rounded">
        ⭐ <strong>Sheriff's Official View:</strong> This here's the real deal - authentic Chart.js rendering for 100% accuracy.
        {config.diverging && <span className="block mt-1"><strong>Showdown mode:</strong> Center line and styling locked and loaded.</span>}
      </div>
      <div className="bg-white rounded-lg p-4" style={{ height: '400px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default RealChartPreview;