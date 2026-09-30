const steps = [
  { number: 1, label: "Personal Details" },
  { number: 2, label: "Identity" },
  { number: 3, label: "Address" },
  { number: 4, label: "Review" },
] as const;

interface VerificationStepperProps {
  currentStep: 1 | 2 | 3 | 4;
}

function getSegmentState(stepNumber: number, currentStep: number) {
  if (stepNumber < currentStep) return "completed";
  if (stepNumber === currentStep) return "active";
  return "upcoming";
}

export default function VerificationStepper({
  currentStep,
}: VerificationStepperProps) {
  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div>
      <div className="relative h-1 w-full rounded-full bg-gray-100">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-green-900 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between">
        {steps.map((step) => {
          const state = getSegmentState(step.number, currentStep);
          return (
            <span
              key={step.number}
              className={`text-xs font-medium ${
                state === "active"
                  ? "text-green-600"
                  : state === "completed"
                  ? "text-gray-900"
                  : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}