import { Empty } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '../../store/dashboardStore';
import { DashboardWidget } from '../widgets/DashboardWidget';

export default function DashboardCanvas() {
  const widgets = useDashboardStore((state) => state.widgets);
  const { setNodeRef, isOver } = useDroppable({
    id: 'dashboard-canvas',
  });

  // Extract widget IDs for SortableContext
  const widgetIds = widgets.map((widget) => widget.id);

  if (widgets.length === 0) {
    return (
      <main
        ref={setNodeRef}
        className="flex-1 bg-gray-50 p-8"
        style={{
          backgroundColor: isOver ? '#e0f2fe' : undefined,
        }}
      >
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
    <main
      ref={setNodeRef}
      className="flex-1 bg-gray-50 p-8 overflow-y-auto"
      style={{
        backgroundColor: isOver ? '#e0f2fe' : undefined,
      }}
    >
      <div className="max-w-5xl mx-auto space-y-4">
        <SortableContext items={widgetIds} strategy={verticalListSortingStrategy}>
          <AnimatePresence mode="popLayout">
            {widgets.map((widget) => (
              <DashboardWidget key={widget.id} widget={widget} />
            ))}
          </AnimatePresence>
        </SortableContext>
      </div>
    </main>
  );
}
