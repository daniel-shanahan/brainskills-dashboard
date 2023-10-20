import PageHeader from "@/app/components/PageHeader";
import {
  getMostRecentDate,
  getStudentSessionTotalsByActiveDiff,
  secondsToTime,
} from "@/app/utils";
import BarChartPlot from "./BarChartPlot";
import ScatterChartPlot from "./ScatterChartPlot";

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
      <section className="flex m-4 gap-2">
        <div className="flex-1 px-2 justify-center w-16 bg-gray-200 dark:bg-gray-700 shadow rounded">
          <div>
            <p className="text-gray-700 dark:text-gray-900 font-bold">
              Total students
            </p>
            <p className="py-4 font-bold">{currentTotals.length}</p>
            <Difference diff={studentDiff} />
          </div>
        </div>
        <div className="flex-1 px-2 justify-center w-16 bg-gray-200 dark:bg-gray-700 shadow rounded">
          <div>
            <p className="text-gray-700 dark:text-gray-900 font-bold">
              Total time
            </p>
            <p className="py-4 font-bold">{totalTime}</p>
            <Difference diff={totalSecondsDiff} />
          </div>
        </div>
        <div className="flex-1 px-2 justify-center w-16 bg-gray-200 dark:bg-gray-700 shadow rounded">
          <div>
            <p className="text-gray-700 dark:text-gray-900 font-bold">
              Avg. time per student
            </p>
            <p className="py-4 font-bold">{avgTimePerStudent}</p>
            <Difference diff={totalAvgPerStudentDiff} />
          </div>
        </div>
        <div className="flex-1 px-2 justify-center w-16 bg-gray-200 dark:bg-gray-700 shadow rounded">
          <div>
            <p className="text-gray-700 dark:text-gray-900 font-bold">
              Total rounds
            </p>
            <p className="py-4 font-bold">{totalRounds}</p>
            <Difference diff={totalRoundsDiff} />
          </div>
        </div>
      </section>
      <section className="flex my-4 px-4 gap-3">
        <div className="w-1/2 h-[300px] bg-gray-200 dark:bg-gray-700 shadow rounded">
          <BarChartPlot data={barChartData} />
        </div>
        <div className="w-1/2 h-[300px] bg-gray-200 dark:bg-gray-700 shadow rounded">
          <ScatterChartPlot data={scatterChartData} />
        </div>
      </section>
      <section className="flex my-4 px-4 gap-2">
        <div className="w-1/3 h-[250px] bg-gray-200 dark:bg-gray-700 shadow rounded"></div>
        <div className="w-1/3 h-[250px] bg-gray-200 dark:bg-gray-700 shadow rounded"></div>
        <div className="w-1/3 h-[250px] bg-gray-200 dark:bg-gray-700 shadow rounded"></div>
      </section>
    </>
  );
}

type DifferenceProps = {
  diff: number;
};

function Difference({ diff }: DifferenceProps) {
  const color = diff > 0 ? "green" : "red";
  const sign = diff > 0 ? "+" : "";

  return (
    <p className={`text-${color}-300`}>
      {sign}
      {diff}%
    </p>
  );
}
