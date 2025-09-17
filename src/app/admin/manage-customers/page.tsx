"use client";

import React, { useState, useRef, useCallback, useMemo } from 'react';
import toast, { Toaster } from 'react-hot-toast';
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
import Button from '@/common/Button';

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
  type?: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea' | 'file' | 'password';
  required?: boolean;
  placeholder?: string;
  icon?: typeof LucideIcon;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: { label: string; value: string }[];
}

const FormSection: React.FC<FormSectionProps> = ({ title, icon: Icon, children, className }) => (
  <div className={` border text-black border-slate-700/50 rounded-2xl p-6 ${className}`}>
    <div className="flex items-center gap-3 mb-6">

      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    {children}
  </div>
);

const InputFieldInner: React.FC<InputFieldProps> = ({ label, name, type = "text", required = false, placeholder, icon: Icon, value, onChange, options }) => (
  <div className="space-y-2">
    <label className="text-slate-700 dark:text-slate-300 text-sm font-medium flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4" iconNode={[]} />}
      {label}
      {required && <span className="text-red-500 dark:text-red-400">*</span>}
    </label>

    {type === "select" ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 
        bg-white dark:bg-slate-800/50 
        text-slate-900 dark:text-white 
        placeholder-slate-500 dark:placeholder-slate-400
        backdrop-blur-sm border border-slate-300 dark:border-slate-600/50 
        rounded-xl focus:outline-none focus:ring-2 
        focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
      >
        <option value="">Select {label}</option>
        {options &&
          options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full p-3 
        bg-white dark:bg-slate-800/50 
        text-slate-900 dark:text-white 
        placeholder-slate-500 dark:placeholder-slate-400
        backdrop-blur-sm border border-slate-300 dark:border-slate-600/50 
        rounded-xl focus:outline-none focus:ring-2 
        focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-vertical"
      />
    ) : type === "file" ? (
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
          className="w-full p-3 
          bg-white dark:bg-transparent
          text-slate-900 dark:text-white 
          backdrop-blur-sm border border-slate-300 dark:border-slate-600/50 
          rounded-xl hover:border-blue-500/50 transition-all cursor-pointer flex items-center gap-3"
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
        className="w-full p-3 
        bg-white dark:bg-slate-800/50 
        text-slate-900 dark:text-white 
        placeholder-slate-500 dark:placeholder-slate-400
        backdrop-blur-sm border border-slate-300 dark:border-slate-600/50 
        rounded-xl focus:outline-none focus:ring-2 
        focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
      />
    )}
  </div>
);

// memoized wrapper to avoid unnecessary re-renders
const InputField = React.memo(InputFieldInner);

const initialFormState = {
  firstName: '',
  lastName: '',
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
  password: '',

};

const SuperAdminAddCustomerFormUI: React.FC = () => {
  const [form, setForm] = useState(initialFormState);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.customer || { loading: false, error: null });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as any;
    if (type === 'file') {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = useCallback(() => {
    setForm(initialFormState);
    // clear file input if present
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Build full name from first and last
    const fullName = `${form.firstName || ''} ${form.lastName || ''}`.trim();

    const { profilePicture, ...rest } = form as any;

    const mappedForm: any = {
      name: fullName,
      phone: form.phone,
      preferredContactMethod: form.preferredContactMethod,
      role: 'customer',
      ...rest,
    };

    let payload: any = mappedForm;

    if (profilePicture) {
      const formData = new FormData();
      Object.entries(mappedForm).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as any);
        }
      });
      formData.append('profilePicture', profilePicture as any);
      payload = formData;
    }

    try {
      // dispatch and unwrap to get thrown error on rejection
      // @ts-ignore
      await dispatch(addCustomer(payload)).unwrap();
      toast.success('Customer added successfully');
      resetForm();
    } catch (err: any) {
      const msg = err?.message || String(err) || 'Failed to add customer';
      toast.error(msg);
    }
  };


  return (
    <div className="min-h-screen relative overflow-hidden rounded-lg dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 text-slate-900 dark:text-gray-2">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse bg-blue-500/10 dark:bg-blue-500/5"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse delay-1000 bg-purple-500/10 dark:bg-purple-500/5"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full blur-3xl animate-pulse delay-500 bg-cyan-500/10 dark:bg-cyan-500/5"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwiiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 dark:opacity-40"></div>

      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className=" mb-8">
            <div className="flex gap-3 mb-4">

              <h1 className="text-3xl lg:text-4xl font-extrabold text-black dark:text-white">
                Add New Customer
              </h1>

            </div>
            <p className="text-slate-600 dark:text-gray-4 text-lg">
              Create a new customer profile for the blockchain real estate platform
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Toaster position="top-right" />
            <div className="space-y-8">
              {/* Basic Information */}
              <FormSection title="Authorized Representative Details" icon={User}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* <InputField label="Full Name" name="name" required placeholder="Enter full name" icon={User} value={form.name} onChange={handleChange} /> */}
                  <InputField
                    label="First Name"
                    name="firstName"   // ✅ match state key
                    required
                    placeholder="Enter first name"
                    icon={User}
                    value={form.firstName}
                    onChange={handleChange}
                  />

                  <InputField
                    label="Last Name"
                    name="lastName"    // ✅ match state key
                    required
                    placeholder="Enter last name"
                    icon={User}
                    value={form.lastName}
                    onChange={handleChange}
                  />

                  {/* password  */}
                  <InputField label="Password" name="password" type="password" required placeholder="Enter password" icon={User} value={form.password} onChange={handleChange} />

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
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700/50 dark:hover:bg-slate-700/70 text-slate-800 dark:text-gray-2 rounded-xl transition-all duration-300 flex items-center gap-2 justify-center"
                  onClick={() => setForm(initialFormState)}
                  disabled={loading}
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
                <Button type="submit"
                  disabled={loading}>
                  {loading ? 'Adding...' : 'Add Customer'}
                </Button>
              </div>
              {error && <div className="text-red-500 dark:text-red-400 flex items-center gap-2 mt-2"><AlertCircle className="w-4 h-4" />{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default SuperAdminAddCustomerFormUI;