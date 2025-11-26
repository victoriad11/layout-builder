import { Card, Typography, Space } from 'antd';
import { WIDGET_TEMPLATES } from '../../utils/widgetTemplates';

const { Title, Text } = Typography;

export default function SidebarLibrary() {
  return (
    <aside className="w-68 bg-white border-r border-gray-200 px-6 py-4 overflow-y-auto">
      <div className="mb-4">
        <Title level={4} style={{ margin: 0 }}>
          Widgets
        </Title>
        <Text type="secondary" style={{ fontSize: '12px' }}>
          Drag to add to your dashboard
        </Text>
      </div>

      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        {WIDGET_TEMPLATES.map((template) => (
          <Card
            key={template.type}
            size="small"
            hoverable
            className="cursor-move"
            style={{ borderRadius: '8px' }}
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">{template.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900">
                  {template.defaultTitle}
                </div>
                <Text type="secondary" style={{ fontSize: '12px' }} ellipsis>
                  {template.description}
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </Space>
    </aside>
  );
}
