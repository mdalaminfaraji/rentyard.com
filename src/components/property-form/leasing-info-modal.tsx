/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { leasingInfoSchema } from "@/lib/schema";
import { InputField } from "../common/InputField";
import { cn } from "@/lib/utils";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface LeasingInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function LeasingInfoModal({ isOpen, onClose, onSave, initialData }: LeasingInfoModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leasingInfoSchema),
    defaultValues: initialData || {
      leasingManager: "",
      email: "",
      phoneNumber: "",
      sameAsProperty: false,
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

  React.useEffect(() => {
    if (!isOpen) {
      reset(
        initialData || {
          leasingManager: "",
          email: "",
          phoneNumber: "",
          sameAsProperty: false,
          streetAddress: "",
          aptSuiteUnit: "",
          city: "",
          state: "",
          zipCode: "",
        }
      );
    }
  }, [isOpen, initialData, reset]);

  const sameAsProperty = watch("sameAsProperty");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Leasing info"
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
            name="leasingManager"
            control={control}
            render={({ field }) => (
              <InputField
                id="leasingManager"
                label="Leasing manager*"
                placeholder="Alex Johan Rios"
                error={!!errors.leasingManager}
                helperText={errors.leasingManager?.message as string}
                {...field}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                id="email"
                label="Email*"
                placeholder="leasing@rentyard.com"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message as string}
                {...field}
              />
            )}
          />

          <div className="space-y-1">
            <label className="text-sm text-gray-700" htmlFor="phoneNumber">
              Phone number*
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <div>
                  <PhoneInput
                    country={"bd"} // Default country - Bangladesh
                    value={field.value}
                    // onlyCountries={["bd", "us", "in"]}
                    onChange={(phone) => field.onChange(phone)}
                    containerClass={cn("react-tel-input", {
                      error: !!errors.phoneNumber,
                    })}
                    searchClass="search-class"
                    enableSearch={true}
                    disableSearchIcon={true}
                    searchPlaceholder="Search country..."
                    inputProps={{
                      id: "phoneNumber",
                      name: "phoneNumber",
                    }}
                  />
                </div>
              )}
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500">{errors.phoneNumber.message as string}</p>
            )}
          </div>

          <div className="flex items-center mt-2 col-span-3">
            <Controller
              name="sameAsProperty"
              control={control}
              defaultValue={false}
              render={({ field: { onChange, value } }) => (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sameAsProperty"
                    checked={value}
                    onChange={(e) => {
                      onChange(e.target.checked);
                      if (e.target.checked) {
                        // When checkbox is checked, you would populate address fields
                        // with property address data from context or props
                        // This would typically come from a parent component or context

                        // For demonstration, we'll just clear the fields
                        setValue("streetAddress", "");
                        setValue("aptSuiteUnit", "");
                        setValue("city", "");
                        setValue("state", "");
                        setValue("zipCode", "");
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="sameAsProperty" className="text-sm text-gray-700 cursor-pointer">
                    Address(same as property)
                  </label>
                </div>
              )}
            />
          </div>

          {!sameAsProperty && (
            <>
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
                    label="Apt, suit, unit"
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
                  <InputField
                    id="state"
                    label="State/Territory*"
                    placeholder="Texas"
                    error={!!errors.state}
                    helperText={errors.state?.message as string}
                    {...field}
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
            </>
          )}
        </div>
      </form>
    </Modal>
  );
}
