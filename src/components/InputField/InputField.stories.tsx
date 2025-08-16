import type { Meta, StoryObj } from "@storybook/react-vite";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# InputField Component

A flexible and accessible input component with validation states, multiple variants, and comprehensive theming support.

## Features
- Multiple variants: filled, outlined, ghost
- Three sizes: small (sm), medium (md), large (lg)  
- Validation states with error messages and helper text
- Loading state with spinner
- Optional clear button and password toggle
- Disabled state support
- Light and dark theme compatibility
- Full keyboard navigation support
- Screen reader accessible with ARIA labels

## Anatomy
The InputField consists of:
- **Label**: Optional descriptive text above the input
- **Input Container**: The main input wrapper with variant styling
- **Input Field**: The actual input element
- **Action Icons**: Optional clear button, password toggle, or loading spinner
- **Helper Text**: Optional supportive text below the input
- **Error Message**: Validation feedback when invalid

## Accessibility
- Uses proper ARIA labels and descriptions
- Keyboard navigation support (Tab, Enter, Escape)
- Focus management with visible focus indicators
- Screen reader announcements for state changes
- Color contrast meets WCAG AA standards
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outlined", "ghost"],
      description: "Visual style variant of the input field",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the input field",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input field",
    },
    invalid: {
      control: "boolean",
      description: "Shows error state styling",
    },
    loading: {
      control: "boolean",
      description: "Shows loading spinner",
    },
    showClearButton: {
      control: "boolean",
      description: "Shows clear button when input has value",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "HTML input type",
    },
  },
  args: {
    onChange: () => {},
    onClear: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    placeholder: "Enter your text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    helperText: "Must be at least 8 characters long",
  },
};

// Variants
export const Filled: Story = {
  args: {
    variant: "filled",
    label: "Filled Input",
    placeholder: "Type something...",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    label: "Outlined Input",
    placeholder: "Type something...",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    label: "Ghost Input",
    placeholder: "Type something...",
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: "sm",
    label: "Small Input",
    placeholder: "Small size",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    label: "Medium Input",
    placeholder: "Medium size",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large Input",
    placeholder: "Large size",
  },
};

// States
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "This is disabled",
    disabled: true,
    value: "Cannot edit this",
  },
};

export const Invalid: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    value: "invalid-email",
    invalid: true,
    errorMessage: "Please enter a valid email address",
  },
};

export const Loading: Story = {
  args: {
    label: "Loading Input",
    placeholder: "Processing...",
    loading: true,
    value: "Validating...",
  },
};

// Interactive Features
export const WithClearButton: Story = {
  args: {
    label: "Search",
    placeholder: "Search products...",
    value: "React components",
    showClearButton: true,
  },
};

export const PasswordWithToggle: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    value: "mysecretpassword",
    showPasswordToggle: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Password input with toggle button to show/hide password text.",
      },
    },
  },
};

// Use Cases & Examples
export const LoginForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        variant="outlined"
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        variant="outlined"
        helperText="Must be at least 8 characters"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of InputField components used in a login form context.",
      },
    },
  },
};

export const SearchInterface: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <InputField
        label="Search Products"
        placeholder="Search for products, brands, categories..."
        variant="filled"
        size="lg"
        showClearButton={true}
        value="wireless headphones"
      />
      <InputField
        label="Filter by Price Range"
        placeholder="Enter max price"
        type="number"
        variant="outlined"
        size="md"
        helperText="Leave empty for no limit"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of InputField components used in a search and filter interface.",
      },
    },
  },
};

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Valid Input"
        value="john.doe@example.com"
        variant="outlined"
      />
      <InputField
        label="Invalid Input"
        value="invalid-email"
        invalid={true}
        errorMessage="Please enter a valid email address"
        variant="outlined"
      />
      <InputField
        label="Loading Input"
        value="Checking availability..."
        loading={true}
        variant="outlined"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different validation states showing success, error, and loading states.",
      },
    },
  },
};

// Best Practices Examples
export const DosBestPractices: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-green-800 font-semibold mb-3">
          ✅ Do's - Best Practices
        </h3>
        <div className="space-y-3">
          <InputField
            label="Clear and descriptive label"
            placeholder="Specific placeholder text"
            helperText="Helpful guidance for users"
            variant="outlined"
          />
          <InputField
            label="Proper validation"
            type="email"
            invalid={true}
            errorMessage="Specific error message explaining what's wrong"
            variant="outlined"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**Best Practices:**
- Use clear, descriptive labels
- Provide helpful placeholder text
- Include relevant helper text
- Show specific error messages
- Use appropriate input types
- Maintain consistent sizing
- Ensure proper contrast ratios
        `,
      },
    },
  },
};

export const DontsBestPractices: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-3">
          ❌ Don'ts - Avoid These
        </h3>
        <div className="space-y-3">
          <InputField
            placeholder="Bad: Using placeholder as label"
            variant="outlined"
          />
          <InputField
            label="Input"
            invalid={true}
            errorMessage="Error"
            variant="outlined"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**Avoid These Practices:**
- Using placeholder text as the only label
- Generic or unclear labels
- Vague error messages
- Inconsistent sizing across forms
- Poor color contrast
- Missing helper text for complex inputs
        `,
      },
    },
  },
};
