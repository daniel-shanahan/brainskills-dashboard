import NotableChanges from "./components/NotableChanges";
import { getStudentSessionTotalsByActiveDiff } from "./utils";

type Props = {
  currentDate: Date;
  weeks: number;
};

export default async function Dashboard(params: Props) {
  const { currentDate, weeks } = params;
  const studentsByActiveDiff = await getStudentSessionTotalsByActiveDiff(
    currentDate,
    weeks
  );

  return (
    <div className="border-2 border-gray-400 rounded-xl">
      <h2 className="text-lg lg:text-xl font-semibold text-center text-gray-800 pt-1 lg:pt-2">
        {weeks > 1 ? `Last ${weeks} Weeks` : "Last Week"}
      </h2>
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 md:justify-evenly p-4">
        <div className="h-56 w-full md:w-7/12 bg-green-800"></div>
        <NotableChanges studentDiffs={studentsByActiveDiff} />
      </div>
    </div>
  );
}
