import { Empty } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { gray } from '@ant-design/colors';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '../../store';
import { DashboardWidget } from '../widgets';

export default function DashboardCanvas() {
  const widgets = useDashboardStore((state) => state.widgets);
  const { setNodeRef } = useDroppable({
    id: 'dashboard-canvas',
  });

  // Extract widget IDs for SortableContext
  const widgetIds = widgets.map((widget) => widget.id);

  if (widgets.length === 0) {
    return (
      <main
        ref={setNodeRef}
        className="flex-1 bg-gray-50 p-8"
      >
        <div className="h-full flex items-center justify-center">
          <Empty
            image={<AppstoreAddOutlined style={{ fontSize: 64, color: gray[4] }} />}
            description={
              <div>
                <div className="text-lg font-medium mb-2" style={{ color: gray[9] }}>
                  Your dashboard is empty
                </div>
                <div className="text-sm max-w-sm mx-auto" style={{ color: gray[6] }}>
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
    >
      <div className="max-w-5xl mx-auto space-y-4 pb-96">
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
