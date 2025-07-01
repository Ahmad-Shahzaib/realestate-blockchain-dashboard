import React from 'react'
import { Metadata } from "next";
import { OverviewCardsGroup } from '../../_components/overview-cards';
export const metadata: Metadata = {
    title: "Customer Projects",
};

const page = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Customer Project Page</h1>
              <OverviewCardsGroup/>

    </div>
  )
}

export default page
