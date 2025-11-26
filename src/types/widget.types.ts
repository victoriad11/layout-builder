// Widget type definitions
export type WidgetType = "metric" | "text" | "chart" | "todo" | "image";

// Theme options for widgets
export type ThemeType = "light" | "dark" | "accent";

// Widget instance on the canvas
export interface WidgetInstance {
  id: string;
  type: WidgetType;
  title: string;
  config: {
    theme?: ThemeType;
    // Widget-specific configuration
    value?: number;  // For metric widgets
    content?: string;  // For text widgets
    items?: string[];  // For todo widgets
    imageUrl?: string;  // For image widgets
    [key: string]: any;  // Allow additional properties
  };
}

// Widget template definition for the sidebar
export interface WidgetTemplate {
  type: WidgetType;
  defaultTitle: string;
  icon: string;
  description: string;
  defaultConfig: WidgetInstance['config'];
}

// Dashboard store state and actions
export interface DashboardStore {
  // State
  widgets: WidgetInstance[];
  selectedWidgetId: string | null;

  // Actions
  addWidget: (widget: WidgetInstance) => void;
  removeWidget: (id: string) => void;
  reorderWidgets: (newOrder: WidgetInstance[]) => void;
  updateWidget: (id: string, updates: Partial<WidgetInstance>) => void;
  setSelectedWidget: (id: string | null) => void;
  resetDashboard: () => void;
}
