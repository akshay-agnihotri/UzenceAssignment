import { useState } from "react";
import { InputField, DataTable, ThemeToggle } from "./components";
import type { Column } from "./components/DataTable/types";

// Sample data for demonstration
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Manager",
    status: "pending",
  },
];

const columns: Column<User>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (value: User["status"]) => (
      <span
        className={`
        px-2 py-1 rounded-full text-xs font-medium
        ${
          value === "active"
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            : ""
        }
        ${
          value === "inactive"
            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            : ""
        }
        ${
          value === "pending"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            : ""
        }
      `}
      >
        {value}
      </span>
    ),
  },
];

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            React Component Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Showcasing InputField and DataTable components built with React,
            TypeScript, and TailwindCSS
          </p>
        </div>

        {/* InputField Examples */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            InputField Component
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InputField
                label="Default Input"
                placeholder="Enter some text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                showClearButton={true}
              />
              <InputField
                label="Email Input"
                type="email"
                placeholder="your.email@example.com"
                variant="outlined"
              />
              <InputField
                label="Password Input"
                type="password"
                placeholder="Enter your password"
                variant="filled"
                helperText="Must be at least 8 characters long"
                showPasswordToggle={true}
              />
            </div>
            <div className="space-y-4">
              <InputField
                label="Large Input"
                size="lg"
                placeholder="Large size input"
                variant="ghost"
              />
              <InputField
                label="Invalid Input"
                value="invalid-email"
                invalid={true}
                errorMessage="Please enter a valid email address"
                variant="outlined"
              />
              <InputField
                label="Disabled Input"
                value="Cannot edit this"
                disabled={true}
                variant="outlined"
              />
            </div>
          </div>
        </div>

        {/* DataTable Example */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              DataTable Component
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {selectedUsers.length > 0 &&
                `${selectedUsers.length} user(s) selected`}
            </div>
          </div>
          <DataTable
            data={sampleUsers}
            columns={columns}
            selectable={true}
            onRowSelect={setSelectedUsers}
          />
        </div>

        {/* Storybook Link */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            For detailed documentation and all component variants, check out
            Storybook
          </p>
          <a
            href="https://uzenceassignment-storybook.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Storybook Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
