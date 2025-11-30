import { Button, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface HeaderBarProps {
  onResetClick: () => void;
}

function HeaderBar({ onResetClick }: HeaderBarProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <Title level={2} className='m-0 text-lg md:text-xl'>
            Dashboard Builder
          </Title>
          <Text type="secondary" className='text-sm hidden md:block'>
            Drag widgets from the sidebar to build your custom dashboard
          </Text>
        </div>

        {/* Icon only on mobile, text + icon on desktop */}
        <Button
          icon={<ReloadOutlined />}
          onClick={onResetClick}
          size="middle"
          className="flex-shrink-0"
        >
          <span className="hidden md:inline">Reset Layout</span>
        </Button>
      </div>
    </header>
  );
}

export { HeaderBar }