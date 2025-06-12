"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RadioCard } from "../ui/radio-card";
import { Role } from "@/lib/schema";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Key01Icon,
  ManagerIcon,
  PermanentJobIcon,
} from "@hugeicons/core-free-icons";

/**
 * RoleSelection component
 * Renders user role options (Landlord, Realtor, Property Management Company) as radio cards
 * Handles validation and error display
 */
export function RoleSelection() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Extract error message if it exists
  //   const errorMessage = errors.role?.message as string | undefined;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Choose your role</h2>
        {/* {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )} */}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <>
              <RadioCard
                selected={field.value === Role.LANDLORD}
                onClick={() => field.onChange(Role.LANDLORD)}
                icon={<HugeiconsIcon icon={Key01Icon} size={28} />}
                title="Landlord"
                description="Owner of the property"
                error={!!errors.role}
              />
              <RadioCard
                selected={field.value === Role.REALTOR}
                onClick={() => field.onChange(Role.REALTOR)}
                icon={<HugeiconsIcon icon={ManagerIcon} size={28} />}
                title="Realtor"
                description="Manage property on behalf on owner"
                error={!!errors.role}
              />
              <RadioCard
                selected={field.value === Role.MANAGEMENT_COMPANY}
                onClick={() => field.onChange(Role.MANAGEMENT_COMPANY)}
                icon={<HugeiconsIcon icon={PermanentJobIcon} size={28} />}
                title="Property management company"
                description="For management company"
                error={!!errors.role}
              />
            </>
          )}
        />
        {errors.role && (
          <p className="col-span-full text-sm text-red-500">
            {errors.role.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
