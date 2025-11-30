import { ThemeType } from '../types';
import { blue, gray } from '@ant-design/colors';

export interface ThemeStyles {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

const ANT_TEXT_COLOR = 'rgba(0, 0, 0, 0.88)';

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
