import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BankingInfoFormProps {
  initialData?: {
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    iban?: string;
  };
  onSave?: (data: { accountName: string; accountNumber: string; bankName: string; iban: string }) => void;
}

const BankingInfoForm: React.FC<BankingInfoFormProps> = ({ initialData, onSave }) => {
  const [accountName, setAccountName] = useState(initialData?.accountName || "");
  const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || "");
  const [bankName, setBankName] = useState(initialData?.bankName || "");
  const [iban, setIban] = useState(initialData?.iban || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onSave?.({ accountName, accountNumber, bankName, iban });
    }, 1000);
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Banking Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Account Holder Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={accountName}
              onChange={e => setAccountName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Account Number</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bank Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={bankName}
              onChange={e => setBankName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">IBAN</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={iban}
              onChange={e => setIban(e.target.value)}
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={saving} className="px-8">
              {saving ? "Saving..." : "Save Banking Info"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BankingInfoForm;
