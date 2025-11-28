import { Card, Typography, Space } from 'antd';
import { useDraggable } from '@dnd-kit/core';
import { WIDGET_TEMPLATES } from '../../utils/widgetTemplates';
import { WidgetTemplate } from '../../types/widget.types';

const { Title, Text } = Typography;

// Draggable wrapper for each widget template
function DraggableWidgetCard({ template }: { template: WidgetTemplate }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `template-${template.type}`,
    data: {
      type: 'template',
      widgetType: template.type,
    },
  });

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      size="small"
      hoverable
      className="cursor-move hover:cursor-pointer rounded-2"
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
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

export default function SidebarLibrary() {
  return (
    <aside className="w-68 bg-white border-r border-gray-200 px-6 py-4 overflow-y-auto">
      <div className="mb-4">
        <Title className='m-0' level={4}>
          Widgets
        </Title>
        <Text type="secondary" className='text-md'>
          Drag to add to your dashboard
        </Text>
      </div>

      <Space orientation="vertical" size="small" style={{ width: '100%' }}>
        {WIDGET_TEMPLATES.map((template) => (
          <DraggableWidgetCard key={template.type} template={template} />
        ))}
      </Space>
    </aside>
  );
}
