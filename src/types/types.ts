import type { ReactNode } from "react";

// Shared InputField props (centralized)
export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password" | "email" | "number";
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  id?: string;
  name?: string;
  className?: string;
  onClear?: () => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

// Shared DataTable types (centralized)
export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  onSort?: (key: keyof T, direction: "asc" | "desc") => void;
  emptyMessage?: string;
  className?: string;
}

export type SortDirection = "asc" | "desc" | null;
