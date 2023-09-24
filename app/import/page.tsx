import ImportForm from "./ImportForm";
import PageHeader from "../components/PageHeader";

export const metadata = {
  title: "Import Data",
};

export default async function ImportPage() {
  return (
    <>
      <PageHeader title="Import Data" />
      <ImportForm />
    </>
  );
}
