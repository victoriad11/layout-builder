import { useState } from 'react';
import { ConfigProvider, FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { gray } from '@ant-design/colors';
import { DndContext } from '@dnd-kit/core';
import { HeaderBar } from './components/layout/HeaderBar';
import { SidebarLibrary } from './components/layout/SidebarLibrary';
import { DashboardCanvas } from './components/layout/DashboardCanvas';
import { DragOverlayWrapper } from './components/layout/DragOverlayWrapper';
import { ResetConfirmationModal } from './components/modals/ResetConfirmationModal';
import { WidgetSettingsPanel } from './components/panels/WidgetSettingsPanel';
import { MobileWidgetDrawer } from './components/mobile/MobileWidgetDrawer';
import { useDashboardStore } from './store/dashboardStore';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { antdThemeConfig } from './lib/antd-theme';

function App() {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const resetDashboard = useDashboardStore((state) => state.resetDashboard);

  const widgets = useDashboardStore((state) => state.widgets);

  const { activeId, sensors, handleDragStart, handleDragEnd } = useDragAndDrop();

  const handleResetConfirm = () => {
    resetDashboard();
    setIsResetModalOpen(false);
  };

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="h-screen flex flex-col" style={{ backgroundColor: gray[2] }}>
          <HeaderBar onResetClick={() => setIsResetModalOpen(true)} />

          <div className="flex-1 flex overflow-hidden">
            {/* Desktop sidebar - hidden on mobile (< md breakpoint) */}
            <div className="hidden md:block">
              <SidebarLibrary />
            </div>
            <DashboardCanvas />
          </div>

          <ResetConfirmationModal
            isOpen={isResetModalOpen}
            onClose={() => setIsResetModalOpen(false)}
            onConfirm={handleResetConfirm}
          />

          <WidgetSettingsPanel />

          {/* Mobile drawer - only visible on mobile */}
          <MobileWidgetDrawer
            open={isMobileDrawerOpen}
            onClose={() => setIsMobileDrawerOpen(false)}
          />

          {/* Floating action button for mobile - hidden on desktop */}
          <div className="md:hidden">
            <FloatButton
              icon={<PlusOutlined />}
              type="primary"
              style={{ right: 24, bottom: 24 }}
              onClick={() => setIsMobileDrawerOpen(true)}
              tooltip="Add Widget"
            />
          </div>
        </div>

        <DragOverlayWrapper activeId={activeId} widgets={widgets} />
      </DndContext>
    </ConfigProvider>
  );
}

export default App;
