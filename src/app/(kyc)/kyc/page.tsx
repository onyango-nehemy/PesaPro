"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Shield } from "lucide-react";
import {
  emptyPersonalDetails,
  emptyIdentityDetails,
  emptyAddressDetails,
  type PersonalDetails,
  type IdentityDetails,
  type AddressDetails,
} from "@/data/kyc";
import VerificationStepper from "@/components/kyc/VerificationStepper";
import PersonalDetailsStep from "@/components/kyc/PersonalDetailsStep";
import IdentityStep from "@/components/kyc/IdentityStep";
import AddressStep from "@/components/kyc/AddressStep";
import ReviewStep from "@/components/kyc/ReviewStep";
import Toast from "@/components/kyc/Toast";

export default function KycPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | "success">(1);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(
    emptyPersonalDetails
  );
  const [identityDetails, setIdentityDetails] = useState<IdentityDetails>(
    emptyIdentityDetails
  );
  const [addressDetails, setAddressDetails] = useState<AddressDetails>(
    emptyAddressDetails
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function goToStep(step: 1 | 2 | 3 | 4) {
    setCurrentStep(step);
  }

  function handlePersonalChange<K extends keyof PersonalDetails>(
    field: K,
    value: PersonalDetails[K]
  ) {
    setPersonalDetails((prev) => ({ ...prev, [field]: value }));
  }

  function handleIdentityChange<K extends keyof IdentityDetails>(
    field: K,
    value: IdentityDetails[K]
  ) {
    setIdentityDetails((prev) => ({ ...prev, [field]: value }));
  }

  function handleAddressChange<K extends keyof AddressDetails>(
    field: K,
    value: AddressDetails[K]
  ) {
    setAddressDetails((prev) => ({ ...prev, [field]: value }));
  }

  function handleFileUploaded(fileName: string) {
    setToastMessage(`${fileName} uploaded`);
  }

  function handleSubmit() {
    // send personalDetails, identityDetails and addressDetails to a real endpoint
    setCurrentStep("success");
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      

      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-10">
        {currentStep === "success" ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 size={24} className="text-green-600" />
            </div>
            <p className="mt-4 text-base font-semibold text-gray-900">
              Verification Submitted
            </p>
            <p className="mt-1 text-sm text-gray-500">
              We&apos;re reviewing your information. This usually takes a
              few minutes, and we&apos;ll notify you once it&apos;s
              complete.
            </p>
            <Link
              href="/dashboard"
              className="mt-6 inline-block w-full rounded-lg bg-green-500 py-2.5 text-sm font-medium text-white hover:bg-green-600"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                <Shield size={18} className="text-green-600" />
              </div>
              <p className="mt-3 text-base font-semibold text-gray-900">
                Verify Your Identity
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Complete your verification to unlock all features and
                start transferring money
              </p>
            </div>

            <div className="mt-6">
              <VerificationStepper currentStep={currentStep} />
            </div>

            <div className="mt-6">
              {currentStep === 1 && (
                <PersonalDetailsStep
                  data={personalDetails}
                  onChange={handlePersonalChange}
                  onContinue={() => goToStep(2)}
                />
              )}

              {currentStep === 2 && (
                <IdentityStep
                  data={identityDetails}
                  onChange={handleIdentityChange}
                  onFileUploaded={handleFileUploaded}
                  onBack={() => goToStep(1)}
                  onContinue={() => goToStep(3)}
                />
              )}

              {currentStep === 3 && (
                <AddressStep
                  data={addressDetails}
                  onChange={handleAddressChange}
                  onFileUploaded={handleFileUploaded}
                  onBack={() => goToStep(2)}
                  onContinue={() => goToStep(4)}
                />
              )}

              {currentStep === 4 && (
                <ReviewStep
                  personalDetails={personalDetails}
                  identityDetails={identityDetails}
                  addressDetails={addressDetails}
                  onBack={() => goToStep(3)}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
          </>
        )}
      </main>

      {toastMessage && (
        <Toast
          message={toastMessage}
          onDismiss={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}