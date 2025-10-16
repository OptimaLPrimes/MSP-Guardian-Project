'use client';
import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

interface SystemHealthData {
  name: 'Secure' | 'At Risk';
  value: number;
  fill: string;
}

const chartData: SystemHealthData[] = [
  { name: 'Secure', value: 4210, fill: 'hsl(var(--chart-2))' },
  { name: 'At Risk', value: 380, fill: 'hsl(var(--chart-5))' },
];

const chartConfig = {
  systems: {
    label: 'Systems',
  },
  secure: {
    label: 'Secure',
    color: 'hsl(var(--chart-2))',
  },
  atRisk: {
    label: 'At Risk',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export default function SystemHealthChart() {
  const totalSystems = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center justify-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full w-full max-h-[250px]"
        >
          <PieChart>
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={entry.fill}
                  className="outline-none"
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardContent className="mt-4 flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: chartConfig.secure.color }}
            />
            <span>Secure/Compliant</span>
          </div>
          <span className="font-semibold">
            {chartData[0].value.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: chartConfig.atRisk.color }}
            />
            <span>At Risk/Non-Compliant</span>
          </div>
          <span className="font-semibold">
            {chartData[1].value.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
