import { describe, it, expect } from 'vitest';
import { getChartColors } from './utils';
import { blue, gold, gray } from '@ant-design/colors';

describe('ChartWidget utils', () => {
  describe('getChartColors', () => {
    it('returns light theme colors by default', () => {
      const colors = getChartColors();

      expect(colors.primary).toBe(blue[5]);
      expect(colors.grid).toBe(gray[4]);
      expect(colors.text).toBe(gray[8]);
      expect(colors.background).toBe('#ffffff');
    });

    it('returns light theme colors when explicitly set', () => {
      const colors = getChartColors('light');

      expect(colors.primary).toBe(blue[5]);
      expect(colors.grid).toBe(gray[4]);
      expect(colors.text).toBe(gray[8]);
      expect(colors.background).toBe('#ffffff');
    });

    it('returns dark theme colors', () => {
      const colors = getChartColors('dark');

      expect(colors.primary).toBe(blue[4]);
      expect(colors.grid).toBe(gray[7]);
      expect(colors.text).toBe(gray[3]);
      expect(colors.background).toBe(gray[9]);
    });

    it('returns accent theme colors', () => {
      const colors = getChartColors('accent');

      expect(colors.primary).toBe(gold[5]);
      expect(colors.grid).toBe(gray[4]);
      expect(colors.text).toBe(gray[3]);
      expect(colors.background).toBe(gold[5]);
    });

    it('uses different primary colors for each theme', () => {
      const lightColors = getChartColors('light');
      const darkColors = getChartColors('dark');
      const accentColors = getChartColors('accent');

      expect(lightColors.primary).not.toBe(darkColors.primary);
      expect(lightColors.primary).not.toBe(accentColors.primary);
      expect(darkColors.primary).not.toBe(accentColors.primary);
    });
  });
});
