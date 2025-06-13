"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  label?: string;
  helperText?: string;
  containerClassName?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { className, error, label, helperText, containerClassName, ...props },
    ref
  ) => {
    return (
      <div className={cn("w-full space-y-1", containerClassName)}>
        {label && (
          <label htmlFor={props.id} className="text-sm text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-md bg-white p-2.5 text-sm outline-none border transition-all",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            className
          )}
          {...props}
        />
        {error && helperText && (
          <p className="text-xs text-red-500">{helperText}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export { InputField };
