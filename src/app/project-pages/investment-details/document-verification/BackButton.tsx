"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"
        >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
        </button>
    );
};

export default BackButton;
