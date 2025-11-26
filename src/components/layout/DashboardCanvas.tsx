import { Empty } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { useDashboardStore } from '../../store/dashboardStore';
import DashboardWidget from '../widgets/DashboardWidget';

export default function DashboardCanvas() {
  const widgets = useDashboardStore((state) => state.widgets);

  if (widgets.length === 0) {
    return (
      <main className="flex-1 bg-gray-50 p-8">
        <div className="h-full flex items-center justify-center">
          <Empty
            image={<AppstoreAddOutlined className='text-gray-300' style={{ fontSize: 64 }} />}
            description={
              <div>
                <div className="text-lg font-medium text-gray-900 mb-2">
                  Your dashboard is empty
                </div>
                <div className="text-sm text-gray-500 max-w-sm mx-auto">
                  Drag widgets from the sidebar to start building your custom dashboard layout
                </div>
              </div>
            }
          />
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-4">
        {widgets.map((widget) => (
          <DashboardWidget key={widget.id} widget={widget} />
        ))}
      </div>
    </main>
  );
}
