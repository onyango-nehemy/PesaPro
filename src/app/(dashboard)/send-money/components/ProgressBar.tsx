export default function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex gap-2 ">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`h-1.5 flex-1 rounded-full ${
            step <= currentStep ? "bg-pesa-green" : "bg-pesa-slate/15"
          }`}
        />
      ))}
    </div>
  );
}