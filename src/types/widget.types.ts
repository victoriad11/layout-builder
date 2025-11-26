export type WidgetType = "metric" | "text" | "chart" | "todo" | "image";

export type ThemeType = "light" | "dark" | "accent";

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

export interface WidgetTemplate {
  type: WidgetType;
  defaultTitle: string;
  icon: string;
  description: string;
  defaultConfig: WidgetInstance['config'];
}

export interface DashboardStore {
  widgets: WidgetInstance[];
  selectedWidgetId: string | null;

  addWidget: (widget: WidgetInstance) => void;
  removeWidget: (id: string) => void;
  reorderWidgets: (newOrder: WidgetInstance[]) => void;
  updateWidget: (id: string, updates: Partial<WidgetInstance>) => void;
  setSelectedWidget: (id: string | null) => void;
  resetDashboard: () => void;
}
