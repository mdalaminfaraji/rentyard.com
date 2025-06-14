"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { chargesSchema } from "@/lib/schema";

interface ChargesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function ChargesModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ChargesModalProps) {
  const {
    register,
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

  React.useEffect(() => {
    if (!isOpen) {
      reset(initialData || {
        applicationFee: "",
        adminFee: "",
      });
    }
  }, [isOpen, initialData, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Charges"
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
            Application fee ($100-$5+ applicant)*
          </label>
          <input
            {...register("applicationFee")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="$100"
          />
          {errors.applicationFee && (
            <p className="mt-1 text-sm text-red-500">
              {errors.applicationFee.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Admin fee ($)*
          </label>
          <input
            {...register("adminFee")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="$75"
          />
          {errors.adminFee && (
            <p className="mt-1 text-sm text-red-500">
              {errors.adminFee.message as string}
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
}
