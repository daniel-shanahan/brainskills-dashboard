"use client";

import { BrainskillsSession } from "@/app/common.types";
import clsx from "clsx";
import {
  getActivePercentage,
  secondsToTime,
  getActiveTextColor,
} from "@/app/utils";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid,
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
      <ResponsiveContainer width="99%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <XAxis
            dataKey="dateStr"
            stroke="#d1d5db"
            angle={-35}
            textAnchor="end"
            height={60}
            interval={"preserveStartEnd"}
            tickMargin={5}
          />
          <YAxis
            domain={[40, 100]}
            stroke="#d1d5db"
            unit="%"
            tickMargin={5}
            tickCount={6}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line dataKey="activePercentage" stroke="#8884d8" strokeWidth={2} />
          <CartesianGrid stroke="#d1d5db" strokeDasharray="1 5" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

function CustomTooltip({ active, payload }: any) {
  if (active) {
    const sessionData = payload[0].payload;
    const { activePercentage, dateStr, totalSeconds } = sessionData;
    return (
      <div className="bg-gray-50 dark:bg-gray-800 shadow rounded p-2 space-y-3">
        <div className="flex gap-5 items-start">
          <span
            className={clsx(
              "font-semibold text-xl",
              getActiveTextColor(activePercentage)
            )}
          >
            {activePercentage}%
          </span>
          <span>{dateStr}</span>
        </div>
        <p className="text-right">Total: {secondsToTime(totalSeconds)}</p>
      </div>
    );
  }

  return null;
}
