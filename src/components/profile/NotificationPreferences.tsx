import type { NotificationSettings } from "@/data/profile";
import ToggleSwitch from "@/components/profile/ToggleSwitch";

interface NotificationPreferencesProps {
  settings: NotificationSettings;
  onToggle: (field: keyof NotificationSettings, value: boolean) => void;
}

const items: {
  field: keyof NotificationSettings;
  title: string;
  description: string;
}[] = [
  {
    field: "emailNotifications",
    title: "Email Notifications",
    description: "Receive email about your transactions",
  },
  {
    field: "pushNotifications",
    title: "Push Notifications",
    description: "Receive push notifications on your device",
  },
  {
    field: "smsNotifications",
    title: "SMS Notifications",
    description: "Receive SMS for important updates",
  },
  {
    field: "marketingEmails",
    title: "Marketing Emails",
    description: "Receive emails about new features and offers",
  },
];

export default function NotificationPreferences({
  settings,
  onToggle,
}: NotificationPreferencesProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-sm font-semibold text-gray-900">
        Notification Preferences
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Choose how you want to be notified
      </p>

      <div className="mt-4 divide-y divide-gray-100">
        {items.map((item) => (
          <div
            key={item.field}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">
                {item.title}
              </p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>

            <ToggleSwitch
              checked={settings[item.field]}
              onChange={(value) => onToggle(item.field, value)}
              label={item.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}