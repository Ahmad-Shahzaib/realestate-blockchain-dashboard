import React from 'react'
import { Metadata } from 'next'
import DocumentsSummary from './DocumentsSummary';
export const metadata: Metadata = {
    title: "Explore Investment"
};



const page = () => {
    return (
        <div className='p-2'>
            <DocumentsSummary />
        </div>
    )
}

export default page