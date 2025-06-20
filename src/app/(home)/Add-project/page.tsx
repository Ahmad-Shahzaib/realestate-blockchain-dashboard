import { Metadata } from 'next';
import { useState } from 'react';
import GlobeResidencyForm from '../_components/overview-cards/GlobeResidencyPage';


export const metadata: Metadata = {
    title: "Add Projects",
};

const page = () => {
    return (
        <div>
            <GlobeResidencyForm />
        </div>
    )
}

export default page