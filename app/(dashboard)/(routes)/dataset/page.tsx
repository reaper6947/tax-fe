import { columns, Payment } from "./column";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      userid: "728ed52f",
      year: 2000,
      income: 50921,
      location: "Dhaka",
      tax: 2500,
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10 ">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
