"use client";
import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PencilEdit02Icon } from "@hugeicons/core-free-icons";

interface DataDisplayCardProps {
  title: string;
  data: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  required?: boolean;
  recommended?: boolean;
}

export function DataDisplayCard({
  title,
  data,
  onEdit,
  onDelete,
  required = false,
  recommended = false,
}: DataDisplayCardProps) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg py-4 mb-4">
      <div className="flex justify-between items-center mb-2 px-4">
        <div className="flex items-center">
          <h3 className="text-sm font-medium">
            {title}
            {required && <span className="text-red-500 ml-1">(Required)</span>}
            {recommended && !required && (
              <span className="text-gray-500 ml-1">(Optional but recommended)</span>
            )}
          </h3>
        </div>
        <div className="flex space-x-2">
          {onEdit && (
            <Button onClick={onEdit} variant="ghost" className="h-10 w-16 p-0 text-blue-500">
              <HugeiconsIcon icon={PencilEdit02Icon} size={28} /> Edit
            </Button>
          )}
          {onDelete && (
            <Button
              onClick={onDelete}
              variant="ghost"
              size="sm"
              className="h-12 w-12 p-0 text-red-500"
            >
              <Trash2 className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-700 border-t border-gray-200 pt-4 px-4">{data}</div>
    </div>
  );
}
