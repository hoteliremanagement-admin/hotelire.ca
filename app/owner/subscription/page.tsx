"use client";

import { OwnerLayout } from "@/components/owner/OwnerLayout";
import { SubscriptionSection } from "@/components/owner/SubscriptionSection";
import StripeProvider from "@/components/StripeProvider";

export default function     () {

    return (
        <>

            <OwnerLayout hideStripeAlert={true}>

                <div className="mt-2 ms-2 me-2 max-w-[1400px]">
                    <StripeProvider>
                        <SubscriptionSection />
                    </StripeProvider>
                </div>
            </OwnerLayout>
        </>
    );
}
