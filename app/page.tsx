import PageHeader from "@/app/components/PageHeader";
import {
  getMostRecentDate,
  getStudentSessionTotals,
  getStudentSessionTotalsByActiveDiff,
} from "@/app/utils";
import MostActiveStudents from "@/app/components/MostActiveStudents";
import LeastActiveStudents from "@/app/components/LeastActiveStudents";
import ProgressingStudents from "@/app/components/ProgressingStudents";
import RegressingStudents from "./components/RegressingStudents";

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
    (student) => student.activeDiff > 0
  );

  const regressingStudents = studentsByActiveDiff
    .filter((student) => student.activeDiff < -3)
    .reverse();

  return (
    <>
      <PageHeader title="Brainskills Dashboard" />
      <p className="text-center mt-5 text-lg">
        {oneMonthAgo.toDateString()} - {mostRecentDate.toDateString()}
      </p>
      <div className="flex flex-row justify-center gap-10 mt-10">
        <ProgressingStudents progressingStudents={progressingStudents} />
        <RegressingStudents regressingStudents={regressingStudents} />
        <MostActiveStudents
          studentSessionTotals={currentSessionTotals}
          rankNum={10}
        />
        <LeastActiveStudents
          studentSessionTotals={currentSessionTotals}
          rankNum={10}
        />
      </div>
    </>
  );
}
