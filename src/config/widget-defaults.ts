import { ThemeType, ChartType } from '../types';

/**
 * Default widget configuration values
 *
 * Centralizes all default values used when creating new widgets
 * or when widget config properties are missing.
 */

/**
 * Default theme for new widgets
 */
export const DEFAULT_WIDGET_THEME: ThemeType = 'light';

/**
 * Default chart type for new chart widgets
 */
export const DEFAULT_CHART_TYPE: ChartType = 'line';

/**
 * Default metric value for new metric widgets
 */
export const DEFAULT_METRIC_VALUE = 0;

/**
 * Default text content for new text widgets
 */
export const DEFAULT_TEXT_CONTENT = 'Add your text content here...';

/**
 * Default placeholder image URL for new image widgets
 */
export const DEFAULT_IMAGE_URL = 'https://placehold.co/400x300/e0f2fe/0958d9?text=Dashboard+Image';

/**
 * Default chart data for new chart widgets
 */
export const DEFAULT_CHART_DATA = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
] as const;

/**
 * Default todo items for new todo widgets
 */
export const DEFAULT_TODO_ITEMS = [
  { text: 'Task 1', completed: false },
  { text: 'Task 2', completed: false },
  { text: 'Task 3', completed: false },
] as const;
