import Link from "next/link";
import { StudentSessionTotals } from "@/app/common.types";
import SessionTotals from "@/app/components/SessionTotals";

type Props = {
  studentSessionTotals: StudentSessionTotals[];
  rankNum: number;
};

export default async function LeastActiveStudents({
  studentSessionTotals,
  rankNum,
}: Props) {
  return (
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-center">
        {rankNum} Least Active Students
      </h2>
      <ol className="flex flex-col gap-4 py-5">
        {studentSessionTotals
          .slice(-rankNum)
          .reverse()
          .map((totals, index) => (
            <li key={totals.student.id} className="mx-auto">
              <Link
                href={`/students/${totals.student.id}`}
                className="flex flex-row items-center"
              >
                <p className="text-xl font-bold w-6 mx-4 text-right">
                  {studentSessionTotals.length - index}
                </p>
                <SessionTotals
                  totals={totals}
                  displayName={true}
                  className="px-4 py-2 shadow-md hover:shadow-lg transition duration-200 ease-in-out"
                />
              </Link>
            </li>
          ))}
      </ol>
    </div>
  );
}
