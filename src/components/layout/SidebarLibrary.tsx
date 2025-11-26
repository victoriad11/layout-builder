import { WIDGET_TEMPLATES } from '../../utils/widgetTemplates';

export default function SidebarLibrary() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Widgets</h2>
        <p className="text-xs text-gray-500 mt-1">
          Drag to add to your dashboard
        </p>
      </div>

      <div className="space-y-2">
        {WIDGET_TEMPLATES.map((template) => (
          <div
            key={template.type}
            className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-move hover:bg-gray-100 hover:border-gray-300 transition-colors"
          >
            <div className="text-2xl">{template.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">
                {template.defaultTitle}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {template.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
