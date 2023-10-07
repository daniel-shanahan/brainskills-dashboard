import type {
  BrainskillsSession,
  StudentSessionTotals,
  Student,
} from "@/app/common.types";
import { prisma } from "@/app/lib/prisma";

export function secondsToTime(seconds: number) {
  const hoursStr = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutesStr = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secsStr = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${hoursStr}:${minutesStr}:${secsStr}`;
}

export function getActivePercentage(
  totalSeconds: number,
  completedSeconds: number
) {
  return Math.round((completedSeconds / totalSeconds) * 100);
}

export function getBgColor(activePercentage: number) {
  if (activePercentage >= 80) {
    return "bg-green-400";
  } else if (activePercentage >= 70) {
    return "bg-white";
  } else if (activePercentage >= 60) {
    return "bg-yellow-400";
  } else if (activePercentage >= 50) {
    return "bg-red-400";
  } else {
    return "bg-red-600";
  }
}

export function computeSessionTotals(
  student: Student,
  sessions: BrainskillsSession[]
) {
  const { totalSeconds, completedSeconds, rounds } = sessions.reduce(
    (acc, curr) => {
      acc.totalSeconds += curr.totalSeconds;
      acc.completedSeconds += curr.completedSeconds;
      acc.rounds += curr.rounds;
      return acc;
    },
    {
      totalSeconds: 0,
      completedSeconds: 0,
      rounds: 0,
    }
  );

  const totals: StudentSessionTotals = {
    student,
    totalSeconds,
    completedSeconds,
    rounds,
    activePercentage: getActivePercentage(totalSeconds, completedSeconds),
  };

  return totals;
}

export async function getStudentSessionTotals(startDate: Date, endDate: Date) {
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

  return studentSessionTotals.sort((a, b) => {
    if (a.activePercentage === b.activePercentage) {
      return b.completedSeconds - a.completedSeconds;
    }
    return b.activePercentage - a.activePercentage;
  });
}

export async function getMostRecentDate() {
  return await prisma.brainskillsSession
    .findFirst({
      orderBy: {
        startTime: "desc",
      },
    })
    .then((session: BrainskillsSession | null) =>
      session ? session.startTime : null
    );
}

export async function getStudentSessionTotalsByActiveDiff(
  previousTotals: StudentSessionTotals[],
  currentTotals: StudentSessionTotals[]
) {
  let studentsByActiveDiff: any[] = [];

  currentTotals.forEach((currentTotal) => {
    const previousTotal = previousTotals.find(
      (total) => total.student.id === currentTotal.student.id
    );

    if (previousTotal) {
      const activeDiff =
        currentTotal.activePercentage - previousTotal.activePercentage;

      studentsByActiveDiff.push({
        ...currentTotal,
        activeDiff,
      });
    }
  });

  studentsByActiveDiff.sort((a, b) => {
    if (a.activeDiff === b.activeDiff) {
      return b.completedSeconds - a.completedSeconds;
    }
    return b.activeDiff - a.activeDiff;
  });

  return studentsByActiveDiff;
}
