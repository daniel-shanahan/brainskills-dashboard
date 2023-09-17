import PageHeader from "../components/PageHeader";
import { prisma } from "../lib/prisma";

export default async function StudentsPage() {
  const students = await prisma.student.findMany();

  return (
    <>
      <PageHeader title="Students" />
      <div className="flex flex-col gap-2 justify-center items-center py-10">
        {students.map((student) => (
          <div
            key={student.id}
            className="w-1/2 bg-gray-50 rounded-xl py-2 px-4 shadow-sm hover:shadow-md transition duration-200 ease-in-out"
          >
            {student.firstName} {student.lastName}
          </div>
        ))}
      </div>
    </>
  );
}
