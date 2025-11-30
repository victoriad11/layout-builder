import { WidgetTemplate } from '../types';
import {
  DEFAULT_WIDGET_THEME,
  DEFAULT_METRIC_VALUE,
  DEFAULT_TEXT_CONTENT,
  DEFAULT_CHART_TYPE,
  DEFAULT_CHART_DATA,
  DEFAULT_TODO_ITEMS,
  DEFAULT_IMAGE_URL,
} from '../config';

export const WIDGET_TEMPLATES: WidgetTemplate[] = [
  {
    type: 'metric',
    defaultTitle: 'Metric Card',
    icon: '📊',
    description: 'Display a key metric or KPI',
    defaultConfig: {
      theme: DEFAULT_WIDGET_THEME,
      value: DEFAULT_METRIC_VALUE,
    },
  },
  {
    type: 'text',
    defaultTitle: 'Text Block',
    icon: '📝',
    description: 'Rich text content block',
    defaultConfig: {
      theme: DEFAULT_WIDGET_THEME,
      content: DEFAULT_TEXT_CONTENT,
    },
  },
  {
    type: 'chart',
    defaultTitle: 'Chart',
    icon: '📈',
    description: 'Visualization placeholder',
    defaultConfig: {
      theme: DEFAULT_WIDGET_THEME,
      chartType: DEFAULT_CHART_TYPE,
      chartData: [...DEFAULT_CHART_DATA],
    },
  },
  {
    type: 'todo',
    defaultTitle: 'Todo List',
    icon: '✓',
    description: 'Task checklist',
    defaultConfig: {
      theme: DEFAULT_WIDGET_THEME,
      items: [...DEFAULT_TODO_ITEMS],
    },
  },
  {
    type: 'image',
    defaultTitle: 'Image Card',
    icon: '🖼️',
    description: 'Image with caption',
    defaultConfig: {
      theme: DEFAULT_WIDGET_THEME,
      imageUrl: DEFAULT_IMAGE_URL,
    },
  },
];

/**
 * Generate a unique identifier for a new widget instance
 *
 * Creates a unique ID by combining the current timestamp with a random string.
 * This ensures uniqueness even if multiple widgets are created in quick succession.
 *
 * @returns A unique widget ID in the format 'widget-{timestamp}-{random}'
 *
 * @example
 * ```ts
 * const widgetId = generateWidgetId();
 * // Returns: 'widget-1701234567890-a3f2k9d1x'
 * ```
 */
export const generateWidgetId = (): string => {
  return `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
