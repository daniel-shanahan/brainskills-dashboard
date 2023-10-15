"use client";

import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { StudentSessionDiff } from "./common.types";

type Props = {
  studentDiffs: StudentSessionDiff[];
};

export default function BarChartPlot({ studentDiffs }: Props) {
  const reversedDiffs = [...studentDiffs].reverse();

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={250} data={reversedDiffs}>
          <XAxis dataKey="student" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="activeDiff" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
