import React, { useState } from 'react';

type AccordionItem = {
    question: string;
    answer: string;
};

const faqData: AccordionItem[] = [
    {
        question: "What is Qube's location advantage?",
        answer: "Qube is located just 3 minutes from Allama Iqbal International Airport, making it a prime destination for businesses and residents.",
    },
    {
        question: "Is Qube open to residential or commercial clients?",
        answer: "Qube serves both residential and commercial purposes, providing flexible solutions tailored to individual and business needs.",
    },
    {
        question: "What amenities are offered at Qube?",
        answer: "Amenities include high-speed internet, dedicated workspaces, cafes, meeting rooms, and green recreational areas.",
    },
    {
        question: "Can I schedule a site visit?",
        answer: "Yes, you can schedule a site visit by contacting our support or filling the form available on our website.",
    },
    {
        question: "Is there parking available?",
        answer: "Yes, Qube offers ample parking for residents, visitors, and staff.",
    },
    {
        question: "Are there investment opportunities?",
        answer: "Yes, Qube welcomes investors and offers tailored opportunities. Contact us for more information.",
    },
];

const FaqAccordion: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className=" mx-auto p-6 custom-border ">
            <h2 className="text-3xl font-bold  mb-2 ">FAQs</h2>
            <p className="  mb-8">
                What people frequently ask! The set-up is designed with a keen focus on empowering neighborhood & more specialists.
            </p>

            <div className="space-y-4">
                {faqData.map((item, index) => (
                    <div key={index} className="custom-border rounded-xl overflow-hidden shadow-sm">
                        <button
                            onClick={() => toggle(index)}
                            className="w-full text-left p-4 font-medium flex justify-between items-center 
                                 hover:bg-gray-100 transition"
                        >
                            {item.question}
                            <svg
                                className={`w-5 h-5 transition-transform duration-200 ${openIndex === index ? 'transform rotate-180' : ''
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
                        {openIndex === index && (
                            <div className="p-4 text-gray-600 bg-white border-t border-gray-200">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FaqAccordion;
