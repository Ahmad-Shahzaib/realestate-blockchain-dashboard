
"use client";

import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  Save,
  X,
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
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCustomer } from '@/redux/reducers/customerSlice';

// Define types for FormSection props
interface FormSectionProps {
  title: string;
  icon: typeof LucideIcon;
  children: React.ReactNode;
  className?: string;
}


// FormSection using Card UI
const FormSection: React.FC<FormSectionProps> = ({ title, icon: Icon, children, className }) => (
  <div className={`rounded-[8px] bg-[#FFF] shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)]  p-6 ${className}`}>
    <div className="flex items-center gap-3 mb-6">
      <div className="rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] rounded-br-[8px] bg-[#0FB9A8] w-full h-[53px] flex-shrink-0 flex items-center">
        {/* <Icon className="w-5 h-5 text-white" iconNode={[]} /> */}
        <h3 className="text-lg font-semibold text-white ml-3">{title}</h3>
      </div>
    </div>
    {children}
  </div>
);


// Yup validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone Number is required'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  gender: Yup.string().required('Gender is required'),
  nationality: Yup.string().required('Nationality is required'),
  primaryAddress: Yup.string().required('Primary Address is required'),
  secondaryAddress: Yup.string(),
  nationalId: Yup.string().required('National ID / Passport Number is required'),
  profilePicture: Yup.mixed(),
  accountStatus: Yup.string().required('Account Status is required'),
  dateOfRegistration: Yup.string(),
  preferredContactMethod: Yup.string(),
  occupation: Yup.string(),
  annualIncome: Yup.string(),
  investmentExperience: Yup.string(),
  riskTolerance: Yup.string(),
  kycStatus: Yup.string(),
  amlStatus: Yup.string(),
  walletAddress: Yup.string(),
  referralCode: Yup.string(),
  emergencyContactName: Yup.string(),
  emergencyContactPhone: Yup.string(),
  emergencyContactRelation: Yup.string(),
  notes: Yup.string(),
});


