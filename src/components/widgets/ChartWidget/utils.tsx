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
import { ChartType, ChartDataPoint, ThemeType } from '../../../types';

interface ChartColors {
  primary: string;
  grid: string;
  text: string;
  background: string;
}

export const getChartColors = (theme?: ThemeType): ChartColors => {
  const isDark = theme === 'dark';
  const isAccent = theme === 'accent';

  return {
    primary: isDark ? '#60a5fa' : isAccent ? '#f59e0b' : '#1890ff',
    grid: isDark ? '#374151' : '#e5e7eb',
    text: isDark ? '#f3f4f6' : isAccent ? '#f3f4f6' : '#374151',
    background: isDark ? '#1f2937' : isAccent ? '#f59e0b' : '#ffffff',
  };
};

// Pie chart specific colors
const PIE_COLORS = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2'];

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

export const renderChart = ({ chartType, data, colors }: RenderChartProps) => {
  const commonAxisProps = {
    stroke: colors.text,
    style: { fontSize: '12px' },
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
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis dataKey="name" {...commonAxisProps} />
          <YAxis {...commonAxisProps} />
          <Tooltip {...commonTooltipProps} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={colors.primary}
            strokeWidth={2}
            dot={{ fill: colors.primary, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      );

    case 'bar':
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis dataKey="name" {...commonAxisProps} />
          <YAxis {...commonAxisProps} />
          <Tooltip {...commonTooltipProps} cursor={{ fill: 'transparent' }} />
          <Bar dataKey="value" fill={colors.primary} radius={[4, 4, 0, 0]} />
        </BarChart>
      );

    case 'area':
      return (
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
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
            outerRadius={80}
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
