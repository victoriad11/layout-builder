import { describe, it, expect } from 'vitest';
import { getArrowIcon, getValueColor } from './utils';
import { green, red } from '@ant-design/colors';

describe('MetricWidget utils', () => {
  describe('getArrowIcon', () => {
    it('returns ArrowUpOutlined for positive values', () => {
      const icon = getArrowIcon(10);

      expect(icon).toBeDefined();
      expect(icon?.type.displayName).toBe('ArrowUpOutlined');
    });

    it('returns ArrowDownOutlined for negative values', () => {
      const icon = getArrowIcon(-5);

      expect(icon).toBeDefined();
      expect(icon?.type.displayName).toBe('ArrowDownOutlined');
    });

    it('returns undefined for zero', () => {
      const icon = getArrowIcon(0);

      expect(icon).toBeUndefined();
    });

    it('handles large positive numbers', () => {
      const icon = getArrowIcon(999999);

      expect(icon).toBeDefined();
      expect(icon?.type.displayName).toBe('ArrowUpOutlined');
    });

    it('handles large negative numbers', () => {
      const icon = getArrowIcon(-999999);

      expect(icon).toBeDefined();
      expect(icon?.type.displayName).toBe('ArrowDownOutlined');
    });

    it('handles decimal values correctly', () => {
      const positiveIcon = getArrowIcon(0.1);
      const negativeIcon = getArrowIcon(-0.1);

      expect(positiveIcon?.type.displayName).toBe('ArrowUpOutlined');
      expect(negativeIcon?.type.displayName).toBe('ArrowDownOutlined');
    });
  });

  describe('getValueColor', () => {
    it('returns green for positive values in light theme', () => {
      const color = getValueColor(10, 'light');

      expect(color).toBe(green[7]);
    });

    it('returns green for positive values in dark theme', () => {
      const color = getValueColor(10, 'dark');

      expect(color).toBe(green[5]);
    });

    it('returns red for negative values in light theme', () => {
      const color = getValueColor(-10, 'light');

      expect(color).toBe(red[7]);
    });

    it('returns red for negative values in dark theme', () => {
      const color = getValueColor(-10, 'dark');

      expect(color).toBe(red[5]);
    });

    it('returns null for zero', () => {
      const color = getValueColor(0);

      expect(color).toBeNull();
    });

    it('handles undefined theme parameter', () => {
      const positiveColor = getValueColor(10);
      const negativeColor = getValueColor(-10);

      expect(positiveColor).toBe(green[7]);
      expect(negativeColor).toBe(red[7]);
    });

    it('handles accent theme like light theme', () => {
      const color = getValueColor(10, 'accent');

      expect(color).toBe(green[7]);
    });
  });
});
