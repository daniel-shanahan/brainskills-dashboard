import PageHeader from "@/app/components/PageHeader";
import {
  getMostRecentDate,
  getStudentSessionTotals,
  getStudentSessionTotalsByActiveDiff,
} from "@/app/utils";
import Dashboard from "./Dashboard";

export const metadata = {
  title: "Brainskills Dashboard",
};

export default async function Home() {
  const mostRecentDate = await getMostRecentDate();

  if (!mostRecentDate) {
    return <PageHeader title="No Brainskills Sessions Found" />;
  }

  const oneMonthAgo = new Date(
    mostRecentDate.getTime() - 27 * 24 * 60 * 60 * 1000
  );

  const twoMonthsAgo = new Date(
    mostRecentDate.getTime() - 54 * 24 * 60 * 60 * 1000
  );

  const currentSessionTotals = await getStudentSessionTotals(
    oneMonthAgo,
    mostRecentDate
  );

  const previousSessionTotals = await getStudentSessionTotals(
    twoMonthsAgo,
    oneMonthAgo
  );

  const studentsByActiveDiff = await getStudentSessionTotalsByActiveDiff(
    previousSessionTotals,
    currentSessionTotals
  );

  const progressingStudents = studentsByActiveDiff.filter(
    (student) => student.activeDiff >= 10
  );

  const regressingStudents = studentsByActiveDiff
    .filter((student) => student.activeDiff <= -10)
    .reverse();

  return (
    <>
      <div className="flex flex-col gap-3 lg:gap-6">
        <Dashboard weeks={4} />
        <Dashboard weeks={1} />
      </div>
    </>
  );
}
