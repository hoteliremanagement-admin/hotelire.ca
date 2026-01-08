import React from "react";
import { Footer } from "@/components/Footer";

export default function OwnerTermsPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 py-12 px-4 md:py-16">
        <div className="site-container max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm rounded-xl border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Terms & Conditions of Listing
          </h1>

          <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed">
            <p className="mb-8 font-medium italic text-gray-600">
              Please read carefully. By clicking “Agree & Continue”, you confirm that you understand and accept all of the following.
            </p>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Eligibility & Compliance</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800">1.1 Legal Owner or Authorized Agent</h3>
                  <p>You warrant that you are either the legal owner of the property, or you have full legal authorization to list the property for short-term rental.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">1.2 Applicable Laws & Regulations</h3>
                  <p>You must comply with all relevant provincial and municipal laws, by-laws and regulations including, but not limited to:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>The Residential Tenancies Act, 2006 (RTA) where applicable.</li>
                    <li>Municipal short-term rental licensing/registration rules (for example in the City of Toronto you must register if you rent for less than 28 days).</li>
                    <li>Zoning, fire-code, building code, health/safety and condominium bylaws (if applicable).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">1.3 Definition of Short-Stay Rental</h3>
                  <p>For the purpose of these Terms: a “Short-Stay Listing” is a property listed for 1 to 15 (or more) consecutive nights (or such shorter stay as you choose) in return for payment, and is not intended as a long-term lease.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">1.4 Prohibited Listings</h3>
                  <p>You may not use the platform for long-term tenancies (typically &gt; 30 days) unless explicitly permitted. You confirm the property is suitable for short-term stay, meets safety standards and does not contravene your local laws or condominium/corporation rules.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Host Responsibilities</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800">2.1 Accurate Listing Information</h3>
                  <p>You must provide truthful, accurate and complete information about your property, including – but not limited to – address, room count, amenities, safety equipment, accessibility, pricing.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">2.2 Safety & Maintenance</h3>
                  <p>You are responsible for ensuring:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li>Compliance with fire safety (smoke detectors, carbon monoxide detectors, fire extinguisher)</li>
                    <li>Building code and occupancy standards for your municipality</li>
                    <li>Cleanliness, maintenance and safe conditions of the property prior to guest arrival</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">2.3 Guest Interaction & Behaviour</h3>
                  <p>You must establish clear house rules (quiet hours, parties, pets, smoking, damage) and enforce them. You accept responsibility for guest behaviour on your property.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">2.4 Insurance & Liability</h3>
                  <p>You are responsible for securing any appropriate insurance for short-term rental activity (guest stays, damage, liability). HOTELIRE is not responsible for your insurance coverage or guest claims.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Platform Use & Listing Access</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800">3.1 Listing Approval</h3>
                  <p>Your property listing will be subject to platform review. Until approved, the property shall not be shown as “Live”.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">3.2 Independent Payment Relationship</h3>
                  <p>You accept that payments between guests and you occur independently of HOTELIRE. HOTELIRE does not process or store guest payment for your listing, does not act as the payment intermediary and is not liable for payment disputes.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">3.3 Platform Fee & Access</h3>
                  <p>Your access to HOTELIRE’s system (listing, managing bookings, dashboard) is conditional on your subscription payment (and current status). If your subscription lapses, your listing may be deactivated.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">3.4 Monitoring & Compliance</h3>
                  <p>You agree that HOTELIRE may review your listing and related activities and may suspend or remove listings that breach these Terms or local laws.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Guest Bookings & Cancellations</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800">4.1 Booking Terms</h3>
                  <p>You will set check-in/out times, house rules, maximum stay (1–15+ nights), number of guests, pricing and any additional fees (cleaning, extras). Your listing must clearly show these terms.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">4.2 Cancellations</h3>
                  <p>Your cancellation policy must be clearly defined on your listing (e.g., full refund if &gt; 72 hours notice). You agree to honour the policy you publish.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">4.3 Dispute Resolution</h3>
                  <p>In the event of guest complaints or municipal enforcement actions, you agree to cooperate fully and accept responsibility for resolution and costs.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Taxes & Municipal Accommodation Requirements</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800">5.1 Taxes</h3>
                  <p>You are responsible for reporting and remitting applicable taxes on rental income (e.g., HST/GST, income tax) to the proper authorities.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">5.2 Municipal Accommodation Tax (MAT)</h3>
                  <p>In some municipalities (e.g., Toronto), you must collect and remit a Municipal Accommodation Tax on short-term rentals.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">5.3 Licensing & Registration</h3>
                  <p>You must obtain and maintain any license or registration required by your municipality for short-term rental operation. Failure to do so may result in fines and removal of listing.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. Listing Rules & Property Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800">6.1 Maximum Stay</h3>
                  <p>Unless local rules dictate otherwise, guest stays should not exceed 15 days (or as posted) in your listing. You may choose shorter maximums.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">6.2 Sub-letting & Tenancy Laws</h3>
                  <p>If the property is leased to you (not owned), you must have landlord’s written permission. You must ensure your listing does not create a tenancy under the RTA.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">6.3 Condominium/HOA Restrictions</h3>
                  <p>If the property is part of a condominium, townhouse development or homeowners’ association, you must ensure your listing is permitted under the condo/HOA bylaws. You accept responsibility if your listing is in breach.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. Termination, Suspension & Penalties</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-800">7.1 Platform Suspension</h3>
                  <p>HOTELIRE may suspend or remove your listing if you breach these Terms, if municipality fines you, or if guest behaviour causes community complaints.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">7.2 Legal/Regulatory Penalties</h3>
                  <p>You acknowledge that local governments may impose fines or penalties for non-compliance. You remain fully liable and will hold HOTELIRE harmless.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">7.3 Effect of Termination</h3>
                  <p>Upon termination of your access to HOTELIRE you must cease representing the listing as active on HOTELIRE and remove any live bookings through the platform.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">8. Indemnity & Limitation of Liability</h2>
              <p>You agree to indemnify HOTELIRE, its officers, directors and partners against any claim, loss or liability arising from your listing, guest stays, regulatory non-compliance or payment disputes. HOTELIRE’s liability to you is strictly limited to platform fees you paid in the prior 30 days; HOTELIRE is not liable for guest damage, non-payment, regulatory fines or lost revenue.</p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p>HOTELIRE may update these Terms at any time. You will be notified by email and you must accept the updated Terms to continue listing.</p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">10. Acceptance</h2>
              <p>By clicking “I agree & Continue”, you confirm you have read, understood and accepted all of the above Terms & Conditions.</p>
            </section>

            <div className="mt-16 pt-8 border-t border-gray-100 text-sm text-gray-500">
              <p>Last updated: {lastUpdated}</p>
              <p>Version: 1.0</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
