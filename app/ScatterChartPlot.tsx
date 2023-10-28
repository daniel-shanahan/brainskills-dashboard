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
    <ResponsiveContainer width="99%" height="99%">
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis
          type="number"
          dataKey="completedSeconds"
          label={{ value: "Completed Time", position: "bottom" }}
        />
        <YAxis
          type="number"
          dataKey="activePercentage"
          unit="%"
          domain={["dataMin - 5", "dataMax + 5"]}
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
