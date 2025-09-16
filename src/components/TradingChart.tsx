"use client";

import { useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const generateChartData = () => {
  const data = [];
  let basePrice = 105;
  const now = Date.now();
  
  for (let i = 0; i < 100; i++) {
    const change = (Math.random() - 0.5) * 2;
    basePrice += change;
    data.push({
      time: new Date(now - (100 - i) * 15 * 60 * 1000).toLocaleTimeString(),
      price: basePrice,
      volume: Math.floor(Math.random() * 100000) + 50000,
    });
  }
  
  return data;
};

interface TradingTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      time: string;
      volume: number;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: TradingTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background-secondary border border-border rounded p-2">
        <p className="text-xs text-foreground-secondary">{payload[0].payload.time}</p>
        <p className="text-sm font-semibold">€{payload[0].value.toFixed(2)}</p>
        <p className="text-xs text-foreground-secondary">
          Vol: {payload[0].payload.volume.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function TradingChart() {
  const data = generateChartData();

  return (
    <div className="h-full w-full bg-background p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {["1m", "5m", "15m", "1h", "4h", "1d", "1w"].map((interval) => (
            <button
              key={interval}
              className="px-2 py-1 text-xs bg-background-tertiary hover:bg-background-secondary rounded transition-colors"
            >
              {interval}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="px-2 py-1 text-xs bg-background-tertiary hover:bg-background-secondary rounded transition-colors">
            Line
          </button>
          <button className="px-2 py-1 text-xs bg-primary/20 text-primary rounded">
            Candles
          </button>
          <button className="px-2 py-1 text-xs bg-background-tertiary hover:bg-background-secondary rounded transition-colors">
            Depth
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ecb81" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0ecb81" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2b3139" />
          <XAxis 
            dataKey="time" 
            stroke="#848e9c"
            tick={{ fontSize: 10 }}
            tickFormatter={(value) => value.split(':').slice(0, 2).join(':')}
          />
          <YAxis 
            stroke="#848e9c"
            tick={{ fontSize: 10 }}
            domain={['dataMin - 1', 'dataMax + 1']}
            tickFormatter={(value) => `€${value.toFixed(0)}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#0ecb81"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}