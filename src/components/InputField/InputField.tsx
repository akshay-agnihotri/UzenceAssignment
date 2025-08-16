import React, { useState, useId, forwardRef } from "react";
import type { InputFieldProps } from "./InputField.types";
import { Eye, EyeOff, X, Loader2 } from "lucide-react";

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled = false,
      invalid = false,
      loading = false,
      variant = "outlined",
      size = "md",
      type = "text",
      showClearButton = false,
      showPasswordToggle = false,
      id,
      name,
      className = "",
      onClear,
      startIcon,
      endIcon,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const inputId = id || generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    const hasError = invalid || !!errorMessage;

    // Size classes
    const sizeClasses = {
      sm: "h-8 text-sm px-2",
      md: "h-10 text-sm px-3",
      lg: "h-12 text-base px-4",
    };

    // Variant classes
    const variantClasses = {
      filled: {
        base: "bg-gray-100 border-0 border-b-2 rounded-t-md focus:bg-gray-50",
        normal: "border-gray-300 focus:border-blue-500",
        error: "border-red-500 bg-red-50 focus:bg-red-50",
        disabled: "bg-gray-50 border-gray-200 text-gray-400",
      },
      outlined: {
        base: "bg-white border-2 rounded-md",
        normal: "border-gray-300 focus:border-blue-500",
        error: "border-red-500 focus:border-red-500",
        disabled: "border-gray-200 text-gray-400 bg-gray-50",
      },
      ghost: {
        base: "bg-transparent border-0 border-b-2",
        normal: "border-gray-300 focus:border-blue-500",
        error: "border-red-500 focus:border-red-500",
        disabled: "border-gray-200 text-gray-400",
      },
    };

    // Get appropriate variant classes
    const variantClass = variantClasses[variant];
    let stateClass = variantClass.normal;

    if (disabled) {
      stateClass = variantClass.disabled;
    } else if (hasError) {
      stateClass = variantClass.error;
    }

    const inputClasses = `
    ${sizeClasses[size]}
    ${variantClass.base}
    ${stateClass}
    w-full
    outline-none
    transition-colors
    duration-200
    placeholder-gray-400
    ${disabled ? "cursor-not-allowed" : ""}
    ${className}
  `.trim();

    const hasIcons =
      startIcon ||
      endIcon ||
      loading ||
      (showClearButton && value) ||
      (isPassword && showPasswordToggle);

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={`
            block text-sm font-medium mb-1
            ${hasError ? "text-red-700" : "text-gray-700"}
            ${disabled ? "text-gray-400" : ""}
          `}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Start Icon */}
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {startIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-describedby={
              ariaDescribedBy ||
              (helperText ? helperId : undefined) ||
              (hasError ? errorId : undefined)
            }
            aria-invalid={hasError}
            className={`
            ${inputClasses}
            ${startIcon ? "pl-10" : ""}
            ${hasIcons ? "pr-10" : ""}
          `}
            {...rest}
          />

          {/* End Icons Container */}
          {(loading ||
            (showClearButton && value) ||
            (isPassword && showPasswordToggle) ||
            endIcon) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              {/* Loading Icon */}
              {loading && (
                <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
              )}

              {/* Clear Button */}
              {!loading && showClearButton && value && (
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={disabled}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear input"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              {/* Password Toggle */}
              {!loading && isPassword && showPasswordToggle && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={disabled}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}

              {/* End Icon */}
              {!loading && endIcon && (
                <div className="text-gray-400">{endIcon}</div>
              )}
            </div>
          )}
        </div>

        {/* Helper Text / Error Message */}
        {(helperText || errorMessage) && (
          <div
            id={hasError ? errorId : helperId}
            className={`
            mt-1 text-xs
            ${hasError ? "text-red-600" : "text-gray-500"}
            ${disabled ? "text-gray-400" : ""}
          `}
          >
            {hasError ? errorMessage : helperText}
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
