import { WidgetTemplate } from '../types';

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
      chartType: 'line',
      chartData: [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 },
        { name: 'May', value: 500 },
        { name: 'Jun', value: 700 },
      ],
    },
  },
  {
    type: 'todo',
    defaultTitle: 'Todo List',
    icon: '✓',
    description: 'Task checklist',
    defaultConfig: {
      theme: 'light',
      items: [
        { text: 'Task 1', completed: false },
        { text: 'Task 2', completed: false },
        { text: 'Task 3', completed: false },
      ],
    },
  },
  {
    type: 'image',
    defaultTitle: 'Image Card',
    icon: '🖼️',
    description: 'Image with caption',
    defaultConfig: {
      theme: 'light',
      imageUrl: 'https://placehold.co/400x300/e0f2fe/0958d9?text=Dashboard+Image',
    },
  },
];

// Helper function to generate unique widget IDs
export const generateWidgetId = (): string => {
  return `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
