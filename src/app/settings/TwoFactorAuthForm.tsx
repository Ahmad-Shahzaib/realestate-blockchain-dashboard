"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Smartphone, QrCode, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function TwoFactorAuthForm() {
  const [method, setMethod] = useState<string>("email")
  const [email, setEmail] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
  const [code, setCode] = useState("")
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Simulate QR code URL
  const fakeQrCodeUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/YourApp:username?secret=JBSWY3DPEHPK3PXP"

  const handleMethodChange = (value: string) => {
    setMethod(value)
    setStep(1)
    setQrCodeUrl(null)
    setCode("")
    setShowSuccess(false)
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setStep(2)
  }

  const handleShowQRCode = () => {
    setQrCodeUrl(fakeQrCodeUrl)
    setStep(2)
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setShowSuccess(true)

    // Reset after showing success
    setTimeout(() => {
      setStep(1)
      setCode("")
      setQrCodeUrl(null)
      setShowSuccess(false)
    }, 2000)
  }

  const handleBack = () => {
    setStep(1)
    setCode("")
    setQrCodeUrl(null)
    setShowSuccess(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Smartphone className="h-5 w-5" />
          Two-Factor Authentication
        </CardTitle>
        <CardDescription>Secure your account with an additional layer of protection</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {showSuccess && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">✅ Code verified successfully!</AlertDescription>
          </Alert>
        )}

        {/* Method Selection */}
        <div className="space-y-2">
          <Label htmlFor="method">Authentication Method</Label>
          <Select value={method} onValueChange={handleMethodChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select authentication method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Verification
                </div>
              </SelectItem>
              <SelectItem value="qrcode">
                <div className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  Authenticator App
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Email 2FA - Step 1 */}
        {method === "email" && step === 1 && (
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e: { target: { value: React.SetStateAction<string> } }) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending Code...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Verification Code
                </>
              )}
            </Button>
          </form>
        )}

        {/* Email 2FA - Step 2 */}
        {method === "email" && step === 2 && (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={handleBack} className="mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <Alert>
              <AlertDescription>
                We've sent a verification code to <strong>{email}</strong>
              </AlertDescription>
            </Alert>

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-code">Verification Code</Label>
                <Input
                  id="email-code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>
            </form>
          </div>
        )}

        {/* QR Code 2FA - Step 1 */}
        {method === "qrcode" && step === 1 && (
          <div className="space-y-4 text-center">
            <div className="space-y-2">
              <QrCode className="h-12 w-12 mx-auto text-gray-400" />
              <p className="text-sm text-gray-600">Use your authenticator app to scan the QR code</p>
            </div>
            <Button onClick={handleShowQRCode} className="w-full">
              <QrCode className="h-4 w-4 mr-2" />
              Generate QR Code
            </Button>
          </div>
        )}

        {/* QR Code 2FA - Step 2 */}
        {method === "qrcode" && step === 2 && qrCodeUrl && (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={handleBack} className="mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <div className="text-center space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-200 inline-block">
                <img src={qrCodeUrl || "/placeholder.svg"} alt="QR Code for 2FA setup" className="mx-auto" />
              </div>

              <Alert>
                <AlertDescription>
                  Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                </AlertDescription>
              </Alert>

              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="app-code">Authentication Code</Label>
                  <Input
                    id="app-code"
                    type="text"
                    placeholder="Enter 6-digit code from app"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    "Verify Code"
                  )}
                </Button>
              </form>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
