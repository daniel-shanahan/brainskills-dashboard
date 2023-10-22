import PageHeader from "@/app/components/PageHeader";
import { prisma } from "@/app/lib/prisma";
import type { BrainskillsSession } from "@/app/common.types";
import { SessionListItem } from "./SessionListItem";
import SessionTotals from "@/app/components/SessionTotals";
import { computeSessionTotals } from "@/app/utils";
import LineChartPlot from "./LineChartPlot";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const student = await prisma.student.findUnique({
    where: {
      id: params.id,
    },
  });

  return {
    title: `${student?.firstName} ${student?.lastName}'s student profile`,
  };
}

export default async function StudentPage({ params }: Props) {
  const student = await prisma.student.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!student) {
    return <PageHeader title="Student Not Found" />;
  }

  const studentSessions: BrainskillsSession[] =
    await prisma.brainskillsSession.findMany({
      where: {
        studentId: student.id,
      },
      orderBy: {
        startTime: "desc",
      },
    });

  const sessionTotals = computeSessionTotals(student, studentSessions);

  return (
    <>
      <PageHeader title={`${student.firstName} ${student.lastName}`} />
      <div className="flex m-4 gap-4">
        <section className="space-y-3 w-1/2">
          <div className="bg-gray-200 dark:bg-gray-700 shadow rounded h-[300px]">
            <LineChartPlot studentSessions={studentSessions} />
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 shadow rounded h-[300px]"></div>
        </section>
        <section className="space-y-3 w-1/2">
          <div className="bg-gray-200 dark:bg-gray-700 shadow rounded py-5">
            <h2 className="text-xl lg:text-3xl font-bold text-center pb-5">
              Session Totals
            </h2>
            <SessionTotals
              totals={sessionTotals}
              displayName={false}
              className="mx-auto px-5 py-3"
            />
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 shadow rounded py-5">
            <h2 className="text-xl lg:text-3xl font-bold text-center pb-5">
              Sessions
            </h2>
            <div className="flex flex-col gap-3 items-center">
              {studentSessions.map((brainskillsSession) => (
                <SessionListItem
                  key={`${brainskillsSession.startTime}`}
                  brainskillsSession={brainskillsSession}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
