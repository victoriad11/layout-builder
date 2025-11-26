import { WidgetTemplate } from '../types/widget.types';

export const WIDGET_TEMPLATES: WidgetTemplate[] = [
  {
    type: 'metric',
    defaultTitle: 'Metric Card',
    icon: '📊',
    description: 'Display a key metric or KPI',
    defaultConfig: {
      theme: 'light',
      value: 1234,
    },
  },
  {
    type: 'text',
    defaultTitle: 'Text Block',
    icon: '📝',
    description: 'Rich text content block',
    defaultConfig: {
      theme: 'light',
      content: 'This is a text block widget. You can add any content here.',
    },
  },
  {
    type: 'chart',
    defaultTitle: 'Chart',
    icon: '📈',
    description: 'Visualization placeholder',
    defaultConfig: {
      theme: 'light',
    },
  },
  {
    type: 'todo',
    defaultTitle: 'Todo List',
    icon: '✓',
    description: 'Task checklist',
    defaultConfig: {
      theme: 'light',
      items: ['Task 1', 'Task 2', 'Task 3'],
    },
  },
  {
    type: 'image',
    defaultTitle: 'Image Card',
    icon: '🖼️',
    description: 'Image with caption',
    defaultConfig: {
      theme: 'light',
      imageUrl: 'https://via.placeholder.com/400x300',
    },
  },
];

// Helper function to generate unique widget IDs
export const generateWidgetId = (): string => {
  return `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
