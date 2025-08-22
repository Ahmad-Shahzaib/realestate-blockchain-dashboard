import React from 'react';

const LocationSection: React.FC = () => {
    return (
        <div className="">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6 lg:p-10">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#003049] mb-4">
                    Located in Plot 59, Block A Divine Gardens, Lahore, Punjab
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    Qube is strategically located at a prime location just 3 minutes’ drive from Allama Iqbal International Airport,
                    making it the most sought-after destination for residents, businesses, and investors. Qube is an establishment
                    envisioned to create a sense of belonging as an idealized addition to the landscape of Lahore.
                </p>

                <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
                    <iframe
                        title="Qube Location Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13621.418092801027!2d74.40000000000001!3d31.503416666666667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919045037bb9e67%3A0x45b37737e927dbf6!2sDivine%20Gardens%2C%20Lahore%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                        className="w-full h-full border-0"
                        loading="lazy"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default LocationSection;
