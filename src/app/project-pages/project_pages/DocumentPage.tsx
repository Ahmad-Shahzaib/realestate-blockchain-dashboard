import { Search, FileText } from "lucide-react"
// import { Input } from "@/components/ui/input"

export default function Component() {
    const documents = [
        {
            id: 1,
            title: "Layout Office Floor Plan",
            updatedDate: "Apr 22, 2024",
            type: "PDF",
        },
        {
            id: 2,
            title: "Layout General Arrangement plan",
            updatedDate: "Apr 22, 2024",
            type: "PDF",
        },
        {
            id: 3,
            title: "Building Approval",
            updatedDate: "Apr 23, 2024",
            type: "PDF",
        },
        {
            id: 4,
            title: "Qube Brochure & Layouts",
            updatedDate: "Apr 23, 2024",
            type: "PDF",
        },
        {
            id: 5,
            title: "Declaration - QUBE",
            updatedDate: "Apr 26, 2024",
            type: "PDF",
        },
    ]

    return (
        <div className=" mx-auto p-6 bg-white rounded-md">
            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                    type="text"
                    placeholder="Search Documents"
                    className="w-full pl-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            {/* Document List */}
            <div className="space-y-4">
                {documents.map((document) => (
                    <div
                        key={document.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
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
                                <h3 className="text-sm font-medium text-gray-900 truncate">{document.title}</h3>
                                <p className="text-sm text-gray-500">Updated on {document.updatedDate}</p>
                            </div>
                        </div>

                        {/* PDF Label */}
                        <div className="flex-shrink-0">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {document.type}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
