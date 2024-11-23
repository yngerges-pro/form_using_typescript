"use client";
import React, { useState } from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTable } from "@refinedev/react-table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {useReactTable} from "@tanstack/react-table";
import { useNavigation } from "@refinedev/core";
import { ColumnDef, flexRender } from "@tanstack/react-table";

// Define Zod validation schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email is required").min(1, "Invalid email address"),
  message: z.string().min(1, "Message is required"),
  department: z.string().min(1,"Department is required"),
  model: z.string().min(1,"Required"),
  serialnumber: z.string().min(1,"Required"),
  date: z.string().min(1,"Required"),
  status: z.string().min(1,"Required"),

});

type FormData = z.infer<typeof schema>;

const MyForm = () => {
  const [userList, setUserList] = useState<FormData[]>([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema) // Integrate Zod schema with React Hook Form
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
      setUserList((prevList) => [...prevList,data]);
  };

  const columns = React.useMemo(
    () => [
      {accessorKey: "name", header: "Name"},
      {accessorKey: "email", header: "Email"},
      {accessorKey: "message", header: "Message"},
      {accessorKey: "department", header: "Department"},
      {accessorKey: "model", header: "Model"},
      {accessorKey: "serialnumber", header: "Serialnumber"},
      {accessorKey: "date", header: "Date"},
      {accessorKey: "status", header: "Status"},

    ],
    []
  );

  const table = useTable({
    data: userList,
    columns,
  })

  return (
    <div>
    {/* Form */}
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input {...register("name")} placeholder="Name" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Message:</label>
        <textarea {...register("message")} placeholder="Message" />
        {errors.message && <p>{errors.message.message}</p>}
      </div>

      <div>
        <label>Department:</label>
        <select {...register("department")}>
          <option value="">Select One</option>
          <option value="Machining">Machining</option>
          <option value="Assembly">Assembly</option>
          <option value="Packaging">Packaging</option>
          <option value="Shipping">Shipping</option>
        </select>
        {errors.department && <p>{errors.department.message}</p>}
      </div>

      <div>
        <label>Model:</label>
        <input {...register("model")} placeholder="Model" />
        {errors.model && <p>{errors.model.message}</p>}
      </div>

      <div>
        <label>Serial Number:</label>
        <input {...register("serialnumber")} placeholder="Serial Number" />
        {errors.serialnumber && <p>{errors.serialnumber.message}</p>}
      </div>

      <div>
        <label>Install Date:</label>
        <input type="date" {...register("date")} />
        {errors.date && <p>{errors.date.message}</p>}
      </div>

      <div>
        <label>Status:</label>
        <select {...register("status")}>
          <option value="">Select One</option>
          <option value="Operational">Operational</option>
          <option value="Down">Down</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Retired">Retired</option>
        </select>
        {errors.status && <p>{errors.status.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>

    {/* Table */}
    <div>
      <h2>User Data</h2>
      {userList.length > 0 ? (
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                ))}
              </tr>
            ))}
            {/* fjda */}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  </div>
   
  
  );
};
const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MyForm />
    </QueryClientProvider>
  );
};

export default App;




