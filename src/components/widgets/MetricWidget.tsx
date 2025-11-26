import { Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { WidgetInstance } from '../../types/widget.types';

interface MetricWidgetProps {
  widget: WidgetInstance;
}

export default function MetricWidget({ widget }: MetricWidgetProps) {
  const value = widget.config.value || 0;

  return (
    <div className="p-4">
      <Statistic
        title={widget.title}
        value={value}
        precision={0}
        styles={{ content: { color: '#3f8600' } }}
        prefix={<ArrowUpOutlined />}
      />
    </div>
  );
}
