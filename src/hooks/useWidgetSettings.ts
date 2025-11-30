import { useDashboardStore } from '../store';
import { ThemeType, ChartType } from '../types';

export function useWidgetSettings() {
  const selectedWidgetId = useDashboardStore((state) => state.selectedWidgetId);
  const widgets = useDashboardStore((state) => state.widgets);
  const updateWidget = useDashboardStore((state) => state.updateWidget);
  const setSelectedWidget = useDashboardStore((state) => state.setSelectedWidget);

  const selectedWidget = widgets.find((w) => w.id === selectedWidgetId);

  const handleClose = () => {
    setSelectedWidget(null);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedWidgetId) {
      updateWidget(selectedWidgetId, { title: e.target.value });
    }
  };

  const handleThemeChange = (theme: ThemeType) => {
    if (selectedWidgetId) {
      updateWidget(selectedWidgetId, { config: { theme } });
    }
  };

  const handleMetricValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedWidgetId) {
      const value = parseFloat(e.target.value) || 0;
      updateWidget(selectedWidgetId, { config: { ...selectedWidget?.config, value } });
    }
  };

  const handleTextContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedWidgetId) {
      updateWidget(selectedWidgetId, { config: { ...selectedWidget?.config, content: e.target.value } });
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedWidgetId) {
      updateWidget(selectedWidgetId, { config: { ...selectedWidget?.config, imageUrl: e.target.value } });
    }
  };

  const handleTodoItemChange = (index: number, value: string) => {
    if (selectedWidgetId && selectedWidget) {
      const items = [...(selectedWidget.config.items || [])];
      items[index] = { ...items[index], text: value };
      updateWidget(selectedWidgetId, { config: { ...selectedWidget.config, items } });
    }
  };

  const handleAddTodoItem = () => {
    if (selectedWidgetId && selectedWidget) {
      const items = [...(selectedWidget.config.items || []), { text: 'New item', completed: false }];
      updateWidget(selectedWidgetId, { config: { ...selectedWidget.config, items } });
    }
  };

  const handleRemoveTodoItem = (index: number) => {
    if (selectedWidgetId && selectedWidget) {
      const items = [...(selectedWidget.config.items || [])];
      items.splice(index, 1);
      updateWidget(selectedWidgetId, { config: { ...selectedWidget.config, items } });
    }
  };

  const handleChartDataChange = (index: number, field: 'name' | 'value', value: string) => {
    if (selectedWidgetId && selectedWidget) {
      const chartData = [...(selectedWidget.config.chartData || [])];
      chartData[index] = {
        ...chartData[index],
        [field]: field === 'value' ? parseFloat(value) || 0 : value
      };
      updateWidget(selectedWidgetId, { config: { ...selectedWidget.config, chartData } });
    }
  };

  const handleAddChartDataPoint = () => {
    if (selectedWidgetId && selectedWidget) {
      const chartData = [...(selectedWidget.config.chartData || []), { name: 'New', value: 0 }];
      updateWidget(selectedWidgetId, { config: { ...selectedWidget.config, chartData } });
    }
  };

  const handleRemoveChartDataPoint = (index: number) => {
    if (selectedWidgetId && selectedWidget) {
      const chartData = [...(selectedWidget.config.chartData || [])];
      chartData.splice(index, 1);
      updateWidget(selectedWidgetId, { config: { ...selectedWidget.config, chartData } });
    }
  };

  const handleChartTypeChange = (chartType: ChartType) => {
    if (selectedWidgetId) {
      updateWidget(selectedWidgetId, { config: { ...selectedWidget?.config, chartType } });
    }
  };

  return {
    selectedWidget,
    selectedWidgetId,
    handleClose,
    handleTitleChange,
    handleThemeChange,
    handleMetricValueChange,
    handleTextContentChange,
    handleImageUrlChange,
    handleTodoItemChange,
    handleAddTodoItem,
    handleRemoveTodoItem,
    handleChartDataChange,
    handleAddChartDataPoint,
    handleRemoveChartDataPoint,
    handleChartTypeChange,
  };
}
