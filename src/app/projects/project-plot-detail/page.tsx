import React from 'react'
import { Metadata } from 'next'
import ProjectDetailsPage from '../project-detail/ProjectDetailsPage';

export const metadata: Metadata = {
    title: "Project Plot Detail"

};


const page = () => {
    return (
        <div><ProjectDetailsPage /></div>
    )
}

export default page