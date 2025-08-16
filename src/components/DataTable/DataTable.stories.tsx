import type { Meta, StoryObj } from "@storybook/react-vite";
import DataTable from "./DataTable";
import type { DataTableProps } from "./types";

// Define sample data interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  salary?: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-15",
    salary: 75000,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    status: "active",
    lastLogin: "2024-01-14",
    salary: 65000,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Developer",
    status: "inactive",
    lastLogin: "2024-01-10",
    salary: 55000,
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Designer",
    status: "pending",
    lastLogin: "2024-01-12",
    salary: 50000,
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Developer",
    status: "active",
    lastLogin: "2024-01-16",
    salary: 58000,
  },
];

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Laptop Pro",
    category: "Electronics",
    price: 1299,
    stock: 15,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 29,
    stock: 50,
    rating: 4.2,
  },
  {
    id: 3,
    name: "Office Chair",
    category: "Furniture",
    price: 199,
    stock: 8,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Desk Lamp",
    category: "Furniture",
    price: 45,
    stock: 25,
    rating: 4.1,
  },
];

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# DataTable Component

A flexible and accessible data table component with sorting, selection, and loading states.

## Features
- **Column Sorting**: Click column headers to sort data (ascending/descending/none)
- **Row Selection**: Single or multiple row selection with checkboxes
- **Loading State**: Shows spinner while data is being fetched
- **Empty State**: Customizable message when no data is available
- **Responsive Design**: Adapts to different screen sizes
- **Dark Theme Support**: Automatically adapts to light/dark themes
- **Accessibility**: Full keyboard navigation and screen reader support

## Anatomy
The DataTable consists of:
- **Header Row**: Column headers with optional sorting indicators
- **Select All Checkbox**: When selectable is enabled (header)
- **Data Rows**: Individual rows with data cells
- **Row Checkboxes**: When selectable is enabled (per row)
- **Loading Overlay**: Spinner shown during loading state
- **Empty State**: Message and icon when no data

## Column Configuration
Each column can be configured with:
- \`key\`: Property key from data object
- \`header\`: Display text for column header
- \`sortable\`: Enable/disable sorting for this column
- \`render\`: Custom render function for cell content
- \`width\`: Fixed width for the column
- \`align\`: Text alignment (left, center, right)

## Accessibility
- Uses proper table semantics (\`<table>\`, \`<thead>\`, \`<tbody>\`)
- ARIA labels for interactive elements
- Keyboard navigation support (Tab, Enter, Space)
- Screen reader announcements for sorting and selection
- Focus management with visible focus indicators
- Color contrast meets WCAG AA standards
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
      description: "Show loading state with spinner",
    },
    selectable: {
      control: "boolean",
      description: "Enable row selection with checkboxes",
    },
    emptyMessage: {
      control: "text",
      description: "Message to show when data array is empty",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the table container",
    },
  },
  args: {
    onRowSelect: (selectedRows) => {
      console.log("Selected rows:", selectedRows);
    },
    onSort: (key, direction) => {
      console.log("Sort:", key, direction);
    },
  },
};

export default meta;
type Story = StoryObj<DataTableProps<User>>;

// Basic Examples
export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: [
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
      { key: "role", header: "Role", sortable: true },
      { key: "status", header: "Status", sortable: true },
    ],
  } satisfies DataTableProps<User>,
};

export const WithCustomRendering: Story = {
  args: {
    data: sampleUsers,
    columns: [
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
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        ),
      },
      {
        key: "salary",
        header: "Salary",
        sortable: true,
        align: "right" as const,
        render: (value: number) => `$${value?.toLocaleString() || "N/A"}`,
      },
    ],
  } satisfies DataTableProps<User>,
  parameters: {
    docs: {
      description: {
        story:
          "Example with custom cell rendering for status badges and formatted salary.",
      },
    },
  },
};

export const Selectable: Story = {
  args: {
    data: sampleUsers,
    columns: [
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
      { key: "role", header: "Role", sortable: true },
      { key: "status", header: "Status", sortable: true },
    ],
    selectable: true,
  } satisfies DataTableProps<User>,
  parameters: {
    docs: {
      description: {
        story:
          "Table with row selection enabled. Users can select individual rows or use 'Select All'.",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    data: sampleUsers,
    columns: [
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
      { key: "role", header: "Role", sortable: true },
      { key: "status", header: "Status", sortable: true },
    ],
    loading: true,
  } satisfies DataTableProps<User>,
  parameters: {
    docs: {
      description: {
        story: "Loading state with spinner overlay.",
      },
    },
  },
};

export const Empty: Story = {
  args: {
    data: [] as User[],
    columns: [
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
      { key: "role", header: "Role", sortable: true },
      { key: "status", header: "Status", sortable: true },
    ],
    emptyMessage: "No users found. Try adjusting your search criteria.",
  } satisfies DataTableProps<User>,
  parameters: {
    docs: {
      description: {
        story: "Empty state with custom message when no data is available.",
      },
    },
  },
};

// Different Data Types
export const ProductTable: StoryObj<DataTableProps<Product>> = {
  args: {
    data: sampleProducts,
    columns: [
      { key: "name", header: "Product Name", sortable: true },
      { key: "category", header: "Category", sortable: true },
      {
        key: "price",
        header: "Price",
        sortable: true,
        align: "right" as const,
        render: (value: number) => `$${value}`,
      },
      {
        key: "stock",
        header: "Stock",
        sortable: true,
        align: "center" as const,
        render: (value: number) => (
          <span className={value < 10 ? "text-red-600 font-medium" : ""}>
            {value}
          </span>
        ),
      },
      {
        key: "rating",
        header: "Rating",
        sortable: true,
        align: "center" as const,
        render: (value: number) => (
          <div className="flex items-center justify-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{value}</span>
          </div>
        ),
      },
    ],
    selectable: true,
  } satisfies DataTableProps<Product>,
  parameters: {
    docs: {
      description: {
        story:
          "Example with different data type (products) showing various column alignments and custom rendering.",
      },
    },
  },
};

// Use Cases & Examples
export const UserManagement: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">User Management</h3>
        <div className="text-sm text-gray-500">
          Manage your team members and their permissions
        </div>
      </div>
      <DataTable<User>
        data={sampleUsers}
        columns={[
          { key: "name", header: "Full Name", sortable: true },
          { key: "email", header: "Email Address", sortable: true },
          { key: "role", header: "Role", sortable: true },
          {
            key: "status",
            header: "Status",
            sortable: true,
            render: (value: User["status"]) => (
              <span
                className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${value === "active" ? "bg-green-100 text-green-800" : ""}
                  ${value === "inactive" ? "bg-red-100 text-red-800" : ""}
                  ${value === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                `}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </span>
            ),
          },
          { key: "lastLogin", header: "Last Login", sortable: true },
        ]}
        selectable={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world example of a user management interface with the DataTable component.",
      },
    },
  },
};

