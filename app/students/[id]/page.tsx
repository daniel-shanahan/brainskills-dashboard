import PageHeader from "@/app/components/PageHeader";
import { prisma } from "@/app/lib/prisma";
import type { BrainskillsSession } from "@/app/common.types";
import { SessionListItem } from "./SessionListItem";
import SessionTotals from "@/app/components/SessionTotals";
import { computeSessionTotals } from "@/app/utils";

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
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col items-center w-5/6 md:w-4/6 lg:w-5/12 lg:min-h-screen mt-10 gap-10">
          <div className="bg-green-800 rounded-md h-56 w-full"></div>
          <div className="bg-green-800 rounded-md h-56 w-full"></div>
        </div>
        <div className="lg:w-5/12">
          <SessionTotals
            totals={sessionTotals}
            displayName={false}
            className="mx-auto mt-10 p-5 mb-2"
          />
          <h2 className="text-xl lg:text-3xl font-bold text-center pt-10">
            Sessions
          </h2>
          <div className="flex flex-col gap-3 items-center py-5">
            {studentSessions.map((brainskillsSession) => (
              <SessionListItem
                key={`${brainskillsSession.startTime}`}
                brainskillsSession={brainskillsSession}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
