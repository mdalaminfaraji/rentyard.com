/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { petFeesSchema } from "@/lib/schema";
import { InputField } from "../common/InputField";
import { SelectField } from "../common/SelectField";

interface PetFeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  isEditing?: boolean;
}

export function PetFeesModal({ isOpen, onClose, onSave, initialData, isEditing = false }: PetFeesModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(petFeesSchema),
    defaultValues: initialData || {
      petType: "",
      maxWeight: "",
      monthlyRent: "",
      oneTimeFee: "",
      securityDeposit: "",
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
          petType: "",
          maxWeight: "",
          monthlyRent: "",
          oneTimeFee: "",
          securityDeposit: "",
        }
      );
    }
  }, [isOpen, initialData, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Pet Fee" : "Add Pet Fee"}
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="primary" onClick={handleSubmit(onSubmit)} type="button">
            {isEditing ? "Save" : "Add"}
          </Button>
        </div>
      }
    >
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="petType"
            control={control}
            render={({ field }) => (
              <SelectField
                label="Pet type*"
                placeholder="Select pet type"
                error={!!errors.petType}
                helperText={errors.petType?.message as string}
                value={field.value}
                onChange={field.onChange}
                options={[
                  { value: "Dog", label: "Dog" },
                  { value: "Cat", label: "Cat" },
                  { value: "Other", label: "Other" },
                ]}
              />
            )}
          />
          <Controller
            name="maxWeight"
            control={control}
            render={({ field }) => (
              <InputField
                label="Max weight (LB)*"
                placeholder="20lb"
                error={!!errors.maxWeight}
                helperText={errors.maxWeight?.message as string}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Controller
            name="monthlyRent"
            control={control}
            render={({ field }) => (
              <InputField
                label="Monthly per rent*"
                placeholder="$100"
                error={!!errors.monthlyRent}
                helperText={errors.monthlyRent?.message as string}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="oneTimeFee"
            control={control}
            render={({ field }) => (
              <InputField
                label="One time pet fee*"
                placeholder="$100"
                error={!!errors.oneTimeFee}
                helperText={errors.oneTimeFee?.message as string}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="securityDeposit"
            control={control}
            render={({ field }) => (
              <InputField
                label="Pet security deposit*"
                placeholder="$500"
                error={!!errors.securityDeposit}
                helperText={errors.securityDeposit?.message as string}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </form>
    </Modal>
  );
}
