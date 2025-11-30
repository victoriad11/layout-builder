import { describe, it, expect, beforeEach } from 'vitest';
import { useDashboardStore } from './dashboardStore';
import { WidgetInstance } from '../types';

describe('dashboardStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useDashboardStore.getState().resetDashboard();
  });

  describe('initial state', () => {
    it('has empty widgets array after reset', () => {
      const { widgets } = useDashboardStore.getState();

      expect(Array.isArray(widgets)).toBe(true);
      expect(widgets.length).toBe(0);
    });

    it('has null selectedWidgetId initially', () => {
      const { selectedWidgetId } = useDashboardStore.getState();

      expect(selectedWidgetId).toBeNull();
    });
  });

  describe('addWidget', () => {
    it('adds a widget to the store', () => {
      const newWidget: WidgetInstance = {
        id: 'test-1',
        type: 'metric',
        title: 'Test Metric',
        config: { theme: 'light', value: 100 },
      };

      useDashboardStore.getState().addWidget(newWidget);

      const { widgets } = useDashboardStore.getState();
      expect(widgets).toHaveLength(1);
      expect(widgets[0]).toEqual(newWidget);
    });

    it('adds multiple widgets', () => {
      const widget1: WidgetInstance = {
        id: 'test-1',
        type: 'metric',
        title: 'Widget 1',
        config: { theme: 'light' },
      };

      const widget2: WidgetInstance = {
        id: 'test-2',
        type: 'text',
        title: 'Widget 2',
        config: { theme: 'dark' },
      };

      useDashboardStore.getState().addWidget(widget1);
      useDashboardStore.getState().addWidget(widget2);

      const { widgets } = useDashboardStore.getState();
      expect(widgets).toHaveLength(2);
      expect(widgets[0].id).toBe('test-1');
      expect(widgets[1].id).toBe('test-2');
    });
  });

  describe('removeWidget', () => {
    it('removes a widget by ID', () => {
      const widget: WidgetInstance = {
        id: 'test-1',
        type: 'metric',
        title: 'Test',
        config: { theme: 'light' },
      };

      useDashboardStore.getState().addWidget(widget);
      expect(useDashboardStore.getState().widgets).toHaveLength(1);

      useDashboardStore.getState().removeWidget('test-1');

      const { widgets } = useDashboardStore.getState();
      expect(widgets).toHaveLength(0);
    });

    it('clears selectedWidgetId when removing selected widget', () => {
      const widget: WidgetInstance = {
        id: 'test-1',
        type: 'metric',
        title: 'Test',
        config: { theme: 'light' },
      };

      useDashboardStore.getState().addWidget(widget);
      useDashboardStore.getState().setSelectedWidget('test-1');

      expect(useDashboardStore.getState().selectedWidgetId).toBe('test-1');

      useDashboardStore.getState().removeWidget('test-1');

      expect(useDashboardStore.getState().selectedWidgetId).toBeNull();
    });

    it('keeps selectedWidgetId when removing different widget', () => {
      const widget1: WidgetInstance = {
        id: 'test-1',
        type: 'metric',
        title: 'Widget 1',
        config: { theme: 'light' },
      };

      const widget2: WidgetInstance = {
        id: 'test-2',
        type: 'text',
        title: 'Widget 2',
        config: { theme: 'dark' },
      };

      useDashboardStore.getState().addWidget(widget1);
      useDashboardStore.getState().addWidget(widget2);
      useDashboardStore.getState().setSelectedWidget('test-1');

      useDashboardStore.getState().removeWidget('test-2');

      expect(useDashboardStore.getState().selectedWidgetId).toBe('test-1');
    });
  });

  describe('updateWidget', () => {
    it('updates widget properties', () => {
      const widget: WidgetInstance = {
        id: 'test-1',
        type: 'metric',
        title: 'Original Title',
        config: { theme: 'light', value: 100 },
      };

      useDashboardStore.getState().addWidget(widget);

      useDashboardStore.getState().updateWidget('test-1', {
        title: 'Updated Title',
      });

      const { widgets } = useDashboardStore.getState();
      expect(widgets[0].title).toBe('Updated Title');
      expect(widgets[0].config.value).toBe(100); // unchanged
    });

    it('updates widget config', () => {
      const widget: WidgetInstance = {
        id: 'test-1',
        type: 'metric',
        title: 'Test',
        config: { theme: 'light', value: 100 },
      };

      useDashboardStore.getState().addWidget(widget);

      useDashboardStore.getState().updateWidget('test-1', {
        config: { theme: 'dark' },
      });

      const { widgets } = useDashboardStore.getState();
      expect(widgets[0].config.theme).toBe('dark');
      expect(widgets[0].config.value).toBe(100); // preserved
    });
  });

  describe('reorderWidgets', () => {
    it('reorders widgets', () => {
      const widgets: WidgetInstance[] = [
        { id: 'test-1', type: 'metric', title: 'Widget 1', config: { theme: 'light' } },
        { id: 'test-2', type: 'text', title: 'Widget 2', config: { theme: 'light' } },
        { id: 'test-3', type: 'chart', title: 'Widget 3', config: { theme: 'light' } },
      ];

      widgets.forEach(w => useDashboardStore.getState().addWidget(w));

      const reordered = [widgets[2], widgets[0], widgets[1]];
      useDashboardStore.getState().reorderWidgets(reordered);

      const { widgets: stateWidgets } = useDashboardStore.getState();
      expect(stateWidgets[0].id).toBe('test-3');
      expect(stateWidgets[1].id).toBe('test-1');
      expect(stateWidgets[2].id).toBe('test-2');
    });
  });

  describe('setSelectedWidget', () => {
    it('sets selected widget ID', () => {
      useDashboardStore.getState().setSelectedWidget('test-1');

      expect(useDashboardStore.getState().selectedWidgetId).toBe('test-1');
    });

    it('can set selected widget to null', () => {
      useDashboardStore.getState().setSelectedWidget('test-1');
      useDashboardStore.getState().setSelectedWidget(null);

      expect(useDashboardStore.getState().selectedWidgetId).toBeNull();
    });
  });

  describe('resetDashboard', () => {
    it('clears all widgets', () => {
      const widget: WidgetInstance = {
        id: 'test-1',
        type: 'metric',
        title: 'Test',
        config: { theme: 'light' },
      };

      useDashboardStore.getState().addWidget(widget);
      expect(useDashboardStore.getState().widgets).toHaveLength(1);

      useDashboardStore.getState().resetDashboard();

      expect(useDashboardStore.getState().widgets).toHaveLength(0);
    });

    it('clears selected widget ID', () => {
      useDashboardStore.getState().setSelectedWidget('test-1');

      useDashboardStore.getState().resetDashboard();

      expect(useDashboardStore.getState().selectedWidgetId).toBeNull();
    });
  });
});
