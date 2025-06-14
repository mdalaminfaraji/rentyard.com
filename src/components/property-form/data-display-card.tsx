"use client";
import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

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
    <div className="flex flex-col border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <h3 className="text-sm font-medium">
            {title}
            {required && (
              <span className="text-red-500 ml-1">(Required)</span>
            )}
            {recommended && !required && (
              <span className="text-gray-500 ml-1">(Optional but recommended)</span>
            )}
          </h3>
        </div>
        <div className="flex space-x-2">
          {onEdit && (
            <Button
              onClick={onEdit}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-blue-500"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              onClick={onDelete}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-700">{data}</div>
    </div>
  );
}
