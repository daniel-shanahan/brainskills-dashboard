"use client";

import { BrainskillsSession } from "@/app/common.types";
import { getActivePercentage, secondsToTime } from "@/app/utils";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  studentSessions: BrainskillsSession[];
};

export default function LineChartPlot({ studentSessions }: Props) {
  const data = [...studentSessions].reverse().map((session) => {
    return {
      ...session,
      dateStr: session.startTime.toLocaleDateString(),
      activePercentage: getActivePercentage(
        session.totalSeconds,
        session.completedSeconds
      ),
    };
  });

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="dateStr" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line dataKey="activePercentage" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

function CustomTooltip({ active, payload }: any) {
  if (active) {
    const sessionData = payload[0].payload;
    console.log(sessionData);
    const { activePercentage, dateStr, totalSeconds } = sessionData;
    return (
      <div className="bg-gray-50 dark:bg-gray-800 shadow rounded p-2 space-y-3">
        <div className="flex gap-5 items-start">
          <span className="font-semibold text-xl">{activePercentage}%</span>
          <span>{dateStr}</span>
        </div>
        <p>Total: {secondsToTime(totalSeconds)}</p>
      </div>
    );
  }

  return null;
}
