"use client";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FileUpload } from "../ui/file-upload";
import { useUploadImageMutation } from "@/redux/services/uploadApi";

export function LandlordForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  
  const [uploadImage] = useUploadImageMutation();
  const [isUploading, setIsUploading] = useState(false);

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
              onFileChange={async (file) => {
                if (file) {
                  try {
                    setIsUploading(true);
                    const formData = new FormData();
                    formData.append('images', file);
                    
                    const response = await uploadImage(formData).unwrap();
                    console.log('Upload response:', response);
                    
                    if (response.success && response.data?.images?.[0]?.url) {
                      // Set the URL from the response to the field value
                      field.onChange(response.data.images[0].url);
                    }
                  } catch (error) {
                    console.error('Error uploading file:', error);
                  } finally {
                    setIsUploading(false);
                  }
                }
              }}
              value={field.value}
              error={!!errors.ownershipDoc}
              errorMessage={errors.ownershipDoc?.message as string}
            />
            {isUploading && <p className="mt-2 text-sm text-blue-600">Uploading document...</p>}
          </div>
        )}
      />
    </div>
  );
}
