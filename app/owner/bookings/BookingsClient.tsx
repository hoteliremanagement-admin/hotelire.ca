"use client";
import React, { useState, useEffect, useMemo } from "react";
import { OwnerLayout } from "@/components/owner/OwnerLayout";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEye,
  faChevronLeft,
  faChevronRight,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import { ErrorModal } from "../components/ErrorModal"
import { BookingDetailsModal } from "../components/BookingDetailsModal"
import { authCheck } from "@/services/authCheck";
import { useSearchParams } from "next/navigation";


interface Booking {
  bookingId: string;
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  property: string;
  room: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  status: string;
  paymentStatus: string;
  adults: number;
  children: number;
  nights: number;
}


const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Bookings() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [errorModal, setErrorModal] = useState({ isOpen: false, title: "", message: "" });
  const [detailsModal, setDetailsModal] = useState<{ isOpen: boolean; booking: Booking | null }>({ isOpen: false, booking: null });
  const [user, setUser] = useState<any>(null);

const searchParams = useSearchParams();

const bookingIdFromUrl = searchParams.get("bookingId");

  useEffect(() => {
    const init = async () => {
      try {
        const authData = await authCheck();
        if (authData?.user) {
          setUser(authData.user);
          await fetchBookings(authData.user.userid);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

 

useEffect(() => {
  if (!bookingIdFromUrl) return;
  if (loading) return;
  if (!bookings || bookings.length === 0) return;

  const normalizedId =
    bookingIdFromUrl.startsWith("BK")
      ? bookingIdFromUrl
      : `BK${bookingIdFromUrl}`;

  const target = bookings.find(
    b =>
      b.id === normalizedId ||
      b.bookingId === normalizedId ||
      String(b.id) === bookingIdFromUrl
  );

  if (target) {
    setDetailsModal({
      isOpen: true,
      booking: target,
    });
  }
}, [bookingIdFromUrl, loading, bookings]);


  const fetchBookings = async (ownerId: number) => {
    try {
      const response = await fetch(`${baseUrl}/owner/bookings/${ownerId}`);
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const result = await response.json();
      if (result.success) {
        setBookings(result.data);
      }
    } catch (err) {
      console.error("Fetch bookings error:", err);
      setErrorModal({
        isOpen: true,
        title: "Error",
        message: "Failed to load bookings from server."
      });
    }
  };

  const filteredData = useMemo(() => {
    let result = [...bookings];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.id.toString().toLowerCase().includes(q) ||
          b.guestName.toLowerCase().includes(q) ||
          b.property.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All") {
      result = result.filter((b) => b.status === statusFilter);
    }
    return result;
  }, [bookings, searchQuery, statusFilter]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <OwnerLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-[#59A5B2] animate-spin" />
        </div>
      </OwnerLayout>
    );
  }

  return (
    <OwnerLayout>
       <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#59A5B2] font-heading">Bookings</h1>
            <p className="text-gray-500 mt-1">Manage all your property bookings</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
           <div className="relative flex-1">
             <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
             <input
               type="text"
               placeholder="Search..."
               className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#59A5B2] outline-none transition-all"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
           <div className="flex gap-2">
             {["All", "CONFIRMED", "COMPLETED"].map(status => (
               <button
                 key={status}
                 onClick={() => setStatusFilter(status)}
                 className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                   statusFilter === status ? "bg-[#59A5B2] text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                 }`}
               >
                 {status}
               </button>
             ))}
           </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700">Booking ID</th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700">Guest</th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700">Property</th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700">Dates</th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700">Amount</th>
                  <th className="py-4 px-4 text-left font-semibold text-gray-700">Status</th>
                  <th className="py-4 px-4 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((booking: any) => (
                  <tr key={booking.id} className={`border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors`}>
                    <td className="py-4 px-4 font-medium text-[#59A5B2]">{booking.id}</td>
                    <td className="py-4 px-4 text-gray-800">{booking.guestName}</td>
                    <td className="py-4 px-4 text-gray-600">{booking.property}</td>
                    <td className="py-4 px-4 text-sm text-gray-500">{booking.checkIn} → {booking.checkOut}</td>
                    <td className="py-4 px-4 font-semibold text-[#FEBC11]">${booking.amount.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => setDetailsModal({ isOpen: true, booking })}
                          className="p-2 text-gray-400 hover:text-[#59A5B2] transition-colors"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                   <tr>
                     <td colSpan={7} className="py-12 text-center text-gray-400">No bookings found.</td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
           <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50/30">
             <span className="text-sm text-gray-500">
               Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
             </span>
             <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
                </button>
             </div>
           </div>
        </div>
       </div>

       <BookingDetailsModal
        isOpen={detailsModal.isOpen}
        booking={detailsModal.booking}
        onClose={() => setDetailsModal({ isOpen: false, booking: null })}
      />
      
       <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
        title={errorModal.title}
        message={errorModal.message}
      />
    </OwnerLayout>
  );
}