import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Calculator } from 'lucide-react';


export default function QubeLahore() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Qube Lahore Section */}
            <div className="lg:col-span-2 bg-background rounded-xl shadow-sm border border-themebgColor p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-bold text-black mb-4">Qube Lahore</h3>
                <p className="text-black text-sm lg:text-base mb-6 leading-relaxed">
                    Qube harmoniously inculcates a secure environment, equipped with all the principal features that prompt an integrated lifestyle. This project has been well constructed with amenities that offer luxury and comfort. It functions as a multipurpose, state-of-the-art lifestyle complex, enabling people and businesses to grow. The Corporate offices at Qube encompasses dynamic conditions for maximum productivity. Spanning over 22,000 sqft, it features exceptional rentable and saleable commercial spaces.
                </p>
                <Button className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium">
                    <Download className="w-4 h-4" />
                    Download Handbook
                </Button>
            </div>

            {/* Investment & Rental Returns Section */}
            <div className="bg-background rounded-xl shadow-sm border border-themebgColor p-4 lg:p-6">
                <h3 className="text-lg lg:text-xl font-bold text-black mb-6">Investment & Rental Returns</h3>
                
                <div className="space-y-4">
                    <div className="p-4 bg-background rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-black">
                                Area to Own
                            </label>
                            <span className="text-sm font-medium text-black">
                                @ 28,000 PKR / sq.ft.
                            </span>
                        </div>
                        <Input
                            type="text"
                            placeholder="Enter area..."
                            className="w-full p-3 border border-themebgColor rounded-lg text-sm focus:outline-none"
                        />
                    </div>
                    <Button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium">
                        <Calculator className="w-4 h-4" />
                        Calculate
                    </Button>
                </div>
            </div>
        </div>
    );
}