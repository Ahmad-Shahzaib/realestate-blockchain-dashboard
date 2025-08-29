"use client";
import React from "react";
// Define column interface for type safety 
interface Column<T> {
    key: keyof T;
    label: string;
    render?: (row: T) => React.ReactNode;
}

// Define props interface for type safety
interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
}
// Generic Table component
const Table = <T extends { id: number | string }>({ data, columns }: TableProps<T>) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-[#ECF0F1] dark:border-dark-4">
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#ECF0F1] dark:divide-dark-4">
                    {data.map((row) => (
                        <tr
                            key={row.id}
                            className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3 transition-colors"
                        >
                            {columns.map((col) => (
                                <td key={String(col.key)} className="py-4 px-2">
                                    {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
