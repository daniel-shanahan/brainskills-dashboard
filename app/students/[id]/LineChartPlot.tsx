"use client";

import { BrainskillsSession } from "@/app/common.types";
import { getActivePercentage } from "@/app/utils";
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
      date: session.startTime.toLocaleDateString(),
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
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="activePercentage" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
