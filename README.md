# React Component Library - InputField & DataTable

A modern React component library featuring highly customizable InputField and DataTable components built with TypeScript, TailwindCSS, and comprehensive Storybook documentation.

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm (or yarn/pnpm)

### Installation & Setup

1. **Clone and navigate to the project**:

   ```bash
   git clone <repository-url>
   cd UzenceAssignment
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

4. **Run Storybook for component documentation**:
   ```bash
   npm run storybook
   ```
   Storybook will be available at `http://localhost:6006`

## 📁 Folder Structure

```text
UzenceAssignment/
├─ .github/
├─ .storybook/
│  ├─ main.ts
│  ├─ preview.ts
│  └─ vitest.setup.ts
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ components/
│  │  ├─ DataTable/
│  │  │  ├─ DataTable.tsx
│  │  │  ├─ DataTable.stories.tsx
│  │  │  ├─ types.ts          # re-exports shared types
│  │  │  └─ index.ts          # component export
│  │  ├─ InputField/
│  │  │  ├─ InputField.tsx
│  │  │  ├─ InputField.stories.tsx
│  │  │  ├─ InputField.types.ts # re-exports shared types
│  │  │  └─ index.ts
│  │  ├─ ThemeToggle/
│  │  │  ├─ ThemeToggle.tsx
│  │  │  └─ index.ts
│  │  └─ index.ts             # library exports (components + types)
│  ├─ stories/                # Storybook example stories
│  ├─ types/
│  │  └─ types.ts             # centralized shared types
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ index.css
│  └─ vite-env.d.ts
├─ index.html
├─ package.json
├─ tailwind.config.js
├─ vite.config.ts
└─ README.md
```

## 🧭 Approach Summary

- **Modular architecture**: Each component has an isolated folder (implementation, stories, local types, and exports).
- **Centralized types**: Shared interfaces (InputFieldProps, DataTableProps, Column, SortDirection) live in `src/types/types.ts` and are re-exported for DX-friendly imports.
- **Accessibility-first**: Proper ARIA attributes, keyboard interactions, screen reader support, and high-contrast states.
- **Tailwind utility-first styling**: Consistent variants (`filled`, `outlined`, `ghost`), sizes, dark mode, and responsive behavior.
- **Type-safe, generic DataTable**: Sorting, selection, and custom renderers with strict TypeScript generics.
- **Performance-conscious**: `useMemo`/`useCallback` to minimize re-renders, lightweight icons via `lucide-react`.
- **Comprehensive Storybook**: Interactive docs, variants, states, and real-world examples to aid discovery and QA.

## 📦 Components

### InputField Component

A flexible and accessible input component with comprehensive validation and theming support.

#### Features

- ✅ **Multiple Variants**: `filled`, `outlined`, `ghost`
- ✅ **Size Options**: `sm`, `md`, `lg`
- ✅ **States**: `disabled`, `invalid`, `loading`
- ✅ **Interactive Elements**: Clear button, password toggle
- ✅ **Validation**: Error messages, helper text
- ✅ **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- ✅ **Theming**: Light/dark mode support
- ✅ **TypeScript**: Full type safety

#### Basic Usage

```tsx
import { useState } from "react";
import { InputField } from "./components";

function MyForm() {
  const [value, setValue] = useState("");

  return (
    <InputField
      label="Email Address"
      type="email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter your email"
      variant="outlined"
      size="md"
    />
  );
}
```

#### Props Interface

```typescript
// Mirrors src/types/types.ts
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
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  "aria-label"?: string;
  "aria-describedby"?: string;
}
```

### DataTable Component

A comprehensive data table with sorting, selection, and custom rendering capabilities.

#### Features

- ✅ **Column Sorting**: Ascending, descending, and no-sort states
- ✅ **Row Selection**: Single and multiple selection modes
- ✅ **Custom Rendering**: Flexible cell content with render functions
- ✅ **Loading States**: Built-in loading spinner and overlay
- ✅ **Empty States**: Customizable empty data messages
- ✅ **Column Configuration**: Sortable, alignment, width options
- ✅ **Accessibility**: Full keyboard navigation and screen reader support
- ✅ **Responsive**: Mobile-friendly design
- ✅ **TypeScript**: Generic type support for data safety

