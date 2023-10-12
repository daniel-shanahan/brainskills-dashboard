import PageHeader from "@/app/components/PageHeader";
import {
  getMostRecentDate,
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

  const studentsByActiveDiff = await getStudentSessionTotalsByActiveDiff(
    mostRecentDate,
    4
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
