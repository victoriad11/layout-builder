import { describe, it, expect } from 'vitest';
import { getThemeStyles } from './themeStyles';
import { gray, blue } from '@ant-design/colors';

describe('getThemeStyles', () => {
  it('returns light theme styles by default', () => {
    const styles = getThemeStyles();

    expect(styles.backgroundColor).toBe('#ffffff');
    expect(styles.textColor).toBe('rgba(0, 0, 0, 0.88)');
    expect(styles.borderColor).toBe(gray[5]);
  });

  it('returns light theme styles when explicitly set', () => {
    const styles = getThemeStyles('light');

    expect(styles.backgroundColor).toBe('#ffffff');
    expect(styles.textColor).toBe('rgba(0, 0, 0, 0.88)');
    expect(styles.borderColor).toBe(gray[5]);
  });

  it('returns dark theme styles', () => {
    const styles = getThemeStyles('dark');

    expect(styles.backgroundColor).toBe(gray[9]);
    expect(styles.textColor).toBe(gray[2]);
    expect(styles.borderColor).toBe(gray[8]);
  });

  it('returns accent theme styles', () => {
    const styles = getThemeStyles('accent');

    expect(styles.backgroundColor).toBe(blue[0]);
    expect(styles.textColor).toBe(blue[6]);
    expect(styles.borderColor).toBe(blue[3]);
  });

  it('returns correct structure for all themes', () => {
    const themes = ['light', 'dark', 'accent'] as const;

    themes.forEach(theme => {
      const styles = getThemeStyles(theme);

      expect(styles).toHaveProperty('backgroundColor');
      expect(styles).toHaveProperty('textColor');
      expect(styles).toHaveProperty('borderColor');
      expect(typeof styles.backgroundColor).toBe('string');
      expect(typeof styles.textColor).toBe('string');
      expect(typeof styles.borderColor).toBe('string');
    });
  });
});
