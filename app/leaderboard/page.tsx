import PageHeader from "@/app/components/PageHeader";
import { getMostRecentDate, getStudentSessionTotals } from "@/app/utils";
import MostActiveStudents from "@/app/components/MostActiveStudents";

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

  const studentSessionTotals = await getStudentSessionTotals({
    startDate,
    endDate: mostRecentDate,
  });

  return (
    <>
      <PageHeader title="Leaderboard" />
      <p className="text-center mt-5 text-lg">
        {startDate.toDateString()} - {mostRecentDate.toDateString()}
      </p>
      <div className="flex flex-row justify-center gap-10 mt-10">
        <MostActiveStudents
          studentSessionTotals={studentSessionTotals}
          rankNum={10}
        />
      </div>
    </>
  );
}
