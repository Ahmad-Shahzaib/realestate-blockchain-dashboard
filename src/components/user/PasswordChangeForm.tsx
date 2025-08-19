import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PasswordChangeFormProps {
  onChangePassword?: (data: { currentPassword: string; newPassword: string }) => void;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({ onChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      onChangePassword?.({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 1000);
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">Password changed successfully!</div>}
          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={saving} className="px-8">
              {saving ? "Changing..." : "Change Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PasswordChangeForm;
