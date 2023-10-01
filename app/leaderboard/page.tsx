import { BrainskillsSession } from "@/app/common.types";
import PageHeader from "@/app/components/PageHeader";
import { prisma } from "@/app/lib/prisma";
import { computeSessionTotals } from "@/app/utils";
import SessionTotals from "../components/SessionTotals";

export const metadata = {
  title: "Brainskills Leaderboard",
};

async function getStudentSessionTotals({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  const students = await prisma.student.findMany({
    where: {
      BrainskillsSessions: {
        some: {
          startTime: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
    },
  });

  const studentSessionTotals = await Promise.all(
    students.map(async (student) => {
      const studentSessions = await prisma.brainskillsSession.findMany({
        where: {
          studentId: student.id,
          startTime: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      return computeSessionTotals(student, studentSessions);
    })
  );

  return studentSessionTotals.sort(
    (a, b) => b.activePercentage - a.activePercentage
  );
}

export default async function LeaderboardPage() {
  const mostRecentDate = await prisma.brainskillsSession
    .findFirst({
      orderBy: {
        startTime: "desc",
      },
    })
    .then((session: BrainskillsSession | null) =>
      session ? session.startTime : null
    );

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
      <h2 className="text-xl lg:text-3xl font-bold text-center mt-10">
        Top 10
      </h2>
      <ol className="flex flex-col gap-3 py-5">
        {studentSessionTotals.slice(0, 10).map((totals, index) => (
          <li
            key={totals.student.id}
            className="flex flex-row items-center mx-auto"
          >
            <p className="text-xl font-bold w-6 mx-4 text-right">{index + 1}</p>
            <SessionTotals
              totals={totals}
              displayName={true}
              className="px-4 py-2"
            />
          </li>
        ))}
      </ol>
    </>
  );
}
