import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DashboardStore, WidgetInstance } from '../types/widget.types';

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      // Initial state
      widgets: [],
      selectedWidgetId: null,

      // Add a new widget to the dashboard
      addWidget: (widget: WidgetInstance) =>
        set((state) => ({
          widgets: [...state.widgets, widget],
        })),

      // Remove a widget by ID
      removeWidget: (id: string) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
          selectedWidgetId: state.selectedWidgetId === id ? null : state.selectedWidgetId,
        })),

      // Reorder widgets (used after drag & drop)
      reorderWidgets: (newOrder: WidgetInstance[]) =>
        set(() => ({
          widgets: newOrder,
        })),

      // Update a specific widget's properties
      updateWidget: (id: string, updates: Partial<WidgetInstance>) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id
              ? { ...widget, ...updates, config: { ...widget.config, ...updates.config } }
              : widget
          ),
        })),

      // Set the currently selected widget (for settings panel)
      setSelectedWidget: (id: string | null) =>
        set(() => ({
          selectedWidgetId: id,
        })),

      // Reset the entire dashboard
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
