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
