"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StudentSessionTotals } from "./common.types";
import { getActiveTextColor, secondsToTime } from "./utils";

type Props = {
  data: StudentSessionTotals[];
};

export default function ScatterChartPlot({ data }: Props) {
  return (
    <ResponsiveContainer width="99%" height="90%">
      <ScatterChart
        margin={{
          top: 10,
          right: 5,
          bottom: 5,
        }}
      >
        <XAxis
          type="number"
          dataKey="completedSeconds"
          stroke="#d1d5db"
          height={60}
          tick={<CustomAxisTick />}
        />
        <YAxis
          type="number"
          dataKey="activePercentage"
          unit="%"
          domain={["dataMin - 5", "dataMax + 5"]}
          stroke="#d1d5db"
          tickMargin={5}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={<CustomTooltip />}
        />
        <Scatter name="Students" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

function CustomAxisTick({ x, y, payload }: any) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#d1d5db"
        transform="rotate(-35)"
      >
        {secondsToTime(payload.value)}
      </text>
    </g>
  );
}

function CustomTooltip({ active, payload }: any) {
  if (active) {
    const totals: StudentSessionTotals = payload[0].payload;
    const { completedSeconds, student, activePercentage } = totals;
    const completedTime = secondsToTime(completedSeconds);
    return (
      <div className="bg-gray-50 dark:bg-gray-800 shadow rounded p-2">
        <p>{`${student.firstName} ${student.lastName}`}</p>
        <p className="space-x-3">
          <span className={getActiveTextColor(activePercentage)}>
            {activePercentage}%
          </span>
          <span>{completedTime}</span>
        </p>
      </div>
    );
  }

  return null;
}
