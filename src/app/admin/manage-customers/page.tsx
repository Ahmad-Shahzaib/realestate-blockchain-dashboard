"use client";

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
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
import { getRequest } from "@/app/utils/requests";
import { getAxiosInstance } from "@/lib/axios";

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
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  pattern?: string;
  previewUrl?: string | null;
  setPreviewUrl?: (url: string | null) => void;
}

const FormSection: React.FC<FormSectionProps> = ({ title, icon: Icon, children, className }) => (
  <div className={`text-black dark:text-white border-slate-700/50 shadow-md rounded-2xl p-6 ${className}`}>
    <div className="flex items-center gap-3 mb-6">
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    {children}
  </div>
);

const InputFieldInner: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  icon: Icon,
  value,
  onChange,
  options,
  error,
  inputRef,
  inputMode,
  pattern,
  previewUrl,
  setPreviewUrl
}) => {
  // local state for preview URL when handling file inputs


  return (
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
          inputMode={inputMode}
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

          {/* image preview + inline error below preview */}
          <div className="mt-3 flex items-center gap-4">
            {previewUrl ? (
              <img src={previewUrl} alt="preview" className="w-20 h-20 object-cover rounded-full border" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800/40 border flex items-center justify-center text-slate-400">No image</div>
            )}
            {/* keep space for error message under image */}
          </div>
          {error && <p id={`${name}-error`} className="text-sm text-red-500 mt-2">{error}</p>}
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          inputMode={inputMode}
          pattern={pattern}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className="w-full p-3 
        bg-white dark:bg-slate-800/50 
        text-slate-900 dark:text-white 
        placeholder-slate-500 dark:placeholder-slate-400
        backdrop-blur-sm border border-slate-300 dark:border-slate-600/50 
        rounded-xl focus:outline-none focus:ring-2 
        focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
        />
      )}
      {type !== 'file' && error && <p id={`${name}-error`} className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.customer || { loading: false, error: null });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // Function to handle file uploads
  const handleFileUpload = async (file: File, purpose: string): Promise<string | null> => {
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const sanitized = file.type;

    try {
      const presign = await getRequest(getAxiosInstance('/api'), `/api/upload_images?fileName=${encodeURIComponent(safeFileName)}&contentType=${encodeURIComponent(sanitized)}`);

      if (!presign || presign.status !== 'success' || !presign.url) {
        toast.error(`Failed to get upload URL for ${safeFileName}`);
        return null;
      }

      const uploadResp = await fetch(presign.url, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': sanitized },
      });

      if (!uploadResp.ok) {
        toast.error(`Failed to upload ${safeFileName}`);
        return null;
      }


      const publicUrl = presign.url.split('?')[0];
      setPreviewUrl(publicUrl);
      toast.success(`Successfully uploaded ${purpose}`);
      return publicUrl;
    } catch (error) {
      toast.error(`Error uploading ${purpose}: ${error}`);
      return null;
    }
  };

  // Handle profile picture upload
  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const url = await handleFileUpload(file, 'profile picture');
        if (url) {
          setForm(prev => ({ ...prev, profilePicture: url }));
          setErrors(prev => ({ ...prev, profilePicture: null }));
        } else {
          setErrors(prev => ({ ...prev, profilePicture: 'Failed to upload profile picture' }));
        }
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Basic validators
  const validators = useMemo(() => ({
    firstName: (v: string) => v.trim() ? null : 'First name is required',
    lastName: (v: string) => v.trim() ? null : 'Last name is required',
    email: (v: string) => /\S+@\S+\.\S+/.test(v) ? null : 'Enter a valid email',
    phone: (v: string) => {
      if (!v || !String(v).trim()) return 'Phone number is required';
      const digits = String(v).replace(/\D/g, '');
      if (digits.length < 10) return 'Enter a valid phone number (at least 10 digits)';
      if (!/^\d+$/.test(digits)) return 'Phone number must contain only digits';
      return null;
    },
    dateOfBirth: (v: string) => v ? null : 'Date of birth is required',
    gender: (v: string) => v ? null : 'Gender is required',
    nationality: (v: string) => v ? null : 'Nationality is required',
    primaryAddress: (v: string) => v ? null : 'Primary address is required',
    nationalId: (v: string) => {
      if (!v || !String(v).trim()) return 'National ID or Passport number is required';
      const digits = String(v).replace(/\D/g, '');
      if (!digits) return 'National ID must contain digits';
      if (!/^\d+$/.test(digits)) return 'National ID must contain only digits';
      return null;
    },
    password: (v: string) => v && v.length >= 6 ? null : 'Password must be at least 6 characters',
    secondaryAddress: (v: string) => v ? null : 'Secondary address is required',
    profilePicture: (v: string | null) => v ? null : 'Profile picture is required',
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
    const { name, value, type } = e.target as any;

    if (type === 'file') {
      // File inputs are handled separately
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
    const fieldError = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  }, [validateField]);

  const resetForm = useCallback(() => {
    setForm(initialFormState);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const isFormValid = useMemo(() => {
    // Skip validation if we're uploading
    if (isUploading) return false;

    // run through required validators
    for (const key of Object.keys(validators)) {
      const val = (form as any)[key];
      const err = (validators as any)[key](val);
      if (err) return false;
    }
    return true;
  }, [form, validators, isUploading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build full name from first and last
    const fullName = `${form.firstName || ''} ${form.lastName || ''}`.trim();

    const payload: any = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phoneNumber: form.phone,
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
      nationality: form.nationality,
      primaryAddress: form.primaryAddress,
      secondaryAddress: form.secondaryAddress,
      nationalId: form.nationalId,
      accountStatus: form.accountStatus,
      dateOfRegistration: form.dateOfRegistration,
      preferredContactMethod: form.preferredContactMethod,
      occupation: form.occupation,
      annualIncome: form.annualIncome,
      investmentExperience: form.investmentExperience,
      riskTolerance: form.riskTolerance,
      kycStatus: form.kycStatus,
      amlStatus: form.amlStatus,
      walletAddress: form.walletAddress,
      referralCode: form.referralCode,
      emergencyContactName: form.emergencyContactName,
      emergencyContactPhone: form.emergencyContactPhone,
      emergencyContactRelation: form.emergencyContactRelation,
      notes: form.notes,
      password: form.password,
      name: fullName,
      role: 'customer',
      profilePicture: form.profilePicture || "https://blog.photofeeler.com/wp-content/uploads/2017/09/instagram-profile-picture-maker.jpg"
    };

    try {
      // Final validation before submit
      const newErrors: Record<string, string | null> = {};
      for (const key of Object.keys(validators)) {
        const val = (form as any)[key];
        const err = (validators as any)[key](val);
        if (err) newErrors[key] = err;
      }
      setErrors(prev => ({ ...prev, ...newErrors }));
      if (Object.keys(newErrors).length > 0) {
        toast.error('Please fix validation errors before submitting');
        setIsSubmitting(false);
        return;
      }

      // Dispatch and unwrap to get thrown error on rejection
      await dispatch(addCustomer(payload)).unwrap();
      toast.success('Customer added successfully');
      resetForm();
    } catch (err: any) {
      const msg = err?.message || String(err) || 'Failed to add customer';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark relative overflow-hidden rounded-lg dark:text-white">
      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
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
                  <InputField
                    label="First Name"
                    name="firstName"
                    required
                    placeholder="Enter first name"
                    icon={User}
                    value={form.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                  />

                  <InputField
                    label="Last Name"
                    name="lastName"
                    required
                    placeholder="Enter last name"
                    icon={User}
                    value={form.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                  />

                  <InputField label="Password" name="password" type="password" required placeholder="Enter password" icon={User} value={form.password} onChange={handleChange} error={errors.password} />

                  <InputField label="Email Address" name="email" type="email" required placeholder="Enter email address" icon={Mail} value={form.email} onChange={handleChange} error={errors.email} />
                  <InputField label="Date of Birth" name="dateOfBirth" type="date" required icon={Calendar} value={form.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} />
                  <InputField label="Gender" name="gender" type="select" required value={form.gender} onChange={handleChange} error={errors.gender} options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Other', value: 'Other' },
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
                      { label: 'Email', value: 'Email' },
                      { label: 'Phone', value: 'Phone' },
                      { label: 'WhatsApp', value: 'WhatsApp' },
                    ]} />
                  </div>
                </div>
              </FormSection>

              {/* Identity & Documentation */}
              <FormSection title="Identity & Documentation" icon={CreditCard}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Phone Number" name="phone" type="tel" required placeholder="+1 (555) 123-4567" icon={Phone} value={form.phone} onChange={handleChange} error={errors.phone} inputMode="tel" pattern="[0-9]*" />

                  <InputField label="National ID / Passport Number" name="nationalId" required placeholder="Enter ID or passport number" icon={CreditCard} value={form.nationalId} onChange={handleChange} error={errors.nationalId} inputMode="numeric" pattern="[0-9]*" />

                  <InputField
                    label="Profile Picture"
                    name="profilePicture"
                    type="file"
                    required
                    onChange={handleProfilePictureChange}
                    inputRef={fileInputRef}
                    error={errors.profilePicture}
                    value={form.profilePicture}
                    previewUrl={previewUrl}
                    setPreviewUrl={setPreviewUrl}
                  />

                  <InputField label="Occupation" name="occupation" required placeholder="Enter occupation" icon={Building2} value={form.occupation} onChange={handleChange} error={errors.occupation} />
                  <InputField label="Annual Income" name="annualIncome" type="select" required value={form.annualIncome} onChange={handleChange} icon={DollarSign} error={errors.annualIncome} options={[
                    { label: '< PKR 50,000', value: '<50000' },
                    { label: 'PKR 50,000 - PKR 100,000', value: '50000-100000' },
                    { label: 'PKR 100,000 - PKR 250,000', value: '100000-250000' },
                    { label: '> PKR 250,000', value: '>250000' },
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
                    { label: 'Active', value: 'Active' },
                    { label: 'Inactive', value: 'Inactive' },
                  ]} />
                  <InputField label="KYC Status" name="kycStatus" type="select" required value={form.kycStatus} onChange={handleChange} error={errors.kycStatus} options={[
                    { label: 'Pending', value: 'pending' },
                    { label: 'Approved', value: 'approved' },
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
                  disabled={isSubmitting}
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={isSubmitting || isUploading || !isFormValid}
                >
                  {isSubmitting ? 'Adding...' : (isUploading ? 'Uploading image...' : 'Add Customer')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAddCustomerFormUI;