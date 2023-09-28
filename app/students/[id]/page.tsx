import PageHeader from "@/app/components/PageHeader";
import { prisma } from "@/app/lib/prisma";
import type { BrainskillsSession } from "@/app/common.types";
import { SessionListItem } from "./SessionListItem";
import TotalSessions from "./TotalSessions";

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
      <TotalSessions sessions={studentSessions} />
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
    </>
  );
}
