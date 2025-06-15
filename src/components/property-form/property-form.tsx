/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useForm, FormProvider, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyTypeSelection } from "./property-type-selection";
import { RoleSelection } from "./role-selection";
import { LandlordForm } from "./landlord-form";
import { RealtorForm } from "./realtor-form";
import { ManagementCompanyForm } from "./management-company-form";
import { CondominiumsInfoForm } from "./condominiums-info-form";
import { Button } from "../ui/button";
import { Role, FormStep, PropertyType, formSchema } from "@/lib/schema";
import Image from "next/image";
import { useAddCondominiumMutation } from "@/redux/services/condominiumApi";
import { toast } from "react-toastify";

export function PropertyForm() {
  // Initialize form with react-hook-form and zod validation
  const [addCondominium] = useAddCondominiumMutation();
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: undefined,
      role: undefined,
      termsAccepted: false,
      currentStep: FormStep.ROLE_SELECTION,
      condominiumsInfo: {},
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = methods;

  // Get current role and step to conditionally render form sections
  const selectedRole = watch("role");
  const currentStep = watch("currentStep");
  const propertyType = watch("propertyType");

  // Handle next step
  const goToNextStep = () => {
    // Validate current step and proceed to next step
    if (currentStep === FormStep.ROLE_SELECTION) {
      // Move to property-specific form
      if (propertyType === PropertyType.CONDOMINIUMS) {
        setValue("currentStep", FormStep.CONDOMINIUMS_INFO, {
          shouldValidate: true,
        });
      } else {
        // For other property types, directly go to final step
        setValue("currentStep", FormStep.FINAL, {
          shouldValidate: true,
        });
      }
    } else if (currentStep === FormStep.CONDOMINIUMS_INFO) {
      setValue("currentStep", FormStep.FINAL, {
        shouldValidate: true,
      });
    }
  };

  // Handle back step
  const goToPreviousStep = () => {
    if (currentStep === FormStep.CONDOMINIUMS_INFO) {
      setValue("currentStep", FormStep.ROLE_SELECTION, {
        shouldValidate: false,
      });
    } else if (currentStep === FormStep.FINAL) {
      if (propertyType === PropertyType.CONDOMINIUMS) {
        setValue("currentStep", FormStep.CONDOMINIUMS_INFO, {
          shouldValidate: false,
        });
      } else {
        setValue("currentStep", FormStep.ROLE_SELECTION, {
          shouldValidate: false,
        });
      }
    }
  };

  // Form submission handler
  const onSubmit = async (data: any) => {
    console.log("submit data", data);
    try {
      // Form data is available here for API submission

      // Validate terms acceptance
      if (!data.termsAccepted) {
        methods.setError("termsAccepted", {
          type: "manual",
          message: "You must accept the terms and conditions",
        });
        return;
      }

      // If on CONDOMINIUMS_INFO step, validate required fields before proceeding
      if (currentStep === FormStep.CONDOMINIUMS_INFO) {
        const condominiumsInfo = data.condominiumsInfo || {};
        let hasErrors = false;

        if (!condominiumsInfo.propertyAddress) {
          methods.setError("condominiumsInfo.propertyAddress", {
            type: "manual",
            message: "Property address is required",
          });
          hasErrors = true;
        }

        if (!condominiumsInfo.leasingInfo) {
          methods.setError("condominiumsInfo.leasingInfo", {
            type: "manual",
            message: "Leasing info is required",
          });
          hasErrors = true;
        }

        if (!condominiumsInfo.charges) {
          methods.setError("condominiumsInfo.charges", {
            type: "manual",
            message: "Charges are required",
          });
          hasErrors = true;
        }

        if (!condominiumsInfo.rentFrequency) {
          methods.setError("condominiumsInfo.rentFrequency", {
            type: "manual",
            message: "Rent frequency is required",
          });
          hasErrors = true;
        }

        if (hasErrors) {
          // Don't proceed if there are validation errors - errors are already set on form
          return;
        }
      }

      // If not on the final step, just move to next step
      if (currentStep !== FormStep.CONDOMINIUMS_INFO) {
        goToNextStep();
        return;
      }

      // Here you would typically handle the form submission, like sending data to API
      const body = {
        roleId: "68493d617ee748c15e5e8db4",
        address: {
          name: data?.condominiumsInfo?.propertyAddress?.propertyName,
          unitCount: data?.condominiumsInfo?.propertyAddress?.totalUnits,
          website: data?.condominiumsInfo?.propertyAddress?.propertyWebsite,
          country: data?.condominiumsInfo?.propertyAddress?.country,
          countryCode: data?.condominiumsInfo?.propertyAddress?.countryCode,
          street: data?.condominiumsInfo?.propertyAddress?.streetAddress,
          apt: data?.condominiumsInfo?.propertyAddress?.aptSuiteUnit,
          city: data?.condominiumsInfo?.propertyAddress?.city,
          state: data?.condominiumsInfo?.propertyAddress?.state,
          zipCode: data?.condominiumsInfo?.propertyAddress?.zipCode,
        },
        leasingInfo: {
          managerName: data?.condominiumsInfo?.leasingInfo?.leasingManager,
          managerPhoneNumber: data?.condominiumsInfo?.leasingInfo?.phoneNumber,
          managerEmail: data?.condominiumsInfo?.leasingInfo?.email,
          managerAddress: {
            isSameAsCondominium: false,
            street: "456 Leasing Ave",
            apt: "Apt 2B",
            city: "Springfield",
            state: "IL",
            zipCode: "62705",
          },
        },
        charges: {
          applicationFee: data?.condominiumsInfo?.charges?.applicationFee,
          feeApplicable: "Per Adult",
          adminFee: data?.condominiumsInfo?.charges?.adminFee,
        },
        rentFrequency: {
          paymentFrequency: data?.condominiumsInfo?.rentFrequency?.rentFrequency,
          reminderDate: data?.condominiumsInfo?.rentFrequency?.reminderDate,
          dueDate: data?.condominiumsInfo?.rentFrequency?.dueDate,
        },
        agreement: {
          agreementFile: data?.ownershipDoc,
          allowImmigrant: true,
        },
        about: "A peaceful and modern residential community with all essential amenities.",
        amenities: ["Pool", "Gym", "Clubhouse", "WiFi", "Security"],
        petFees: [
          {
            petType: "Dog",
            maxWeight: 40,
            oneTimeFee: 200,
            securityDeposit: 150,
            petRent: 25,
          },
        ],
        parking: {
          parkingTime: "1 hr",
          overview: "Secured underground parking available with each unit.",
        },
        educationalInstitution: [
          {
            type: "High School",
            distance: 1.5,
            distanceUnit: "miles",
            name: "Springfield High School",
          },
        ],
        station: [
          {
            type: "Bus",
            distance: 0.3,
            distanceUnit: "miles",
            name: "Main Street Bus Stop",
          },
        ],
        landmark: [
          {
            type: "Park",
            distance: 0.8,
            distanceUnit: "miles",
            name: "Lincoln Park",
          },
        ],
        utilities: [
          {
            type: "Electricity",
            name: "Springfield Electric Co.",
          },
        ],
        gallery: {
          featuredPhotos: [
            "https://cdn.example.com/images/featured1.jpg",
            "https://cdn.example.com/images/featured2.jpg",
          ],
          morePhotos: [
            "https://cdn.example.com/images/photo1.jpg",
            "https://cdn.example.com/images/photo2.jpg",
          ],
        },
        videos: {
          propertyVideos: "https://cdn.example.com/videos/property.mp4",
          tourVideos: "https://cdn.example.com/videos/tour.mp4",
          arialVideos: "https://cdn.example.com/videos/arial.mp4",
        },
        //   "isPaid": true,
        //   "reviewStatus": "Pending",
        //   "status": "In-Review",
        //   "suspensionReason": ""
      };

      const response = await addCondominium(body);
      console.log(response);
      // Show success message or redirect to next page
      toast.success("Form submitted successfully!");
      goToPreviousStep();
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  // Custom function to handle form errors and scroll to the first error
  const handleError = (errors: FieldErrors) => {
    console.log("Form errors:", errors);

    // For the first step
    if (currentStep === FormStep.ROLE_SELECTION) {
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
    }

    // For the condominiums info step
    else if (currentStep === FormStep.CONDOMINIUMS_INFO) {
      const condominiumsInfo = methods.getValues("condominiumsInfo") || {};

      // Check for required fields in condominiums info
      if (!condominiumsInfo?.propertyAddress) {
        methods.setError("condominiumsInfo.propertyAddress", {
          type: "manual",
          message: "Property address is required",
        });
      }

      if (!condominiumsInfo?.leasingInfo) {
        methods.setError("condominiumsInfo.leasingInfo", {
          type: "manual",
          message: "Leasing info is required",
        });
      }

      if (!condominiumsInfo?.charges) {
        methods.setError("condominiumsInfo.charges", {
          type: "manual",
          message: "Charges are required",
        });
      }

      if (!condominiumsInfo?.rentFrequency) {
        methods.setError("condominiumsInfo.rentFrequency", {
          type: "manual",
          message: "Rent frequency is required",
        });
      }
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
          {/* Step 1: Role and Property Type Selection */}
          {currentStep === FormStep.ROLE_SELECTION && (
            <>
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
            </>
          )}

          {/* Step 2: Condominiums Information */}
          {currentStep === FormStep.CONDOMINIUMS_INFO &&
            propertyType === PropertyType.CONDOMINIUMS && <CondominiumsInfoForm />}

          {/* Step 3: Final Step */}
          {currentStep === FormStep.FINAL && (
            <div className="my-10 text-center">
              <h2 className="text-2xl font-bold mb-4">Review and Submit</h2>
              <p className="text-gray-600 mb-6">
                Please review all the information you&apos;ve provided before submitting.
              </p>
              <p className="text-green-600 font-medium">
                All required information has been provided. You can now submit your property
                listing.
              </p>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={goToPreviousStep}
              disabled={currentStep === FormStep.ROLE_SELECTION}
            >
              Back
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {currentStep === FormStep.FINAL ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
