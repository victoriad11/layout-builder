import { Empty } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import { WidgetInstance } from '../../../types/widget.types';
import { getThemeStyles } from '../../../utils/themeStyles';

interface ChartWidgetProps {
  widget: WidgetInstance;
}

export default function ChartWidget({ widget }: ChartWidgetProps) {
  const themeStyles = getThemeStyles(widget.config.theme);

  return (
    <div className="p-4">
      <Empty
        image={<BarChartOutlined style={{ fontSize: 48 }} />}
        styles={{ image: { height: 48 } }}
        description={
          <div style={{ color: themeStyles.textColor }}>
            <div className="font-medium">Chart Placeholder</div>
            <div className="text-sm">Integrate with a charting library</div>
          </div>
        }
      />
    </div>
  );
}
