"use client";
import React from 'react'
import { ProjectCards } from './_components/ProjectCards'

const page = () => {
  return (
    <>
      <div className="p-4">
        <h2 className='text-2xl font-semibold mb-6'>Dashboard</h2>
        <ProjectCards />
      </div>
    </>
  )
}

export default page