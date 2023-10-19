import PageHeader from "@/app/components/PageHeader";
import {
  getMostRecentDate,
  getStudentSessionTotals,
  getStudentSessionTotalsByActiveDiff,
} from "@/app/utils";
import BarChartPlot from "./BarChartPlot";
import ScatterChartPlot from "./ScatterChartPlot";

export const metadata = {
  title: "Brainskills Dashboard",
};

export default async function Home() {
  const mostRecentDate = await getMostRecentDate();

  if (!mostRecentDate) {
    return <PageHeader title="No Brainskills Sessions Found" />;
  }

  const studentsByActiveDiff = await getStudentSessionTotalsByActiveDiff(
    mostRecentDate,
    4
  );
  const barChartData = [...studentsByActiveDiff].reverse();
  const studentsByActivePercentage = await getStudentSessionTotals(
    mostRecentDate,
    4
  );
  const scatterChartData = [...studentsByActivePercentage].reverse();

  return (
    <>
      <section className="flex m-4 gap-2">
        <div className="flex-1 px-2 justify-center w-16 bg-gray-200 dark:bg-gray-700 shadow rounded">
          <div>
            <p className="text-gray-700 dark:text-gray-900 font-bold">
              Total returns
            </p>
            <p className="py-4 font-bold">$30,000 </p>
            <p className="text-green-300">+34.5%</p>
          </div>
        </div>
        <div className="flex-1 px-2 justify-center w-16 bg-gray-200 dark:bg-gray-700 shadow rounded">
          <div>
            <p className="text-gray-700 dark:text-gray-900 font-bold">
              Total returns
            </p>
            <p className="py-4 font-bold">$30,000 </p>
            <p className="text-green-300">+34.5%</p>
          </div>
        </div>
        <div className="flex-1 px-2 justify-center w-16 bg-gray-200 dark:bg-gray-700 shadow rounded">
          <div>
            <p className="text-gray-700 dark:text-gray-900 font-bold">
              Total returns
            </p>
            <p className="py-4 font-bold">$30,000 </p>
            <p className="text-green-300">+34.5%</p>
          </div>
        </div>
        <div className="flex-1 px-2 justify-center w-16 bg-gray-200 dark:bg-gray-700 shadow rounded">
          <div>
            <p className="text-gray-700 dark:text-gray-900 font-bold">
              Total returns
            </p>
            <p className="py-4 font-bold">$30,000 </p>
            <p className="text-green-300">+34.5%</p>
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
