/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { propertyAddressSchema } from "@/lib/schema";
import { InputField } from "../common/InputField";
import { SelectField } from "../common/SelectField";

interface PropertyAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function PropertyAddressModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: PropertyAddressModalProps) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertyAddressSchema),
    defaultValues: initialData || {
      propertyName: "",
      totalUnits: "",
      propertyWebsite: "",
      country: "",
      streetAddress: "",
      aptSuiteUnit: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const onSubmit = (data: any) => {
    onSave(data);
    onClose();
  };

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      reset(
        initialData || {
          propertyName: "",
          totalUnits: "",
          propertyWebsite: "",
          country: "",
          streetAddress: "",
          aptSuiteUnit: "",
          city: "",
          state: "",
          zipCode: "",
        }
      );
    }
  }, [isOpen, initialData, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Property address"
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="primary" onClick={handleSubmit(onSubmit)} type="button">
            Add
          </Button>
        </div>
      }
    >
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Controller
            name="propertyName"
            control={control}
            render={({ field }) => (
              <InputField
                id="propertyName"
                label="Property name as identifier*"
                placeholder="Dallas apartments complex"
                error={!!errors.propertyName}
                helperText={errors.propertyName?.message as string}
                {...field}
              />
            )}
          />

          <Controller
            name="totalUnits"
            control={control}
            render={({ field }) => (
              <InputField
                id="totalUnits"
                label="Total apartment unit*"
                placeholder="50"
                error={!!errors.totalUnits}
                helperText={errors.totalUnits?.message as string}
                {...field}
              />
            )}
          />

          <Controller
            name="propertyWebsite"
            control={control}
            render={({ field }) => (
              <InputField
                id="propertyWebsite"
                label="Property website (optional)"
                placeholder="https://"
                error={!!errors.propertyWebsite}
                helperText={errors.propertyWebsite?.message as string}
                {...field}
              />
            )}
          />

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <SelectField
                label="Country/Region*"
                placeholder="Select country"
                error={!!errors.country}
                helperText={errors.country?.message as string}
                value={field.value}
                onChange={field.onChange}
                options={[
                  { value: "US", label: "United States" },
                  { value: "CA", label: "Canada" },
                  { value: "UK", label: "United Kingdom" },
                  { value: "AU", label: "Australia" },
                  { value: "BD", label: "Bangladesh" },
                ]}
              />
            )}
          />

          <Controller
            name="streetAddress"
            control={control}
            render={({ field }) => (
              <InputField
                id="streetAddress"
                label="Street address*"
                placeholder="111 Austin Ave"
                error={!!errors.streetAddress}
                helperText={errors.streetAddress?.message as string}
                {...field}
              />
            )}
          />

          <Controller
            name="aptSuiteUnit"
            control={control}
            render={({ field }) => (
              <InputField
                id="aptSuiteUnit"
                label="Apt, suite, unit (if applicable)"
                placeholder="123"
                error={!!errors.aptSuiteUnit}
                helperText={errors.aptSuiteUnit?.message as string}
                {...field}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <InputField
                id="city"
                label="City/Town*"
                placeholder="Dallas"
                error={!!errors.city}
                helperText={errors.city?.message as string}
                {...field}
              />
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <SelectField
                label="State/Territory*"
                placeholder="Select state"
                error={!!errors.state}
                helperText={errors.state?.message as string}
                value={field.value}
                onChange={field.onChange}
                options={[
                  { value: "TX", label: "Texas" },
                  { value: "CA", label: "California" },
                  { value: "NY", label: "New York" },
                  // Add more states as needed
                ]}
              />
            )}
          />

          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <InputField
                id="zipCode"
                label="Zip code*"
                placeholder="75061"
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message as string}
                {...field}
              />
            )}
          />
        </div>
      </form>
    </Modal>
  );
}
