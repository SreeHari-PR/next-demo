"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface WalletData {
  points: number;
  liva: number;
  liva_blocks: number;
}

interface RewardsChartProps {
  wallet: WalletData;
}

export function RewardsChart({ wallet }: RewardsChartProps) {
  const chartData = [
    { time: "19:00", value: wallet.points * 100 },
    { time: "19:10", value: wallet.points * 120 },
    { time: "19:20", value: wallet.points * 110 },
    { time: "19:30", value: wallet.points * 130 },
    { time: "19:40", value: wallet.points * 90 },
    { time: "19:50", value: wallet.points * 110 },
  ];

  return (
    <Card className="bg-[#1c1f26]">
      <CardHeader>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <CardTitle className="text-lg text-white">Rewards</CardTitle>
            <div className="mt-1">
              <span className="text-2xl font-bold text-white">{wallet.liva.toFixed(2)} LIVA</span>
              <span className="ml-2 text-sm text-gray-400">
                $ {(wallet.liva * 800).toLocaleString()} {/* Example conversion */}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-gray-400">
              1D
            </Button>
            <Button variant="outline" size="sm" className="text-gray-400">
              1W
            </Button>
            <Button variant="outline" size="sm" className="text-gray-400">
              1M
            </Button>
            <Button variant="outline" size="sm" className="text-gray-400">
              1Y
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#666"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
