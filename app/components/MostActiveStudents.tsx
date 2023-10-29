import Link from "next/link";
import { StudentSessionTotals } from "@/app/common.types";
import SessionTotals from "@/app/components/SessionTotals";

type Props = {
  studentSessionTotals: StudentSessionTotals[];
  rankNum: number;
};

export default async function MostActiveStudents({
  studentSessionTotals,
  rankNum,
}: Props) {
  return (
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-center">Most Active</h2>
      <ol className="flex flex-col gap-4 py-5">
        {studentSessionTotals.slice(0, rankNum).map((totals, index) => (
          <li key={totals.student.id} className="mx-auto">
            <Link
              href={`/students/${totals.student.id}`}
              className="flex flex-row items-center"
            >
              <p className="text-xl font-bold w-6 mx-4 text-right">
                {index + 1}
              </p>
              <SessionTotals
                totals={totals}
                displayName={true}
                className="px-4 py-2 shadow-lg hover:shadow-2xl transition duration-200 ease-in-out"
              />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
