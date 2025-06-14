/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { chargesSchema } from "@/lib/schema";
import { InputField } from "../common/InputField";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";

interface ChargesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function ChargesModal({ isOpen, onClose, onSave, initialData }: ChargesModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(chargesSchema),
    defaultValues: initialData || {
      applicationFee: "",
      adminFee: "",
    },
  });

  const onSubmit = (data: any) => {
    onSave(data);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      reset(
        initialData || {
          applicationFee: "",
          adminFee: "",
        }
      );
    }
  }, [isOpen, initialData, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Charges"
      footer={
        <div className="flex justify-between items-center space-x-2">
          <div className="flex items-center space-x-2 text-base text-gray-500">
            <HugeiconsIcon icon={InformationCircleIcon} size={24} />
            <p>Type 0 if charges not applicable</p>
          </div>
          <Button variant="primary" onClick={handleSubmit(onSubmit)} type="button">
            Add
          </Button>
        </div>
      }
    >
      <form className="flex gap-4">
        <Controller
          name="applicationFee"
          control={control}
          render={({ field }) => (
            <InputField
              id="applicationFee"
              label="Application fee ($100-$5+ applicant)*"
              placeholder="$100"
              error={!!errors.applicationFee}
              helperText={errors.applicationFee?.message as string}
              {...field}
            />
          )}
        />
        <Controller
          name="adminFee"
          control={control}
          render={({ field }) => (
            <InputField
              id="adminFee"
              label="Admin fee ($)*"
              placeholder="$75"
              error={!!errors.adminFee}
              helperText={errors.adminFee?.message as string}
              {...field}
            />
          )}
        />
      </form>
    </Modal>
  );
}
