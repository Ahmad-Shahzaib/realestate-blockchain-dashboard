import React from "react";

const steps = [
  { label: "Upload Documents" },
  { label: "Preview & Confirm" },
  { label: "Verification" },
  { label: "Complete" },
];

export interface KYCStepperProps {
  currentStep: number;
}

export const KYCStepper: React.FC<KYCStepperProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      {steps.map((step, idx) => (
        <React.Fragment key={step.label}>
          <div className="flex flex-col items-center">
            <div
              className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-white transition-colors duration-300 ${
                idx <= currentStep
                  ? "bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              {idx + 1}
            </div>
            <span className={`mt-2 text-xs font-medium ${idx <= currentStep ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}>{step.label}</span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`flex-1 h-1 mx-2 rounded ${idx < currentStep ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
