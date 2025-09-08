import { Search, FileText } from "lucide-react"

type documents = {
    id: string | number;
    name: string;
    type: string;
};

type Props = {
    project: documents[];
};

export default function Component({ project }: Props) {
    return (
        <div className="mx-auto p-6 custom-border rounded-md">
            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search project"
                    className="w-full pl-10 py-3 border custom-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Document List */}
            <div className="space-y-4">
                {project?.length > 0 ? (
                    project.map((document) => (
                        <div
                            key={document.id}
                            className="flex items-center justify-between p-4 border custom-border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center space-x-3">
                                {/* PDF Icon */}
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                                        <FileText className="h-4 w-4 text-red-600" />
                                    </div>
                                </div>

                                {/* Document Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium truncate">{project.documents}</h3>
                                </div>
                            </div>

                            {/* PDF Label */}
                            <div className="flex-shrink-0">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {document.type}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No project available</p>
                )}
            </div>
        </div>
    );
}
