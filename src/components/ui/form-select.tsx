"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  error?: boolean;
  label?: string;
  helperText?: string;
  containerClassName?: string;
}

const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, options = [], error, label, helperText, containerClassName, children, ...props }, ref) => {
    return (
      <div className={cn("w-full space-y-1", containerClassName)}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="text-sm text-gray-700"
          >
            {label}
          </label>
        )}
        <div className={`relative w-full rounded-md border ${error ? "border-red-500" : "border-gray-200"}`}>
          <select
            ref={ref}
            className={cn(
              "w-full rounded-md bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none",
              className
            )}
            {...props}
          >
            {options.length > 0 ? (
              options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            ) : (
              children
            )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {error && helperText && (
          <p className="text-xs text-red-500">{helperText}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export { FormSelect };
