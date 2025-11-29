import { useDashboardStore } from '../store/dashboardStore';
import { ThemeType } from '../types/widget.types';

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
      items[index] = value;
      updateWidget(selectedWidgetId, { config: { ...selectedWidget.config, items } });
    }
  };

  const handleAddTodoItem = () => {
    if (selectedWidgetId && selectedWidget) {
      const items = [...(selectedWidget.config.items || []), 'New item'];
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
  };
}
