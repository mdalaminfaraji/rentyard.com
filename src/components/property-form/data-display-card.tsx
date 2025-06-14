"use client";
import React from "react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PencilEdit02Icon } from "@hugeicons/core-free-icons";

interface DataDisplayCardProps {
  title?: string;
  addWithTitle?: React.ReactNode;
  data: React.ReactNode;
  onEdit?: () => void;
  required?: boolean;
  recommended?: boolean;
}

export function DataDisplayCard({
  title,
  addWithTitle,
  data,
  onEdit,
  required = false,
  recommended = false,
}: DataDisplayCardProps) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg py-4 mb-4">
      <div className="flex justify-between items-center mb-2 px-4">
        {addWithTitle ? (
          addWithTitle
        ) : (
          <div className="flex items-center">
            <h3 className="text-sm font-medium">
              {title}
              {required && <span className="text-red-500 ml-1">(Required)</span>}
              {recommended && !required && (
                <span className="text-gray-500 ml-1">(Optional but recommended)</span>
              )}
            </h3>
          </div>
        )}

        {onEdit && (
          <div className="flex space-x-2">
            <Button onClick={onEdit} variant="ghost" className="h-10 w-16 p-0 text-blue-500">
              <HugeiconsIcon icon={PencilEdit02Icon} size={28} /> Edit
            </Button>
          </div>
        )}
      </div>
      <div className="text-sm text-gray-700 border-t border-gray-200 pt-4 px-4">{data}</div>
    </div>
  );
}
