import { ThemeType } from '../types';
import { blue, gray } from '@ant-design/colors';

export interface ThemeStyles {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

const ANT_TEXT_COLOR = 'rgba(0, 0, 0, 0.88)';

/**
 * Get theme-specific styles for widget cards
 *
 * Returns appropriate colors for background, text, and borders based on the selected theme.
 * Uses Ant Design color tokens for consistency.
 *
 * @param theme - The theme type ('light', 'dark', or 'accent'). Defaults to 'light' if not specified.
 * @returns An object containing backgroundColor, textColor, and borderColor
 *
 * @example
 * ```ts
 * const styles = getThemeStyles('dark');
 * // Returns: { backgroundColor: gray[9], textColor: gray[2], borderColor: gray[8] }
 * ```
 */
export const getThemeStyles = (theme?: ThemeType): ThemeStyles => {
  switch (theme) {
    case 'dark':
      return {
        backgroundColor: gray[9],
        textColor: gray[2],
        borderColor: gray[8],
      };
    case 'accent':
      return {
        backgroundColor: blue[0],
        textColor: blue[6],
        borderColor: blue[3],
      };
    case 'light':
    default:
      return {
        backgroundColor: '#ffffff',
        textColor: ANT_TEXT_COLOR,
        borderColor: gray[5],
      };
  }
};
