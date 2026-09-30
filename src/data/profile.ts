export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
}

export interface AccountStatus {
  memberSince: string;    
  isVerified: boolean;
  paymentMethodsCount: number;
}

export const personalInfoData: PersonalInfo = {
  fullName: "Sheraz",
  email: "sheraz@gmail.com",
  phone: "+1 (555) 000-0000",
  address: "123 Main St, City, Country",
};

export const notificationSettingsData: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  marketingEmails: false,
};

export const securitySettingsData: SecuritySettings = {
  twoFactorEnabled: false,
  biometricEnabled: false,
};

export const accountStatusData: AccountStatus = {
  memberSince: "January 2024",
  isVerified: true,
  paymentMethodsCount: 3,
};