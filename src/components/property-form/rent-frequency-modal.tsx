/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { rentFrequencySchema } from "@/lib/schema";
import { SelectField } from "../common/SelectField";
import { DatePickerField } from "../common/DatePickerField";

interface RentFrequencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function RentFrequencyModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: RentFrequencyModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(rentFrequencySchema),
    defaultValues: initialData || {
      rentFrequency: "",
      reminderDate: "",
      dueDate: "",
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
          rentFrequency: "",
          reminderDate: "",
          dueDate: "",
        }
      );
    }
  }, [isOpen, initialData, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rent frequency & payment reminder"
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="primary" onClick={handleSubmit(onSubmit)} type="button">
            Add
          </Button>
        </div>
      }
    >
      <form className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <Controller
            name="rentFrequency"
            control={control}
            render={({ field }) => (
              <SelectField
                label="Rent payment frequency*"
                placeholder="Select frequency"
                error={!!errors.rentFrequency}
                helperText={errors.rentFrequency?.message as string}
                value={field.value}
                onChange={field.onChange}
                options={[
                  { value: "Monthly", label: "Monthly" },
                  { value: "Bi-Monthly", label: "Bi-Monthly" },
                  { value: "Weekly", label: "Weekly" },
                  { value: "Quarterly", label: "Quarterly" },
                  { value: "Yearly", label: "Yearly" },
                ]}
              />
            )}
          />

          <Controller
            name="reminderDate"
            control={control}
            render={({ field }) => (
              <DatePickerField
                id="reminderDate"
                label="Rent Reminder/Statement date*"
                placeholder="25th Every month"
                error={!!errors.reminderDate}
                helperText={errors.reminderDate?.message as string}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <DatePickerField
                id="dueDate"
                label="Rent due date*"
                placeholder="5th Every month"
                error={!!errors.dueDate}
                helperText={errors.dueDate?.message as string}
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
