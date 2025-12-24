"use client";
import React from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  MapPin,
  Calendar,
  Users,
  Phone,
  Mail,
  MessageSquare,
  Star,
  Printer,
  Home,
  Info,
  MessageCircle,
  Headset,
} from "lucide-react";

// Mock confirmation data
const CONFIRMATION_DATA = {
  confirmationId: "HTL00047",
  guestEmail: "guest@example.com",
  property: {
    name: "Luxury Beachfront Resort",
    location: "Miami, Florida",
    address: "1234 Ocean Drive, Miami, FL 33139",
    image:
      "https://images.unsplash.com/photo-1571896837934-ffe2023ba5da?w=800&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 2314,
    phone: "+1 (305) 555-0123",
  },
  booking: {
    checkIn: "Dec 26, 2024",
    checkInTime: "3:00 PM",
    checkOut: "Dec 29, 2024",
    checkOutTime: "11:00 AM",
    nights: 3,
    guests: {
      adults: 2,
      children: 1,
    },
  },
  rooms: [
    {
      id: 1,
      name: "Ocean View Suite",
      type: "Suite",
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=150&fit=crop",
      pricePerNight: 299,
      total: 897,
    },
    {
      id: 2,
      name: "Deluxe Double Room",
      type: "Double",
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1578926078328-123f5e4a8003?w=200&h=150&fit=crop",
      pricePerNight: 199,
      total: 1194,
    },
  ],
  pricing: {
    roomCharges: 2091,
    taxes: 261,
    total: 2352,
    paymentMethod: "Stripe",
  },
};

