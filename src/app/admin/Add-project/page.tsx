"use client";
import React, { useEffect } from 'react'
import GlobeResidencyPage from '../../globe-residency/page'
import { Metadata } from "next";
import { useAppDispatch } from '@/redux/hooks';
import { fetchCustomers } from '@/redux/reducers/customerslice/customerSlice';

// export const metadata: Metadata = {
//   title: "Add Project",
// };

const page = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCustomers({ page: 1, limit: 50, search: '', status: '' }));
  }, [dispatch]);
  return (
    <div>
      <GlobeResidencyPage />
    </div>
  )
}

export default page
