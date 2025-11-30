import { theme } from 'antd';
import { blue } from '@ant-design/colors';
import type { ThemeConfig } from 'antd';

/**
 * Ant Design theme configuration for the application
 *
 * Centralizes all Ant Design theming configuration including:
 * - Color tokens
 * - Typography settings
 * - Border radius
 * - Algorithm (light/dark mode)
 */
export const antdThemeConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    /** Primary brand color used throughout the application */
    colorPrimary: blue[6],

    /** Border radius for components (buttons, cards, inputs, etc.) */
    borderRadius: 8,

    /** Base font size for the application */
    fontSize: 14,
  },
};
