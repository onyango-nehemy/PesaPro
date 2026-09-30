export type DocumentType = "Passport" | "National ID" | "Driver's License";

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string; 
  nationality: string;
  phone: string;
}

export interface IdentityDetails {
  documentType: DocumentType;
  documentNumber: string;
  expiryDate: string; 
  frontFile: File | null;
  backFile: File | null;
}

export interface AddressDetails {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  proofFile: File | null;
}

export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Kenya",
  "Nigeria",
  "Germany",
  "France",
  "Canada",
  "Australia",
  "India",
  "South Africa",
] as const;

export type Country = (typeof COUNTRIES)[number];

export const emptyPersonalDetails: PersonalDetails = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  nationality: "",
  phone: "",
};

export const emptyIdentityDetails: IdentityDetails = {
  documentType: "Passport",
  documentNumber: "",
  expiryDate: "",
  frontFile: null,
  backFile: null,
};

export const emptyAddressDetails: AddressDetails = {
  street: "",
  city: "",
  postalCode: "",
  country: "",
  proofFile: null,
};