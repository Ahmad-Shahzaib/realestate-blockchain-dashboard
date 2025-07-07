"use client"

import React, { useState } from "react"
import { CheckCircle, Clock, Upload, X, FileText, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Types
type KYCStatus = "pending" | "in_review" | "approved" | "rejected"

interface RequiredDoc {
  key: string
  label: string
  required: boolean
}

type FileMap = { [key: string]: File | null }

// Required documents configuration
const requiredDocs: RequiredDoc[] = [
  { key: "passport", label: "Passport", required: true },
  { key: "cnicFront", label: "CNIC Front", required: true },
  { key: "cnicBack", label: "CNIC Back", required: true },
  { key: "utilityBill", label: "Utility Bill", required: false },
  { key: "other", label: "Other Document", required: false },
]

// Status Indicator Component
const KYCStatusIndicator: React.FC<{ status: KYCStatus }> = ({ status }) => {
  const statusConfig = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    in_review: { label: "In Review", color: "bg-blue-100 text-blue-800", icon: Loader2 },
    approved: { label: "Approved", color: "bg-green-100 text-green-800", icon: CheckCircle },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-800", icon: X },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant="secondary" className={cn("flex items-center gap-1", config.color)}>
      <Icon className={cn("w-3 h-3", status === "in_review" && "animate-spin")} />
      {config.label}
    </Badge>
  )
}

// Stepper Component with Back Option
const KYCStepper: React.FC<{ currentStep: number; onStepClick?: (step: number) => void }> = ({ currentStep, onStepClick }) => {
  const steps = [
    { label: "Upload Documents", description: "Upload required documents" },
    { label: "Review", description: "Review uploaded documents" },
    { label: "Processing", description: "Documents under review" },
    { label: "Complete", description: "KYC verification complete" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 relative">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1 relative">
            <button
              type="button"
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 relative z-10 focus:outline-none",
                index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500",
                index < currentStep ? "hover:bg-blue-400" : ""
              )}
              disabled={index === currentStep || !onStepClick || index > currentStep}
              onClick={() => onStepClick && index < currentStep && onStepClick(index)}
              tabIndex={index < currentStep && onStepClick ? 0 : -1}
              aria-label={index < currentStep ? `Go to step ${index + 1}` : undefined}
            >
              {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
            </button>
            <div className="text-center">
              <p className={cn("text-sm font-medium", index <= currentStep ? "text-blue-600" : "text-gray-500")}> 
                {step.label}
              </p>
              <p className="text-xs text-gray-400 hidden sm:block">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute h-0.5 top-4 left-1/2 w-full",
                  index < currentStep ? "bg-blue-600" : "bg-gray-200",
                )}
                style={{ zIndex: 1 }}
              />
            )}
          </div>
        ))}
      </div>
      <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
    </div>
  );
};

// File Upload Component
const FileUploadButton: React.FC<{
  docKey: string
  label: string
  file: File | null
  onFileSelect: (file: File, docKey: string) => void
  onRemove: (docKey: string) => void
  required: boolean
}> = ({ docKey, label, file, onFileSelect, onRemove, required }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onFileSelect(selectedFile, docKey)
    }
  }

  const handleUploadClick = () => {
    console.log("Upload button clicked",inputRef.current)
    inputRef.current?.click()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleUploadClick()
    }
  }

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>

      <input
        ref={inputRef}
        type="file"
        // accept alll
        onChange={handleFileChange}
        className="hidden"
        id={`file-input-${docKey}`}
      />

      {file ? (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt={label}
                  className="w-12 h-12 object-cover rounded border"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-500" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(docKey)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <Card
          className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer"
          onClick={handleUploadClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="button"
          aria-label={`Upload ${label}`}
        >
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Click to upload {label}</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF (max 10MB)</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Main KYC Upload Interface Component
export const KYCUploadInterface: React.FC = () => {
  const [step, setStep] = useState(0)
  const [files, setFiles] = useState<FileMap>({
    passport: null,
    cnicFront: null,
    cnicBack: null,
    utilityBill: null,
    other: null,
  })
  const [status, setStatus] = useState<KYCStatus>("pending")

  const handleFileSelected = (file: File, docKey: string) => {
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB")
      return
    }

    // Validate file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"]
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload PNG, JPG, or PDF files only")
      return
    }

    setFiles((prev) => ({ ...prev, [docKey]: file }))
  }

  const handleRemoveFile = (docKey: string) => {
    setFiles((prev) => ({ ...prev, [docKey]: null }))
  }

  const allRequiredUploaded = requiredDocs.filter((d) => d.required).every((doc) => files[doc.key])

  const anyFileUploaded = Object.values(files).some((f) => f)

  const handleNext = () => {
    if (allRequiredUploaded) setStep(1)
  }

  const handleSubmit = () => {
    setStatus("in_review")
    setStep(2)
    setTimeout(() => {
      setStatus("approved")
      setStep(3)
    }, 3000)
  }

  const handleBack = () => {
    setStep(0)
  }

  return (
    <div className="mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">KYC Verification</CardTitle>
            <KYCStatusIndicator status={status} />
          </div>
        </CardHeader>
        <CardContent>
          <KYCStepper currentStep={step} onStepClick={(s) => setStep(s)} />

          {/* Step 0: Upload Documents */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {requiredDocs.map((doc) => (
                  <FileUploadButton
                    key={doc.key}
                    docKey={doc.key}
                    label={doc.label}
                    file={files[doc.key]}
                    onFileSelect={handleFileSelected}
                    onRemove={handleRemoveFile}
                    required={doc.required}
                  />
                ))}
              </div>
              <div className="flex justify-end pt-6">
                <Button onClick={handleNext} disabled={!allRequiredUploaded} className="px-8">
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 1: Review Documents */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Review Your Documents</h3>
                <p className="text-gray-600 mb-6">
                  Please review all uploaded documents before submitting for verification.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requiredDocs
                  .filter((doc) => files[doc.key])
                  .map((doc) => (
                    <Card key={doc.key} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-sm">{doc.label}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFile(doc.key)}
                            className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        {files[doc.key]?.type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(files[doc.key]!) || "/placeholder.svg"}
                            alt={doc.label}
                            className="w-full h-32 object-cover rounded border"
                          />
                        ) : (
                          <div className="w-full h-32 bg-gray-100 rounded border flex items-center justify-center">
                            <div className="text-center">
                              <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-500 truncate max-w-[120px]">{files[doc.key]?.name}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={!anyFileUploaded} className="px-8">
                  Submit for Review
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Processing */}
          {step === 2 && (
            <div className="flex flex-col items-center py-16">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Documents Under Review</h3>
              <p className="text-gray-600 text-center max-w-md">
                Our team is reviewing your submitted documents. This process typically takes 1-2 business days.
              </p>
            </div>
          )}

          {/* Step 3: Approved */}
          {step === 3 && (
            <div className="flex flex-col items-center py-16">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">KYC Verification Approved!</h3>
              <p className="text-gray-600 text-center max-w-md mb-6">
                Congratulations! Your identity has been successfully verified. You can now access all platform features.
              </p>
              <Button className="px-8">Continue to Dashboard</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default KYCUploadInterface
