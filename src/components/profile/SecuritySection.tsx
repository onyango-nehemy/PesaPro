import { KeyRound, ShieldCheck, Smartphone, History } from "lucide-react";
import type { SecuritySettings } from "@/data/profile";
import ToggleSwitch from "@/components/profile/ToggleSwitch";

interface SecuritySectionProps {
  settings: SecuritySettings;
  onToggle: (field: keyof SecuritySettings, value: boolean) => void;
}

export default function SecuritySection({
  settings,
  onToggle,
}: SecuritySectionProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-sm font-semibold text-gray-900">Security</h2>
      <p className="mt-1 text-sm text-gray-500">
        Manage your security settings and protect your account
      </p>

      <div className="mt-4 divide-y divide-gray-100">
        <div className="flex items-center justify-between py-3 first:pt-0">
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Two-Factor Authentication
              </p>
              <p className="text-xs text-gray-500">
                Add an extra layer of security
              </p>
            </div>
          </div>
          <ToggleSwitch
            checked={settings.twoFactorEnabled}
            onChange={(value) => onToggle("twoFactorEnabled", value)}
            label="Two-Factor Authentication"
          />
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Smartphone size={18} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Biometric Login
              </p>
              <p className="text-xs text-gray-500">
                Use your fingerprint or Face ID
              </p>
            </div>
          </div>
          <ToggleSwitch
            checked={settings.biometricEnabled}
            onChange={(value) => onToggle("biometricEnabled", value)}
            label="Biometric Login"
          />
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <KeyRound size={18} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Change Password
              </p>
              <p className="text-xs text-gray-500">
                Update your password regularly
              </p>
            </div>
          </div>
          {/* open a change-password modal */}
          <button
            type="button"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            Change
          </button>
        </div>

        <div className="flex items-center justify-between py-3 last:pb-0">
          <div className="flex items-center gap-3">
            <History size={18} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Login History
              </p>
              <p className="text-xs text-gray-500">
                View your recent login activity
              </p>
            </div>
          </div>
          {/* open a login-history modal */}
          <button
            type="button"
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}