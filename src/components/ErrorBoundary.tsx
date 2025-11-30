import { Result, Button } from 'antd';
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { ReactNode } from 'react';

/**
 * Error fallback component displayed when an error is caught
 *
 * Shows a user-friendly error message with options to retry or reload
 */
function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Result
        status="error"
        title="Something went wrong"
        subTitle="We're sorry for the inconvenience. The application encountered an error."
        extra={[
          <Button key="retry" onClick={resetErrorBoundary}>
            Try Again
          </Button>,
          <Button type="primary" key="reload" onClick={handleReload}>
            Reload Application
          </Button>,
        ]}
      />
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

/**
 * Error Boundary wrapper using react-error-boundary
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of crashing.
 */
export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
