"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, MapPin, Calendar, Users } from "lucide-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import router from "next/router";

interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface BookingData {
  property: {
    id: number;
    name: string;
    location: string;
    image: string;
  };
  dates: {
    checkIn: string;
    checkOut: string;
    nights: number;
  };
  guests: {
    adults: number;
    children: number;
  };
  rooms: Array<{
    id: number;
    name: string;
    quantity: number;
    pricePerNight: number;
    total: number;
  }>;
  pricing: {
    subtotal: number;
    taxes: number;
    total: number;
  };
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export default function BookingSummaryPage() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const raw = localStorage.getItem("booking_summary");
    if (!raw) return;

    setBookingData(JSON.parse(raw));
  }, []);

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading booking summary...</p>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!guestInfo.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!guestInfo.lastName.trim())
      newErrors.lastName = "Last name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!guestInfo.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(guestInfo.email))
      newErrors.email = "Invalid email";

    if (!guestInfo.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGuestInfo((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!stripe || !elements) return;

    setIsSubmitting(true);

    // 1️⃣ Create PaymentIntent
    const res = await fetch("/api/stripe/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: bookingData.pricing.total * 100, // cents
      }),
    });

    const { clientSecret } = await res.json();

    // 2️⃣ Confirm card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: `${guestInfo.firstName} ${guestInfo.lastName}`,
          email: guestInfo.email,
        },
      },
    });

    if (result.error) {
      alert(result.error.message);
      setIsSubmitting(false);
      return;
    }

    if (result.paymentIntent?.status === "succeeded") {
      console.log("PAYMENT SUCCESS");

      // 🔐 TODO:
      // Save booking to DB here

      router.push(`/customer/hotel/${bookingData.property.id}/confirmation`);
    }

    setIsSubmitting(false);
  };

  const isFormValid =
    guestInfo.firstName &&
    guestInfo.lastName &&
    guestInfo.email &&
    guestInfo.phone &&
    Object.keys(errors).length === 0;
  const stripe = useStripe();
  const elements = useElements();

  return (
    <div className="bg-gray-50 w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />

      {/* Main Content */}
      <div className="flex-1 w-full px-4 md:px-8 lg:px-[203px] py-8 md:py-12">
        <div className="mb-8">
          <h1
            className="text-[28px] md:text-[36px] font-bold text-[#59A5B2] mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Complete Your Booking
          </h1>
          <p
            className="text-gray-600 text-sm md:text-base"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Review your details and finalize your reservation
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Guest Information Section */}
              <Card className="p-6 md:p-8">
                <h2
                  className="text-[20px] font-bold text-[#59A5B2] mb-6"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Guest Information
                </h2>

                <div className="space-y-5">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={guestInfo.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className={`w-full px-4 py-3 rounded-lg border text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent transition-all ${
                        errors.firstName
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 bg-white"
                      }`}
                      data-testid="input-first-name"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={guestInfo.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className={`w-full px-4 py-3 rounded-lg border text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent transition-all ${
                        errors.lastName
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 bg-white"
                      }`}
                      data-testid="input-last-name"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={guestInfo.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-3 rounded-lg border text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent transition-all ${
                        errors.email
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 bg-white"
                      }`}
                      data-testid="input-email"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={guestInfo.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className={`w-full px-4 py-3 rounded-lg border text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent transition-all ${
                        errors.phone
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 bg-white"
                      }`}
                      data-testid="input-phone"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Payment Section */}
              <Card className="p-6 md:p-8">
                <div className="mb-6">
                  <h2
                    className="text-[20px] font-bold text-[#59A5B2] mb-2"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Secure Payment
                  </h2>
                  <p
                    className="text-gray-600 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Your card will only be used to guarantee your booking
                  </p>
                </div>

  {/* Card Brand Icons */}
<div className="flex items-center gap-3 mb-6 text-gray-500 text-xs">
  <span>We accept</span>
  <img src="/cards/visa-svgrepo-com.svg" className="h-10" alt="Visa" />
  <img src="/cards/mastercard-svgrepo-com.svg" className="h-10" alt="Mastercard" />
  <img src="/cards/amex-svgrepo-com.svg" className="h-10" alt="Amex" />
  <img src="/cards/discover-svgrepo-com.svg" className="h-10" alt="Discover" />
</div>



                {/* Stripe Card Element */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4 focus-within:ring-2 focus-within:ring-[#59A5B2] transition-all">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#1f2937",
                          fontFamily: "Inter, sans-serif",
                          "::placeholder": {
                            color: "#9ca3af",
                          },
                        },
                        invalid: {
                          color: "#dc2626",
                        },
                      },
                    }}
                  />
                </div>

                {/* Security Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p
                    className="text-blue-900 text-sm flex items-center gap-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <span className="text-lg">🔒</span>
                    Your payment information is secure and encrypted
                  </p>
                </div>

                {/* Confirm Payment Button */}
                <Button
                  type="submit"
                  disabled={!stripe || !isFormValid || isSubmitting}
                  className="w-full bg-[#59A5B2] hover:bg-[#4a8f9a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all"
                >
                  {isSubmitting
                    ? "Processing..."
                    : `Confirm & Pay CAD ${bookingData.pricing.total}`}
                </Button>
              </Card>
            </form>
          </div>

          {/* Right Column - Booking Summary (Sticky on Desktop) */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 overflow-hidden">
              {/* Property Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={bookingData.property.image}
                  alt={bookingData.property.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Property Details */}
              <div className="p-6">
                <h3
                  className="text-[18px] font-bold text-[#59A5B2] mb-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {bookingData.property.name}
                </h3>
                <p
                  className="text-gray-600 text-sm flex items-center gap-1 mb-4"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  {bookingData.property.location}
                </p>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Booking Details */}
                <div className="space-y-3 mb-4">
                  {/* Check-in / Check-out */}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#59A5B2] flex-shrink-0 mt-0.5" />
                    <div>
                      <p
                        className="text-xs text-gray-500 font-medium"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Check-in
                      </p>
                      <p
                        className="text-sm font-semibold text-gray-900"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {formatDate(bookingData.dates.checkIn)}
                      </p>
                      <p
                        className="text-xs text-gray-500 font-medium mt-2"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Check-out
                      </p>
                      <p
                        className="text-sm font-semibold text-gray-900"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {formatDate(bookingData.dates.checkOut)}
                      </p>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-[#59A5B2] flex-shrink-0 mt-0.5" />
                    <div>
                      <p
                        className="text-xs text-gray-500 font-medium"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Guests
                      </p>
                      <p
                        className="text-sm font-semibold text-gray-900"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {bookingData.guests.adults}{" "}
                        {bookingData.guests.adults === 1 ? "Adult" : "Adults"}
                        {bookingData.guests.children > 0 && (
                          <>
                            , {bookingData.guests.children}{" "}
                            {bookingData.guests.children === 1
                              ? "Child"
                              : "Children"}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Selected Rooms */}
                <div className="mb-4">
                  <p
                    className="text-xs font-medium text-gray-500 mb-3"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    ROOMS
                  </p>
                  <div className="space-y-2">
                    {bookingData.rooms.map((room) => (
                      <div
                        key={room.id}
                        className="flex justify-between items-center"
                      >
                        <span
                          className="text-sm text-gray-700"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {room.quantity}x {room.name}
                        </span>
                        <span
                          className="text-sm font-semibold text-gray-900"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          CAD {room.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span
                      className="text-sm text-gray-700"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {bookingData.dates.nights} night
                      {bookingData.dates.nights !== 1 ? "s" : ""}
                    </span>
                    <span
                      className="text-sm font-semibold text-gray-900"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      CAD {bookingData.pricing.subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className="text-sm text-gray-700"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      Taxes & Fees
                    </span>
                    <span
                      className="text-sm font-semibold text-gray-900"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      CAD {bookingData.pricing.taxes}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4"></div>

                {/* Total */}
                <div className="bg-[#FEC328] rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span
                      className="text-base font-bold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Total
                    </span>
                    <span
                      className="text-2xl font-bold text-[#59A5B2]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      CAD {bookingData.pricing.total}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <p
                  className="text-xs text-gray-500 text-center"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  You won't be charged until you confirm
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
