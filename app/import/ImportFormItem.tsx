"use client";

type Props = {
  label: string;
  name: string;
};

export default function ImportFormItem(params: Props) {
  const { label, name } = params;

  return (
    <div className="flex items-center justify-center p-6 gap-6 md:gap-10">
      <div className="bg-green-800 h-[150px] w-[200px] rounded-md"></div>
      <div>
        <label
          className="text-xl font-semibold mb-2 block"
          htmlFor={name.toLowerCase() + "-file"}
        >
          {label}
        </label>
        <input type="file" name={name.toLowerCase() + "-file"} accept=".csv" />
      </div>
    </div>
  );
}
