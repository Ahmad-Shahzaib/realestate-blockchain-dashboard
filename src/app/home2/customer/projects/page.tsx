import React from 'react'
import { Metadata } from "next";

import { OverviewCard } from '../../_components/overview-cards/card';
export const metadata: Metadata = {
  title: "Customer Projects",
};

const page = () => {
  return (
    <div>
      <OverviewCard />

    </div>
  )
}

export default page