#### Basic Usage

```tsx
import { DataTable, type Column } from "./components";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

function UserList() {
  const columns: Column<User>[] = [
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
    { key: "role", header: "Role", sortable: true },
  ];

  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    // ... more users
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      selectable={true}
      onRowSelect={(selected) => console.log(selected)}
    />
  );
}
```

#### Props Interface

```typescript
// Mirrors src/types/types.ts
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

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}
```

## 🎨 Storybook Documentation

Our components include comprehensive Storybook documentation featuring:

- **Component Overview**: Purpose, features, and anatomy
- **API Documentation**: Complete prop definitions with TypeScript
- **Interactive Examples**: All variants, states, and configurations
- **Use Cases**: Real-world implementation examples
- **Accessibility Notes**: ARIA roles, keyboard navigation, screen reader support
- **Best Practices**: Do's and don'ts with practical examples
- **Theming Guide**: Dark mode and responsive design patterns

### Storybook Features

#### InputField Stories:

- Basic variants (filled, outlined, ghost)
- All sizes (sm, md, lg)
- State variations (disabled, invalid, loading)
- Interactive features (clear button, password toggle)
- Form examples (login, search interfaces)
- Validation demonstrations
- Best practices and anti-patterns

#### DataTable Stories:

- Basic table functionality
- Column sorting demonstrations
- Row selection examples
- Custom cell rendering
- Loading and empty states
- Different data types (users, products)
- Real-world use cases (user management, e-commerce)
- Performance testing with large datasets

## 🛠️ Development Approach

### Architecture Decisions

1. **Component Structure**: Modular architecture with separate concerns

   - `/components/[ComponentName]/` - Individual component folders
   - `ComponentName.tsx` - Main component implementation
   - `ComponentName.stories.tsx` - Storybook documentation
   - `types.ts` - TypeScript interfaces and types
   - `index.ts` - Clean exports

2. **Styling Strategy**: TailwindCSS with utility-first approach

   - Responsive design with mobile-first methodology
   - Dark mode support using Tailwind's built-in dark mode
   - Component-specific utility classes for consistent styling
   - Accessibility-focused color contrast and focus states

3. **TypeScript Integration**: Full type safety throughout

   - Generic components for flexible data handling
   - Comprehensive prop interfaces
   - Strict type checking for better developer experience
   - Export of types for consumer applications

4. **Accessibility First**: WCAG 2.1 AA compliance
   - Semantic HTML structure
   - Proper ARIA labeling and descriptions
   - Keyboard navigation support
   - Screen reader compatibility
   - High contrast mode support

### Code Quality

- **ESLint**: Configured with React and TypeScript rules
- **TypeScript**: Strict mode enabled for maximum type safety
- **Component Patterns**: Consistent use of React hooks and patterns
- **Performance**: Optimized with `useCallback`, `useMemo`, and proper dependency arrays
- **Testing Ready**: Components structured for easy unit and integration testing

## 📱 Responsive Design

Both components are fully responsive:

- **Mobile First**: Designed for mobile devices first, then enhanced for larger screens
- **Flexible Layouts**: Components adapt to available space
- **Touch Friendly**: Interactive elements sized for touch interfaces
- **Breakpoint Awareness**: Utilizes Tailwind's responsive utilities

## 🌙 Dark Mode Support

Complete dark mode implementation:

- **Automatic Detection**: Respects user's system preferences
- **Manual Toggle**: Can be controlled programmatically
- **Consistent Theming**: All components support light and dark themes
- **Accessibility**: Maintains proper contrast ratios in both modes

## 🚧 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run storybook` - Start Storybook documentation
- `npm run build-storybook` - Build Storybook for deployment
- `npm run lint` - Run ESLint


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Support

For questions, issues, or contributions, please refer to the GitHub repository or contact the development team.

---

**Built with ❤️ using React, TypeScript, TailwindCSS, and Storybook**
