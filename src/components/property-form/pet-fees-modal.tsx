"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { petFeesSchema } from "@/lib/schema";

interface PetFeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function PetFeesModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: PetFeesModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(petFeesSchema),
    defaultValues: initialData || {
      dogMaxWeight: "",
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
      reset(initialData || {
        dogMaxWeight: "",
        monthlyRent: "",
        oneTimeFee: "",
        securityDeposit: "",
      });
    }
  }, [isOpen, initialData, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pet fees"
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
              Dog, Max weight
            </label>
            <input
              {...register("dogMaxWeight")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="20lb"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Monthly per rent
            </label>
            <input
              {...register("monthlyRent")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="$100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              One time pet fee
            </label>
            <input
              {...register("oneTimeFee")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="$100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Pet security deposit
            </label>
            <input
              {...register("securityDeposit")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="$500"
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
