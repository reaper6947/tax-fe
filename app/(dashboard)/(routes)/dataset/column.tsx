"use client";

import { ColumnDef } from "@tanstack/react-table";
import { jsPDF } from "jspdf";

const downloadUserData = (userData: Payment) => {
  const doc = new jsPDF();
  doc.text(`UserID: ${userData.userId}`, 10, 10);
  doc.text(`Year: ${userData.year}`, 10, 20);
  doc.text(`Income: ${userData.income}`, 10, 30);
  doc.text(`Tax: ${userData.tax}`, 10, 40);
  doc.text(`Location: ${userData.location}`, 10, 50);
  doc.save(`UserData-${userData.year}.pdf`);
};

export type Payment = {
  userId: string;
  year: number;
  income: number;
  location: string;
  tax: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "income",
    header: "Income",
  },
  {
    accessorKey: "tax",
    header: "Tax Amount",
  },
  {
    accessorKey: "download",
    header: "Download",
    cell: ({ row }) => (
      <button onClick={() => downloadUserData(row.original)}>
        Download PDF
      </button>
    ),
  },
];
