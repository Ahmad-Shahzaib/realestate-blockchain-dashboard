import React from 'react'
import GlobeResidencyPage from '../../globe-residency/page'
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Add Project",
};

const page = () => {
  return (
    <div>
      <GlobeResidencyPage/>
    </div>
  )
}

export default page
