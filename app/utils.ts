import type {
  BrainskillsSession,
  StudentSessionTotals,
  Student,
  StudentSessionDiff,
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

export function getActiveColor(activePercentage: number) {
  if (activePercentage >= 83) {
    return "green-600";
  } else if (activePercentage >= 78) {
    return "green-400";
  } else if (activePercentage >= 70) {
    return "gray-50";
  } else if (activePercentage >= 60) {
    return "yellow-400";
  } else if (activePercentage >= 50) {
    return "red-400";
  } else {
    return "red-600";
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

export async function getStudentSessionTotals(endDate: Date, weeks: number) {
  const startDate = weeksPriorToDate(endDate, weeks);
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

function weeksPriorToDate(date: Date, weeks: number) {
  return new Date(date.getTime() - weeks * 7 * 24 * 60 * 60 * 1000);
}

export async function getStudentSessionTotalsByActiveDiff(
  endDate: Date,
  weeks: number
) {
  let studentsByActiveDiff: StudentSessionDiff[] = [];
  const startDate = weeksPriorToDate(endDate, weeks);
  const currentTotals = await getStudentSessionTotals(endDate, weeks);
  const previousTotals = await getStudentSessionTotals(startDate, weeks);

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
