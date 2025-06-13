import { z } from "zod";

/**
 * Property type options enum
 */
export enum PropertyType {
  SINGLE_HOUSE = "single_house",
  APARTMENTS = "apartments",
  CONDOMINIUMS = "condominiums",
}

/**
 * Role options enum
 */
export enum Role {
  LANDLORD = "landlord",
  REALTOR = "realtor",
  MANAGEMENT_COMPANY = "management_company",
}

/**
 * Base form schema with property type and role validation
 */
export const baseFormSchema = z.object({
  propertyType: z.nativeEnum(PropertyType, {
    required_error: "Please select a property type",
  }),
  role: z.nativeEnum(Role, {
    required_error: "Please select your role",
  }),
});

/**
 * Landlord specific schema
 */
export const landlordSchema = z.object({
  ownershipDoc: z
    .custom<File>()
    .refine((file) => file !== undefined, "Ownership document is required"),
});

/**
 * Realtor specific schema
 */
export const realtorSchema = z.object({
  licenceNumber: z.string().min(1, "Licence number is required"),
  additionalDocuments: z.custom<File>().optional(),
  agreementWithLandlord: z
    .custom<File>()
    .refine((file) => file !== undefined, "Agreement with landlord is required"),
});

/**
 * Management company specific schema
 */
export const managementCompanySchema = z.object({
  companyName: z
    .string({
      required_error: "Company name is required",
    })
    .min(1, "Company name is required"),
  companyIdentifier: z
    .string({
      required_error: "Company identifier is required",
    })
    .min(1, "Company identifier is required"),
  jobTitle: z
    .string({
      required_error: "Job title is required",
    })
    .min(1, "Job title is required"),
  agreement: z
    .custom<File>()
    .refine((file) => file !== undefined, "Agreement with landlord/owner is required"),
  country: z
    .string({
      required_error: "Country is required",
    })
    .min(1, "Country is required"),
  streetAddress: z
    .string({
      required_error: "Street address is required",
    })
    .min(1, "Street address is required"),
  aptUnit: z.string().optional(),
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
    })
    .min(1, "Phone number is required"),
  email: z
    .string({
      required_error: "Contact email is required",
    })
    .email("Invalid email address"),
  city: z
    .string({
      required_error: "City is required",
    })
    .min(1, "City is required"),
  state: z
    .string({
      required_error: "State is required",
    })
    .min(1, "State is required"),
  zipCode: z
    .string({
      required_error: "Zip code is required",
    })
    .min(1, "Zip code is required"),
});

/**
 * Terms and conditions schema
 */
export const termsSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

/**
 * Dynamic form schema based on role selection
 * Includes validation for common fields across all roles
 */
export const formSchema = z.discriminatedUnion("role", [
  z.object({
    role: z.literal(Role.LANDLORD),
    propertyType: z.nativeEnum(PropertyType),
    termsAccepted: z.boolean().default(false),
    ...landlordSchema.shape,
  }),
  z.object({
    role: z.literal(Role.REALTOR),
    propertyType: z.nativeEnum(PropertyType),
    termsAccepted: z.boolean().default(false),
    ...realtorSchema.shape,
  }),
  z.object({
    role: z.literal(Role.MANAGEMENT_COMPANY),
    propertyType: z.nativeEnum(PropertyType),
    termsAccepted: z.boolean().default(false),
    ...managementCompanySchema.shape,
  }),
]);
