"use client";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FileUpload } from "../ui/file-upload";

/**
 * ManagementCompanyForm component
 * Renders the company & office information form for property management companies
 * Includes company details, contact info, and document upload
 * Handles validation and error display
 */
export function ManagementCompanyForm() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-4">
      <h2 className="mb-4 text-sm font-medium text-gray-700">
        Company & office info
      </h2>
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Company name */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700" htmlFor="companyName">
            Company name*
          </label>
          <input
            id="companyName"
            className={`w-full rounded-md border ${
              errors.companyName ? "border-red-500" : "border-gray-200"
            } bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            placeholder="Runyan trade center"
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className="text-xs text-red-500">
              {errors.companyName.message as string}
            </p>
          )}
        </div>

        {/* Company Identifier */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700" htmlFor="companyIdentifier">
            Company Identifier(EIN/TIN)*
          </label>
          <input
            id="companyIdentifier"
            className={`w-full rounded-md border ${
              errors.companyIdentifier ? "border-red-500" : "border-gray-200"
            } bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            placeholder="Name"
            {...register("companyIdentifier")}
          />
          {errors.companyIdentifier && (
            <p className="text-xs text-red-500">
              {errors.companyIdentifier.message as string}
            </p>
          )}
        </div>

        {/* Job Title */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700" htmlFor="jobTitle">
            Your job title*
          </label>
          <input
            id="jobTitle"
            className={`w-full rounded-md border ${
              errors.jobTitle ? "border-red-500" : "border-gray-200"
            } bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            placeholder="Manager"
            {...register("jobTitle")}
          />
          {errors.jobTitle && (
            <p className="text-xs text-red-500">
              {errors.jobTitle.message as string}
            </p>
          )}
        </div>

        {/* Agreement with landlord/owner */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700">
            Agreement with landlord/owner*
          </label>
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

        {/* Country/Region */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700" htmlFor="country">
            Country/Region*
          </label>
          <div
            className={`relative w-full rounded-md border ${
              errors.country ? "border-red-500" : "border-gray-200"
            }`}
          >
            <select
              id="country"
              className="w-full rounded-md bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
              {...register("country")}
            >
              <option value="">Choose country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="BD">Bangladesh</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          {errors.country && (
            <p className="text-xs text-red-500">
              {errors.country.message as string}
            </p>
          )}
        </div>

        {/* Street Address */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700" htmlFor="streetAddress">
            Street address*
          </label>
          <input
            id="streetAddress"
            className={`w-full rounded-md border ${
              errors.streetAddress ? "border-red-500" : "border-gray-200"
            } bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            placeholder="111 Austin Ave"
            {...register("streetAddress")}
          />
          {errors.streetAddress && (
            <p className="text-xs text-red-500">
              {errors.streetAddress.message as string}
            </p>
          )}
        </div>

        {/* Apt, Suite, Unit */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700" htmlFor="aptUnit">
            Apt, suit, unit (if applicable)
          </label>
          <input
            id="aptUnit"
            className="w-full rounded-md border border-gray-200 bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="3050"
            {...register("aptUnit")}
          />
        </div>

        {/* Phone number */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700" htmlFor="phoneNumber">
            Phone number*
          </label>
          <div className="flex">
            <div
              className={`flex items-center rounded-l-md border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-200"
              } bg-white px-3`}
            >
              <span className="text-gray-500">+880</span>
            </div>
            <input
              id="phoneNumber"
              className={`w-full rounded-r-md border-y border-r ${
                errors.phoneNumber ? "border-red-500" : "border-gray-200"
              } bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
              {...register("phoneNumber")}
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-xs text-red-500">
              {errors.phoneNumber.message as string}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700" htmlFor="email">
            Contact email*
          </label>
          <input
            id="email"
            type="email"
            className={`w-full rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-200"
            } bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            placeholder="example@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">
              {errors.email.message as string}
            </p>
          )}
        </div>

        {/* City */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700" htmlFor="city">
            City/Town*
          </label>
          <input
            id="city"
            className={`w-full rounded-md border ${
              errors.city ? "border-red-500" : "border-gray-200"
            } bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            placeholder="Dallas"
            {...register("city")}
          />
          {errors.city && (
            <p className="text-xs text-red-500">
              {errors.city.message as string}
            </p>
          )}
        </div>

        {/* State */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700" htmlFor="state">
            State/Territory*
          </label>
          <div
            className={`relative w-full rounded-md border ${
              errors.state ? "border-red-500" : "border-gray-200"
            }`}
          >
            <select
              id="state"
              className="w-full rounded-md bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
              {...register("state")}
            >
              <option value="">Choose state</option>
              <option value="TX">Texas</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="FL">Florida</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          {errors.state && (
            <p className="text-xs text-red-500">
              {errors.state.message as string}
            </p>
          )}
        </div>

        {/* Zip Code */}
        <div className="space-y-1">
          <label className="text-sm text-gray-700" htmlFor="zipCode">
            Zip code*
          </label>
          <input
            id="zipCode"
            className={`w-full rounded-md border ${
              errors.zipCode ? "border-red-500" : "border-gray-200"
            } bg-white p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
            placeholder="75061"
            {...register("zipCode")}
          />
          {errors.zipCode && (
            <p className="text-xs text-red-500">
              {errors.zipCode.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
