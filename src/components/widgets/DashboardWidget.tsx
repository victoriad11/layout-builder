import { Card, Button } from 'antd';
import { HolderOutlined, CloseOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { WidgetInstance } from '../../types/widget.types';
import { useDashboardStore } from '../../store/dashboardStore';
import { getThemeStyles } from '../../utils/themeStyles';
import MetricWidget from './MetricWidget';
import TextWidget from './TextWidget';
import ChartWidget from './ChartWidget';
import TodoWidget from './TodoWidget';
import ImageWidget from './ImageWidget';

interface DashboardWidgetProps {
  widget: WidgetInstance;
}

export default function DashboardWidget({ widget }: DashboardWidgetProps) {
  const removeWidget = useDashboardStore((state) => state.removeWidget);
  const setSelectedWidget = useDashboardStore((state) => state.setSelectedWidget);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: widget.id,
    data: {
      type: 'widget',
      widget,
    },
  });

  const themeStyles = getThemeStyles(widget.config.theme);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: themeStyles.backgroundColor,
    borderColor: themeStyles.borderColor,
    color: themeStyles.textColor,
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering widget click
    removeWidget(widget.id);
  };

  const handleClick = () => {
    setSelectedWidget(widget.id);
  };

  // Render widget content based on type
  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'metric':
        return <MetricWidget widget={widget} />;
      case 'text':
        return <TextWidget widget={widget} />;
      case 'chart':
        return <ChartWidget widget={widget} />;
      case 'todo':
        return <TodoWidget widget={widget} />;
      case 'image':
        return <ImageWidget widget={widget} />;
      default:
        return (
          <div className="p-4 text-gray-500">
            Widget type "{widget.type}" - Coming soon
          </div>
        );
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow"
        size="small"
        onClick={handleClick}
        title={
          <div className="flex items-center gap-2" style={{ color: themeStyles.textColor }}>
            <HolderOutlined
              {...attributes}
              {...listeners}
              className="cursor-move"
              style={{
                color: widget.config.theme === 'dark' ? '#9ca3af' : '#9ca3af'
              }}
            />
            <span>{widget.title}</span>
          </div>
        }
        extra={
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            onClick={handleRemove}
            style={{
              color: widget.config.theme === 'dark' ? '#9ca3af' : '#9ca3af'
            }}
            className="hover:text-red-500"
          />
        }
      >
        {renderWidgetContent()}
      </Card>
    </motion.div>
  );
}
