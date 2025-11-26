import { Checkbox, Space } from 'antd';
import { WidgetInstance } from '../../types/widget.types';
import { getThemeStyles } from '../../utils/themeStyles';

interface TodoWidgetProps {
  widget: WidgetInstance;
}

export default function TodoWidget({ widget }: TodoWidgetProps) {
  const items = widget.config.items || ['Task 1', 'Task 2', 'Task 3'];
  const themeStyles = getThemeStyles(widget.config.theme);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="p-4" style={{ color: themeStyles.textColor }} onClick={handleClick}>
      <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
        {items.map((item: string, index: number) => (
          <Checkbox key={index} style={{ color: themeStyles.textColor }}>
            {item}
          </Checkbox>
        ))}
      </Space>
    </div>
  );
}
