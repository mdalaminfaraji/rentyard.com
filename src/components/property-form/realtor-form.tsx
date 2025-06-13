"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FileUpload } from "../ui/file-upload";

export function RealtorForm() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-4">
      <h2 className="mb-4 text-sm font-medium text-gray-700">Realtor verification</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-1">
          <label className="text-sm text-gray-700" htmlFor="licenceNumber">
            Lenience number*
          </label>
          <input
            id="licenceNumber"
            className={`w-full rounded-md border ${
              errors.licenceNumber ? "border-red-500" : "border-gray-200"
            } bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            placeholder="00000000000"
            {...register("licenceNumber")}
          />
          {errors.licenceNumber && (
            <p className="text-xs text-red-500">{errors.licenceNumber.message as string}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">Additional documents for realtor</label>
          <Controller
            name="additionalDocuments"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="Upload additional documents"
                onFileChange={(file) => field.onChange(file)}
                value={field.value}
                error={!!errors.additionalDocuments}
                errorMessage={errors.additionalDocuments?.message as string}
              />
            )}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-gray-700">Agreement with landlord*</label>
          <Controller
            name="agreementWithLandlord"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="Upload agreement document"
                onFileChange={(file) => field.onChange(file)}
                value={field.value}
                error={!!errors.agreementWithLandlord}
                errorMessage={errors.agreementWithLandlord?.message as string}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
