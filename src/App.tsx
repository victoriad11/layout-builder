import { useState } from 'react';
import HeaderBar from './components/layout/HeaderBar';
import SidebarLibrary from './components/layout/SidebarLibrary';
import DashboardCanvas from './components/layout/DashboardCanvas';
import ResetConfirmationModal from './components/modals/ResetConfirmationModal';
import { useDashboardStore } from './store/dashboardStore';

function App() {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const resetDashboard = useDashboardStore((state) => state.resetDashboard);

  const handleResetConfirm = () => {
    resetDashboard();
    setIsResetModalOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <HeaderBar onResetClick={() => setIsResetModalOpen(true)} />

      <div className="flex-1 flex overflow-hidden">
        <SidebarLibrary />
        <DashboardCanvas />
      </div>

      <ResetConfirmationModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetConfirm}
      />
    </div>
  );
}

export default App;
