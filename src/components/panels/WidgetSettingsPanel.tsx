import { Drawer, Form, Input, Select, Button, Divider, Space } from 'antd';
import { CloseOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useWidgetSettings } from '../../hooks/useWidgetSettings';

export default function WidgetSettingsPanel() {
  const {
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
  } = useWidgetSettings();

  const renderContentSettings = () => {
    switch (selectedWidget?.type) {
      case 'metric':
        return (
          <Form.Item label="Value">
            <Input
              type="number"
              value={selectedWidget.config.value || 0}
              onChange={handleMetricValueChange}
              placeholder="Enter metric value"
            />
          </Form.Item>
        );

      case 'text':
        return (
          <Form.Item label="Content">
            <Input.TextArea
              value={selectedWidget?.config.content || ''}
              onChange={handleTextContentChange}
              placeholder="Enter text content"
              rows={4}
            />
          </Form.Item>
        );

      case 'image':
        return (
          <>
            <Form.Item label="Image URL">
              <Input
                value={selectedWidget?.config.imageUrl || ''}
                onChange={handleImageUrlChange}
                placeholder="Enter image URL"
              />
            </Form.Item>
            {selectedWidget?.config.imageUrl && (
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-2">Preview:</div>
                <img
                  src={selectedWidget.config.imageUrl}
                  alt="Preview"
                  className="w-full rounded-lg border border-gray-200"
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
              </div>
            )}
          </>
        );

      case 'todo':
        const todoItems = selectedWidget?.config.items || [];
        return (
          <>
            <Form.Item label="Todo Items">
              <Space orientation='vertical' style={{ width: '100%' }} size="small">
                {todoItems.map((item: string, index: number) => (
                  <Space.Compact key={index} style={{ width: '100%' }}>
                    <Input
                      value={item}
                      onChange={(e) => handleTodoItemChange(index, e.target.value)}
                      placeholder="Enter todo item"
                    />
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveTodoItem(index)}
                    />
                  </Space.Compact>
                ))}
              </Space>
            </Form.Item>
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={handleAddTodoItem}
            >
              Add Item
            </Button>
          </>
        );

      case 'chart':
        return (
          <div className="text-sm text-gray-500 italic">
            Chart widgets display placeholder content only
          </div>
        );

      default:
        return null;
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
      size={360}
      closeIcon={<CloseOutlined />}
    >
      <Form layout="vertical">
        {/* General Settings */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">General Settings</h3>

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
        </div>

        <Divider />

        {/* Content Settings */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Content Settings</h3>
          {renderContentSettings()}
        </div>

        <Divider />

        {/* Widget Info */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
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
