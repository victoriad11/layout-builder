import { ResponsiveContainer } from 'recharts';
import { WidgetInstance } from '../../../types';
import { renderChart, getChartColors } from './utils';

const defaultData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

interface ChartWidgetProps {
  widget: WidgetInstance;
}

function ChartWidget({ widget }: ChartWidgetProps) {


  const data = widget.config.chartData || defaultData;
  const chartType = widget.config.chartType || 'line';
  const colors = getChartColors(widget.config.theme);

  return (
    <div className="p-4" style={{ height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart({ chartType, data, colors })}
      </ResponsiveContainer>
    </div>
  );
}

export { ChartWidget }