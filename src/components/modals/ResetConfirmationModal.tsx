import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface ResetConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ResetConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: ResetConfirmationModalProps) {
  return (
    <Modal
      title={
        <span>
          <ExclamationCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
          Reset Dashboard?
        </span>
      }
      open={isOpen}
      onOk={onConfirm}
      onCancel={onClose}
      okText="Yes, Reset Everything"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
    >
      <p>
        This will remove all widgets from the canvas. This action cannot be undone.
      </p>
    </Modal>
  );
}
