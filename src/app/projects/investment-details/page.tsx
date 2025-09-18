import React from 'react'
import { Metadata } from 'next'
import InvestmentInterface from './InvestmentInterface';
import TransactionPage from './TransactionPage';
export const metadata: Metadata = {
    title: "Investment Details"
};

const page = () => {
    return (
        <div className='py-4'>
            <TransactionPage />
            <InvestmentInterface />
        </div>
    )
}

export default page