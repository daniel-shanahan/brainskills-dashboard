import Link from "next/link";

type Props = {
  progressingStudents: any[];
};

function getBgColorDiff(diff: number) {
  if (diff > 15) {
    return "bg-green-500";
  } else if (diff > 10) {
    return "bg-green-400";
  } else if (diff > 5) {
    return "bg-green-300";
  } else {
    return "bg-green-200";
  }
}

export default async function ProgressingStudents({
  progressingStudents,
}: Props) {
  return (
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-center">
        {progressingStudents.length} Progressing
      </h2>
      <ol className="flex flex-col gap-4 py-5">
        {progressingStudents.map((student) => (
          <li key={student.student.id} className="mx-auto">
            <Link
              href={`/students/${student.student.id}`}
              className="flex flex-row items-center"
            >
              <div
                className={`rounded-md shadow-md text-lg text-center w-fit ${getBgColorDiff(
                  student.activeDiff
                )}`}
              >
                <p className="font-semibold text-xl text-left pb-1">
                  {student.student.firstName} {student.student.lastName}
                </p>

                <div className="flex flex-row gap-10">
                  <div className="flex flex-col">
                    <p>Active</p>
                    <p className="text-xl">{student.activePercentage}%</p>
                  </div>
                  <div className="flex flex-col text-xl font-semibold">
                    <p>Increase</p>
                    <p className="text-xl">{student.activeDiff}%</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
