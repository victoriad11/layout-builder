import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ConfigProvider } from 'antd';

/**
 * Custom render function that wraps components with necessary providers
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ConfigProvider>
        {children}
      </ConfigProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
