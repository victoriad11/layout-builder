import { Statistic } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { WidgetInstance } from '../../types/widget.types';
import { getThemeStyles } from '../../utils/themeStyles';

interface MetricWidgetProps {
  widget: WidgetInstance;
}

export default function MetricWidget({ widget }: MetricWidgetProps) {
  const value = widget.config.value || 0;
  const themeStyles = getThemeStyles(widget.config.theme);

  return (
    <div className="p-4">
      <Statistic
        title={widget.title}
        value={value}
        precision={0}
        styles={{
          content: { color: widget.config.theme === 'dark' ? '#10b981' : '#3f8600' }
        }}
        style={{ color: themeStyles.textColor }}
        prefix={<ArrowUpOutlined />}
      />
    </div>
  );
}
