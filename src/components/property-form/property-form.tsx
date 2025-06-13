"use client";
import React from "react";
import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyTypeSelection } from "./property-type-selection";
import { RoleSelection } from "./role-selection";
import { LandlordForm } from "./landlord-form";
import { RealtorForm } from "./realtor-form";
import { ManagementCompanyForm } from "./management-company-form";
import { Button } from "../ui/button";
import { Role, formSchema } from "@/lib/schema";
import Image from "next/image";

export function PropertyForm() {
  // Initialize form with react-hook-form and zod validation
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Set empty defaults - these will be caught by validation
      propertyType: undefined,
      role: undefined,
      termsAccepted: false,
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  // Get current role to conditionally render role-specific forms
  const selectedRole = watch("role");

  // Form submission handler
  const onSubmit = async (data: ReturnType<(typeof formSchema)["parse"]>) => {
    try {
      console.log("Form submitted:", data);

      // Validate terms acceptance
      if (!data.termsAccepted) {
        methods.setError("termsAccepted", {
          type: "manual",
          message: "You must accept the terms and conditions",
        });
        return;
      }

      // Here you would typically handle the form submission, like sending data to API

      // Show success message or redirect to next page
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  // Custom function to handle form errors and scroll to the first error
  const handleError = (errors: FieldErrors) => {
    console.log("Form errors:", errors);

    // Check for specific errors and set more user-friendly messages
    if (!methods.getValues("role")) {
      methods.setError("role", {
        type: "manual",
        message: "Please select your role",
      });
    }

    if (!methods.getValues("propertyType")) {
      methods.setError("propertyType", {
        type: "manual",
        message: "Please select a property type",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, handleError)} className="space-y-6 ">
        <div className="border-b border-gray-100 pb-4">
          <div className="mx-auto w-full max-w-[1440px] flex items-center justify-between px-20">
            <div className="flex items-center space-x-2 text-blue-500">
              <Image src="/images/rentyard.png" alt="RentYard Logo" width={148} height={38} />
            </div>
            <Button variant="outline" type="button">
              Save & Exit
            </Button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1440px] space-y-6 px-20">
          <PropertyTypeSelection />
          <RoleSelection />

          {selectedRole === Role.LANDLORD && <LandlordForm />}
          {selectedRole === Role.REALTOR && <RealtorForm />}
          {selectedRole === Role.MANAGEMENT_COMPANY && <ManagementCompanyForm />}

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 h-4 w-4"
              {...methods.register("termsAccepted")}
            />
            <label htmlFor="terms" className="text-sm">
              Accept RentYard property adding terms & condition
            </label>
          </div>
          {methods.formState.errors.termsAccepted && (
            <p className="mt-1 text-sm text-red-500">
              {methods.formState.errors.termsAccepted.message as string}
            </p>
          )}

          <div className="flex justify-between">
            <Button variant="outline" type="button">
              Back
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              Next
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