const SuperAdminAddCustomerFormUI: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.customer || { loading: false, error: null });

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      primaryAddress: '',
      secondaryAddress: '',
      nationalId: '',
      profilePicture: undefined,
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
    },
  });

  const onSubmit = async (data: any) => {
    let payload: any = { ...data };
    if (data.profilePicture && Array.isArray(data.profilePicture) && data.profilePicture.length > 0) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'profilePicture' && Array.isArray(value)) {
          formData.append('profilePicture', value[0]);
        } else {
          formData.append(key, value as any);
        }
      });
      payload = formData;
    }
    await dispatch(addCustomer(payload));
    // Optionally reset form on success
    // reset();
  };

  return (
    <div className="min-h-screen  relative overflow-hidden">
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
          <div className="text-center text-black mb-8">
            <div className="flex items-center justify-start gap-3 mb-4">
              {/* <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div> */}
              <h1 className="text-3xl text-center w-full lg:text-4xl font-bold ">
                Add New Customer
              </h1>
            </div>
            <p className="text-black text-lg text-center">Create a new customer profile for the blockchain real estate platform</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="space-y-8">
              {/* Basic Information */}
              <FormSection title="Basic Information" icon={User}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" {...register('name')} placeholder="Enter full name" />
                    {errors.name && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{errors.name.message as string}</AlertDescription></Alert>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" {...register('email')} placeholder="Enter email address" />
                    {errors.email && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{errors.email.message as string}</AlertDescription></Alert>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" {...register('phone')} placeholder="+1 (555) 123-4567" />
                    {errors.phone && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{errors.phone.message as string}</AlertDescription></Alert>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input id="dateOfBirth" type="date" {...register('dateOfBirth')} />
                    {errors.dateOfBirth && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{errors.dateOfBirth.message as string}</AlertDescription></Alert>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Controller
                      control={control}
                      name="gender"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.gender && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{errors.gender.message as string}</AlertDescription></Alert>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Input id="nationality" {...register('nationality')} placeholder="Enter nationality" />
                    {errors.nationality && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{errors.nationality.message as string}</AlertDescription></Alert>}
                  </div>
                </div>
              </FormSection>
              {/* Contact & Address Information */}
              <FormSection title="Contact & Address Information" icon={MapPin}>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryAddress">Primary Address *</Label>
                    <Textarea id="primaryAddress" {...register('primaryAddress')} placeholder="Enter complete primary address" />
                    {errors.primaryAddress && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{errors.primaryAddress.message as string}</AlertDescription></Alert>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryAddress">Secondary Address (Optional)</Label>
                    <Textarea id="secondaryAddress" {...register('secondaryAddress')} placeholder="Enter secondary address if applicable" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
                      <Controller
                        control={control}
                        name="preferredContactMethod"
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                            <SelectTrigger id="preferredContactMethod">
                              <SelectValue placeholder="Select Method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone</SelectItem>
                              <SelectItem value="sms">SMS</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </FormSection>
              {/* Identity & Documentation */}
              <FormSection title="Identity & Documentation" icon={CreditCard}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nationalId">National ID / Passport Number *</Label>
                    <Input id="nationalId" {...register('nationalId')} placeholder="Enter ID or passport number" />
                    {errors.nationalId && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{errors.nationalId.message as string}</AlertDescription></Alert>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profilePicture">Profile Picture</Label>
                    <Controller
                      control={control}
                      name="profilePicture"
                      render={({ field }) => (
                        <Input id="profilePicture" type="file" accept="image/*" onChange={e => field.onChange(e.target.files)} />
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input id="occupation" {...register('occupation')} placeholder="Enter occupation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annualIncome">Annual Income (USD)</Label>
                    <Controller
                      control={control}
                      name="annualIncome"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                          <SelectTrigger id="annualIncome">
                            <SelectValue placeholder="Select Income" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="<50000">{'< $50,000'}</SelectItem>
                            <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
                            <SelectItem value="100000-250000">$100,000 - $250,000</SelectItem>
                            <SelectItem value=">250000">{'>'} $250,000</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </FormSection>
              {/* Investment Profile */}
              <FormSection title="Investment Profile" icon={TrendingUp}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="investmentExperience">Investment Experience</Label>
                    <Controller
                      control={control}
                      name="investmentExperience"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                          <SelectTrigger id="investmentExperience">
                            <SelectValue placeholder="Select Experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                    <Controller
                      control={control}
                      name="riskTolerance"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                          <SelectTrigger id="riskTolerance">
                            <SelectValue placeholder="Select Risk" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="walletAddress">Wallet Address (Optional)</Label>
                    <Input id="walletAddress" {...register('walletAddress')} placeholder="Enter blockchain wallet address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referralCode">Referral Code (Optional)</Label>
                    <Input id="referralCode" {...register('referralCode')} placeholder="Enter referral code if any" />
                  </div>
                </div>
              </FormSection>
              {/* Emergency Contact */}
              <FormSection title="Emergency Contact" icon={Users}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                    <Input id="emergencyContactName" {...register('emergencyContactName')} placeholder="Enter emergency contact name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                    <Input id="emergencyContactPhone" type="tel" {...register('emergencyContactPhone')} placeholder="Enter emergency contact phone" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactRelation">Relationship</Label>
                    <Input id="emergencyContactRelation" {...register('emergencyContactRelation')} placeholder="e.g., Spouse, Parent, Sibling" />
                  </div>
                </div>
              </FormSection>
              {/* Account Settings */}
              <FormSection title="Account Settings" icon={Shield}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="accountStatus">Account Status *</Label>
                    <Controller
                      control={control}
                      name="accountStatus"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                          <SelectTrigger id="accountStatus">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.accountStatus && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{errors.accountStatus.message as string}</AlertDescription></Alert>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kycStatus">KYC Status</Label>
                    <Controller
                      control={control}
                      name="kycStatus"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                          <SelectTrigger id="kycStatus">
                            <SelectValue placeholder="Select KYC" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="verified">Verified</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amlStatus">AML Status</Label>
                    <Controller
                      control={control}
                      name="amlStatus"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                          <SelectTrigger id="amlStatus">
                            <SelectValue placeholder="Select AML" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="cleared">Cleared</SelectItem>
                            <SelectItem value="flagged">Flagged</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfRegistration">Registration Date</Label>
                    <Input id="dateOfRegistration" type="date" {...register('dateOfRegistration')} />
                  </div>
                </div>
              </FormSection>
              {/* Additional Information */}
              <FormSection title="Additional Information" icon={FileText}>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" {...register('notes')} placeholder="Enter any additional notes or comments about the customer" />
                </div>
              </FormSection>
              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6">
                <Button type="button" onClick={() => reset()} disabled={loading} variant="outline">
                  <X className="w-5 h-5" />
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  <Save className="w-5 h-5" />
                  {loading ? 'Adding...' : 'Add Customer'}
                </Button>
              </div>
              {error && <Alert variant="destructive" className="mt-2"><AlertCircle className="w-4 h-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAddCustomerFormUI;