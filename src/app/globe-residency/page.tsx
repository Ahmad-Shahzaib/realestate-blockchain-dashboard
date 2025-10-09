"use client";
import GlobeResidencyFormUI from "../home2/_components/overview-cards/GlobeResidencyPage";
import React, { useEffect } from 'react'

import { Metadata } from "next";
import { useAppDispatch } from '@/redux/hooks';
import { fetchCustomers } from '@/redux/reducers/customerslice/customerSlice';

export default function GlobeResidencyPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCustomers({ page: 1, limit: 50, search: '', status: '' }));
  }, [dispatch]);
  return (
    <div className="container mx-auto py-8 bg-white dark:bg-dark">
      <GlobeResidencyFormUI />
    </div>
  );
}
