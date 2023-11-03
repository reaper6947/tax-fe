"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  income: z.string(),
  location: z.string(),
  gender: z.string(),
  age: z.string(),
  year: z.string(),
});

const years: string[] = [];
for (let year = 1900; year <= 2030; year++) {
  years.push(year.toString());
}

const DashboardPage = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: "",
      location: "Dhaka",
      gender: "male",
      age: "",
      year: "",
    },
  });

  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [formData, setFormData] = useState<any[]>([]);
  const { userId } = useAuth();
  const clerkUserID = userId || "";

  function onSubmit(values: z.infer<typeof formSchema>) {
    const dataWithUserID = {
      ...values,
      userId: clerkUserID,
      income: parseInt(values.income, 10),
      year: parseInt(values.year, 10),
      age: parseInt(values.age, 10),
    };

    axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + "/tax", dataWithUserID)
      .then((response) => {
        console.log("Tax data submitted successfully", response.data);
        toast({
          description: "Your data has been recorded.",
          style: {
            background: "#111827",
            color: "white",
          },
        });
        form.reset();
      })
      .catch((error) => {
        console.error("Error submitting tax data", error);
      });
  }

  return (
    <div className="h-full flex items-center justify-center mt-[6%]">
      <div className="border rounded-lg p-8 w-96 bg-white shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Income field */}
            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel htmlFor="income">Income</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      type="number"
                      id="income"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location field */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel htmlFor="location">Location</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div>
                          <Input
                            placeholder="Select Location"
                            value={selectedLocation}
                            readOnly
                            id="location"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedLocation("Dhaka");
                            field.onChange("Dhaka");
                          }}
                        >
                          Dhaka
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedLocation("Chattogram");
                            field.onChange("Chattogram");
                          }}
                        >
                          Chattogram
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedLocation("City Corporation");
                            field.onChange("City Corporation");
                          }}
                        >
                          City Corporation
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedLocation("Non-city Corporation");
                            field.onChange("Non-city Corporation");
                          }}
                        >
                          Non-city Corporation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender field */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div>
                          <Input
                            placeholder="Select Gender"
                            value={selectedGender}
                            readOnly
                            id="gender"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedGender("male");
                            field.onChange("male");
                          }}
                        >
                          Male
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedGender("female");
                            field.onChange("female");
                          }}
                        >
                          Female
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Age field */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel htmlFor="age">Age</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} type="number" id="age" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Year field */}
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel htmlFor="year">Year</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div>
                          <Input
                            placeholder="Select Year"
                            value={field.value || ""}
                            readOnly
                            id="year"
                          />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        style={{
                          maxHeight: "200px",
                          overflowY: "auto",
                        }}
                      >
                        {years.map((yearOption) => (
                          <DropdownMenuItem
                            key={yearOption}
                            onClick={() => {
                              field.onChange(yearOption);
                            }}
                          >
                            {yearOption}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DashboardPage;
