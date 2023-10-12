import { StudentSessionDiff } from "@/app/common.types";
import ActivePercentDiff from "./ActivePercentDiff";

type Props = {
  studentDiffs: StudentSessionDiff[];
};

export default async function NotableChanges({ studentDiffs }: Props) {
  const notableProgression = studentDiffs.slice(0, 3);
  const notableRegression = studentDiffs.slice(-3);

  return (
    <div className="h-56 w-full md:w-4/12 rounded-md border-2 border-gray-400">
      <h3 className="text-center p-1">Notable Changes</h3>
      <div className="flex flex-col justify-between h-5/6">
        <div className="flex flex-col gap-1">
          {notableProgression.map((student) => (
            <ActivePercentDiff key={student.student.id} sessionDiff={student} />
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {notableRegression.map((student) => (
            <ActivePercentDiff key={student.student.id} sessionDiff={student} />
          ))}
        </div>
      </div>
    </div>
  );
}
