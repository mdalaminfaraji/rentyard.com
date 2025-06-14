"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { rentFrequencySchema } from "@/lib/schema";

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
    register,
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
      reset(initialData || {
        rentFrequency: "",
        reminderDate: "",
        dueDate: "",
      });
    }
  }, [isOpen, initialData, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Rent frequency & payment reminder"
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
        <div>
          <label className="block text-sm font-medium mb-1">
            Rent payment frequency*
          </label>
          <select
            {...register("rentFrequency")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select frequency</option>
            <option value="Monthly">Monthly</option>
            <option value="Bi-Monthly">Bi-Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
          {errors.rentFrequency && (
            <p className="mt-1 text-sm text-red-500">
              {errors.rentFrequency.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Rent reminder date*
          </label>
          <select
            {...register("reminderDate")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select date</option>
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={`${day}th`}>
                {day}th every month
              </option>
            ))}
          </select>
          {errors.reminderDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.reminderDate.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Rent due date*
          </label>
          <select
            {...register("dueDate")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select date</option>
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={`${day}th`}>
                {day}th every month
              </option>
            ))}
          </select>
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.dueDate.message as string}
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
}
