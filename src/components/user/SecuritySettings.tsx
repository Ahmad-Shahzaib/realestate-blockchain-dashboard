import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";

interface SecuritySettingsProps {
  initial2FAEnabled?: boolean;
  on2FAToggle?: (enabled: boolean) => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ initial2FAEnabled = false, on2FAToggle }) => {
  const [twoFAEnabled, setTwoFAEnabled] = useState(initial2FAEnabled);
  const [processing, setProcessing] = useState(false);

  const handleToggle2FA = () => {
    setProcessing(true);
    setTimeout(() => {
      setTwoFAEnabled((prev) => {
        const next = !prev;
        on2FAToggle?.(next);
        return next;
      });
      setProcessing(false);
    }, 1000);
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          {twoFAEnabled ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <X className="w-5 h-5 text-gray-400" />
          )}
          <span className="font-medium">
            Two-Factor Authentication {twoFAEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Protect your account by enabling two-factor authentication (2FA). You will be asked for a code from your authenticator app when logging in.
        </p>
        <Button onClick={handleToggle2FA} disabled={processing} className="px-8">
          {processing
            ? twoFAEnabled
              ? "Disabling..."
              : "Enabling..."
            : twoFAEnabled
            ? "Disable 2FA"
            : "Enable 2FA"}
        </Button>
        {twoFAEnabled && (
          <div className="mt-6 p-4 bg-gray-50 rounded border text-sm text-gray-700">
            <p>
              2FA is active. Use your authenticator app to get the code when logging in.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
