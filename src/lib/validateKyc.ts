import type {
  PersonalDetails,
  IdentityDetails,
  AddressDetails,
} from "@/data/kyc";

const PHONE_PATTERN = /^\+?[\d\s()-]{7,}$/;

function isRealDate(isoDate: string): boolean {
  const parts = isoDate.split("-").map(Number);
  if (parts.length !== 3 || parts.some((p) => Number.isNaN(p))) return false;
  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function isPastDate(isoDate: string): boolean {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export function validatePersonalDetails(data: PersonalDetails): string[] {
  const errors: string[] = [];

  if (!data.firstName.trim()) errors.push("First name is required.");
  if (!data.lastName.trim()) errors.push("Last name is required.");

  if (!data.dateOfBirth) {
    errors.push("Date of birth is required.");
  } else if (!isRealDate(data.dateOfBirth)) {
    errors.push("Date of birth is not a valid date.");
  } else if (!isPastDate(data.dateOfBirth)) {
    errors.push("Date of birth must be in the past.");
  }

  if (!data.nationality) errors.push("Nationality is required.");

  if (!data.phone.trim()) {
    errors.push("Phone number is required.");
  } else if (!PHONE_PATTERN.test(data.phone.trim())) {
    errors.push("Phone number doesn't look valid.");
  }

  return errors;
}

export function validateIdentityDetails(data: IdentityDetails): string[] {
  const errors: string[] = [];

  if (!data.documentNumber.trim()) {
    errors.push("Document number is required.");
  }

  if (!data.expiryDate) {
    errors.push("Expiry date is required.");
  } else if (!isRealDate(data.expiryDate)) {
    errors.push("Expiry date is not a valid date.");
  } else if (isPastDate(data.expiryDate)) {
    errors.push("This document has expired.");
  }

  if (!data.frontFile) errors.push("Upload the front of your document.");
  if (!data.backFile) errors.push("Upload the back of your document.");

  return errors;
}

export function validateAddressDetails(data: AddressDetails): string[] {
  const errors: string[] = [];

  if (!data.street.trim()) errors.push("Street address is required.");
  if (!data.city.trim()) errors.push("City is required.");
  if (!data.postalCode.trim()) errors.push("Postal code is required.");
  if (!data.country) errors.push("Country is required.");
  if (!data.proofFile) errors.push("Upload proof of address.");

  return errors;
}