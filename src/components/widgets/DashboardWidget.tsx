import { Card, Button } from 'antd';
import { HolderOutlined, CloseOutlined } from '@ant-design/icons';
import { WidgetInstance } from '../../types/widget.types';
import { useDashboardStore } from '../../store/dashboardStore';
import MetricWidget from './MetricWidget';

interface DashboardWidgetProps {
  widget: WidgetInstance;
}

export default function DashboardWidget({ widget }: DashboardWidgetProps) {
  const removeWidget = useDashboardStore((state) => state.removeWidget);
  const setSelectedWidget = useDashboardStore((state) => state.setSelectedWidget);

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
      default:
        return (
          <div className="p-4 text-gray-500">
            Widget type "{widget.type}" - Coming soon
          </div>
        );
    }
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      size="small"
      onClick={handleClick}
      title={
        <div className="flex items-center gap-2">
          <HolderOutlined className="cursor-move text-gray-400" />
          <span>{widget.title}</span>
        </div>
      }
      extra={
        <Button
          type="text"
          size="small"
          icon={<CloseOutlined />}
          onClick={handleRemove}
          className="text-gray-400 hover:text-red-500"
        />
      }
    >
      {renderWidgetContent()}
    </Card>
  );
}
