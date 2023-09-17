import ImportForm from "./ImportForm";
import PageHeader from "../components/PageHeader";

export default async function ImportPage() {
  return (
    <>
      <PageHeader title="Import Data" />
      <ImportForm />
    </>
  );
}
