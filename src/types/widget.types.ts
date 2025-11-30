export type WidgetType = "metric" | "text" | "chart" | "todo" | "image";

export type ThemeType = "light" | "dark" | "accent";

export type ChartType = "line" | "bar" | "area" | "pie";

export interface TodoItem {
  text: string;
  completed: boolean;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface WidgetInstance {
  id: string;
  type: WidgetType;
  title: string;
  config: {
    theme?: ThemeType;
    // Widget-specific configuration
    value?: number;  // For metric widgets
    content?: string;  // For text widgets
    items?: TodoItem[];  // For todo widgets
    imageUrl?: string;  // For image widgets
    chartType?: ChartType;  // For chart widgets
    chartData?: ChartDataPoint[];  // For chart widgets
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
