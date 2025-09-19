import React from 'react'
import { Metadata } from 'next'
import PersonalDetails from '@/app/settings/PersonalDetails'


const page = () => {
    return (
        <div className='py-4 px-6'>
            <PersonalDetails />
        </div>
    )
}

export default page