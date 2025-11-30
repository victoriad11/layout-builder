import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DashboardStore, WidgetInstance } from '../types';

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      widgets: [
        {
          id: 'test-widget-1',
          type: 'metric',
          title: 'Total Revenue',
          config: {
            theme: 'light',
            value: 12450,
          },
        },
      ],
      selectedWidgetId: null,

      addWidget: (widget: WidgetInstance) =>
        set((state) => ({
          widgets: [...state.widgets, widget],
        })),

      removeWidget: (id: string) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
          selectedWidgetId: state.selectedWidgetId === id ? null : state.selectedWidgetId,
        })),

      reorderWidgets: (newOrder: WidgetInstance[]) =>
        set(() => ({
          widgets: newOrder,
        })),

      updateWidget: (id: string, updates: Partial<WidgetInstance>) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id
              ? { ...widget, ...updates, config: { ...widget.config, ...updates.config } }
              : widget
          ),
        })),

      setSelectedWidget: (id: string | null) =>
        set(() => ({
          selectedWidgetId: id,
        })),

      resetDashboard: () =>
        set(() => ({
          widgets: [],
          selectedWidgetId: null,
        })),
    }),
    {
      name: 'dashboard-storage', // localStorage key
    }
  )
);
