"use client";

import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  Upload,
  Save,
  X,
  Check,
  AlertCircle,
  Building2,
  Shield,
  Globe,
  Wallet,
  FileText,
  UserPlus,
  Camera,
  Users,
  TrendingUp,
  DollarSign,
  Icon as LucideIcon,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCustomer } from '@/redux/reducers/customerslice/customerSlice';

// Define types for FormSection props
interface FormSectionProps {
  title: string;
  icon: typeof LucideIcon;
  children: React.ReactNode;
  className?: string;
}

// Define types for InputField props
interface InputFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea' | 'file';
  required?: boolean;
  placeholder?: string;
  icon?: typeof LucideIcon;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: { label: string; value: string }[];
}

const FormSection: React.FC<FormSectionProps> = ({ title, icon: Icon, children, className }) => (
  <div className={`bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 ${className}`}>
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
        <Icon className="w-5 h-5 text-blue-400" iconNode={[]} />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    {children}
  </div>
);

const InputField: React.FC<InputFieldProps> = ({ label, name, type = "text", required = false, placeholder, icon: Icon, value, onChange, options }) => (
  <div className="space-y-2">
    <label className="text-slate-300 text-sm font-medium flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 text-slate-400" iconNode={[]} />}
      {label}
      {required && <span className="text-red-400">*</span>}
    </label>
    {type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
      >
        <option value="">Select {label}</option>
        {options && options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    ) : type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-vertical"
      />
    ) : type === 'file' ? (
      <div className="relative">
        <input
          type="file"
          name={name}
          accept="image/*"
          className="hidden"
          id={name}
          onChange={onChange}
        />
        <label
          htmlFor={name}
          className="w-full p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl text-slate-400 hover:border-blue-500/50 transition-all cursor-pointer flex items-center gap-3"
        >
          <Camera className="w-5 h-5" />
          Choose profile picture...
        </label>
      </div>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
      />
    )}
  </div>
);

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  nationality: '',
  primaryAddress: '',
  secondaryAddress: '',
  nationalId: '',
  profilePicture: null,
  accountStatus: '',
  dateOfRegistration: '',
  preferredContactMethod: '',
  occupation: '',
  annualIncome: '',
  investmentExperience: '',
  riskTolerance: '',
  kycStatus: '',
  amlStatus: '',
  walletAddress: '',
  referralCode: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelation: '',
  notes: '',
};

