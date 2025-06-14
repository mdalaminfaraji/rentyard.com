"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Plus, Upload } from "lucide-react";
import { PropertyAddressModal } from "./property-address-modal";
import { LeasingInfoModal } from "./leasing-info-modal";
import { ChargesModal } from "./charges-modal";
import { RentFrequencyModal } from "./rent-frequency-modal";
import { PetFeesModal } from "./pet-fees-modal";
import { DataDisplayCard } from "./data-display-card";

interface ModalState {
  propertyAddress: boolean;
  leasingInfo: boolean;
  charges: boolean;
  rentFrequency: boolean;
  applicationAgreement: boolean;
  aboutProperty: boolean;
  petFees: boolean;
  parking: boolean;
  educationalInstitution: boolean;
  stations: boolean;
  landmarks: boolean;
  utilitiesProvider: boolean;
  communityAmenities: boolean;
}

export function CondominiumsInfoForm() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const condominiumsInfo = watch("condominiumsInfo") || {};
  // Extract error messages for each required section
  const condominiumsErrors = errors?.condominiumsInfo as
    | Record<string, { message?: string }>
    | undefined;
  const propertyAddressError = condominiumsErrors?.propertyAddress?.message as string | undefined;
  const leasingInfoError = condominiumsErrors?.leasingInfo?.message as string | undefined;
  const chargesError = condominiumsErrors?.charges?.message as string | undefined;
  const rentFrequencyError = condominiumsErrors?.rentFrequency?.message as string | undefined;

  const [modalOpen, setModalOpen] = useState<ModalState>({
    propertyAddress: false,
    leasingInfo: false,
    charges: false,
    rentFrequency: false,
    applicationAgreement: false,
    aboutProperty: false,
    petFees: false,
    parking: false,
    educationalInstitution: false,
    stations: false,
    landmarks: false,
    utilitiesProvider: false,
    communityAmenities: false,
  });

  const openModal = (modal: keyof ModalState) => {
    setModalOpen((prev) => ({ ...prev, [modal]: true }));
  };

  const closeModal = (modal: keyof ModalState) => {
    setModalOpen((prev) => ({ ...prev, [modal]: false }));
  };

  const saveData = (key: string, data: Record<string, unknown>) => {
    setValue(`condominiumsInfo.${key}`, data, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const deleteData = (key: string) => {
    setValue(`condominiumsInfo.${key}`, undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Condominiums information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Property Address */}
          {condominiumsInfo.propertyAddress ? (
            <DataDisplayCard
              title="Property address"
              required
              data={
                <div>
                  {condominiumsInfo.propertyAddress.propertyName}, Total unit:{" "}
                  {condominiumsInfo.propertyAddress.totalUnits}
                  {condominiumsInfo.propertyAddress.streetAddress},{" "}
                  {condominiumsInfo.propertyAddress.city}, {condominiumsInfo.propertyAddress.state}{" "}
                  {condominiumsInfo.propertyAddress.zipCode}, USA
                </div>
              }
              onEdit={() => openModal("propertyAddress")}
            />
          ) : (
            <div
              className={`border ${propertyAddressError ? "border-red-500" : "border-gray-200"} rounded-2xl p-4 mb-4`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">
                  Property address <span className="text-red-500">(Required)</span>
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-blue-500"
                  onClick={() => openModal("propertyAddress")}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              {propertyAddressError && (
                <p className="text-sm text-red-500 mt-2">{propertyAddressError}</p>
              )}
            </div>
          )}

          {/* Leasing Info */}
          {condominiumsInfo.leasingInfo ? (
            <DataDisplayCard
              title="Leasing info"
              required
              data={
                <div>
                  {condominiumsInfo.leasingInfo.leasingManager}
                  {condominiumsInfo.leasingInfo.email}
                  {condominiumsInfo.leasingInfo.phoneNumber}
                </div>
              }
              onEdit={() => openModal("leasingInfo")}
            />
          ) : (
            <div
              className={`border ${leasingInfoError ? "border-red-500" : "border-gray-200"} rounded-2xl p-4 mb-4`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">
                  Leasing info <span className="text-red-500">(Required)</span>
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-blue-500"
                  onClick={() => openModal("leasingInfo")}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              {leasingInfoError && <p className="text-sm text-red-500 mt-2">{leasingInfoError}</p>}
            </div>
          )}

          {/* Charges */}
          {condominiumsInfo.charges ? (
            <DataDisplayCard
              title="Charges"
              required
              data={
                <div>
                  {condominiumsInfo.charges.applicationFee}
                  {condominiumsInfo.charges.adminFee}
                </div>
              }
              onEdit={() => openModal("charges")}
            />
          ) : (
            <div
              className={`border ${chargesError ? "border-red-500" : "border-gray-200"} rounded-2xl p-4 mb-4`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">
                  Charges <span className="text-red-500">(Required)</span>
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-blue-500"
                  onClick={() => openModal("charges")}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              {chargesError && <p className="text-sm text-red-500 mt-2">{chargesError}</p>}
            </div>
          )}

          {/* Rent Frequency */}
          {condominiumsInfo.rentFrequency ? (
            <DataDisplayCard
              title="Rent frequency & payment reminder"
              required
              data={
                <div>
                  {condominiumsInfo.rentFrequency.rentFrequency}
                  {condominiumsInfo.rentFrequency.reminderDate}
                  {condominiumsInfo.rentFrequency.dueDate}
                </div>
              }
              onEdit={() => openModal("rentFrequency")}
            />
          ) : (
            <div
              className={`border ${rentFrequencyError ? "border-red-500" : "border-gray-200"} rounded-2xl p-4 mb-4`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">
                  Rent frequency & payment reminder <span className="text-red-500">(Required)</span>
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-blue-500"
                  onClick={() => openModal("rentFrequency")}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              {rentFrequencyError && (
                <p className="text-sm text-red-500 mt-2">{rentFrequencyError}</p>
              )}
            </div>
          )}

          {/* Application Agreement */}
          <div className="border border-gray-200 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Application agreement <span className="text-gray-500">(Optional)</span>
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-blue-500"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          {/* About Property */}
          <div className="border border-gray-200 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                About the property <span className="text-gray-500">(Optional)</span>
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-blue-500"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          {/* Community Amenities */}
          <div className="border border-gray-200 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Community&apos;s amenity/features{" "}
                <span className="text-gray-500">(Optional but recommended)</span>
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-blue-500"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Pet Fees */}
          {condominiumsInfo.petFees ? (
            <DataDisplayCard
              title="Pet fees"
              data={
                <div>
                  <p>Dog, Max weight: {condominiumsInfo.petFees.dogMaxWeight}</p>
                  <p>Monthly per rent: {condominiumsInfo.petFees.monthlyRent}</p>
                  <p>One time pet fee: {condominiumsInfo.petFees.oneTimeFee}</p>
                  <p>Pet security deposit: {condominiumsInfo.petFees.securityDeposit}</p>
                </div>
              }
              onEdit={() => openModal("petFees")}
              onDelete={() => deleteData("petFees")}
            />
          ) : (
            <div className="border border-gray-200 rounded-2xl p-4 mb-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">
                  Pet fees{" "}
                  <span className="text-gray-500">(Optional, add fees if you allow pet)</span>
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-blue-500"
                  onClick={() => openModal("petFees")}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
            </div>
          )}

          {/* Parking */}
          <div className="border border-gray-200 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Parking <span className="text-gray-500">(Optional)</span>
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-blue-500"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          {/* Educational Institution */}
          <div className="border border-gray-200 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Nearest educational institution{" "}
                <span className="text-gray-500">(Optional but recommended)</span>
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-blue-500"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          {/* Stations */}
          <div className="border border-gray-200 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Nearest stations <span className="text-gray-500">(Optional but recommended)</span>
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-blue-500"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          {/* Landmarks */}
          <div className="border border-gray-200 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Nearest landmark <span className="text-gray-500">(Optional but recommended)</span>
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-blue-500"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          {/* Utilities Provider */}
          <div className="border border-gray-200 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Utilities provider <span className="text-gray-500">(Optional but recommended)</span>
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-blue-500"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Property Gallery */}
      <div className="mt-6">
        <div className="border border-gray-200 rounded-2xl mb-4">
          <h3 className="text-sm font-medium border-b border-gray-200 p-4 bg-[#F4F4F4] rounded-t-2xl">
            Property gallery <span className="text-gray-500">(Its not unit photo)*</span>
          </h3>

          <div className="p-4 flex gap-4">
            <div className="mb-4">
              <p className="text-sm font-medium mb-3">
                Featured photos<span className="text-red-500">*</span>
              </p>
              <div className="flex gap-3">
                {/* Main featured photo upload box */}
                <div className="border border-dashed border-blue-300 rounded-2xl bg-blue-50/50 p-4 flex flex-col items-center justify-center w-[180px]">
                  <div className="mb-2">
                    <Upload className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="text-xs font-medium text-center">Upload cover photo</p>
                  <p className="text-[10px] text-gray-500 text-center">(jpg, png only)</p>
                </div>

                {/* Additional featured photos */}
                <div className="grid grid-cols-2 gap-3">
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={`featured-${index}`}
                        className="border border-dashed border-blue-300 rounded-2xl bg-blue-50/50 p-2 flex flex-col items-center justify-center w-[100px] h-[100px]"
                      >
                        <Upload className="h-5 w-5 text-blue-500" />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">
                More photos<span className="text-gray-500">(optional)</span>
              </p>
              <div className="grid grid-cols-4 gap-3">
                {Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={`more-${index}`}
                      className="border border-dashed border-blue-300 rounded-2xl bg-blue-50/50 p-2 flex flex-col items-center justify-center w-[100px] h-[100px]"
                    >
                      <Upload className="h-5 w-5 text-blue-500" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="mt-6">
        <div className="border border-gray-200 rounded-2xl p-4 mb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">
              Videos <span className="text-gray-500">(optional)</span>
            </h3>
            <Button type="button" variant="outline" size="sm" className="text-blue-500">
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PropertyAddressModal
        isOpen={modalOpen.propertyAddress}
        onClose={() => closeModal("propertyAddress")}
        onSave={(data) => saveData("propertyAddress", data)}
        initialData={condominiumsInfo.propertyAddress}
      />

      <LeasingInfoModal
        isOpen={modalOpen.leasingInfo}
        onClose={() => closeModal("leasingInfo")}
        onSave={(data) => saveData("leasingInfo", data)}
        initialData={condominiumsInfo.leasingInfo}
      />

      <ChargesModal
        isOpen={modalOpen.charges}
        onClose={() => closeModal("charges")}
        onSave={(data) => saveData("charges", data)}
        initialData={condominiumsInfo.charges}
      />

      <RentFrequencyModal
        isOpen={modalOpen.rentFrequency}
        onClose={() => closeModal("rentFrequency")}
        onSave={(data) => saveData("rentFrequency", data)}
        initialData={condominiumsInfo.rentFrequency}
      />

      <PetFeesModal
        isOpen={modalOpen.petFees}
        onClose={() => closeModal("petFees")}
        onSave={(data) => saveData("petFees", data)}
        initialData={condominiumsInfo.petFees}
      />
    </div>
  );
}
