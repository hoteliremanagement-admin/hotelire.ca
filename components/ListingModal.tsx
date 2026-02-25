"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authCheck } from "@/services/authCheck";

interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ListingModal({ isOpen, onClose }: ListingModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  const handleStartListing = async () => {
    const user = await authCheck();

    if (!user || !user.user) {
      router.push("/customer/signin");
      return;
    }

    const roleId = user.user.roleid;

    if (roleId === 1) {
      toast(
        "You are logged in as an administrator. Please use the Admin Panel to manage the platform.",
        {
          icon: "ℹ️",
          duration: 3500,
        }
      );
      return;
    }

    if (roleId === 3) {
      router.push("/owner/verification");
      return;
    }

    if (roleId === 2) {
      router.push("/owner/overview");
      return;
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-200"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
            isOpen ? "scale-100" : "scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 md:px-8 py-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                List Your Property on Hotelire
              </h2>
              <p className="text-gray-600 mt-1">
                Start earning directly from guests. No middlemen. No hidden charges.
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-4 w-10 h-10 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Section 1: Why List With Us */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Why List With Us?</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Full control over your property & pricing",
                  "Direct payments to your Stripe account",
                  "No commission on bookings",
                  "Transparent monthly pricing",
                  "Unlimited property listings after verification",
                  "24/7 dedicated owner support",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: Simple Process */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-[#3F2C77]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Simple Process</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { step: 1, title: "Verify Yourself", desc: "One-time verification" },
                  { step: 2, title: "Add Properties", desc: "Unlimited listings" },
                  { step: 3, title: "Connect Stripe", desc: "Payment account" },
                  { step: 4, title: "Receive Payments", desc: "Direct deposits" },
                ].map((item) => (
                  <div key={item.step} className="relative">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center border border-blue-100">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[#3F2C77] text-white flex items-center justify-center font-bold text-sm">
                        {item.step}
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-blue-900">Direct Payments:</span> Guests pay the full amount directly to your Stripe account. We do not hold your money.
                </p>
              </div>
            </section>

            {/* Section 3: Transparent Pricing */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Transparent Pricing</h3>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                  <div className="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    Flat Pricing – No Commission
                  </div>
                  <div className="mb-4">
                    <p className="text-4xl md:text-5xl font-bold text-gray-900">
                      $10 <span className="text-xl md:text-2xl text-gray-600 font-semibold">/month</span>
                    </p>
                    <p className="text-gray-600 mt-2">CAD</p>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "No commission per booking",
                      "No hidden charges",
                      "Cancel anytime",
                      "Keep 100% of your booking revenue",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-green-600 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-900 font-medium">{item}</span>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Trust Badge */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Secure Stripe Payments</p>
                <p className="text-sm text-gray-600 mt-1">
                  Designed for independent property owners who want full control over their business and earnings.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 md:px-8 py-4 flex gap-3 sm:flex-row flex-col">
            <Button
              onClick={handleStartListing}
              className="flex-1 px-6 py-3 bg-[#3F2C77] hover:bg-[#2a1c5a] text-white font-bold rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              Start Listing Now
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-900 hover:bg-gray-100 font-semibold rounded-lg transition-all duration-200"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
