import React from 'react'
 import { Metadata } from "next";
import { OverviewCardsGroup } from '../../_components/overview-cards';
import Dashboard from '@/components/Dashboard';

export const metadata: Metadata = {
    title: "Customer Dashboard",
};

const page = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        <div>
          <Dashboard/>
        </div>
    </div>
  )
}

export default page

