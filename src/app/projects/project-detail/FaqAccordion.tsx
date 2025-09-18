import React, { useState } from 'react';

type FAQ = {
    _id?: string;
    question: string;
    answer: string;
};

const FaqAccordion = ({ project }: { project: { faqs?: FAQ[] } }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // If API gives FAQs, use them; otherwise fallback to empty array
    const faqs: FAQ[] = project?.faqs || [];

    return (
        <div className="mx-auto p-6">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-[#003049] dark:text-white mb-2">
                FAQs
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
                What people frequently ask! The set-up is designed with a keen focus on
                empowering neighborhood & more specialists.
            </p>

            {/* Accordion */}
            <div className="space-y-4">
                {faqs.length > 0 ? (
                    faqs.map((item, index) => (
                        <div
                            key={item._id || index}
                            className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition overflow-hidden bg-white dark:bg-[#1E293B]"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex justify-between items-center p-5 text-left text-lg font-semibold text-[#003049] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                                {item.question}
                                <svg
                                    className={`w-5 h-5 text-[#00B894] transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Answer */}
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index
                                    ? "max-h-40 opacity-100"
                                    : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="p-5 text-gray-600 dark:text-gray-300 bg-white dark:bg-[#0F172A] border-t border-gray-100 dark:border-gray-700">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                        No FAQs available for this project.
                    </p>
                )}
            </div>
        </div>
    );
};

export default FaqAccordion;
