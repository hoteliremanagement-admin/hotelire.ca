"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faCreditCard,
  faSave,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { OwnerLayout } from "@/components/owner/OwnerLayout";
import OwnerStripeStatus from "../components/OwnerStripeStatus";
import { SubscriptionSection } from "@/components/owner/SubscriptionSection";
import StripeProvider from "@/components/StripeProvider";
import OwnerSubscriptionDetails from "@/components/owner/OwnerSubscriptionDetails";
import Profile from "@/components/Profile";

type TabType = "profile" | "notifications" | "payout";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Profile state
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Owner",
    email: "john.owner@hotelire.com",
    phone: "+1 (555) 123-4567",
    company: "Hotelire Properties Inc.",
    address: "123 Main Street",
    city: "Toronto",
    state: "Ontario",
    zip: "M5V 1A1",
    country: "Canada",
  });

  const tabs = [
    { id: "profile" as TabType, label: "Profile", icon: faUser },
    { id: "notifications" as TabType, label: "Subscription Status", icon: faCreditCard },
    { id: "payout" as TabType, label: "Payout", icon: faCreditCard },
  ];

  useEffect(() => {
    if (activeTab === "payout") {
      fetchPayoutDetails();
    }
  }, [activeTab]);

 
  const [payout, setPayout] = useState({
    isConnected: false,
  });


  const fetchPayoutDetails = async () => {
    try {
      const response = await fetch(`${baseUrl}/payout/details`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setPayout({
          isConnected: Boolean(data.payout.stripeConnectAccountId),
        });
      }
    } catch (err) {
      console.error("Error fetching payout details:", err);
    }
  };



  const handleStripeConnect = async () => {
    try {
      const response = await fetch(`${baseUrl}/payout/connect`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url; // Redirect to Stripe
      }
    } catch (err) {
      console.error("Stripe connect error:", err);
    }
  };


  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold text-[#59A5B2]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your account preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === tab.id
                    ? "text-[#59A5B2] border-b-2 border-[#59A5B2] -mb-px"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  data-testid={`tab-${tab.id}`}
                >
                  <FontAwesomeIcon icon={tab.icon} className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
             <>
             <Profile/>
             
             </>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
         
              <>
                <div className="mt-4">
                  <OwnerSubscriptionDetails />

                </div>
              </>
            )}





            {activeTab === "payout" && (

              <>
                <div className="space-y-6">
                  <div className="bg-[#59A5B2]/10 border border-[#59A5B2]/20 rounded-xl p-4">
                    <p className="text-sm text-[#59A5B2]">
                      Connect your Stripe account to receive payments from customers.
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-white">
                        Stripe Connection Status
                      </h4>
                      <p className="text-sm text-gray-500">
                        {payout.isConnected ? "Connected to Stripe" : "Not connected"}
                      </p>
                    </div>

                    <button
                      onClick={handleStripeConnect}
                      className="px-5 py-2 rounded-xl bg-[#59A5B2] text-white hover:bg-[#4b94a3]"
                    >
                      {payout.isConnected ? "Manage Stripe Account" : "Connect with Stripe"}
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <OwnerStripeStatus />
                </div>


             
              </>
            )}
















          

              {/* Save Button */ }
              < div className="flex justify-end mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">


          </div>






        </div>
      </div>
    </div>
    </OwnerLayout >
  );
}
