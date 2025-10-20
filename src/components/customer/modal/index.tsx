import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, User, Briefcase, DollarSign, Shield, Wallet, AlertCircle } from 'lucide-react';
import Button from '@/common/Button';

const CustomerDetailsModal = ({ selectedCustomer, setSelectedCustomer, onClose }: any) => {
  console.log('Selected Customer:', selectedCustomer);

  const getStatusColor = (statu: any) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const formatIncome = (income: any) => {
    if (!income) return '—';
    return `$${income.replace('-', ' - $')}`;
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center top-12 z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Customer Details</h2>
          <button
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <img
              src={selectedCustomer.profilePicture || '/images/user.png'}
              alt={`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}
              className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700"
            />
            <div className="flex-1">
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {[selectedCustomer.firstName, selectedCustomer.lastName].filter(Boolean).join(' ')}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedCustomer.email}</p>
              <div className="flex gap-2 mt-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedCustomer.status)}`}>
                  {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedCustomer.accountStatus)}`}>
                  {selectedCustomer.accountStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                <User size={20} className="text-blue-600" />
                Personal Information
              </h3>
              <div className="space-y-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date of Birth</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCustomer.dateOfBirth ? new Date(selectedCustomer.dateOfBirth).toLocaleDateString() : '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Gender</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCustomer.gender || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Nationality</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCustomer.nationality || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">National ID</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 font-mono">{selectedCustomer.nationalId || '—'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                <Phone size={20} className="text-green-600" />
                Contact Information
              </h3>
              <div className="space-y-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 break-all">{selectedCustomer.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Phone Number</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCustomer.phoneNumber || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Preferred Contact</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCustomer.preferredContactMethod || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Primary Address</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCustomer.address || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Secondary Address</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCustomer.secondaryAddress || '—'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                <DollarSign size={20} className="text-purple-600" />
                Financial Information
              </h3>
              <div className="space-y-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Briefcase size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Occupation</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCustomer.occupation || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Annual Income</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{formatIncome(selectedCustomer.annualIncome)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Investment Experience</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 capitalize">{selectedCustomer.investmentExperience || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Risk Tolerance</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 capitalize">{selectedCustomer.riskTolerance || '—'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                <Shield size={20} className="text-orange-600" />
                Verification & Compliance
              </h3>
              <div className="space-y-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">KYC Status</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(selectedCustomer.kycStatus)}`}>
                      {selectedCustomer.kycStatus?.toUpperCase() || '—'}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">AML Status</p>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusColor(selectedCustomer.amlStatus)}`}>
                      {selectedCustomer.amlStatus?.toUpperCase() || '—'}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wallet size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Wallet Address</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 font-mono break-all">{selectedCustomer.walletAddress || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Registration Date</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCustomer.dateOfRegistration ? new Date(selectedCustomer.dateOfRegistration).toLocaleDateString() : '—'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                <AlertCircle size={20} className="text-red-600" />
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <User size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCustomer.emergencyContactName || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCustomer.emergencyContactPhone || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Relation</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCustomer.emergencyContactRelation || '—'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                <AlertCircle size={20} className="text-indigo-600" />
                Additional Information
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Shield size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Referral Code</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 font-mono">{selectedCustomer.referralCode || '—'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Notes</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200">{selectedCustomer.notes || 'No notes available'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Customer ID: <span className="font-mono">{selectedCustomer.id}</span>
            </p>
            <Button
              className="px-6 py-2 transition-colors font-medium"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;