import { Search, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"

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
        <div className="mx-auto max-w-2xl p-8 bg-background rounded-xl shadow-sm">
            {/* Search Bar */}
            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
                <Input
                    type="text"
                    placeholder="Search Documents"
                    className="w-full pl-12 py-3 border border-themebgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-themebgColor text-black bg-background text-base placeholder:text-gray-400"
                />
            </div>

            {/* Document List */}
            <div className="space-y-6">
                {documents.map((document) => (
                    <div
                        key={document.id}
                        className="flex items-center justify-between p-5 border border-themebgColor rounded-xl hover:bg-background transition-colors cursor-pointer gap-6"
                    >
                        <div className="flex items-center gap-4">
                            {/* PDF Icon */}
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center border border-themebgColor">
                                    <FileText className="h-5 w-5 text-black" />
                                </div>
                            </div>

                            {/* Document Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-semibold text-black truncate mb-1">{document.title}</h3>
                                <p className="text-sm text-black">Updated on {document.updatedDate}</p>
                            </div>
                        </div>

                        {/* PDF Label */}
                        <div className="flex-shrink-0">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-background text-black border border-themebgColor">
                                {document.type}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
