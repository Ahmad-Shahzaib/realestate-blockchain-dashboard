import React, { useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import DAOListings from './DaoListing'
import Rentals from './RentalPage'
import QubeLahore from './QubePage'
import LocationSection from './LocationSection'
import DocumentPage from './DocumentPage'
import FaqAccordion from './FaqAccordion'

const ProjectTable = () => {
    const [activeTab, setActiveTab] = useState('liveOrders');

    const tabs = [
        { id: 'liveOrders', label: 'Live Orders' },
        { id: 'keyPoints', label: 'Key Ideal Points' },
        { id: 'rentals', label: 'Rentals' },
        { id: 'calculate', label: 'Calculate Rentals' },
        { id: 'documents', label: 'Documents' },
        { id: 'stats', label: 'Stats' },
        { id: 'investors', label: 'Investors' },
        { id: 'faqs', label: 'FAQs' }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'liveOrders':
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <DAOListings />
                        <Rentals />
                    </div>
                );
            case 'keyPoints':
                return <QubeLahore />;
            case 'rentals':
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <Rentals />
                        <div className="bg-background rounded-xl shadow-sm  p-4 lg:p-6">
                            <h3 className="text-lg lg:text-xl font-bold text-black mb-4">Investment Calculator</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-background rounded-lg border border-themebgColor">
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Area to Own (sq. ft.)
                                    </label>
                                    {/* Use Input from components/ui */}
                                    <Input
                                        type="number"
                                        placeholder="Enter area..."
                                        className="w-full text-black border-themebgColor bg-background focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                                <div className="p-4 bg-background rounded-lg border border-themebgColor">
                                    <div className="text-sm text-black mb-1">Price per sq. ft.</div>
                                    <div className="text-xl font-bold text-black">28,000 PKR</div>
                                </div>
                                {/* Use Button from components/ui */}
                                <Button className="w-full bg-background text-black border border-themebgColor font-medium">
                                    Calculate Investment
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 'calculate':
                return (
                    <div className="bg-background rounded-xl shadow-sm  p-4 lg:p-6">
                        <h3 className="text-lg lg:text-xl font-bold text-black mb-6">Calculate Rentals</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Investment Amount (PKR)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter investment amount..."
                                        className="w-full p-3 border border-themebgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Area (sq. ft.)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter area..."
                                        className="w-full p-3 border border-themebgColor rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                                    />
                                </div>
                                <button className="w-full bg-background text-black py-3 rounded-lg border border-themebgColor transition-colors font-medium">
                                    Calculate Returns
                                </button>
                            </div>
                            <div className="bg-background rounded-lg p-4">
                                <h4 className="font-semibold text-black mb-4">Estimated Returns</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-black">Monthly Rental:</span>
                                        <span className="font-semibold">-- PKR</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-black">Yearly Rental:</span>
                                        <span className="font-semibold">-- PKR</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-black">ROI:</span>
                                        <span className="font-semibold">--%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'documents':
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <LocationSection />
                        <DocumentPage />
                    </div>
                );
            case 'stats':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg lg:text-xl font-bold text-black mb-2">Project Statistics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Card for Occupancy Rate */}
                            <Card className="text-center border-themebgColor">
                                <CardHeader>
                                    <CardTitle>95%</CardTitle>
                                    <CardDescription>Occupancy Rate</CardDescription>
                                </CardHeader>
                            </Card>
                            {/* Card for Total Investors */}
                            <Card className="text-center border-themebgColor">
                                <CardHeader>
                                    <CardTitle>1,250</CardTitle>
                                    <CardDescription>Total Investors</CardDescription>
                                </CardHeader>
                            </Card>
                            {/* Card for Total Area */}
                            <Card className="text-center border-themebgColor">
                                <CardHeader>
                                    <CardTitle>22K</CardTitle>
                                    <CardDescription>Total Area (sq. ft.)</CardDescription>
                                </CardHeader>
                            </Card>
                            {/* Card for Average Yield */}
                            <Card className="text-center border-themebgColor">
                                <CardHeader>
                                    <CardTitle>5.1%</CardTitle>
                                    <CardDescription>Average Yield</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                        <Card className="mt-6 h-64 flex items-center justify-center border-themebgColor">
                            <CardContent className="flex flex-col items-center justify-center">
                                <div className="text-black mb-2 text-2xl">📊</div>
                                <p className="text-black font-semibold">Interactive Chart</p>
                                <p className="text-sm text-muted-foreground">Performance Analytics</p>
                            </CardContent>
                        </Card>
                    </div>
                );
            case 'investors':
                return (
                    <div className="bg-background rounded-xl shadow-sm  p-4 lg:p-6">
                        <h3 className="text-lg lg:text-xl font-bold text-black mb-6">Top Investors</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Ahmed Khan', investment: '2,500,000', area: '89.3 sq. ft.', returns: '12.5%' },
                                { name: 'Sarah Ahmed', investment: '1,800,000', area: '64.3 sq. ft.', returns: '11.2%' },
                                { name: 'Usman Ali', investment: '1,200,000', area: '42.9 sq. ft.', returns: '10.8%' },
                                { name: 'Fatima Sheikh', investment: '950,000', area: '33.9 sq. ft.', returns: '9.7%' }
                            ].map((investor, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border border-themebgColor rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                                            <span className="text-black font-semibold">{investor.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-black">{investor.name}</div>
                                            <div className="text-sm text-black">{investor.area}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-black">{investor.investment} PKR</div>
                                        <div className="text-sm text-black">+{investor.returns}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'faqs':
                return <FaqAccordion />;
            default:
                return (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <DAOListings />
                        <Rentals />
                    </div>
                );
        }
    };

    return (
        <div className="space-y-6">
            {/* Dynamic Tabs Navigation */}
            <Tabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                className="mb-0"
            />

            {/* Tab Content */}
            <div>
                {renderTabContent()}
            </div>
        </div>
    )
}

export default ProjectTable