"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
// import { Download } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload02Icon } from "@hugeicons/core-free-icons";

interface FileUploadProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange"
  > {
  onFileChange: (file: File | null) => void;
  value?: File | null;
  label: string;
  error?: boolean;
  errorMessage?: string;
  accept?: string;
}

/**
 * FileUpload component for uploading documents
 * Shows upload button with label and supports PDF files
 * Visual feedback for selected file and errors
 */
export function FileUpload({
  onFileChange,
  value,
  label,
  error = false,
  errorMessage,
  className,
  accept = "application/pdf",
  ...props
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onFileChange(file);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "flex h-10 cursor-pointer items-center justify-center rounded-md border border-dashed bg-white px-4 py-2 transition-all max-w-[400px]",
          error
            ? "border-red-500 ring-1 ring-red-100"
            : "border-gray-200 hover:border-gray-300"
        )}
        onClick={handleClick}
      >
        <HugeiconsIcon
          icon={Upload02Icon}
          size={20}
          color="gray"
          className="mr-2"
        />
        {/* <Download className="mr-2 h-5 w-5 text-gray-500" /> */}
        <span className="text-sm text-[#6F6C6A]">
          {fileName || "(pdf only)" || label}
        </span>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept={accept}
          {...props}
        />
      </div>
      {error && errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
