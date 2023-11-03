"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  userid: string;
  year: number;
  income: number;
  location: string;
  tax: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "userid",
    header: "UserID",
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
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "tax",
    header: "Tax Amount",
  },
];
