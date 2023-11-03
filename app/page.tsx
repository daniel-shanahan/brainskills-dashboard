import PageHeader from "@/app/components/PageHeader";
import {
  getMostRecentDate,
  getStudentSessionTotalsByActiveDiff,
  secondsToTime,
} from "@/app/utils";
import BarChartPlot from "./BarChartPlot";
import ScatterChartPlot from "./ScatterChartPlot";
import clsx from "clsx";

const WEEKS = 4;

export const metadata = {
  title: "Brainskills Dashboard",
};

export default async function Home() {
  const mostRecentDate = await getMostRecentDate();

  if (!mostRecentDate) {
    return <PageHeader title="No Brainskills Sessions Found" />;
  }

  const { studentsByActiveDiff, currentTotals, previousTotals } =
    await getStudentSessionTotalsByActiveDiff(mostRecentDate, WEEKS);
  const barChartData = [...studentsByActiveDiff].reverse();
  const scatterChartData = [...currentTotals].reverse();
  const studentDiff = Math.round(
    ((currentTotals.length - previousTotals.length) / previousTotals.length) *
      100
  );
  const totalSeconds = currentTotals.reduce(
    (acc, curr) => acc + curr.totalSeconds,
    0
  );
  const totalTime = secondsToTime(totalSeconds);
  const prevTotalSeconds = previousTotals.reduce(
    (acc, curr) => acc + curr.totalSeconds,
    0
  );
  const totalSecondsDiff = Math.round(
    ((totalSeconds - prevTotalSeconds) / prevTotalSeconds) * 100
  );

  const avgSecsPerStudent = Math.round(totalSeconds / currentTotals.length);
  const avgTimePerStudent = secondsToTime(avgSecsPerStudent);
  const prevAvgSecsPerStudent = Math.round(
    prevTotalSeconds / previousTotals.length
  );
  const totalAvgPerStudentDiff = Math.round(
    ((avgSecsPerStudent - prevAvgSecsPerStudent) / prevAvgSecsPerStudent) * 100
  );

  const totalRounds = currentTotals.reduce((acc, curr) => acc + curr.rounds, 0);
  const prevTotalRounds = previousTotals.reduce(
    (acc, curr) => acc + curr.rounds,
    0
  );
  const totalRoundsDiff = Math.round(
    ((totalRounds - prevTotalRounds) / prevTotalRounds) * 100
  );

  return (
    <>
      <section className="flex flex-none m-4 gap-2">
        <DashboardTotal
          title="STUDENTS"
          value={currentTotals.length}
          diff={studentDiff}
        />
        <DashboardTotal
          title="TIME / STUDENT"
          value={avgTimePerStudent}
          diff={totalAvgPerStudentDiff}
        />
        <DashboardTotal
          title="TIME"
          value={totalTime}
          diff={totalSecondsDiff}
        />
        <DashboardTotal
          title="ROUNDS"
          value={totalRounds}
          diff={totalRoundsDiff}
        />
      </section>
      <section className="flex flex-grow mb-4 px-4 gap-3">
        <div className="w-1/2 bg-gray-200 dark:bg-gray-700 shadow rounded p-2">
          <p className="text-lg font-semibold pb-1 text-center">
            CHANGE IN ACTIVE %
          </p>
          <BarChartPlot data={barChartData} />
        </div>
        <div className="w-1/2 bg-gray-200 dark:bg-gray-700 shadow rounded p-2">
          <p className="text-lg font-semibold pb-1 text-center">
            COMPLETED TIME x ACTIVE %
          </p>
          <ScatterChartPlot data={scatterChartData} />
        </div>
      </section>
    </>
  );
}
type DashboardTotalProps = {
  title: string;
  value: string | number;
  diff: number;
};

function DashboardTotal({ title, value, diff }: DashboardTotalProps) {
  const textColor = diff > 0 ? "text-green-300" : "text-red-300";
  const sign = diff > 0 ? "+" : "";

  return (
    <div className="flex-1 px-4 py-2 justify-center w-16 bg-gray-200 dark:bg-gray-700 shadow rounded text-lg">
      <div>
        <p className="text-gray-700 dark:text-gray-200 font-semibold pb-1">
          {title}
        </p>
        <p className="text-slate-600 dark:text-slate-300 text-2xl pb-2">
          {value}
        </p>
        <p className={clsx(textColor)}>
          {sign}
          {diff}%
        </p>
      </div>
    </div>
  );
}