export default function BookingConfirmationPage() {
  const data = CONFIRMATION_DATA;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-gray-50 w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />

      {/* Main Content */}
      <div className="flex-1 w-full px-4 md:px-8 lg:px-[203px] py-8 md:py-12">
        {/* Success Header */}
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1
            className="text-[32px] md:text-[40px] font-bold text-gray-900 mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Your booking is confirmed
          </h1>
          <p
            className="text-lg text-gray-600 mb-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Confirmation ID:{" "}
            <span className="font-semibold text-[#59A5B2]">
              {data.confirmationId}
            </span>
          </p>
          <p
            className="text-sm text-gray-600"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            We've sent a confirmation email to{" "}
            <span className="font-semibold">{data.guestEmail}</span>
          </p>
          <p
            className="text-sm text-gray-500 mt-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Payment receipt will be sent via Stripe
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Card */}
            <Card className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-4 mb-6">
                <div className="flex-1">
                  <h2
                    className="text-[24px] font-bold text-[#59A5B2] mb-2"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {data.property.name}
                  </h2>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1 bg-yellow-400 text-gray-900 px-2 py-1 rounded-md">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-sm">
                        {data.property.rating}
                      </span>
                    </div>
                    <span
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      ({data.property.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>
                  <p
                    className="text-gray-600 flex items-center gap-1 mb-3"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <MapPin className="w-4 h-4 text-[#59A5B2] flex-shrink-0" />
                    {data.property.address}
                  </p>
                  <button
                    className="text-[#59A5B2] hover:text-[#4a8f9a] text-sm font-medium transition-colors"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Show directions →
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Booking Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Check-in */}
                <div>
                  <p
                    className="text-xs font-medium text-gray-500 mb-2"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    CHECK-IN
                  </p>
                  <p
                    className="text-lg font-semibold text-gray-900 mb-1"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {data.booking.checkIn}
                  </p>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    From {data.booking.checkInTime}
                  </p>
                </div>

                {/* Check-out */}
                <div>
                  <p
                    className="text-xs font-medium text-gray-500 mb-2"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    CHECK-OUT
                  </p>
                  <p
                    className="text-lg font-semibold text-gray-900 mb-1"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {data.booking.checkOut}
                  </p>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Until {data.booking.checkOutTime}
                  </p>
                </div>
              </div>

              {/* Guests Info */}
              <div className="flex items-center gap-3 text-gray-700 mb-6">
                <Users className="w-5 h-5 text-[#59A5B2] flex-shrink-0" />
                <span style={{ fontFamily: "Inter, sans-serif" }}>
                  {data.booking.guests.adults}{" "}
                  {data.booking.guests.adults === 1 ? "Adult" : "Adults"}
                  {data.booking.guests.children > 0 && (
                    <>
                      , {data.booking.guests.children}{" "}
                      {data.booking.guests.children === 1
                        ? "Child"
                        : "Children"}
                    </>
                  )}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Room Details Section */}
              <div className="mb-6">
                <h3
                  className="text-lg font-bold text-[#59A5B2] mb-4"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Your room details
                </h3>
                <div className="space-y-4">
                  {data.rooms.map((room) => (
                    <div
                      key={room.id}
                      className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
                    >
                      <div className="w-24 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className="font-semibold text-gray-900 mb-1"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {room.name}
                        </p>
                        <p
                          className="text-sm text-gray-600 mb-2"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {room.type} • Qty: {room.quantity}
                        </p>
                        <p
                          className="text-sm font-semibold text-gray-900"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          CAD {room.total}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Contact Property Section */}
              <div>
                <h3
                  className="text-lg font-bold text-[#59A5B2] mb-4"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Contact property
                </h3>
                <p
                  className="text-gray-700 mb-4 flex items-center gap-2"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <Phone className="w-5 h-5 text-[#59A5B2] flex-shrink-0" />
                  {data.property.phone}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-[#59A5B2] text-[#59A5B2] rounded-lg hover:bg-blue-50 transition-colors font-medium"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <MessageSquare className="w-4 h-4" />
                    Send a message
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-[#59A5B2] text-[#59A5B2] rounded-lg hover:bg-blue-50 transition-colors font-medium"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    <Mail className="w-4 h-4" />
                    Send an email
                  </button>
                </div>
                <p
                  className="flex items-center gap-2 text-sm text-gray-600"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <Headset className="w-4 h-4 text-[#59A5B2]" />
                  Please feel free to get in touch if you need further
                  assistance.
                </p>
              </div>
            </Card>
          </div>

          {/* Right Column - Summary Card (Sticky on Desktop) */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 overflow-hidden">
              {/* Property Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img
                  src={data.property.image}
                  alt={data.property.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Summary Content */}
              <div className="p-6">
                <h3
                  className="text-lg font-bold text-[#59A5B2] mb-4"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Your stay
                </h3>

                {/* Dates */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 text-[#59A5B2] flex-shrink-0" />
                    <span style={{ fontFamily: "Inter, sans-serif" }}>
                      {data.booking.checkIn} - {data.booking.checkOut}
                    </span>
                  </div>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {data.booking.nights} night
                    {data.booking.nights !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span style={{ fontFamily: "Inter, sans-serif" }}>
                      Room charges
                    </span>
                    <span
                      className="font-semibold"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      CAD {data.pricing.roomCharges}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span style={{ fontFamily: "Inter, sans-serif" }}>
                      Taxes & fees
                    </span>
                    <span
                      className="font-semibold"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      CAD {data.pricing.taxes}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-[#FEC328] rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span
                      className="font-semibold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Total paid
                    </span>
                    <span
                      className="text-2xl font-bold text-[#59A5B2]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      CAD {data.pricing.total}
                    </span>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                  <p
                    className="text-sm text-green-900 font-medium"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    ✓ Paid via {data.pricing.paymentMethod}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handlePrint}
                    className="w-full bg-[#59A5B2] hover:bg-[#4a8f9a] text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                    data-testid="button-print-confirmation"
                  >
                    <Printer className="w-4 h-4" />
                    Print confirmation
                  </Button>
                  <button
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    data-testid="button-back-home"
                  >
                    Back to home
                  </button>
                </div>
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
