import PageHeader from "@/app/components/PageHeader";
import { getMostRecentDate, getStudentSessionTotals } from "@/app/utils";
import MostActiveStudents from "@/app/components/MostActiveStudents";
import LeastActiveStudents from "./components/LeastActiveStudents";

export const metadata = {
  title: "Brainskills Dashboard",
};

export default async function Home() {
  const mostRecentDate = await getMostRecentDate();

  if (!mostRecentDate) {
    return <PageHeader title="No Brainskills Sessions Found" />;
  }

  const startDate = new Date(
    mostRecentDate.getTime() - 27 * 24 * 60 * 60 * 1000
  );

  const studentSessionTotals = await getStudentSessionTotals({
    startDate,
    endDate: mostRecentDate,
  });

  return (
    <>
      <PageHeader title="Brainskills Dashboard" />
      <p className="text-center mt-5 text-lg">
        {startDate.toDateString()} - {mostRecentDate.toDateString()}
      </p>
      <div className="flex flex-row justify-center gap-10 mt-10">
        <MostActiveStudents
          studentSessionTotals={studentSessionTotals}
          rankNum={10}
        />
        <LeastActiveStudents
          studentSessionTotals={studentSessionTotals}
          rankNum={10}
        />
      </div>
    </>
  );
}
