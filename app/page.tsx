import PageHeader from "@/app/components/PageHeader";
import { getMostRecentDate } from "@/app/utils";
import Dashboard from "./Dashboard";

export const metadata = {
  title: "Brainskills Dashboard",
};

export default async function Home() {
  const mostRecentDate = await getMostRecentDate();

  if (!mostRecentDate) {
    return <PageHeader title="No Brainskills Sessions Found" />;
  }

  return (
    <>
      <div className="flex flex-col gap-3 lg:gap-6">
        <Dashboard currentDate={mostRecentDate} weeks={4} />
        <Dashboard currentDate={mostRecentDate} weeks={1} />
      </div>
    </>
  );
}
