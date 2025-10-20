import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartPreview = ({ config, chartData }) => {
  // Map Chart.js legend positions to Recharts
  const getRechartsLegendProps = () => {
    if (!config.showLegend) return null;
    
    const legendProps = {
      wrapperStyle: { paddingTop: '10px' }
    };
    
    switch (config.legendPosition) {
      case 'top':
        return { ...legendProps, verticalAlign: 'top', height: 36 };
      case 'bottom':
        return { ...legendProps, verticalAlign: 'bottom' };
      case 'left':
        return { ...legendProps, layout: 'vertical', align: 'left', verticalAlign: 'middle', wrapperStyle: { paddingRight: '20px' } };
      case 'right':
        return { ...legendProps, layout: 'vertical', align: 'right', verticalAlign: 'middle', wrapperStyle: { paddingLeft: '20px' } };
      default:
        return { ...legendProps, verticalAlign: 'top', height: 36 };
    }
  };

  const legendProps = getRechartsLegendProps();

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-white/20">
      <h2 className="text-xl font-bold text-white mb-4">👁️ Live Preview</h2>
      <div className="text-xs text-purple-200 mb-2 bg-purple-900/30 p-2 rounded">
        💡 Preview uses Recharts for display. Legend positioning and some features may differ from the actual Chart.js output.
        {config.diverging && <span className="block mt-1"><strong>Diverging mode:</strong> Center line and negative value handling optimized for Chart.js.</span>}
      </div>
      <div className="bg-white rounded-lg p-4">
        <ResponsiveContainer width="100%" height={350}>
          {config.type === 'line' ? (
            <LineChart data={chartData}>
              {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {config.showLegend && <Legend {...legendProps} />}
              {config.datasets.map((ds, idx) => (
                <Line 
                  key={idx} 
                  type="monotone" 
                  dataKey={ds.name} 
                  stroke={ds.color} 
                  strokeWidth={ds.borderWidth} 
                />
              ))}
            </LineChart>
          ) : (
            <BarChart 
              data={chartData} 
              layout={config.orientation === 'horizontal' ? 'vertical' : 'horizontal'}
            >
              {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
              {config.orientation === 'horizontal' ? (
                <>
                  <XAxis 
                    type="number" 
                    domain={[
                      config.xAxis.min !== '' ? parseFloat(config.xAxis.min) : 'auto',
                      config.xAxis.max !== '' ? parseFloat(config.xAxis.max) : 'auto'
                    ]} 
                  />
                  <YAxis type="category" dataKey="name" width={100} />
                </>
              ) : (
                <>
                  <XAxis dataKey="name" />
                  <YAxis 
                    domain={[
                      config.yAxis.min !== '' ? parseFloat(config.yAxis.min) : 'auto',
                      config.yAxis.max !== '' ? parseFloat(config.yAxis.max) : 'auto'
                    ]} 
                  />
                </>
              )}
              <Tooltip />
              {config.showLegend && <Legend {...legendProps} />}
              {config.datasets.map((ds, idx) => (
                <React.Fragment key={idx}>
                  {ds.backgroundFill && (
                    <Bar 
                      dataKey={`${ds.name}_bg`} 
                      fill={ds.backgroundFillColor} 
                      stackId={config.stacked ? 'a' : `bg${idx}`}
                    />
                  )}
                  <Bar 
                    dataKey={ds.name} 
                    fill={ds.color}
                    stackId={config.stacked ? 'a' : `main${idx}`}
                  />
                </React.Fragment>
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartPreview;