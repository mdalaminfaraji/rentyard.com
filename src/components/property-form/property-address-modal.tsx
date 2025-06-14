"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { propertyAddressSchema } from "@/lib/schema";

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
    register,
    handleSubmit,
    reset,
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
      reset(initialData || {
        propertyName: "",
        totalUnits: "",
        propertyWebsite: "",
        country: "",
        streetAddress: "",
        aptSuiteUnit: "",
        city: "",
        state: "",
        zipCode: "",
      });
    }
  }, [isOpen, initialData, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Property address"
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit(onSubmit)}
            type="button"
          >
            Add
          </Button>
        </div>
      }
    >
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Property name as identifier*
            </label>
            <input
              {...register("propertyName")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Dallas apartments complex"
            />
            {errors.propertyName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.propertyName.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Total apartment unit*
            </label>
            <input
              {...register("totalUnits")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="50"
            />
            {errors.totalUnits && (
              <p className="mt-1 text-sm text-red-500">
                {errors.totalUnits.message as string}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Property website (optional)
          </label>
          <input
            {...register("propertyWebsite")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="https://"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Country/Region*
            </label>
            <select
              {...register("country")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Choose country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              {/* Add more countries as needed */}
            </select>
            {errors.country && (
              <p className="mt-1 text-sm text-red-500">
                {errors.country.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Street address*
            </label>
            <input
              {...register("streetAddress")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="111 Austin Ave"
            />
            {errors.streetAddress && (
              <p className="mt-1 text-sm text-red-500">
                {errors.streetAddress.message as string}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Apt, suite, unit (if applicable)
          </label>
          <input
            {...register("aptSuiteUnit")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="123"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City/Town*</label>
            <input
              {...register("city")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Dallas"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-500">
                {errors.city.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              State/Territory*
            </label>
            <select
              {...register("state")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Choose state</option>
              <option value="TX">Texas</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              {/* Add more states as needed */}
            </select>
            {errors.state && (
              <p className="mt-1 text-sm text-red-500">
                {errors.state.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Zip code*</label>
            <input
              {...register("zipCode")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="75061"
            />
            {errors.zipCode && (
              <p className="mt-1 text-sm text-red-500">
                {errors.zipCode.message as string}
              </p>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}
