type Props = {
  title: string;
};

export default async function PageHeader({ title }: Props) {
  return (
    <h1 className="text-2xl lg:text-4xl font-bold text-center">{title}</h1>
  );
}
