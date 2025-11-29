import { Checkbox, Space, Empty } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import { WidgetInstance, TodoItem } from '../../../types';
import { getThemeStyles } from '../../../utils';
import { useDashboardStore } from '../../../store';

interface TodoWidgetProps {
  widget: WidgetInstance;
}

function TodoWidget({ widget }: TodoWidgetProps) {
  const items: TodoItem[] = widget.config.items || [];
  const themeStyles = getThemeStyles(widget.config.theme);
  const updateWidget = useDashboardStore((state) => state.updateWidget);

  const handleSpaceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], completed: checked };
    updateWidget(widget.id, {
      config: { ...widget.config, items: updatedItems }
    });
  };

  if (items.length === 0) {
    return (
      <div className="p-4">
        <Empty
          image={<CheckSquareOutlined style={{ fontSize: 48, color: themeStyles.textColor }} />}
          styles={{ image: { height: 48 } }}
          description={
            <div style={{ color: themeStyles.textColor }}>
              <div className="font-medium">No tasks yet</div>
              <div className="text-sm opacity-70">Click the widget to add your first todo item</div>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-4" style={{ color: themeStyles.textColor }}>
      <Space
        orientation="vertical"
        size="middle"
        style={{ width: 'fit-content' }}
        onClick={handleSpaceClick}
      >
        {items.map((item: TodoItem, index: number) => (
          <Checkbox
            key={index}
            style={{ color: themeStyles.textColor }}
            checked={item.completed}
            onChange={(e) => handleCheckboxChange(index, e.target.checked)}
          >
            {item.text}
          </Checkbox>
        ))}
      </Space>
    </div>
  );
}

export { TodoWidget }