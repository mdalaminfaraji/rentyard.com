import React from "react";
import { cn } from "@/lib/utils";

interface RadioCardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  icon?: React.ReactNode;
  title: string;
  description: string;
  error?: boolean;
}

/**
 * RadioCard component for property type and role selection
 * Displays a card with icon, title, and description
 * Visual feedback when selected or has error
 */
export function RadioCard({
  selected = false,
  icon,
  title,
  description,
  className,
  error = false,
  ...props
}: RadioCardProps) {
  return (
    <div
      className={cn(
        "flex items-center cursor-pointer gap-4 rounded-md border p-4 transition-all",
        selected
          ? "border-blue-500 bg-blue-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300",
        error && !selected ? "border-red-500" : "",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex  items-center justify-center text-gray-500 bg-[#F9FBFF] p-3 rounded-lg">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </div>
  );
}
