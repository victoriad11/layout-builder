import { useState, useEffect } from 'react';
import { Drawer, Form, Input, Select, Button, Divider, Space } from 'antd';
import { CloseOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useWidgetSettings } from '../../hooks';
import { TodoItem } from '../../types';

function WidgetSettingsPanel() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    handleChartDataChange,
    handleAddChartDataPoint,
    handleRemoveChartDataPoint,
    handleChartTypeChange,
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
                {todoItems.map((item: TodoItem, index: number) => (
                  <Space.Compact key={index} style={{ width: '100%' }}>
                    <Input
                      value={item.text}
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
        const chartData = selectedWidget?.config.chartData || [];
        return (
          <>
            <Form.Item label="Chart Type">
              <Select
                value={selectedWidget.config.chartType || 'line'}
                onChange={handleChartTypeChange}
                options={[
                  { label: 'Line Chart', value: 'line' },
                  { label: 'Bar Chart', value: 'bar' },
                  { label: 'Area Chart', value: 'area' },
                  { label: 'Pie Chart', value: 'pie' },
                ]}
              />
            </Form.Item>
            <Form.Item label="Chart Data Points">
              <Space orientation="vertical" style={{ width: '100%' }} size="small">
                {chartData.map((point: { name: string; value: number }, index: number) => (
                  <Space.Compact key={index} style={{ width: '100%' }}>
                    <Input
                      value={point.name}
                      onChange={(e) => handleChartDataChange(index, 'name', e.target.value)}
                      placeholder="Label"
                      style={{ width: '40%' }}
                    />
                    <Input
                      type="number"
                      value={point.value}
                      onChange={(e) => handleChartDataChange(index, 'value', e.target.value)}
                      placeholder="Value"
                      style={{ width: '40%' }}
                    />
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveChartDataPoint(index)}
                    />
                  </Space.Compact>
                ))}
              </Space>
            </Form.Item>
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={handleAddChartDataPoint}
            >
              Add Data Point
            </Button>
          </>
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
      placement={isMobile ? 'bottom' : 'right'}
      onClose={handleClose}
      open={!!selectedWidgetId}
      size={isMobile ? 'large' : 360}
      closeIcon={<CloseOutlined />}
      styles={isMobile ? {
        body: {
          paddingBottom: 'calc(16px + env(safe-area-inset-bottom))'
        },
        header: {
          paddingTop: 'calc(16px + env(safe-area-inset-top))'
        }
      } : undefined}
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

export { WidgetSettingsPanel }