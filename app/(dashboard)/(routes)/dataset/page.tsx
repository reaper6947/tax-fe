"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { columns, Payment } from "./column";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);
  const { userId } = useAuth();
  const clerkUserID = userId || "";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL + "/tax/" + clerkUserID
        );
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
