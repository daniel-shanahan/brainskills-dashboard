import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const data = await req.json();

  // Check if student exists
  let student = await prisma.student.findUnique({
    where: { id: data.id },
  });

  if (!student) {
    student = await prisma.student.create({
      data,
    });
  }

  return NextResponse.json(student);
}
