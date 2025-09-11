import { Metadata } from "next";
import PledgeStatus from "./PledgeStatus";
import PaymentSteps from "./PaymentSteps";

export const metadata: Metadata = {
    title: "Document Verification",
};

export default function Page() {
    return (
        <div className="py-5 space-y-3">
            <PledgeStatus />
            <PaymentSteps />
        </div>
    );
}
