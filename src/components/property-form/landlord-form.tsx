"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FileUpload } from "../ui/file-upload";

/**
 * LandlordForm component
 * Renders the ownership document upload section for landlords
 * Handles file upload validation and error display
 */
export function LandlordForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-4">
      <h2 className="mb-4 text-sm font-medium text-gray-700">Proof of ownership</h2>
      <Controller
        name="ownershipDoc"
        control={control}
        render={({ field }) => (
          <div>
            <label className="mb-1 block text-sm text-gray-700">Ownership doc*</label>
            <FileUpload
              label="Upload ownership document"
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
