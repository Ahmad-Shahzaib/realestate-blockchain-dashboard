import React from 'react'
import DAOListings from './DaoListing'
import Rentals from './RentalPage'
import QubeLahore from './QubePage'
import LocationSection from './LocationSection'
import DocumentPage from './DocumentPage'
import FaqAccordion from './FaqAccordion'

const ProjectTable = () => {
    return (
        <div className='space-y-2'>
            <div className='w-full mx-auto bg-white rounded-lg overflow-hidden shadow-md p-4'>
                <ul className="flex w-full">
                    <li className="flex-1 text-center">Live Orders</li>
                    <li className="flex-1 text-center">Key Ideal Points</li>
                    <li className="flex-1 text-center">Rentals</li>
                    <li className="flex-1 text-center">Calculate Rentals</li>
                    <li className="flex-1 text-center">Documents</li>
                    <li className="flex-1 text-center">Stats.</li>
                    <li className="flex-1 text-center">Investors</li>
                    <li className="flex-1 text-center">FAQs</li>
                </ul>
            </div>
            <div className='flex justify-between space-x-3'>
                <DAOListings />
                <Rentals />
            </div>
            <div>
                <QubeLahore />
            </div>
            <div className='flex justify-between space-x-3'>
                <LocationSection />
                <DocumentPage />
            </div>
            <div>
                <FaqAccordion />
            </div>
        </div>


    )
}

export default ProjectTable