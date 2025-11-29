import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { ThemeType } from '../../../types';
import { green, red } from '@ant-design/colors'

export const getArrowIcon = (value: number) => {
  if (value > 0) return <ArrowUpOutlined />;
  if (value < 0) return <ArrowDownOutlined />;
  return undefined;
};

export const getValueColor = (value: number, theme?: ThemeType) => {
  if (value > 0) {
    return theme === 'dark' ? green[5] : green[7];
  }
  if (value < 0) {
    return theme === 'dark' ? red[5] : red[7];
  }
  return null;
};
