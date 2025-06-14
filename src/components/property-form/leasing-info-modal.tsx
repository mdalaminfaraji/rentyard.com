"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { leasingInfoSchema } from "@/lib/schema";

interface LeasingInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function LeasingInfoModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: LeasingInfoModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leasingInfoSchema),
    defaultValues: initialData || {
      leasingManager: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data: any) => {
    onSave(data);
    onClose();
  };

  React.useEffect(() => {
    if (!isOpen) {
      reset(initialData || {
        leasingManager: "",
        email: "",
        phoneNumber: "",
      });
    }
  }, [isOpen, initialData, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Leasing info"
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
            Leasing manager*
          </label>
          <input
            {...register("leasingManager")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Alex Johan Rios"
          />
          {errors.leasingManager && (
            <p className="mt-1 text-sm text-red-500">
              {errors.leasingManager.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email*</label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="leasing@rentyard.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone number*</label>
          <input
            {...register("phoneNumber")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="+18002277861"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phoneNumber.message as string}
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
}
