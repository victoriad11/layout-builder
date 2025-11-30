import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { ThemeType } from '../../../types';
import { green, red } from '@ant-design/colors'

/**
 * Get the appropriate arrow icon based on metric value
 *
 * @param value - The numeric metric value
 * @returns ArrowUpOutlined for positive values, ArrowDownOutlined for negative values, undefined for zero
 */
export const getArrowIcon = (value: number) => {
  if (value > 0) return <ArrowUpOutlined />;
  if (value < 0) return <ArrowDownOutlined />;
  return undefined;
};

/**
 * Get the appropriate color for a metric value based on its sign and theme
 *
 * Uses green for positive values and red for negative values, with different
 * shades depending on the theme (lighter for dark themes, darker for light themes).
 *
 * @param value - The numeric metric value
 * @param theme - The theme type ('light', 'dark', or 'accent')
 * @returns Color string for positive/negative values, null for zero
 */
export const getValueColor = (value: number, theme?: ThemeType) => {
  if (value > 0) {
    return theme === 'dark' ? green[5] : green[7];
  }
  if (value < 0) {
    return theme === 'dark' ? red[5] : red[7];
  }
  return null;
};
