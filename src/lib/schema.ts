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
 * Form step enum
 */
export enum FormStep {
  ROLE_SELECTION = "role_selection",
  CONDOMINIUMS_INFO = "condominiums_info",
  FINAL = "final",
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
 * Property address schema
 */
export const propertyAddressSchema = z.object({
  propertyName: z.string().min(1, "Property name is required"),
  totalUnits: z.string().min(1, "Total units is required"),
  propertyWebsite: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  aptSuiteUnit: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

/**
 * Leasing info schema
 */
export const leasingInfoSchema = z
  .object({
    leasingManager: z
      .string({
        required_error: "Leasing manager name is required",
      })
      .min(1, "Leasing manager name is required"),
    email: z
      .string({
        required_error: "Email address is required",
      })
      .email("Invalid email address"),
    phoneNumber: z
      .string({
        required_error: "Phone number is required",
      })
      .min(6, "Phone number must be at least 6 characters"),
    sameAsProperty: z.boolean().optional().default(false),
    // Address fields (conditionally required based on sameAsProperty)
    streetAddress: z
      .string()
      .optional()
      .refine((val) => val || val === "", {
        message: "Street address is required",
      }),
    aptSuiteUnit: z.string().optional(),
    city: z
      .string()
      .optional()
      .refine((val) => val || val === "", {
        message: "City is required",
      }),
    state: z
      .string()
      .optional()
      .refine((val) => val || val === "", {
        message: "State is required",
      }),
    zipCode: z
      .string()
      .optional()
      .refine((val) => val || val === "", {
        message: "Zip code is required",
      }),
  })
  .superRefine((data, ctx) => {
    // If sameAsProperty is false, validate that all required address fields are filled
    if (data.sameAsProperty === false) {
      if (!data.streetAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Street address is required",
          path: ["streetAddress"],
        });
      }

      if (!data.city) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "City is required",
          path: ["city"],
        });
      }

      if (!data.state) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "State is required",
          path: ["state"],
        });
      }

      if (!data.zipCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Zip code is required",
          path: ["zipCode"],
        });
      }
    }
  });

/**
 * Charges schema
 */
export const chargesSchema = z.object({
  applicationFee: z.string().min(1, "Application fee is required"),
  adminFee: z.string().min(1, "Admin fee is required"),
});

/**
 * Rent frequency schema
 */
export const rentFrequencySchema = z.object({
  rentFrequency: z.string().min(1, "Rent frequency is required"),
  reminderDate: z.string().min(1, "Reminder date is required"),
  dueDate: z.string().min(1, "Due date is required"),
});

/**
 * Pet fees schema
 */
export const petFeesSchema = z.object({
  petType: z.string().min(1, "Pet type is required"),
  maxWeight: z.string().min(1, "Max weight is required"),
  monthlyRent: z.string().min(1, "Monthly rent is required"),
  oneTimeFee: z.string().min(1, "One time fee is required"),
  securityDeposit: z.string().min(1, "Security deposit is required"),
});

/**
 * Parking schema
 */
export const parkingSchema = z.object({
  guestParkingTime: z.string().optional(),
  parkingDescription: z.string().optional(),
});

/**
 * Educational institution schema
 */
export const educationalInstitutionSchema = z.object({
  elementary: z.string().optional(),
  highSchool: z.string().optional(),
  elementaryTwo: z.string().optional(),
});

/**
 * Stations schema
 */
export const stationsSchema = z.object({
  busStation: z.string().optional(),
  railStation: z.string().optional(),
  airport: z.string().optional(),
});

/**
 * Landmarks schema
 */
export const landmarksSchema = z.object({
  museum: z.string().optional(),
  mosque: z.string().optional(),
  temple: z.string().optional(),
});

/**
 * Utilities provider schema
 */
export const utilitiesProviderSchema = z.object({
  internet: z.string().optional(),
  cable: z.string().optional(),
  water: z.string().optional(),
});

/**
 * Community amenities schema
 */
export const communityAmenitiesSchema = z.object({
  amenities: z.array(z.string()).optional(),
});

/**
 * Condominium information schema
 */
export const condominiumsInfoSchema = z.object({
  propertyAddress: propertyAddressSchema.optional(),
  leasingInfo: leasingInfoSchema.optional(),
  charges: chargesSchema.optional(),
  rentFrequency: rentFrequencySchema.optional(),
  applicationAgreement: z.string().optional(),
  aboutProperty: z.string().optional(),
  petFees: z.array(petFeesSchema).optional(),
  parking: parkingSchema.optional(),
  nearestEducationalInstitution: educationalInstitutionSchema.optional(),
  nearestStations: stationsSchema.optional(),
  nearestLandmarks: landmarksSchema.optional(),
  utilitiesProvider: utilitiesProviderSchema.optional(),
  communityAmenities: communityAmenitiesSchema.optional(),
  propertyGallery: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
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
    currentStep: z.nativeEnum(FormStep).default(FormStep.ROLE_SELECTION),
    condominiumsInfo: condominiumsInfoSchema.optional(),
    ...landlordSchema.shape,
  }),
  z.object({
    role: z.literal(Role.REALTOR),
    propertyType: z.nativeEnum(PropertyType),
    termsAccepted: z.boolean().default(false),
    currentStep: z.nativeEnum(FormStep).default(FormStep.ROLE_SELECTION),
    condominiumsInfo: condominiumsInfoSchema.optional(),
    ...realtorSchema.shape,
  }),
  z.object({
    role: z.literal(Role.MANAGEMENT_COMPANY),
    propertyType: z.nativeEnum(PropertyType),
    termsAccepted: z.boolean().default(false),
    currentStep: z.nativeEnum(FormStep).default(FormStep.ROLE_SELECTION),
    condominiumsInfo: condominiumsInfoSchema.optional(),
    ...managementCompanySchema.shape,
  }),
]);
