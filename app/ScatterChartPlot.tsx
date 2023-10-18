"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { StudentSessionTotals } from "./common.types";

type Props = {
  data: StudentSessionTotals[];
};

export default function ScatterChartPlot({ data }: Props) {
  return <></>;
}
