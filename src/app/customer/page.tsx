"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCustomers } from "@/redux/reducers/customerSlice";

export default function CustomerListPage() {
  const dispatch = useAppDispatch();
  const { customers, loading, error } = useAppSelector((state) => state.customer);
  

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <div className=" mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Customer List</h1>
      {loading && <div className="mb-4 text-blue-600">Loading...</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers && customers.length > 0 ? (
              customers.map((customer: any, idx: number) => (
                <tr key={customer._id || idx} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{customer._id || idx + 1}</td>
                  <td className="py-2 px-4 border-b">{customer.name}</td>
                  <td className="py-2 px-4 border-b">{customer.email}</td>
                  <td className="py-2 px-4 border-b">{customer.phone}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${customer.accountStatus === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {customer.accountStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
