"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FileUpload } from "../ui/file-upload";

export function LandlordForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-6 rounded-md border border-gray-200">
      <h2 className="mb-4 text-sm font-medium text-gray-700 border-b border-[#E0E0E0] p-4 bg-[#F4F4F4]">
        Proof of ownership
      </h2>
      <Controller
        name="ownershipDoc"
        control={control}
        render={({ field }) => (
          <div className="p-4">
            <FileUpload
              label="Ownership doc*"
              onFileChange={(file) => field.onChange(file)}
              value={field.value}
              error={!!errors.ownershipDoc}
              errorMessage={errors.ownershipDoc?.message as string}
            />
          </div>
        )}
      />
    </div>
  );
}
