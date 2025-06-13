"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust the import path if needed
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  label?: string;
  helperText?: string;
  containerClassName?: string;
  className?: string;
}

const SelectField: React.FC<FormSelectProps> = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  error,
  label,
  helperText,
  containerClassName,
  className,
}) => {
  return (
    <div className={cn("w-full space-y-1", containerClassName)}>
      {label && <label className="text-sm text-gray-700">{label}</label>}

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            "w-full rounded-md bg-white text-sm outline-none border px-3 py-5",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {error && helperText && <p className="text-xs text-red-500">{helperText}</p>}
    </div>
  );
};

export { SelectField };
