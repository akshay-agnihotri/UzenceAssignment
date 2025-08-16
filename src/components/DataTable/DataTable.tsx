import { useState, useCallback, useMemo } from "react";
import {
  ChevronUp,
  ChevronDown,
  Loader2,
  CheckSquare,
  Square,
  Minus,
} from "lucide-react";
import type { DataTableProps, Column, SortDirection } from "./types";

function DataTable<T extends object>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  onSort,
  emptyMessage = "No data available",
  className = "",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Sort data
  const compareValues = (a: unknown, b: unknown): number => {
    if (a === b) return 0;
    if (a == null) return -1;
    if (b == null) return 1;

    if (typeof a === "number" && typeof b === "number") {
      return a < b ? -1 : 1;
    }
    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b);
    }
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() - b.getTime();
    }
    if (typeof a === "boolean" && typeof b === "boolean") {
      return Number(a) - Number(b);
    }

    // Fallback to string comparison
    return String(a).localeCompare(String(b));
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const cmp = compareValues(a[sortKey], b[sortKey]);
      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDirection]);

  // Handle sort
  const handleSort = useCallback(
    (key: keyof T) => {
      const column = columns.find((col) => col.key === key);
      if (!column?.sortable) return;

      let newDirection: SortDirection = "asc";
      if (sortKey === key) {
        if (sortDirection === "asc") newDirection = "desc";
        else if (sortDirection === "desc") newDirection = null;
        else newDirection = "asc";
      }

      setSortKey(newDirection ? key : null);
      setSortDirection(newDirection);

      if (onSort && newDirection) {
        onSort(key, newDirection);
      }
    },
    [sortKey, sortDirection, columns, onSort]
  );

  // Handle row selection
  const handleRowSelect = useCallback(
    (index: number, isSelected: boolean) => {
      const newSelectedRows = new Set(selectedRows);

      if (isSelected) {
        newSelectedRows.add(index);
      } else {
        newSelectedRows.delete(index);
      }

      setSelectedRows(newSelectedRows);

      if (onRowSelect) {
        const selected = Array.from(newSelectedRows).map((i) => sortedData[i]);
        onRowSelect(selected);
      }
    },
    [selectedRows, sortedData, onRowSelect]
  );

  // Handle select all
  const handleSelectAll = useCallback(() => {
    const newSelectedRows = new Set<number>();
    const isAllSelected = selectedRows.size === sortedData.length;

    if (!isAllSelected) {
      sortedData.forEach((_, index) => {
        newSelectedRows.add(index);
      });
    }

    setSelectedRows(newSelectedRows);

    if (onRowSelect) {
      const selected = Array.from(newSelectedRows).map((i) => sortedData[i]);
      onRowSelect(selected);
    }
  }, [selectedRows, sortedData, onRowSelect]);

  // Get select all state
  const selectAllState = useMemo(() => {
    if (selectedRows.size === 0) return "none";
    if (selectedRows.size === sortedData.length) return "all";
    return "partial";
  }, [selectedRows.size, sortedData.length]);

  // Render cell content
  const renderCell = useCallback((column: Column<T>, row: T) => {
    const value = row[column.key];

    if (column.render) {
      return column.render(value, row);
    }

    return String(value ?? "");
  }, []);

  // Base classes
  const baseClasses = `
    w-full border-collapse bg-white dark:bg-gray-900 
    border border-gray-200 dark:border-gray-700 
    rounded-lg overflow-hidden shadow-sm
  `.trim();

  if (loading) {
    return (
      <div className={`${baseClasses} ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (sortedData.length === 0) {
    return (
      <div className={`${baseClasses} ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-gray-400 dark:text-gray-600 mb-2">
              <Square className="h-12 w-12 mx-auto opacity-50" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {selectable && (
              <th className="w-12 px-4 py-3 text-left">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center justify-center w-5 h-5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                  aria-label="Select all rows"
                >
                  {selectAllState === "all" && (
                    <CheckSquare className="h-5 w-5" />
                  )}
                  {selectAllState === "partial" && (
                    <Minus className="h-5 w-5" />
                  )}
                  {selectAllState === "none" && <Square className="h-5 w-5" />}
                </button>
              </th>
            )}
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`
                  px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100
                  ${column.align === "center" ? "text-center" : ""}
                  ${column.align === "right" ? "text-right" : "text-left"}
                  ${
                    column.sortable
                      ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 select-none"
                      : ""
                  }
                `}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
                role={column.sortable ? "button" : undefined}
                tabIndex={column.sortable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (column.sortable && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    handleSort(column.key);
                  }
                }}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && (
                    <div className="flex flex-col">
                      <ChevronUp
                        className={`h-3 w-3 -mb-1 ${
                          sortKey === column.key && sortDirection === "asc"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-400"
                        }`}
                      />
                      <ChevronDown
                        className={`h-3 w-3 ${
                          sortKey === column.key && sortDirection === "desc"
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedData.map((row, index) => (
            <tr
              key={index}
              className={`
                hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors
                ${
                  selectedRows.has(index)
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : ""
                }
              `}
            >
              {selectable && (
                <td className="w-12 px-4 py-3">
                  <button
                    onClick={() =>
                      handleRowSelect(index, !selectedRows.has(index))
                    }
                    className="flex items-center justify-center w-5 h-5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                    aria-label={`Select row ${index + 1}`}
                  >
                    {selectedRows.has(index) ? (
                      <CheckSquare className="h-5 w-5" />
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                  </button>
                </td>
              )}
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={`
                    px-4 py-3 text-sm text-gray-900 dark:text-gray-100
                    ${column.align === "center" ? "text-center" : ""}
                    ${column.align === "right" ? "text-right" : "text-left"}
                  `}
                >
                  {renderCell(column, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
