import { DragOverlay } from '@dnd-kit/core';
import { Card } from 'antd';
import { WidgetInstance } from '../../types/widget.types';
import { WIDGET_TEMPLATES } from '../../utils/widgetTemplates';
import DashboardWidget from '../widgets/DashboardWidget';

interface DragOverlayWrapperProps {
  activeId: string | null;
  widgets: WidgetInstance[];
}

export default function DragOverlayWrapper({ activeId, widgets }: DragOverlayWrapperProps) {
  return (
    <DragOverlay>
      {activeId ? (() => {
        // Check if dragging a widget from the canvas
        const draggedWidget = widgets.find((w) => w.id === activeId);

        if (draggedWidget) {
          // Dragging an existing widget - show the widget with reduced opacity
          return (
            <div style={{ opacity: 0.6, cursor: 'grabbing' }}>
              <DashboardWidget widget={draggedWidget} />
            </div>
          );
        }

        // Dragging a template from sidebar - show template preview
        const widgetType = activeId.replace('template-', '');
        const template = WIDGET_TEMPLATES.find((t) => t.type === widgetType);

        if (template) {
          return (
            <Card
              size="small"
              className="w-64 shadow-xl"
              style={{ opacity: 0.8, cursor: 'grabbing' }}
            >
              <div className="flex items-center gap-4">
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
            </Card>
          );
        }

        return null;
      })() : null}
    </DragOverlay>
  );
}
