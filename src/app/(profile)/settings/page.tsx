"use client";

import { useState } from "react";
import {
  notificationSettingsData,
  securitySettingsData,
  accountStatusData,
  type NotificationSettings,
  type SecuritySettings,
} from "@/data/profile";
import PersonalInfoForm from "@/components/profile/PersonalInformation";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import SecuritySection from "@/components/profile/SecuritySection";
import PrivacyDataSection from "@/components/profile/PrivacyDataSection";
import AccountStatusCard from "@/components/profile/AccountStatusCard";
import QuickActionsCard from "@/components/profile/QuickActionsCard";
import DangerZoneCard from "@/components/profile/DangerZoneCard";
import DeleteAccountDialog from "@/components/profile/DeleteAccountDialog";

export default function ProfilePage() {
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>(notificationSettingsData);
  const [securitySettings, setSecuritySettings] =
    useState<SecuritySettings>(securitySettingsData);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  function handleNotificationToggle(
    field: keyof NotificationSettings,
    value: boolean
  ) {
    setNotificationSettings((prev) => ({ ...prev, [field]: value }));
  }

  function handleSecurityToggle(
    field: keyof SecuritySettings,
    value: boolean
  ) {
    setSecuritySettings((prev) => ({ ...prev, [field]: value }));
  }

  function handleDeleteConfirm() {
    // TODO: call a real delete-account endpoint, then sign the user out
    console.log("Account deletion confirmed");
    setIsDeleteDialogOpen(false);
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
      <p className="mt-1 text-sm text-gray-500">
        Manage your account settings and preferences
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <PersonalInfoForm />
          <NotificationPreferences
            settings={notificationSettings}
            onToggle={handleNotificationToggle}
          />
          <SecuritySection
            settings={securitySettings}
            onToggle={handleSecurityToggle}
          />
          <PrivacyDataSection />
        </div>

        <div className="space-y-6">
          <AccountStatusCard accountStatus={accountStatusData} />
          <QuickActionsCard />
          <DangerZoneCard onDeleteClick={() => setIsDeleteDialogOpen(true)} />
        </div>
      </div>

      {isDeleteDialogOpen && (
        <DeleteAccountDialog
          onCancel={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}