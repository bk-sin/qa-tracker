interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full ${
            currentStep > index ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
}
