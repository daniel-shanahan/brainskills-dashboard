import { BrainskillsSession } from "@/app/common.types";
import PageHeader from "@/app/components/PageHeader";
import { prisma } from "@/app/lib/prisma";
import { computeSessionTotals } from "@/app/utils";
import MostActiveStudents from "./MostActiveStudents";

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
      <MostActiveStudents
        studentSessionTotals={studentSessionTotals}
        studentNumber={10}
      />
    </>
  );
}
