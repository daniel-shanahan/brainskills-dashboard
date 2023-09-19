import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const data = await req.json();

  // Check if student exists
  const studentExists = await prisma.student.findUnique({
    where: { id: data.studentId },
  });

  // Cannot add a session for a student that doesn't exist
  if (!studentExists) {
    return NextResponse.json({});
  }

  // Check if brainskills session exists
  let brainskillsSession = await prisma.brainskillsSession.findUnique({
    where: {
      studentId_startTime: {
        studentId: data.studentId,
        startTime: data.startTime,
      },
    },
  });

  if (!brainskillsSession) {
    brainskillsSession = await prisma.brainskillsSession.create({
      data,
    });
  }

  return NextResponse.json(brainskillsSession);
}
