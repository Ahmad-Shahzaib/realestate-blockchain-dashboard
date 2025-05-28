import ProjectDetailsPage from '@/components/project/ProjectDetailsPage'

export default function ProjectPage({ params }: { params: { projectId: string } }) {
    return <ProjectDetailsPage projectId={params.projectId} />
}
