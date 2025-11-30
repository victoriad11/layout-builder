import { describe, it, expect } from 'vitest';
import { WIDGET_TEMPLATES, generateWidgetId } from './widgetTemplates';

describe('WIDGET_TEMPLATES', () => {
  it('exports an array of widget templates', () => {
    expect(Array.isArray(WIDGET_TEMPLATES)).toBe(true);
    expect(WIDGET_TEMPLATES.length).toBeGreaterThan(0);
  });

  it('includes all expected widget types', () => {
    const types = WIDGET_TEMPLATES.map(template => template.type);

    expect(types).toContain('metric');
    expect(types).toContain('text');
    expect(types).toContain('chart');
    expect(types).toContain('todo');
    expect(types).toContain('image');
  });

  it('has required properties for each template', () => {
    WIDGET_TEMPLATES.forEach(template => {
      expect(template).toHaveProperty('type');
      expect(template).toHaveProperty('defaultTitle');
      expect(template).toHaveProperty('icon');
      expect(template).toHaveProperty('description');
      expect(template).toHaveProperty('defaultConfig');
      expect(template.defaultConfig).toHaveProperty('theme');
    });
  });

  it('metric template has correct structure', () => {
    const metric = WIDGET_TEMPLATES.find(t => t.type === 'metric');

    expect(metric).toBeDefined();
    expect(metric?.defaultTitle).toBe('Metric Card');
    expect(metric?.defaultConfig.theme).toBe('light');
    expect(metric?.defaultConfig).toHaveProperty('value');
    expect(typeof metric?.defaultConfig.value).toBe('number');
  });

  it('chart template has chartType and chartData', () => {
    const chart = WIDGET_TEMPLATES.find(t => t.type === 'chart');

    expect(chart).toBeDefined();
    expect(chart?.defaultConfig).toHaveProperty('chartType');
    expect(chart?.defaultConfig).toHaveProperty('chartData');
    expect(Array.isArray(chart?.defaultConfig.chartData)).toBe(true);
  });

  it('todo template has items as array of objects', () => {
    const todo = WIDGET_TEMPLATES.find(t => t.type === 'todo');

    expect(todo).toBeDefined();
    expect(Array.isArray(todo?.defaultConfig.items)).toBe(true);

    const firstItem = todo?.defaultConfig.items?.[0];
    expect(firstItem).toHaveProperty('text');
    expect(firstItem).toHaveProperty('completed');
    expect(typeof firstItem?.completed).toBe('boolean');
  });
});

describe('generateWidgetId', () => {
  it('generates a unique ID string', () => {
    const id = generateWidgetId();

    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
    expect(id).toMatch(/^widget-/);
  });

  it('generates different IDs on subsequent calls', () => {
    const id1 = generateWidgetId();
    const id2 = generateWidgetId();

    expect(id1).not.toBe(id2);
  });

  it('generates IDs with expected format', () => {
    const id = generateWidgetId();

    // Format: widget-{timestamp}-{random}
    const parts = id.split('-');
    expect(parts.length).toBe(3);
    expect(parts[0]).toBe('widget');
    expect(Number(parts[1])).toBeGreaterThan(0); // timestamp
    expect(parts[2].length).toBeGreaterThan(0); // random string
  });
});
