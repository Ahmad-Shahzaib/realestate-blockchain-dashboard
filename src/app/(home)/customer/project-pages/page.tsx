import React from 'react'
import { Metadata } from "next";
import { OverviewCardsGroup } from '../../_components/overview-cards';
export const metadata: Metadata = {
    title: "Customer Projects",
};

const page = () => {
  return (
    <div>
              <OverviewCardsGroup/>

    </div>
  )
}

export default page
