const REQUIREMENTS = [
  "Columns: Name, Email, Amount, Currency",
  "Maximum 1,000 recipients per batch",
  "All amounts must be in the same currency",
  "File size limit: 5MB",
];

export default function CsvRequirements() {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <p className="text-sm font-medium text-gray-900">CSV Format Requirements:</p>
      <ul className="mt-2 space-y-1">
        {REQUIREMENTS.map((item) => (
          <li key={item} className="text-xs text-gray-500">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}