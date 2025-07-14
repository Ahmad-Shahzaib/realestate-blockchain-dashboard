import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export type DynamicTableColumn = {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
};

export type DynamicTableProps = {
  data: any[];
  columns: DynamicTableColumn[];
  actions?: (row: any) => React.ReactNode;
  itemsPerPage?: number;
};

const DynamicTable: React.FC<DynamicTableProps> = ({ data, columns, actions, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}
            {actions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, idx) => (
            <TableRow key={row.id || idx}>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </TableCell>
              ))}
              {actions && <TableCell>{actions(row)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-black/70">
            Showing <span className="font-medium">{data.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, data.length)}</span> of{' '}
            <span className="font-medium">{data.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 text-sm border border-black/20 rounded-lg hover:bg-black/10 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-2 text-sm rounded-lg ${currentPage === i + 1 ? 'bg-black text-background' : 'border border-black/20 hover:bg-black/10'}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-2 text-sm border border-black/20 rounded-lg hover:bg-black/10 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DynamicTable;
