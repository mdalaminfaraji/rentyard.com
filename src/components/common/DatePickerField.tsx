"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon } from "@hugeicons/core-free-icons";

interface DatePickerFieldProps {
  id: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  className?: string;
  containerClassName?: string;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  id,
  label,
  value = "",
  onChange,
  placeholder = "Select date",
  error = false,
  helperText,
  className,
  containerClassName,
}) => {
  return (
    <div className={cn("w-full space-y-1", containerClassName)}>
      {label && (
        <label htmlFor={id} className="text-sm text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-md bg-white text-sm outline-none border px-3 py-3 pr-10",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            className
          )}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <HugeiconsIcon icon={Calendar03Icon} size={24} />
        </div>
      </div>

      {error && helperText && <p className="text-xs text-red-500">{helperText}</p>}
    </div>
  );
};

export { DatePickerField };
