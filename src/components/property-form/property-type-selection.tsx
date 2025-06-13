"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RadioCard } from "../ui/radio-card";
import { PropertyType } from "@/lib/schema";
import { HugeiconsIcon } from "@hugeicons/react";
import { Building03Icon, Building04Icon, Home03Icon } from "@hugeicons/core-free-icons";

/**
 * PropertyTypeSelection component
 * Renders property type options (Single House, Apartments, Condominiums) as radio cards
 * Handles validation and error display
 */
export function PropertyTypeSelection() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Extract error message if it exists
  //   const errorMessage = errors.propertyType?.message as string | undefined;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Property type</h2>
        {/* {errorMessage && (
          <p className="text-sm text-red-500">{errorMessage}</p>
        )} */}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Controller
          name="propertyType"
          control={control}
          render={({ field }) => (
            <>
              <RadioCard
                selected={field.value === PropertyType.SINGLE_HOUSE}
                onClick={() => field.onChange(PropertyType.SINGLE_HOUSE)}
                icon={<HugeiconsIcon icon={Home03Icon} size={28} />}
                title="Single House Property"
                description="Single unit house for single family"
                error={!!errors.propertyType}
              />
              <RadioCard
                selected={field.value === PropertyType.APARTMENTS}
                onClick={() => field.onChange(PropertyType.APARTMENTS)}
                icon={<HugeiconsIcon icon={Building04Icon} size={28} />}
                title="Apartments complex"
                description="Multiple unit house for families"
                error={!!errors.propertyType}
              />
              <RadioCard
                selected={field.value === PropertyType.CONDOMINIUMS}
                onClick={() => field.onChange(PropertyType.CONDOMINIUMS)}
                icon={<HugeiconsIcon icon={Building03Icon} size={28} />}
                title="Condominiums"
                description="Multiple unit house for families"
                error={!!errors.propertyType}
              />
            </>
          )}
        />
        {errors.propertyType && (
          <p className="col-span-full text-sm text-red-500">
            {errors.propertyType.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
