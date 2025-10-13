
"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Filter, Building2, Edit, Trash2, Mail, Phone, MapPin, Eye, X, Camera } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCustomers, resetPage } from '@/redux/reducers/customerslice/customerSlice';
import SearchInput from '@/common/Input';
import { updateUserByAdmin } from '@/services/user.services';
import { getRequest } from "@/app/utils/requests";
import { getAxiosInstance } from "@/lib/axios";
import toast, { Toaster } from 'react-hot-toast';

// Interface for Customer (used in table and view modal)
interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  status: string;
  createdAt: string | null;
  profilePicture: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  nationality: string | null;
  secondaryAddress: string | null;
  nationalId: string | null;
  accountStatus: string | null;
  dateOfRegistration: string | null;
  preferredContactMethod: string | null;
  occupation: string | null;
  annualIncome: string | null;
  investmentExperience: string | null;
  riskTolerance: string | null;
  kycStatus: string | null;
  amlStatus: string | null;
  walletAddress: string | null;
  referralCode: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  emergencyContactRelation: string | null;
  notes: string | null;
}

// Interface for UserProfile (used in edit modal)
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  status: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  secondaryAddress?: string;
  nationalId?: string;
  accountStatus?: string;
  dateOfRegistration?: string;
  preferredContactMethod?: string;
  occupation?: string;
  annualIncome?: string;
  investmentExperience?: string;
  riskTolerance?: string;
  kycStatus?: string;
  amlStatus?: string;
  walletAddress?: string;
  referralCode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  notes?: string;
  profilePicture?: string | null;
}

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<UserProfile>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof UserProfile, string | null>>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const { customers, pagination, loading, error } = useAppSelector((state) => state.customer || {
    customers: [],
    pagination: null,
    loading: false,
    error: null,
  });

  const itemsPerPage = 20;

  // Validators for edit form
  const validators = useMemo(
    () => ({
      firstName: (v: string | undefined) => (v && v.trim() ? null : 'First name is required'),
      lastName: (v: string | undefined) => (v && v.trim() ? null : 'Last name is required'),
      email: (v: string | undefined) => (v && /\S+@\S+\.\S+/.test(v) ? null : 'Enter a valid email'),
      phoneNumber: (v: string | undefined) => {
        if (!v) return null; // Optional
        const digits = String(v).replace(/\D/g, '');
        if (digits.length < 10) return 'Enter a valid phone number (at least 10 digits)';
        if (!/^\d+$/.test(digits)) return 'Phone number must contain only digits';
        return null;
      },
      dateOfBirth: (v: string | undefined) => (v ? null : 'Date of birth is required'),
      gender: (v: string | undefined) => (v ? null : 'Gender is required'),
      nationality: (v: string | undefined) => (v && v.trim() ? null : 'Nationality is required'),
      address: (v: string | undefined) => (v && v.trim() ? null : 'Primary address is required'),
      secondaryAddress: (v: string | undefined) => null, // Optional
      nationalId: (v: string | undefined) => {
        if (!v) return 'National ID or Passport number is required';
        const digits = String(v).replace(/\D/g, '');
        if (!digits) return 'National ID must contain digits';
        if (!/^\d+$/.test(digits)) return 'National ID must contain only digits';
        return null;
      },
      accountStatus: (v: string | undefined) => (v ? null : 'Account status is required'),
      dateOfRegistration: (v: string | undefined) => (v ? null : 'Registration date is required'),
      preferredContactMethod: (v: string | undefined) => (v ? null : 'Preferred contact method is required'),
      occupation: (v: string | undefined) => (v && v.trim() ? null : 'Occupation is required'),
      annualIncome: (v: string | undefined) => (v ? null : 'Annual income is required'),
      investmentExperience: (v: string | undefined) => (v ? null : 'Investment experience is required'),
      riskTolerance: (v: string | undefined) => (v ? null : 'Risk tolerance is required'),
      kycStatus: (v: string | undefined) => (v ? null : 'KYC status is required'),
      amlStatus: (v: string | undefined) => (v ? null : 'AML status is required'),

      referralCode: (v: string | undefined) => null, // Optional
      emergencyContactName: (v: string | undefined) => (v && v.trim() ? null : 'Emergency contact name is required'),
      emergencyContactPhone: (v: string | undefined) => (v && v.trim() ? null : 'Emergency contact phone is required'),
      emergencyContactRelation: (v: string | undefined) => (v && v.trim() ? null : 'Emergency contact relation is required'),
      notes: (v: string | undefined) => null, // Optional
      profilePicture: (v: string | undefined | null) => null, // Optional in edit
    }),
    []
  );

  // Validate a single field
  const validateField = (name: keyof UserProfile, value: any) => {
    const validator = validators[name];
    if (!validator) return null;
    return validator(value);
  };

  // Check if form is valid
  const isFormValid = useMemo(() => {
    if (isUploading) return false;
    for (const key of Object.keys(validators) as (keyof UserProfile)[]) {
      const val = editFormData[key] as string | undefined | null;
      const err = validateField(key, val);
      if (err) return false;
    }
    return true;
  }, [editFormData, isUploading]);

  // Normalize customer data
  const normalizedCustomers = useMemo(() => {
    const safeCustomers = Array.isArray(customers) ? customers : [];
    return safeCustomers.map((c: any) => ({
      id: c._id || c.id,
      firstName: c.firstName || '',
      lastName: c.lastName || '',
      email: c.email || c.emailAddress || '',
      phoneNumber: c.phoneNumber || c.phoneNumber || c.contact || null,
      address: c.address || c.primaryAddress || [c.city, c.state, c.country].filter(Boolean).join(', ') || null,
      status: (c.kycStatus || c.status || 'inactive').toLowerCase(),
      createdAt: c.createdAt || c.dateOfRegistration || c.date || null,
      profilePicture: c.profilePicture || c.profileImage || c.avatar || c.profileImageUrl || null,
      dateOfBirth: c.dateOfBirth || null,
      gender: c.gender || null,
      nationality: c.nationality || null,
      secondaryAddress: c.secondaryAddress || null,
      nationalId: c.nationalId || null,
      accountStatus: c.accountStatus || null,
      dateOfRegistration: c.dateOfRegistration || null,
      preferredContactMethod: c.preferredContactMethod || null,
      occupation: c.occupation || null,
      annualIncome: c.annualIncome || null,
      investmentExperience: c.investmentExperience || null,
      riskTolerance: c.riskTolerance || null,
      kycStatus: c.kycStatus || null,
      amlStatus: c.amlStatus || null,
      walletAddress: c.walletAddress || null,
      referralCode: c.referralCode || null,
      emergencyContactName: c.emergencyContactName || null,
      emergencyContactPhone: c.emergencyContactPhone || null,
      emergencyContactRelation: c.emergencyContactRelation || null,
      notes: c.notes || null,
    }));
  }, [customers]);

  useEffect(() => {
    dispatch(fetchCustomers({ page: currentPage, limit: itemsPerPage, search: searchTerm, status: filterStatus }));
  }, [dispatch, currentPage, searchTerm, filterStatus]);

  useEffect(() => {
    dispatch(resetPage());
    setCurrentPage(1);
  }, [searchTerm, filterStatus, dispatch]);

  useEffect(() => {
    if (pagination && currentPage > pagination.pages && pagination.pages > 0) {
      setCurrentPage(pagination.pages);
    }
  }, [pagination, currentPage]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
        return 'bg-[#E8F8F5] text-[#27AE60] dark:bg-green-600/20 dark:text-green-400';
      case 'inactive':
      case 'rejected':
        return 'bg-[#F5F7FA] text-red-600 dark:bg-dark-3 dark:text-red-400';
      case 'pending':
        return 'bg-[#F5F7FA] text-[#3498DB] dark:bg-dark-3 dark:text-blue-400';
      default:
        return 'bg-[#F5F7FA] text-gray-600 dark:bg-dark-3 dark:text-gray-400';
    }
  };

  // Handle file upload for profile picture
  const handleFileUpload = async (file: File, purpose: string): Promise<string | null> => {
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      toast.error('Only JPEG, PNG, or GIF images are allowed');
      return null;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return null;
    }

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
        toast.error(`Failed to upload ${safeFileName} `);
        return null;
      }

      const publicUrl = presign.url.split('?')[0];
      setPreviewUrl(publicUrl);
      toast.success(`Successfully uploaded ${purpose} `);
      return publicUrl;
    } catch (error) {
      toast.error(`Error uploading ${purpose}: ${error} `);
      return null;
    }
  };

  // Handle profile picture change
  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const url = await handleFileUpload(file, 'profile picture');
        if (url) {
          setEditFormData((prev) => ({ ...prev, profilePicture: url }));
          setErrors((prev) => ({ ...prev, profilePicture: null }));
        } else {
          setErrors((prev) => ({ ...prev, profilePicture: 'Failed to upload profile picture' }));
        }
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setPreviewUrl(customer.profilePicture);
    setEditFormData({
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      email: customer.email || '',
      phoneNumber: customer.phoneNumber || '',
      address: customer.address || '',
      // status: customer.status || 'pending',
      dateOfBirth: customer.dateOfBirth || '',
      gender: customer.gender || '',
      nationality: customer.nationality || '',
      secondaryAddress: customer.secondaryAddress || '',
      nationalId: customer.nationalId || '',
      accountStatus: customer.accountStatus || 'Active',
      dateOfRegistration: customer.dateOfRegistration || new Date().toISOString().split('T')[0],
      preferredContactMethod: customer.preferredContactMethod || '',
      occupation: customer.occupation || '',
      annualIncome: customer.annualIncome || '',
      investmentExperience: customer.investmentExperience || '',
      riskTolerance: customer.riskTolerance || '',
      kycStatus: customer.kycStatus || 'pending',
      amlStatus: customer.amlStatus || 'pending',
      walletAddress: customer.walletAddress || '',
      referralCode: customer.referralCode || '',
      emergencyContactName: customer.emergencyContactName || '',
      emergencyContactPhone: customer.emergencyContactPhone || '',
      emergencyContactRelation: customer.emergencyContactRelation || '',
      notes: customer.notes || '',
      profilePicture: customer.profilePicture || null,
    });
    setIsEditModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedCustomer(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCustomer(null);
    setEditFormData({});
    setSubmitError(null);
    setErrors({});
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
    const fieldError = validateField(name as keyof UserProfile, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    // Validate all fields before submission
    const newErrors: Partial<Record<keyof UserProfile, string | null>> = {};
    for (const key of Object.keys(validators) as (keyof UserProfile)[]) {
      const val = editFormData[key] as string | undefined | null;
      const err = validateField(key, val);
      if (err) newErrors[key] = err;
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix validation errors before submitting');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Build full name for payload
      const fullName = `${editFormData.firstName || ''} ${editFormData.lastName || ''} `.trim();

      const payload: Partial<UserProfile> & { name?: string; role?: string } = {
        firstName: editFormData.firstName,
        lastName: editFormData.lastName,
        email: editFormData.email,
        phoneNumber: editFormData.phoneNumber,
        address: editFormData.address,
        status: editFormData.status,
        dateOfBirth: editFormData.dateOfBirth,
        gender: editFormData.gender,
        nationality: editFormData.nationality,
        secondaryAddress: editFormData.secondaryAddress,
        nationalId: editFormData.nationalId,
        accountStatus: editFormData.accountStatus,
        dateOfRegistration: editFormData.dateOfRegistration,
        preferredContactMethod: editFormData.preferredContactMethod,
        occupation: editFormData.occupation,
        annualIncome: editFormData.annualIncome,
        investmentExperience: editFormData.investmentExperience,
        riskTolerance: editFormData.riskTolerance,
        kycStatus: editFormData.kycStatus,
        amlStatus: editFormData.amlStatus,
        walletAddress: editFormData.walletAddress,
        referralCode: editFormData.referralCode,
        emergencyContactName: editFormData.emergencyContactName,
        emergencyContactPhone: editFormData.emergencyContactPhone,
        emergencyContactRelation: editFormData.emergencyContactRelation,
        notes: editFormData.notes,
        profilePicture: editFormData.profilePicture || selectedCustomer.profilePicture || 'https://blog.photofeeler.com/wp-content/uploads/2017/09/instagram-profile-picture-maker.jpg',
        name: fullName,
        role: 'customer',
      };

      await updateUserByAdmin(selectedCustomer.id, payload);
      // Update the local customer list to reflect changes immediately
      const updatedCustomer = {
        ...selectedCustomer,
        ...payload,
        phoneNumber: payload.phoneNumber || selectedCustomer.phoneNumber,
        address: payload.address || selectedCustomer.address,
        profilePicture: payload.profilePicture || selectedCustomer.profilePicture,
      };
      // Dispatch action to refresh the customer list
      dispatch(fetchCustomers({ page: currentPage, limit: itemsPerPage, search: searchTerm, status: filterStatus }));
      setSelectedCustomer(updatedCustomer); // Update selected customer for view modal
      toast.success('Customer updated successfully');
      closeEditModal();
    } catch (error) {
      setSubmitError('Failed to update customer. Please try again.');
      console.error('Update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="p-6 text-[#34495E] dark:text-gray-4">Loading...</div>;
  if (error) return <div className="p-6 text-red-600 dark:text-red-400">{error}</div>;

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-dark">
      <Toaster position="top-right" />
      <div className="bg-white shadow-sm border-b border-[#ECF0F1] dark:bg-dark-2 dark:border-dark-4">
        <div className="mx-auto px-6 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-[#00B894] p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#2C3E50] dark:text-gray-2">Customer Management</h1>
              <p className="text-[#34495E] dark:text-gray-4 mt-1">Manage and monitor all customer records</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 dark:bg-dark-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <SearchInput
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="h-5 w-5 text-[#34495E] dark:text-gray-3" />}
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-[#34495E] dark:text-gray-3" />
              <div className="flex bg-[#ECF0F1] dark:bg-dark-3 rounded-lg p-1">
                {['All', 'Active', 'Pending', 'Inactive'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status.toLowerCase())}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterStatus === status.toLowerCase()
                      ? 'bg-white dark:bg-dark-4 text-[#3498DB] shadow-sm'
                      : 'text-[#34495E] dark:text-gray-3 hover:text-[#2C3E50] dark:hover:text-gray-2'
                      } `}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 dark:bg-dark-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#2C3E50] dark:text-gray-2">
              Customers ({pagination?.total || 0})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#ECF0F1] dark:border-dark-4">
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Customer
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Contact
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Address
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Join Date
                  </th>
                  <th className="text-left py-4 px-2 text-sm font-semibold text-[#34495E] dark:text-gray-3 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECF0F1] dark:divide-dark-4">
                {normalizedCustomers.length > 0 ? (
                  normalizedCustomers.map((customer: Customer) => (
                    <tr key={customer.id} className="hover:bg-[#ECF0F1] dark:hover:bg-dark-3 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-3">
                          <img
                            src={customer.profilePicture || '/images/user.png'}
                            alt={`${customer.firstName} ${customer.lastName} ` || 'User'}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-[#2C3E50] dark:text-gray-2">
                              {[customer.firstName, customer.lastName].filter(Boolean).join(' ') || customer.email}
                            </p>
                            <p className="text-sm text-[#34495E] dark:text-gray-3">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                            <Mail size={14} className="text-[#34495E] dark:text-gray-3" />
                            <span className="truncate max-w-48">{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                            <Phone size={14} className="text-[#34495E] dark:text-gray-3" />
                            <span>{customer.phoneNumber || '—'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                          <MapPin size={14} className="text-[#34495E] dark:text-gray-3" />
                          <span>{customer.address || '—'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`px - 3 py - 1 rounded - full text - xs font - semibold ${getStatusColor(customer.status)} `}>
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-[#34495E] dark:text-gray-3">
                        <span>{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '—'}</span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-1">
                          <button
                            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-dark-4 rounded-lg transition-all duration-200"
                            title="View Details"
                            onClick={() => handleViewDetails(customer)}
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-dark-4 rounded-lg transition-all duration-200"
                            title="Edit"
                            onClick={() => handleEdit(customer)}
                          >
                            <Edit size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-4 px-2 text-center text-[#34495E] dark:text-gray-4">
                      No customers found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Modal for Customer Details */}
        {isViewModalOpen && selectedCustomer && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-dark-2 rounded-2xl shadow-lg p-6 w-full max-w-lg relative">
              <button
                className="absolute top-4 right-4 text-[#34495E] dark:text-gray-3 hover:text-[#2C3E50] dark:hover:text-gray-2"
                onClick={closeViewModal}
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-semibold text-[#2C3E50] dark:text-gray-2 mb-6">Customer Details</h2>
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={selectedCustomer.profilePicture || '/images/user.png'}
                  alt={`${selectedCustomer.firstName} ${selectedCustomer.lastName} ` || 'User'}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-semibold text-[#2C3E50] dark:text-gray-2">
                    {[selectedCustomer.firstName, selectedCustomer.lastName].filter(Boolean).join(' ') || selectedCustomer.email}
                  </p>
                  <p className="text-sm text-[#34495E] dark:text-gray-3">{selectedCustomer.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                  <Mail size={16} className="text-[#34495E] dark:text-gray-3" />
                  <span>Email: {selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                  <Phone size={16} className="text-[#34495E] dark:text-gray-3" />
                  <span>Phone: {selectedCustomer.phoneNumber || '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                  <MapPin size={16} className="text-[#34495E] dark:text-gray-3" />
                  <span>Location: {selectedCustomer.address || '—'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                  <span className={`px - 3 py - 1 rounded - full text - xs font - semibold ${getStatusColor(selectedCustomer.status)} `}>
                    Status: {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#34495E] dark:text-gray-3">
                  <span>Join Date: {selectedCustomer.createdAt ? new Date(selectedCustomer.createdAt).toLocaleDateString() : '—'}</span>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-[#00B894] text-white rounded-lg hover:bg-[#019077] transition-colors"
                  onClick={closeViewModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal for Customer Details */}
        {isEditModalOpen && selectedCustomer && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-dark-2 rounded-2xl shadow-lg p-6 w-full max-w-2xl relative h-[80vh] overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-[#34495E] dark:text-gray-3 hover:text-[#2C3E50] dark:hover:text-gray-2"
                onClick={closeEditModal}
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-semibold text-[#2C3E50] dark:text-gray-2 mb-6">Edit Customer</h2>
              <form onSubmit={handleEditSubmit} className="space-y-6">
                {/* Authorized Representative Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editFormData.firstName || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    />
                    {errors.firstName && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editFormData.lastName || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    />
                    {errors.lastName && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    />
                    {errors.email && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editFormData.dateOfBirth || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    />
                    {errors.dateOfBirth && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Gender</label>
                    <select
                      name="gender"
                      value={editFormData.gender || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.gender}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={editFormData.nationality || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    />
                    {errors.nationality && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.nationality}</p>}
                  </div>
                </div>

                {/* Contact & Address Information */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Primary Address</label>
                    <textarea
                      name="address"
                      value={editFormData.address || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      rows={4}
                      required
                    />
                    {errors.address && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Secondary Address</label>
                    <textarea
                      name="secondaryAddress"
                      value={editFormData.secondaryAddress || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      rows={4}
                    />
                    {errors.secondaryAddress && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.secondaryAddress}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={editFormData.phoneNumber || ''}
                        onChange={handleEditFormChange}
                        className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                        pattern="[0-9]*"
                        inputMode="tel"
                      />
                      {errors.phoneNumber && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.phoneNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Preferred Contact Method</label>
                      <select
                        name="preferredContactMethod"
                        value={editFormData.preferredContactMethod || ''}
                        onChange={handleEditFormChange}
                        className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                        required
                      >
                        <option value="">Select a method</option>
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                        <option value="WhatsApp">WhatsApp</option>
                      </select>
                      {errors.preferredContactMethod && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.preferredContactMethod}</p>}
                    </div>
                  </div>
                </div>

                {/* Identity & Documentation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">National ID / Passport Number</label>
                    <input
                      type="text"
                      name="nationalId"
                      value={editFormData.nationalId || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                    {errors.nationalId && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.nationalId}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Profile Picture</label>
                    <input
                      type="file"
                      name="profilePicture"
                      accept="image/*"
                      className="hidden"
                      id="profilePicture"
                      ref={fileInputRef}
                      onChange={handleProfilePictureChange}
                    />
                    <label
                      htmlFor="profilePicture"
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2 cursor-pointer flex items-center gap-2"
                    >
                      <Camera size={16} />
                      Choose profile picture...
                    </label>
                    <div className="mt-3 flex items-center gap-4">
                      {previewUrl ? (
                        <img src={previewUrl} alt="preview" className="w-20 h-20 object-cover rounded-full border" />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-[#F5F7FA] dark:bg-dark-3 border flex items-center justify-center text-[#34495E] dark:text-gray-3">
                          No image
                        </div>
                      )}
                    </div>
                    {errors.profilePicture && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.profilePicture}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={editFormData.occupation || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    />
                    {errors.occupation && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.occupation}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Annual Income</label>
                    <select
                      name="annualIncome"
                      value={editFormData.annualIncome || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    >
                      <option value="">Select Income</option>
                      <option value="<50000">&lt; PKR 50,000</option>
                      <option value="50000-100000">PKR 50,000 - PKR 100,000</option>
                      <option value="100000-250000">PKR 100,000 - PKR 250,000</option>
                      <option value=">250000">&gt; PKR 250,000</option>
                    </select>
                    {errors.annualIncome && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.annualIncome}</p>}
                  </div>
                </div>

                {/* Investment Profile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Investment Experience</label>
                    <select
                      name="investmentExperience"
                      value={editFormData.investmentExperience || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    >
                      <option value="">Select Experience</option>
                      <option value="none">None</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                    {errors.investmentExperience && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.investmentExperience}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Risk Tolerance</label>
                    <select
                      name="riskTolerance"
                      value={editFormData.riskTolerance || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    >
                      <option value="">Select Risk Tolerance</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    {errors.riskTolerance && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.riskTolerance}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Referral Code</label>
                    <input
                      type="text"
                      name="referralCode"
                      value={editFormData.referralCode || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                    />
                    {errors.referralCode && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.referralCode}</p>}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Emergency Contact Name</label>
                    <input
                      type="text"
                      name="emergencyContactName"
                      value={editFormData.emergencyContactName || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    />
                    {errors.emergencyContactName && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.emergencyContactName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Emergency Contact Phone</label>
                    <input
                      type="tel"
                      name="emergencyContactPhone"
                      value={editFormData.emergencyContactPhone || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    />
                    {errors.emergencyContactPhone && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.emergencyContactPhone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Relationship</label>
                    <input
                      type="text"
                      name="emergencyContactRelation"
                      value={editFormData.emergencyContactRelation || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    />
                    {errors.emergencyContactRelation && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.emergencyContactRelation}</p>}
                  </div>
                </div>

                {/* Account Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Account Status</label>
                    <select
                      name="accountStatus"
                      value={editFormData.accountStatus || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    {errors.accountStatus && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.accountStatus}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">KYC Status</label>
                    <select
                      name="kycStatus"
                      value={editFormData.kycStatus || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    >
                      <option value="">Select KYC Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    {errors.kycStatus && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.kycStatus}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">AML Status</label>
                    <select
                      name="amlStatus"
                      value={editFormData.amlStatus || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    >
                      <option value="">Select AML Status</option>
                      <option value="pending">Pending</option>
                      <option value="cleared">Cleared</option>
                      <option value="flagged">Flagged</option>
                    </select>
                    {errors.amlStatus && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.amlStatus}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Registration Date</label>
                    <input
                      type="date"
                      name="dateOfRegistration"
                      value={editFormData.dateOfRegistration || ''}
                      onChange={handleEditFormChange}
                      className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                      required
                    />
                    {errors.dateOfRegistration && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.dateOfRegistration}</p>}
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="block text-sm font-medium text-[#34495E] dark:text-gray-3">Notes</label>
                  <textarea
                    name="notes"
                    value={editFormData.notes || ''}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full rounded-md border-[#ECF0F1] dark:border-dark-4 bg-[#F5F7FA] dark:bg-dark-3 text-[#34495E] dark:text-gray-2 p-2"
                    rows={4}
                  />
                  {errors.notes && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.notes}</p>}
                </div>

                {submitError && (
                  <p className="text-red-600 dark:text-red-400 text-sm">{submitError}</p>
                )}
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 dark:bg-dark-4 text-[#34495E] dark:text-gray-2 rounded-lg hover:bg-gray-400 dark:hover:bg-dark-3 transition-colors"
                    onClick={closeEditModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#00B894] text-white rounded-lg hover:bg-[#019077] transition-colors disabled:opacity-50"
                    disabled={isSubmitting || isUploading}
                  >
                    {isSubmitting ? 'Saving...' : isUploading ? 'Uploading image...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {pagination && pagination.total > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-[#34495E] dark:text-gray-3">
              Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
              <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{' '}
              <span className="font-medium">{pagination.total}</span> results
            </p>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-2 text-sm border border-[#ECF0F1] dark:border-dark-4 rounded-lg hover:bg-[#ECF0F1] dark:hover:bg-dark-3 disabled:opacity-50 text-[#34495E] dark:text-gray-3"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: pagination.pages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-3 py-2 text-sm rounded-lg ${currentPage === i + 1
                    ? 'bg-[#00B894] text-white'
                    : 'border border-[#ECF0F1] dark:border-dark-4 hover:bg-[#ECF0F1] dark:hover:bg-dark-3 text-[#34495E] dark:text-gray-3'
                    } `}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-2 text-sm border border-[#ECF0F1] dark:border-dark-4 rounded-lg hover:bg-[#ECF0F1] dark:hover:bg-dark-3 disabled:opacity-50 text-[#34495E] dark:text-gray-3"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.pages))}
                disabled={currentPage === pagination.pages || pagination.pages === 0}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
