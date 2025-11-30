import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { blue, green, gold, red, purple, cyan, gray } from '@ant-design/colors';
import { ChartType, ChartDataPoint, ThemeType } from '../../../types';
import { CHART_CONFIG } from '../../../constants';

interface ChartColors {
  primary: string;
  grid: string;
  text: string;
  background: string;
}

/**
 * Get theme-specific colors for chart components
 *
 * Returns appropriate colors for chart elements (primary data, grid lines, text, background)
 * based on the selected theme. Uses Ant Design color tokens for consistency.
 *
 * @param theme - The theme type ('light', 'dark', or 'accent'). Defaults to 'light' if not specified.
 * @returns An object containing primary, grid, text, and background colors
 */
export const getChartColors = (theme?: ThemeType): ChartColors => {
  const isDark = theme === 'dark';
  const isAccent = theme === 'accent';

  return {
    primary: isDark ? blue[4] : isAccent ? gold[5] : blue[5],
    grid: isDark ? gray[7] : gray[4],
    text: isDark ? gray[3] : isAccent ? gray[3] : gray[8],
    background: isDark ? gray[9] : isAccent ? gold[5] : '#ffffff',
  };
};

// Pie chart specific colors using Ant Design color palette
const PIE_COLORS = [blue[5], green[5], gold[5], red[5], purple[5], cyan[5]];

// Helper to map chart data for pie charts
const mapToPieData = (data: ChartDataPoint[]) => {
  return data.map(item => ({
    name: item.name,
    value: item.value,
  }));
};

interface RenderChartProps {
  chartType: ChartType;
  data: ChartDataPoint[];
  colors: ChartColors;
}

/**
 * Render a chart component based on the specified type
 *
 * Creates and configures a Recharts component (line, bar, area, or pie chart)
 * with the provided data and theme colors. Each chart type includes appropriate
 * axis configuration, tooltips, and styling.
 *
 * @param props - Chart rendering configuration
 * @param props.chartType - The type of chart to render ('line', 'bar', 'area', or 'pie')
 * @param props.data - Array of data points to display
 * @param props.colors - Theme-specific colors for chart elements
 * @returns A configured Recharts component or null if chart type is invalid
 */
export const renderChart = ({ chartType, data, colors }: RenderChartProps) => {
  const commonAxisProps = {
    stroke: colors.text,
    style: { fontSize: CHART_CONFIG.AXIS_FONT_SIZE },
  };

  const commonTooltipProps = {
    contentStyle: {
      backgroundColor: colors.background,
      border: `1px solid ${colors.grid}`,
      borderRadius: '6px',
      color: colors.text,
    },
    itemStyle: {
      color: colors.text,
    },
    labelStyle: {
      color: colors.text,
    },
  };

  switch (chartType) {
    case 'line':
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray={CHART_CONFIG.GRID_DASH_ARRAY} stroke={colors.grid} />
          <XAxis dataKey="name" {...commonAxisProps} />
          <YAxis {...commonAxisProps} />
          <Tooltip {...commonTooltipProps} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={colors.primary}
            strokeWidth={CHART_CONFIG.LINE_STROKE_WIDTH}
            dot={{ fill: colors.primary, r: CHART_CONFIG.DOT_RADIUS }}
            activeDot={{ r: CHART_CONFIG.ACTIVE_DOT_RADIUS }}
          />
        </LineChart>
      );

    case 'bar':
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray={CHART_CONFIG.GRID_DASH_ARRAY} stroke={colors.grid} />
          <XAxis dataKey="name" {...commonAxisProps} />
          <YAxis {...commonAxisProps} />
          <Tooltip {...commonTooltipProps} cursor={{ fill: 'transparent' }} />
          <Bar dataKey="value" fill={colors.primary} radius={CHART_CONFIG.BAR_RADIUS} />
        </BarChart>
      );

    case 'area':
      return (
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray={CHART_CONFIG.GRID_DASH_ARRAY} stroke={colors.grid} />
          <XAxis dataKey="name" {...commonAxisProps} />
          <YAxis {...commonAxisProps} />
          <Tooltip {...commonTooltipProps} />
          <Area
            type="monotone"
            dataKey="value"
            stroke={colors.primary}
            fill={colors.primary}
            fillOpacity={0.6}
          />
        </AreaChart>
      );

    case 'pie':
      const pieData = mapToPieData(data);
      return (
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={CHART_CONFIG.PIE_OUTER_RADIUS}
            label={(entry) => entry.name}
            labelLine={false}
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip {...commonTooltipProps} />
          <Legend wrapperStyle={{ color: colors.text }} />
        </PieChart>
      );

    default:
      return null;
  }
};
