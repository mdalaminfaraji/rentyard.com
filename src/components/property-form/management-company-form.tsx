"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FileUpload } from "../ui/file-upload";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "@/components/ui/phone-input.css";
import { cn } from "@/lib/utils";
import { SelectField } from "../common/SelectField";
import { InputField } from "../common/InputField";

/**
 * ManagementCompanyForm component
 * Renders the company & office information form for property management companies
 * Includes company details, contact info, and document upload
 * Handles validation and error display
 */
export function ManagementCompanyForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-4">
      <h2 className="mb-4 text-sm font-medium text-gray-700">Company & office info</h2>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <InputField
              id="companyName"
              label="Company name*"
              placeholder="Runyan trade center"
              error={!!errors.companyName}
              helperText={errors.companyName?.message as string}
              {...field}
            />
          )}
        />

        <Controller
          name="companyIdentifier"
          control={control}
          render={({ field }) => (
            <InputField
              id="companyIdentifier"
              label="Company Identifier(EIN/TIN)*"
              placeholder="Name"
              error={!!errors.companyIdentifier}
              helperText={errors.companyIdentifier?.message as string}
              {...field}
            />
          )}
        />

        <Controller
          name="jobTitle"
          control={control}
          render={({ field }) => (
            <InputField
              id="jobTitle"
              label="Your job title*"
              placeholder="Manager"
              error={!!errors.jobTitle}
              helperText={errors.jobTitle?.message as string}
              {...field}
            />
          )}
        />

        <div className="space-y-1">
          <label className="text-sm text-gray-700">Agreement with landlord/owner*</label>
          <Controller
            name="agreement"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="Upload agreement"
                onFileChange={(file) => field.onChange(file)}
                value={field.value}
                error={!!errors.agreement}
                errorMessage={errors.agreement?.message as string}
              />
            )}
          />
        </div>

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
          name="aptUnit"
          control={control}
          render={({ field }) => (
            <InputField
              id="aptUnit"
              label="Apt, suit, unit (if applicable)"
              placeholder="3050"
              error={!!errors.aptUnit}
              helperText={errors.aptUnit?.message as string}
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

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputField
              id="email"
              type="email"
              label="Contact email*"
              placeholder="example@example.com"
              error={!!errors.email}
              helperText={errors.email?.message as string}
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
                { value: "FL", label: "Florida" },
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
    </div>
  );
}
