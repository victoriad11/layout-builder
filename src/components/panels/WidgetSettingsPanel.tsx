import { Drawer, Form, Input, Select, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useDashboardStore } from '../../store/dashboardStore';
import { ThemeType } from '../../types/widget.types';

export default function WidgetSettingsPanel() {
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

  if (!selectedWidget) {
    return null;
  }

  return (
    <Drawer
      title="Widget Settings"
      placement="right"
      onClose={handleClose}
      open={!!selectedWidgetId}
      width={360}
      closeIcon={<CloseOutlined />}
    >
      <Form layout="vertical">
        <Form.Item label="Widget Title">
          <Input
            value={selectedWidget.title}
            onChange={handleTitleChange}
            placeholder="Enter widget title"
          />
        </Form.Item>

        <Form.Item label="Theme">
          <Select
            value={selectedWidget.config.theme || 'light'}
            onChange={handleThemeChange}
            options={[
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
              { label: 'Accent', value: 'accent' },
            ]}
          />
        </Form.Item>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">
            <strong>Widget Type:</strong> {selectedWidget.type}
          </div>
          <div className="text-sm text-gray-600">
            <strong>Widget ID:</strong> {selectedWidget.id}
          </div>
        </div>

        <div className="mt-6">
          <Button type="primary" block onClick={handleClose}>
            Done
          </Button>
        </div>
      </Form>
    </Drawer>
  );
}
