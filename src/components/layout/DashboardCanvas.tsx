import { useDashboardStore } from '../../store/dashboardStore';
import { LayoutGrid } from 'lucide-react';

export default function DashboardCanvas() {
  const widgets = useDashboardStore((state) => state.widgets);

  // Empty state when no widgets
  if (widgets.length === 0) {
    return (
      <main className="flex-1 bg-gray-50 p-8">
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
              <LayoutGrid className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your dashboard is empty
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Drag widgets from the sidebar to start building your custom dashboard layout
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Canvas with widgets
  return (
    <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-4">
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="text-sm font-medium text-gray-900">{widget.title}</div>
            <div className="text-xs text-gray-500 mt-1">Type: {widget.type}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
