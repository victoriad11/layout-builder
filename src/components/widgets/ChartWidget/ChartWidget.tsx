import { ResponsiveContainer } from 'recharts';
import { WidgetInstance } from '../../../types';
import { renderChart, getChartColors } from './utils';
import { CHART_CONFIG } from '../../../constants';
import { DEFAULT_CHART_DATA, DEFAULT_CHART_TYPE } from '../../../config';

interface ChartWidgetProps {
  widget: WidgetInstance;
}

function ChartWidget({ widget }: ChartWidgetProps) {
  const data = widget.config.chartData || [...DEFAULT_CHART_DATA];
  const chartType = widget.config.chartType || DEFAULT_CHART_TYPE;
  const colors = getChartColors(widget.config.theme);

  return (
    <div className="p-4" style={{ height: `${CHART_CONFIG.DEFAULT_HEIGHT}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart({ chartType, data, colors })}
      </ResponsiveContainer>
    </div>
  );
}

export { ChartWidget }