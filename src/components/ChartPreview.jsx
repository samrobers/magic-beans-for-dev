import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartPreview = ({ config, chartData }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-white/20">
      <h2 className="text-xl font-bold text-white mb-4">👁️ Live Preview</h2>
      <div className="bg-white rounded-lg p-4">
        <ResponsiveContainer width="100%" height={350}>
          {config.type === 'line' ? (
            <LineChart data={chartData}>
              {config.showGrid && <CartesianGrid strokeDasharray="3 3" />}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {config.showLegend && <Legend />}
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
              {config.showLegend && <Legend />}
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