const SuperAdminAddCustomerFormUI: React.FC = () => {
  const [form, setForm] = useState(initialFormState);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.customer || { loading: false, error: null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as any;
    if (type === 'file') {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      name,
      phone,
      preferredContactMethod,
      profilePicture,
      ...rest
    } = form;
    const mappedForm = {
      name: name,
      phone: phone,
      preferredContactMethod: preferredContactMethod,
      ...rest,
    };

    let payload: any = mappedForm;
    let useFormData = false;

    if (profilePicture) {
      useFormData = true;
      const formData = new FormData();
      Object.entries(mappedForm).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as any);
        }
      });
      formData.append('profilePicture', profilePicture);
      payload = formData;
    }


    await dispatch(addCustomer(payload));

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwiiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Add New Customer
              </h1>
            </div>
            <p className="text-slate-400 text-lg">Create a new customer profile for the blockchain real estate platform</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Basic Information */}
              <FormSection title="Basic Information" icon={User}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Full Name" name="name" required placeholder="Enter full name" icon={User} value={form.name} onChange={handleChange} />
                  <InputField label="Email Address" name="email" type="email" required placeholder="Enter email address" icon={Mail} value={form.email} onChange={handleChange} />
                  <InputField label="Phone Number" name="phone" type="tel" required placeholder="+1 (555) 123-4567" icon={Phone} value={form.phone} onChange={handleChange} />
                  <InputField label="Date of Birth" name="dateOfBirth" type="date" required icon={Calendar} value={form.dateOfBirth} onChange={handleChange} />
                  <InputField label="Gender" name="gender" type="select" required value={form.gender} onChange={handleChange} options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' },
                  ]} />
                  <InputField label="Nationality" name="nationality" required placeholder="Enter nationality" icon={Globe} value={form.nationality} onChange={handleChange} />
                </div>
              </FormSection>
              {/* Contact & Address Information */}
              <FormSection title="Contact & Address Information" icon={MapPin}>
                <div className="grid grid-cols-1 gap-6">
                  <InputField label="Primary Address" name="primaryAddress" type="textarea" required placeholder="Enter complete primary address" icon={MapPin} value={form.primaryAddress} onChange={handleChange} />
                  <InputField label="Secondary Address (Optional)" name="secondaryAddress" type="textarea" placeholder="Enter secondary address if applicable" icon={MapPin} value={form.secondaryAddress} onChange={handleChange} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Preferred Contact Method" name="preferredContactMethod" type="select" value={form.preferredContactMethod} onChange={handleChange} options={[
                      { label: 'Email', value: 'email' },
                      { label: 'Phone', value: 'phone' },
                      { label: 'SMS', value: 'sms' },
                    ]} />
                  </div>
                </div>
              </FormSection>
              {/* Identity & Documentation */}
              <FormSection title="Identity & Documentation" icon={CreditCard}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="National ID / Passport Number" name="nationalId" required placeholder="Enter ID or passport number" icon={CreditCard} value={form.nationalId} onChange={handleChange} />
                  <InputField label="Profile Picture" name="profilePicture" type="file" onChange={handleChange} />
                  <InputField label="Occupation" name="occupation" placeholder="Enter occupation" icon={Building2} value={form.occupation} onChange={handleChange} />
                  <InputField label="Annual Income (USD)" name="annualIncome" type="select" value={form.annualIncome} onChange={handleChange} icon={DollarSign} options={[
                    { label: '< $50,000', value: '<50000' },
                    { label: '$50,000 - $100,000', value: '50000-100000' },
                    { label: '$100,000 - $250,000', value: '100000-250000' },
                    { label: '> $250,000', value: '>250000' },
                  ]} />
                </div>
              </FormSection>
              {/* Investment Profile */}
              <FormSection title="Investment Profile" icon={TrendingUp}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Investment Experience" name="investmentExperience" type="select" value={form.investmentExperience} onChange={handleChange} options={[
                    { label: 'None', value: 'none' },
                    { label: 'Beginner', value: 'beginner' },
                    { label: 'Intermediate', value: 'intermediate' },
                    { label: 'Expert', value: 'expert' },
                  ]} />
                  <InputField label="Risk Tolerance" name="riskTolerance" type="select" value={form.riskTolerance} onChange={handleChange} options={[
                    { label: 'Low', value: 'low' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                  ]} />
                  <InputField label="Wallet Address (Optional)" name="walletAddress" placeholder="Enter blockchain wallet address" icon={Wallet} value={form.walletAddress} onChange={handleChange} />
                  <InputField label="Referral Code (Optional)" name="referralCode" placeholder="Enter referral code if any" value={form.referralCode} onChange={handleChange} />
                </div>
              </FormSection>
              {/* Emergency Contact */}
              <FormSection title="Emergency Contact" icon={Users}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField label="Emergency Contact Name" name="emergencyContactName" placeholder="Enter emergency contact name" icon={User} value={form.emergencyContactName} onChange={handleChange} />
                  <InputField label="Emergency Contact Phone" name="emergencyContactPhone" type="tel" placeholder="Enter emergency contact phone" icon={Phone} value={form.emergencyContactPhone} onChange={handleChange} />
                  <InputField label="Relationship" name="emergencyContactRelation" placeholder="e.g., Spouse, Parent, Sibling" value={form.emergencyContactRelation} onChange={handleChange} />
                </div>
              </FormSection>
              {/* Account Settings */}
              <FormSection title="Account Settings" icon={Shield}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <InputField label="Account Status" name="accountStatus" type="select" value={form.accountStatus} onChange={handleChange} options={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                    { label: 'Suspended', value: 'suspended' },
                  ]} />
                  <InputField label="KYC Status" name="kycStatus" type="select" value={form.kycStatus} onChange={handleChange} options={[
                    { label: 'Pending', value: 'pending' },
                    { label: 'Verified', value: 'verified' },
                    { label: 'Rejected', value: 'rejected' },
                  ]} />
                  <InputField label="AML Status" name="amlStatus" type="select" value={form.amlStatus} onChange={handleChange} options={[
                    { label: 'Pending', value: 'pending' },
                    { label: 'Cleared', value: 'cleared' },
                    { label: 'Flagged', value: 'flagged' },
                  ]} />
                  <InputField label="Registration Date" name="dateOfRegistration" type="date" icon={Calendar} value={form.dateOfRegistration} onChange={handleChange} />
                </div>
              </FormSection>
              {/* Additional Information */}
              <FormSection title="Additional Information" icon={FileText}>
                <InputField label="Notes" name="notes" type="textarea" placeholder="Enter any additional notes or comments about the customer" icon={FileText} value={form.notes} onChange={handleChange} />
              </FormSection>
              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6">
                <button
                  type="button"
                  className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700/70 text-white rounded-xl transition-all duration-300 flex items-center gap-2 justify-center"
                  onClick={() => setForm(initialFormState)}
                  disabled={loading}
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
                  disabled={loading}
                >
                  <Save className="w-5 h-5" />
                  {loading ? 'Adding...' : 'Add Customer'}
                </button>
              </div>
              {error && <div className="text-red-400 flex items-center gap-2 mt-2"><AlertCircle className="w-4 h-4" />{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAddCustomerFormUI;