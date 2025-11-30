import { forwardRef } from 'react';
import { Card, Button } from 'antd';
import { HolderOutlined, CloseOutlined } from '@ant-design/icons';
import { gray, red } from '@ant-design/colors';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { WidgetInstance } from '../../types';
import { useDashboardStore } from '../../store';
import { getThemeStyles } from '../../utils';
import { MetricWidget } from './MetricWidget';
import { TextWidget } from './TextWidget';
import { ChartWidget } from './ChartWidget';
import { TodoWidget } from './TodoWidget';
import { ImageWidget } from './ImageWidget';

interface DashboardWidgetProps {
  widget: WidgetInstance;
}

const DashboardWidget = forwardRef<HTMLDivElement, DashboardWidgetProps>(({ widget }, _ref) => {
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


  const dndStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const cardStyle = {
    backgroundColor: themeStyles.backgroundColor,
    borderColor: themeStyles.borderColor,
    color: themeStyles.textColor,
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeWidget(widget.id);
  };

  const handleClick = () => {
    setSelectedWidget(widget.id);
  };

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
      style={dndStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <Card
        style={cardStyle}
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
                color: widget.config.theme === 'dark' ? gray[5] : gray[6]
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
              color: widget.config.theme === 'dark' ? gray[5] : gray[6]
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = red[5]}
            onMouseLeave={(e) => e.currentTarget.style.color = widget.config.theme === 'dark' ? gray[5] : gray[6]}
          />
        }
      >
        {renderWidgetContent()}
      </Card>
    </motion.div>
  );
});

DashboardWidget.displayName = 'DashboardWidget';

export { DashboardWidget }
