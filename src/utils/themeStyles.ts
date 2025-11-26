import { ThemeType } from '../types/widget.types';
import { blue, gray } from '@ant-design/colors';

export interface ThemeStyles {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}

export const getThemeStyles = (theme?: ThemeType): ThemeStyles => {
  switch (theme) {
    case 'dark':
      return {
        backgroundColor: gray[9],
        textColor: '#ffffff',
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
        textColor: '#000000d9',
        borderColor: gray[5],
      };
  }
};
