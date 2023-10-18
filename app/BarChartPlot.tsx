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
import { useRouter } from "next/navigation";

type Props = {
  data: StudentSessionDiff[];
};

export default function BarChartPlot({ data }: Props) {
  const router = useRouter();

  const handleClick = (event: any) => {
    router.push(`/students/${event.student.id}`);
  };

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="student" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="activeDiff"
            fill="#8884d8"
            onClick={handleClick}
            cursor="pointer"
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

function CustomTooltip({ active, payload }: any) {
  if (active) {
    const studentSessionDiff: StudentSessionDiff = payload[0].payload;
    const { activeDiff, student, activePercentage } = studentSessionDiff;
    const diff = activeDiff < 0 ? activeDiff : `+${activeDiff}`;
    const diffColor = activeDiff < 0 ? "text-red-500" : "text-green-500";
    return (
      <div className="bg-gray-50 dark:bg-gray-800 shadow rounded p-2">
        <p>{`${student.firstName} ${student.lastName}`}</p>
        <p className="space-x-3">
          <span>{activePercentage}%</span>
          <span className={diffColor}>{diff}%</span>
        </p>
      </div>
    );
  }

  return null;
}
