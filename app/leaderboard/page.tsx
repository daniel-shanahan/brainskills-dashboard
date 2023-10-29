import PageHeader from "@/app/components/PageHeader";
import {
  getMostRecentDate,
  getStudentSessionTotals,
  getStudentSessionTotalsByActiveDiff,
} from "@/app/utils";
import MostActiveStudents from "@/app/components/MostActiveStudents";
import Link from "next/link";
import ActivePercentDiff from "../components/ActivePercentDiff";
import SessionTotals from "../components/SessionTotals";

const MIN_COMPLETED_MINUTES = 20;
const WEEKS = 1;

export const metadata = {
  title: "Brainskills Leaderboard",
};

export default async function LeaderboardPage() {
  const mostRecentDate = await getMostRecentDate();

  if (!mostRecentDate) {
    return <PageHeader title="No Brainskills Sessions Found" />;
  }

  const startDate = new Date(
    mostRecentDate.getTime() - 6 * 24 * 60 * 60 * 1000
  );

  const studentSessionTotals = (
    await getStudentSessionTotals(mostRecentDate, WEEKS)
  ).filter((student) => student.completedSeconds > 60 * MIN_COMPLETED_MINUTES);

  const { studentsByActiveDiff } = await getStudentSessionTotalsByActiveDiff(
    mostRecentDate,
    WEEKS
  );

  const progressingStudents = studentsByActiveDiff.filter(
    (student) =>
      student.completedSeconds > 60 * MIN_COMPLETED_MINUTES &&
      student.activeDiff >= 5
  );

  return (
    <>
      <PageHeader title="Leaderboard" />
      <p className="text-center mt-5 text-lg">
        {startDate.toDateString()} - {mostRecentDate.toDateString()}
      </p>
      <div className="flex m-4 gap-4">
        <section className="space-y-3 w-1/2">
          <div className="bg-gray-200 dark:bg-gray-700 shadow rounded py-5">
            <MostActiveStudents
              studentSessionTotals={studentSessionTotals}
              rankNum={10}
            />
          </div>
        </section>
        <section className="space-y-3 w-1/2">
          <div className="bg-gray-200 dark:bg-gray-700 shadow rounded py-5">
            <h2 className="text-xl lg:text-3xl font-bold text-center">
              Most Improved
            </h2>
            <ol className="flex flex-col gap-4 py-5">
              {progressingStudents.map((sessionDiff, index) => (
                <li key={sessionDiff.student.id} className="mx-auto">
                  <Link
                    href={`/students/${sessionDiff.student.id}`}
                    className="flex flex-row items-center"
                  >
                    <p className="text-xl font-bold w-6 mx-4 text-right">
                      {index + 1}
                    </p>
                    <ActivePercentDiff
                      sessionDiff={sessionDiff}
                      className="px-4 py-2 shadow-lg hover:shadow-2xl transition duration-200 ease-in-out"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </>
  );
}
