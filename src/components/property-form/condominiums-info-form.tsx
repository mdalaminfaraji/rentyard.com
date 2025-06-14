"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { PropertyAddressModal } from "./property-address-modal";
import { LeasingInfoModal } from "./leasing-info-modal";
import { ChargesModal } from "./charges-modal";
import { RentFrequencyModal } from "./rent-frequency-modal";
import { PetFeesModal } from "./pet-fees-modal";
import { DataDisplayCard } from "./data-display-card";
import { Plus } from "lucide-react";

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
  const { watch, setValue } = useFormContext();

  const condominiumsInfo = watch("condominiumsInfo") || {};

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
                  <p>
                    {condominiumsInfo.propertyAddress.propertyName}, Total unit:{" "}
                    {condominiumsInfo.propertyAddress.totalUnits}
                  </p>
                  <p>
                    {condominiumsInfo.propertyAddress.streetAddress},{" "}
                    {condominiumsInfo.propertyAddress.city},{" "}
                    {condominiumsInfo.propertyAddress.state}{" "}
                    {condominiumsInfo.propertyAddress.zipCode}, USA
                  </p>
                </div>
              }
              onEdit={() => openModal("propertyAddress")}
            />
          ) : (
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
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
            </div>
          )}

          {/* Leasing Info */}
          {condominiumsInfo.leasingInfo ? (
            <DataDisplayCard
              title="Leasing info"
              required
              data={
                <div>
                  <p>Leasing manager: {condominiumsInfo.leasingInfo.leasingManager}</p>
                  <p>Email: {condominiumsInfo.leasingInfo.email}</p>
                  <p>Phone: {condominiumsInfo.leasingInfo.phoneNumber}</p>
                </div>
              }
              onEdit={() => openModal("leasingInfo")}
            />
          ) : (
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
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
            </div>
          )}

          {/* Charges */}
          {condominiumsInfo.charges ? (
            <DataDisplayCard
              title="Charges"
              required
              data={
                <div>
                  <p>Application fee: {condominiumsInfo.charges.applicationFee}</p>
                  <p>Admin fee: {condominiumsInfo.charges.adminFee}</p>
                </div>
              }
              onEdit={() => openModal("charges")}
            />
          ) : (
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
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
            </div>
          )}

          {/* Rent Frequency */}
          {condominiumsInfo.rentFrequency ? (
            <DataDisplayCard
              title="Rent frequency & payment reminder"
              required
              data={
                <div>
                  <p>Rent payment frequency: {condominiumsInfo.rentFrequency.rentFrequency}</p>
                  <p>
                    Rent reminder date: {condominiumsInfo.rentFrequency.reminderDate} every month
                  </p>
                  <p>Rent due date: {condominiumsInfo.rentFrequency.dueDate} every month</p>
                </div>
              }
              onEdit={() => openModal("rentFrequency")}
            />
          ) : (
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
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
            </div>
          )}

          {/* Application Agreement */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
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
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
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
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
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
            <div className="border border-gray-200 rounded-lg p-4 mb-4">
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
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Parking <span className="text-gray-500">(Optional)</span>
              </h3>
              <Button type="button" variant="outline" size="sm" className="text-blue-500" onClick={() => {}}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          {/* Educational Institution */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Nearest educational institution{" "}
                <span className="text-gray-500">(Optional but recommended)</span>
              </h3>
              <Button type="button" variant="outline" size="sm" className="text-blue-500" onClick={() => {}}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          {/* Stations */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Nearest stations <span className="text-gray-500">(Optional but recommended)</span>
              </h3>
              <Button type="button" variant="outline" size="sm" className="text-blue-500" onClick={() => {}}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          {/* Landmarks */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Nearest landmark <span className="text-gray-500">(Optional but recommended)</span>
              </h3>
              <Button type="button" variant="outline" size="sm" className="text-blue-500" onClick={() => {}}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          {/* Utilities Provider */}
          <div className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Utilities provider <span className="text-gray-500">(Optional but recommended)</span>
              </h3>
              <Button type="button" variant="outline" size="sm" className="text-blue-500" onClick={() => {}}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Property Gallery */}
      <div className="mt-6">
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-medium mb-4">
            Property gallery <span className="text-gray-500">(Its not unit photos)*</span>
          </h3>

          <div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="border border-dashed border-gray-300 rounded p-4 flex flex-col items-center justify-center">
                <div className="mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p className="text-xs text-center">Upload cover photo</p>
                <p className="text-xs text-gray-500">(one pic only)</p>
              </div>
              {/* More photo upload slots would go here */}
            </div>

            <h3 className="text-sm font-medium mb-2">More photos (optional)</h3>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="border border-dashed border-gray-300 rounded p-2 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Videos */}
      <div className="mt-6">
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
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
