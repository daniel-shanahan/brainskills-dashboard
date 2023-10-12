import Link from "next/link";
import { StudentSessionDiff } from "../common.types";

type Props = {
  sessionDiff: StudentSessionDiff;
};

function getTextColorDiff(diff: number) {
  if (diff > 15) {
    return "text-green-700";
  } else if (diff > 10) {
    return "text-green-600";
  } else if (diff > 5) {
    return "text-green-500";
  } else if (diff < 5 && diff > -5) {
    return "text-black";
  } else if (diff > -10) {
    return "text-red-500";
  } else if (diff > -15) {
    return "text-red-600";
  } else {
    return "text-red-700";
  }
}

export default async function ActivePercentDiff({ sessionDiff }: Props) {
  const { activePercentage, activeDiff } = sessionDiff;

  return (
    <Link
      href={`/students/${sessionDiff.student.id}`}
      className="flex flex-row justify-between w-9/12 mx-auto px-2 py-0.5 bg-gray-200 text-sm rounded-md shadow-sm hover:shadow-md transition duration-200 ease-in-out"
    >
      <p>
        {sessionDiff.student.firstName} {sessionDiff.student.lastName}
      </p>

      <div className="flex flex-row gap-2">
        <p className={`font-bold ${getTextColorDiff(activeDiff)}`}>
          {activeDiff > 0 && "+"}
          {activeDiff}%
        </p>
        <p>{activePercentage}%</p>
      </div>
    </Link>
  );
}
