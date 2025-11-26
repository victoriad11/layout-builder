import { Button, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface HeaderBarProps {
  onResetClick: () => void;
}

export default function HeaderBar({ onResetClick }: HeaderBarProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <Title level={2} className='m-0 text-xl'>
            Dashboard Builder
          </Title>
          <Text type="secondary" className='text-md'>
            Drag widgets from the sidebar to build your custom dashboard
          </Text>
        </div>

        <Button
          icon={<ReloadOutlined />}
          onClick={onResetClick}
          size="middle"
        >
          Reset Layout
        </Button>
      </div>
    </header>
  );
}
