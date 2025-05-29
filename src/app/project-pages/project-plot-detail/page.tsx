import React from 'react'
import { Metadata } from 'next'
import ProjectDetailsPage from '../project_pages/ProjectDetailsPage';

export const metadata: Metadata = {
    title: "Project Plot Detail"

};


const page = () => {
    return (
        <div><ProjectDetailsPage /></div>
    )
}

export default page