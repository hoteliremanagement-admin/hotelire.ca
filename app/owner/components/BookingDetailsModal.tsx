"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTimes,
  faUser,
  faPhone,
  faEnvelope,
  faCalendarDays,
  faUsers,
  faDollarSign,
  faBed,
  faDownload,
} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { generateBookingPDF } from "@/lib/pdf-generator"

interface BookingDetails {
  guestName: string
  guestEmail: string
  guestPhone: string
  property: string
  room: string
  checkIn: string
  checkOut: string
  guests: number
  adults: number
  children: number
  amount: number
  nights: number
  status: string
  paymentStatus: string
}

interface BookingDetailsModalProps {
  isOpen: boolean
  booking: BookingDetails | null
  onClose: () => void
}

export function BookingDetailsModal({ isOpen, booking, onClose }: BookingDetailsModalProps) {
   const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  if (!isOpen || !booking) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "text-green-600 bg-green-50 dark:bg-green-900/20"
      case "PENDING":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
      case "CANCELLED":
        return "text-red-600 bg-red-50 dark:bg-red-900/20"
      case "COMPLETED":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20"
    }
  }

    const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      await generateBookingPDF(booking)
    } catch (error) {
      console.error("Failed to generate PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Booking Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Status</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>

          {/* Guest Information */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
              Guest Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-[#59A5B2]" />
                <span className="text-gray-800 dark:text-white font-medium">{booking.guestName}</span>
              </div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-[#59A5B2]" />
                <span className="text-gray-600 dark:text-gray-400">{booking.guestEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-[#59A5B2]" />
                <span className="text-gray-600 dark:text-gray-400">{booking.guestPhone}</span>
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
              Booking Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Property</p>
                <p className="text-gray-800 dark:text-white font-medium">{booking.property}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Room</p>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBed} className="w-4 h-4 text-[#59A5B2]" />
                  <p className="text-gray-800 dark:text-white font-medium">{booking.room}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dates & Guests */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
              Stay Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Check-In</p>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4 text-[#59A5B2]" />
                  <p className="text-gray-800 dark:text-white font-medium">{booking.checkIn}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Check-Out</p>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4 text-[#59A5B2]" />
                  <p className="text-gray-800 dark:text-white font-medium">{booking.checkOut}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Number of Nights</p>
                <p className="text-gray-800 dark:text-white font-medium">
                  {booking.nights} night{booking.nights !== 1 ? "s" : ""}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Guests</p>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUsers} className="w-4 h-4 text-[#59A5B2]" />
                  <p className="text-gray-800 dark:text-white font-medium">
                    {booking.guests} ({booking.adults} adults, {booking.children} children)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
              Payment Information
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Total Amount</p>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faDollarSign} className="w-4 h-4 text-[#FEBC11]" />
                  <p className="text-2xl font-bold text-[#FEBC11]">${booking.amount.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Payment Status</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.paymentStatus)}`}>
                  {booking.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

                {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 sticky bottom-0">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="px-4 py-2 bg-[#59A5B2] hover:bg-[#488a97] disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
            {isGeneratingPDF ? "Generating..." : "Download PDF"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
