import { Statistic } from 'antd';
import { WidgetInstance } from '../../../types';
import { getThemeStyles } from '../../../utils';
import { getArrowIcon, getValueColor } from './utils';
import { DEFAULT_METRIC_VALUE } from '../../../config';

interface MetricWidgetProps {
  widget: WidgetInstance;
}

function MetricWidget({ widget }: MetricWidgetProps) {
  const value = widget.config.value || DEFAULT_METRIC_VALUE;
  const themeStyles = getThemeStyles(widget.config.theme);
  const valueColor = getValueColor(value, widget.config.theme);

  return (
    <div className="p-4">
      <Statistic
        title={widget.title}
        value={value}
        precision={0}
        styles={{
          title: { color: themeStyles.textColor },
          content: { color: valueColor || themeStyles.textColor }
        }}
        prefix={getArrowIcon(value)}
      />
    </div>
  );
}

export { MetricWidget }