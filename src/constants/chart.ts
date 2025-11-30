/**
 * Chart widget configuration constants
 */
export const CHART_CONFIG = {
  /** Default height for chart widgets in pixels */
  DEFAULT_HEIGHT: 300,

  /** Dot radius for line chart points */
  DOT_RADIUS: 4,

  /** Active dot radius on hover for line charts */
  ACTIVE_DOT_RADIUS: 6,

  /** Stroke width for line charts */
  LINE_STROKE_WIDTH: 2,

  /** Outer radius for pie charts */
  PIE_OUTER_RADIUS: 80,

  /** Corner radius for bar chart bars (top corners) */
  BAR_RADIUS: [4, 4, 0, 0] as [number, number, number, number],

  /** Grid pattern for CartesianGrid */
  GRID_DASH_ARRAY: '3 3',

  /** Axis font size */
  AXIS_FONT_SIZE: '12px',
} as const;
