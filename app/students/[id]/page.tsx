import PageHeader from "@/app/components/PageHeader";
import { prisma } from "@/app/lib/prisma";
import type { BrainskillsSession } from "@/app/common.types";

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

  return (
    <>
      <PageHeader title={`${student?.firstName} ${student?.lastName}`} />
      <div className="flex flex-col gap-2 items-center py-10">
        {studentSessions.map((brainskillsSession) => (
          <StudentListItem
            key={`${brainskillsSession.startTime}`}
            brainskillsSession={brainskillsSession}
          />
        ))}
      </div>
    </>
  );
}

async function StudentListItem({
  brainskillsSession,
}: {
  brainskillsSession: BrainskillsSession;
}) {
  const { startTime, rounds, totalSeconds, completedSeconds } =
    brainskillsSession;
  return (
    <div className="flex flex-row items-center justify-between gap-8 p-5 border rounded-md shadow-sm text-md text-center bg-white">
      <div className="flex flex-col">
        <p>{startTime.toDateString()}</p>
        <p className="text-sm">{startTime.toLocaleTimeString()}</p>
      </div>
      <div className="flex flex-col">
        <p>Total Time</p>
        <p>{totalSeconds}</p>
      </div>
      <div className="flex flex-col">
        <p>Completed</p>
        <p>{completedSeconds}</p>
      </div>
      <div className="flex flex-col">
        <p>Rounds</p>
        <p>{rounds}</p>
      </div>
      <div className="flex flex-col font-semibold">
        <p>Active</p>
        <p className="text-lg">
          {Math.round((completedSeconds / totalSeconds) * 100)}%
        </p>
      </div>
    </div>
  );
}
