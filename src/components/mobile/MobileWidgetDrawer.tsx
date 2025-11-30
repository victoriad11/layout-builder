import { Drawer, Space, Card, Typography } from 'antd';
import { WIDGET_TEMPLATES, generateWidgetId } from '../../utils';
import { WidgetTemplate } from '../../types';
import { useDashboardStore } from '../../store';

const { Title, Text } = Typography;

interface MobileWidgetDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface TappableWidgetCardProps {
  template: WidgetTemplate;
  onAdd: () => void;
}

function TappableWidgetCard({ template, onAdd }: TappableWidgetCardProps) {
  const addWidget = useDashboardStore((state) => state.addWidget);

  const handleClick = () => {
    const newWidget = {
      id: generateWidgetId(),
      type: template.type,
      title: template.defaultTitle,
      config: { ...template.defaultConfig },
    };

    addWidget(newWidget);
    onAdd();
  };

  return (
    <Card
      size="small"
      hoverable
      className="cursor-pointer rounded-2"
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        <div className="text-2xl">{template.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900">
            {template.defaultTitle}
          </div>
          <Text type="secondary" className='text-md' ellipsis>
            {template.description}
          </Text>
        </div>
      </div>
    </Card>
  );
}

export function MobileWidgetDrawer({ open, onClose }: MobileWidgetDrawerProps) {
  return (
    <Drawer
      title={
        <div>
          <Title level={4} className="m-0">
            Widgets
          </Title>
          <Text type="secondary" className="text-sm">
            Tap to add to your dashboard
          </Text>
        </div>
      }
      placement="bottom"
      onClose={onClose}
      open={open}
      size="large"
      styles={{
        body: { paddingTop: 8 }
      }}
    >
      <Space orientation="vertical" size="small" style={{ width: '100%' }}>
        {WIDGET_TEMPLATES.map((template) => (
          <TappableWidgetCard key={template.type} template={template} onAdd={onClose} />
        ))}
      </Space>
    </Drawer>
  );
}
