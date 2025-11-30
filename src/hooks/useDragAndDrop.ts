import { useState } from 'react';
import {
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useDashboardStore } from '../store';
import { WIDGET_TEMPLATES, generateWidgetId } from '../utils';
import { WidgetType } from '../types';
import { DRAG_CONFIG } from '../constants';

export function useDragAndDrop() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const addWidget = useDashboardStore((state) => state.addWidget);
  const reorderWidgets = useDashboardStore((state) => state.reorderWidgets);
  const widgets = useDashboardStore((state) => state.widgets);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: DRAG_CONFIG.ACTIVATION_DISTANCE,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) {
      return;
    }

    const draggedData = active.data.current;

    // Case 1: Dragging a template from sidebar to canvas
    if (draggedData?.type === 'template' && over.id === 'dashboard-canvas') {
      const widgetType = draggedData.widgetType as WidgetType;
      const template = WIDGET_TEMPLATES.find((t) => t.type === widgetType);

      if (template) {
        // Create new widget instance
        const newWidget = {
          id: generateWidgetId(),
          type: template.type,
          title: template.defaultTitle,
          config: { ...template.defaultConfig },
        };

        addWidget(newWidget);
      }
      return;
    }

    // Case 2: Reordering existing widgets on canvas
    if (draggedData?.type === 'widget' && active.id !== over.id) {
      const oldIndex = widgets.findIndex((w) => w.id === active.id);
      const newIndex = widgets.findIndex((w) => w.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedWidgets = arrayMove(widgets, oldIndex, newIndex);
        reorderWidgets(reorderedWidgets);
      }
    }
  };

  return {
    activeId,
    sensors,
    handleDragStart,
    handleDragEnd,
  };
}
