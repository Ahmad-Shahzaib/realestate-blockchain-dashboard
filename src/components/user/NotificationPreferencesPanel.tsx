import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NotificationPreferencesProps {
  initialPreferences?: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
  };
  onSave?: (prefs: { email: boolean; sms: boolean; push: boolean }) => void;
}

const NotificationPreferencesPanel: React.FC<NotificationPreferencesProps> = ({ initialPreferences, onSave }) => {
  const [email, setEmail] = useState(initialPreferences?.email ?? true);
  const [sms, setSms] = useState(initialPreferences?.sms ?? false);
  const [push, setPush] = useState(initialPreferences?.push ?? true);
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSave?.({ email, sms, push });
    }, 500);
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="email"
              checked={email}
              onChange={() => setEmail((v) => !v)}
            />
            <label htmlFor="email" className="text-sm">Email Notifications</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="sms"
              checked={sms}
              onChange={() => setSms((v) => !v)}
            />
            <label htmlFor="sms" className="text-sm">SMS Notifications</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="push"
              checked={push}
              onChange={() => setPush((v) => !v)}
            />
            <label htmlFor="push" className="text-sm">Push Notifications</label>
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={saving} className="px-8">
              {saving ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NotificationPreferencesPanel;
