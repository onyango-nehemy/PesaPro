interface DangerZoneCardProps {
  onDeleteClick: () => void;
}

export default function DangerZoneCard({ onDeleteClick }: DangerZoneCardProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6">
      <h2 className="text-sm font-semibold text-red-700">Danger Zone</h2>
      <p className="mt-1 text-sm text-red-600">
        Once you delete your account, there is no going back.
      </p>

      <button
        type="button"
        onClick={onDeleteClick}
        className="mt-4 w-full cursor-pointer rounded-lg bg-red-500 py-2.5 text-sm font-medium text-white hover:bg-red-600"
      >
        Delete Account
      </button>
    </div>
  );
}