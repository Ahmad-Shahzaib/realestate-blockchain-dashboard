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
  error?: string | null;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

const FormSection: React.FC<FormSectionProps> = ({ title, icon: Icon, children, className }) => (
  <div className={` border text-black border-slate-700/50 rounded-2xl p-6 ${className}`}>
    <div className="flex items-center gap-3 mb-6">

      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    {children}
  </div>
);

const InputFieldInner: React.FC<InputFieldProps> = ({ label, name, type = "text", required = false, placeholder, icon: Icon, value, onChange, options, error, inputRef }) => (
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
          ref={inputRef}
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
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
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
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.customer || { loading: false, error: null });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Basic validators
  const validators = useMemo(() => ({
    firstName: (v: string) => v.trim() ? null : 'First name is required',
    lastName: (v: string) => v.trim() ? null : 'Last name is required',
    email: (v: string) => /\S+@\S+\.\S+/.test(v) ? null : 'Enter a valid email',
    phone: (v: string) => v.trim().length >= 7 ? null : 'Enter a valid phone number',
    dateOfBirth: (v: string) => v ? null : 'Date of birth is required',
    gender: (v: string) => v ? null : 'Gender is required',
    nationality: (v: string) => v ? null : 'Nationality is required',
    primaryAddress: (v: string) => v ? null : 'Primary address is required',
    nationalId: (v: string) => v ? null : 'National ID or Passport number is required',
    password: (v: string) => v && v.length >= 6 ? null : 'Password must be at least 6 characters',
    secondaryAddress: (v: string) => v ? null : 'Secondary address is required',
    profilePicture: (v: File | null) => v ? null : 'Profile picture is required',
    accountStatus: (v: string) => v ? null : 'Account status is required',
    dateOfRegistration: (v: string) => v ? null : 'Registration date is required',
    preferredContactMethod: (v: string) => v ? null : 'Preferred contact method is required',
    occupation: (v: string) => v ? null : 'Occupation is required',
    annualIncome: (v: string) => v ? null : 'Annual income is required',
    investmentExperience: (v: string) => v ? null : 'Investment experience is required',
    riskTolerance: (v: string) => v ? null : 'Risk tolerance is required',
    kycStatus: (v: string) => v ? null : 'KYC status is required',
    amlStatus: (v: string) => v ? null : 'AML status is required',
    walletAddress: (v: string) => v ? null : 'Wallet address is required',
    referralCode: (v: string) => v ? null : 'Referral code is required',
    emergencyContactName: (v: string) => v ? null : 'Emergency contact name is required',
    emergencyContactPhone: (v: string) => v ? null : 'Emergency contact phone is required',
    emergencyContactRelation: (v: string) => v ? null : 'Emergency contact relation is required',
    notes: (v: string) => v ? null : 'Notes are required',
  }), []);

  const validateField = useCallback((name: string, value: any) => {
    const validator = (validators as any)[name];
    if (!validator) return null;
    return validator(value);
  }, [validators]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as any;
    if (type === 'file') {
      const file = files?.[0] ?? null;
      setForm(prev => ({ ...prev, [name]: file }));
      setErrors(prev => ({ ...prev, [name]: file ? null : prev[name] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
      const fieldError = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  }, [validateField]);

  const resetForm = useCallback(() => {
    setForm(initialFormState);
    setErrors({});
    // clear file input if present
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const isFormValid = useMemo(() => {
    // run through required validators
    for (const key of Object.keys(validators)) {
      const val = (form as any)[key];
      const err = (validators as any)[key](val);
      if (err) return false;
    }
    return true;
  }, [form, validators]);

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
      // final validation before submit
      const newErrors: Record<string, string | null> = {};
      for (const key of Object.keys(validators)) {
        const val = (form as any)[key];
        const err = (validators as any)[key](val);
        if (err) newErrors[key] = err;
      }
      setErrors(prev => ({ ...prev, ...newErrors }));
      if (Object.keys(newErrors).length > 0) {
        toast.error('Please fix validation errors before submitting');
        return;
      }
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
                    error={errors.firstName}
                  />

                  <InputField
                    label="Last Name"
                    name="lastName"    // ✅ match state key
                    required
                    placeholder="Enter last name"
                    icon={User}
                    value={form.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                  />

                  {/* password  */}
                  <InputField label="Password" name="password" type="password" required placeholder="Enter password" icon={User} value={form.password} onChange={handleChange} error={errors.password} />

                  <InputField label="Email Address" name="email" type="email" required placeholder="Enter email address" icon={Mail} value={form.email} onChange={handleChange} error={errors.email} />
                  <InputField label="Phone Number" name="phone" type="tel" required placeholder="+1 (555) 123-4567" icon={Phone} value={form.phone} onChange={handleChange} error={errors.phone} />
                  <InputField label="Date of Birth" name="dateOfBirth" type="date" required icon={Calendar} value={form.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} />
                  <InputField label="Gender" name="gender" type="select" required value={form.gender} onChange={handleChange} error={errors.gender} options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                    { label: 'Other', value: 'other' },
                  ]} />
                  <InputField label="Nationality" name="nationality" required placeholder="Enter nationality" icon={Globe} value={form.nationality} onChange={handleChange} error={errors.nationality} />
                </div>
              </FormSection>

              {/* Contact & Address Information */}
              <FormSection title="Contact & Address Information" icon={MapPin}>
                <div className="grid grid-cols-1 gap-6">
                  <InputField label="Primary Address" name="primaryAddress" type="textarea" required placeholder="Enter complete primary address" icon={MapPin} value={form.primaryAddress} onChange={handleChange} error={errors.primaryAddress} />
                  <InputField label="Secondary Address" name="secondaryAddress" type="textarea" required placeholder="Enter secondary address if applicable" icon={MapPin} value={form.secondaryAddress} onChange={handleChange} error={errors.secondaryAddress} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Preferred Contact Method" name="preferredContactMethod" type="select" required value={form.preferredContactMethod} onChange={handleChange} error={errors.preferredContactMethod} options={[
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
                  <InputField label="National ID / Passport Number" name="nationalId" required placeholder="Enter ID or passport number" icon={CreditCard} value={form.nationalId} onChange={handleChange} error={errors.nationalId} />
                  <InputField label="Profile Picture" name="profilePicture" type="file" required onChange={handleChange} inputRef={fileInputRef} error={errors.profilePicture} />
                  <InputField label="Occupation" name="occupation" required placeholder="Enter occupation" icon={Building2} value={form.occupation} onChange={handleChange} error={errors.occupation} />
                  <InputField label="Annual Income (USD)" name="annualIncome" type="select" required value={form.annualIncome} onChange={handleChange} icon={DollarSign} error={errors.annualIncome} options={[
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
                  <InputField label="Investment Experience" name="investmentExperience" type="select" required value={form.investmentExperience} onChange={handleChange} error={errors.investmentExperience} options={[
                    { label: 'None', value: 'none' },
                    { label: 'Beginner', value: 'beginner' },
                    { label: 'Intermediate', value: 'intermediate' },
                    { label: 'Expert', value: 'expert' },
                  ]} />
                  <InputField label="Risk Tolerance" name="riskTolerance" type="select" required value={form.riskTolerance} onChange={handleChange} error={errors.riskTolerance} options={[
                    { label: 'Low', value: 'low' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'High', value: 'high' },
                  ]} />
                  <InputField label="Wallet Address" name="walletAddress" required placeholder="Enter blockchain wallet address" icon={Wallet} value={form.walletAddress} onChange={handleChange} error={errors.walletAddress} />
                  <InputField label="Referral Code" name="referralCode" required placeholder="Enter referral code if any" value={form.referralCode} onChange={handleChange} error={errors.referralCode} />
                </div>
              </FormSection>

              {/* Emergency Contact */}
              <FormSection title="Emergency Contact" icon={Users}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField label="Emergency Contact Name" name="emergencyContactName" required placeholder="Enter emergency contact name" icon={User} value={form.emergencyContactName} onChange={handleChange} error={errors.emergencyContactName} />
                  <InputField label="Emergency Contact Phone" name="emergencyContactPhone" type="tel" required placeholder="Enter emergency contact phone" icon={Phone} value={form.emergencyContactPhone} onChange={handleChange} error={errors.emergencyContactPhone} />
                  <InputField label="Relationship" name="emergencyContactRelation" required placeholder="e.g., Spouse, Parent, Sibling" value={form.emergencyContactRelation} onChange={handleChange} error={errors.emergencyContactRelation} />
                </div>
              </FormSection>

              {/* Account Settings */}
              <FormSection title="Account Settings" icon={Shield}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <InputField label="Account Status" name="accountStatus" type="select" required value={form.accountStatus} onChange={handleChange} error={errors.accountStatus} options={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                    { label: 'Suspended', value: 'suspended' },
                  ]} />
                  <InputField label="KYC Status" name="kycStatus" type="select" required value={form.kycStatus} onChange={handleChange} error={errors.kycStatus} options={[
                    { label: 'Pending', value: 'pending' },
                    { label: 'Verified', value: 'verified' },
                    { label: 'Rejected', value: 'rejected' },
                  ]} />
                  <InputField label="AML Status" name="amlStatus" type="select" required value={form.amlStatus} onChange={handleChange} error={errors.amlStatus} options={[
                    { label: 'Pending', value: 'pending' },
                    { label: 'Cleared', value: 'cleared' },
                    { label: 'Flagged', value: 'flagged' },
                  ]} />
                  <InputField label="Registration Date" name="dateOfRegistration" type="date" required icon={Calendar} value={form.dateOfRegistration} onChange={handleChange} error={errors.dateOfRegistration} />
                </div>
              </FormSection>

              {/* Additional Information */}
              <FormSection title="Additional Information" icon={FileText}>
                <InputField label="Notes" name="notes" type="textarea" required placeholder="Enter any additional notes or comments about the customer" icon={FileText} value={form.notes} onChange={handleChange} error={errors.notes} />
              </FormSection>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6">
                <button
                  type="button"
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700/50 dark:hover:bg-slate-700/70 text-slate-800 dark:text-gray-2 rounded-xl transition-all duration-300 flex items-center gap-2 justify-center"
                  onClick={() => resetForm()}
                  disabled={loading}
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
                <Button type="submit"
                  disabled={loading || !isFormValid}>
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