export const InventoryDashboard: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Inventory Dashboard</h3>
        <div className="text-sm text-gray-500">
          Track your product inventory and stock levels
        </div>
      </div>
      <DataTable<Product>
        data={sampleProducts}
        columns={[
          { key: "name", header: "Product", sortable: true },
          { key: "category", header: "Category", sortable: true },
          {
            key: "price",
            header: "Price",
            sortable: true,
            align: "right" as const,
            render: (value: number) => (
              <span className="font-medium">${value}</span>
            ),
          },
          {
            key: "stock",
            header: "Stock",
            sortable: true,
            align: "center" as const,
            render: (value: number) => (
              <span
                className={`
                  px-2 py-1 rounded text-xs font-medium
                  ${
                    value < 10
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }
                `}
              >
                {value} units
              </span>
            ),
          },
          {
            key: "rating",
            header: "Rating",
            sortable: true,
            align: "center" as const,
            render: (value: number) => (
              <div className="flex items-center justify-center">
                {"★".repeat(Math.floor(value))}
                <span className="ml-1 text-sm text-gray-600">({value})</span>
              </div>
            ),
          },
        ]}
        selectable={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of an inventory dashboard showing products with stock alerts and ratings.",
      },
    },
  },
};

// Best Practices
export const BestPractices: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-green-800 font-semibold mb-3">
          ✅ Do's - Best Practices
        </h3>
        <div className="space-y-4">
          <DataTable
            data={sampleUsers.slice(0, 3)}
            columns={[
              { key: "name", header: "Clear Column Headers", sortable: true },
              { key: "email", header: "Descriptive Names", sortable: true },
              {
                key: "status",
                header: "Status",
                sortable: true,
                render: (value: User["status"]) => (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    {value}
                  </span>
                ),
              },
            ]}
            selectable={true}
          />
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Use clear, descriptive column headers</li>
            <li>• Enable sorting for relevant columns</li>
            <li>• Use custom rendering for better data visualization</li>
            <li>• Provide meaningful empty states</li>
            <li>• Include loading states for better UX</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**Best Practices for DataTable:**
- Use clear, descriptive column headers
- Enable sorting only for relevant columns
- Implement custom rendering for better data visualization
- Provide meaningful empty state messages
- Include loading states for async operations
- Use proper alignment for different data types (numbers right-aligned)
- Implement row selection thoughtfully
- Ensure keyboard accessibility
- Test with screen readers
        `,
      },
    },
  },
};

export const AvoidThese: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-3">
          ❌ Don'ts - Avoid These
        </h3>
        <div className="space-y-4">
          <DataTable
            data={sampleUsers.slice(0, 2)}
            columns={[
              { key: "name", header: "col1" }, // Bad: unclear header
              { key: "email", header: "data" }, // Bad: generic header
              { key: "status", header: "info" }, // Bad: vague header
            ]}
          />
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Avoid unclear or generic column headers</li>
            <li>• Don't make every column sortable unnecessarily</li>
            <li>• Avoid displaying raw data without formatting</li>
            <li>• Don't ignore loading and empty states</li>
            <li>• Avoid poor contrast or hard-to-read text</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**Avoid These Practices:**
- Using unclear or generic column headers (col1, data, info)
- Making every column sortable when it doesn't make sense
- Displaying raw data without proper formatting
- Ignoring loading and empty states
- Using poor color contrast
- Overcrowding tables with too many columns
- Not considering mobile responsiveness
- Missing keyboard navigation support
        `,
      },
    },
  },
};
