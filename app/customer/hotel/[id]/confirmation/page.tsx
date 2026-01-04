// "use client"

// import { useEffect, useState } from "react"
// import { useParams, useSearchParams } from "next/navigation"
// import { Header } from "@/components/Header"
// import { Navigation } from "@/components/Navigation"
// import { Footer } from "@/components/Footer"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { CheckCircle, MapPin, Calendar, Users, Mail, MessageSquare, Printer, AlertCircle, Loader, Headset } from "lucide-react"
// import { useRouter } from "next/navigation";
// import { authCheck } from "@/services/authCheck";

// interface BookingConfirmationData {
//   confirmationId: string
//   booking: {
//     bookingId: number
//     status: string
//     createdAt: string
//   }
//   User: {
//     firstName: string
//     lastName: string
//     email: string
//     phone: string
//   }
//   property: {
//     id: number
//     name: string
//     subtitle: string
//     address: string
//     postalCode: string
//     image: string
//     checkInTime: string
//     checkOutTime: string
//     propertymaplink: string
//     firstName: string
//     lastName: string
//     email: string
//     phoneno: string

//   }
//   dates: {
//     checkIn: string
//     checkOut: string
//     nights: number
//   }
//   guests: {
//     adults: number
//     children: number
//     total: number
//   }
//   rooms: Array<{
//     bookingRoomId: number
//     roomId: number
//     roomName: string
//     roomType: string
//     roomImage: string
//     quantity: number
//     pricePerNight: string
//     subtotal: string
//     pic1: string
//   }>
//   payment: {
//     total: string
//     currency: string
//     paymentStatus: string
//     paymentMethod: string
//   }
// }

// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ""

// export default function BookingConfirmationPage() {
//     const router = useRouter();
//   const searchParams = useSearchParams()
//   const bookingId = searchParams.get("bookingId")
//   const [data, setData] = useState<BookingConfirmationData | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const formatDate1 = (isoString: string) => {
//     const date = new Date(isoString);
//     return date.toLocaleDateString("en-CA", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//     useEffect(() => {

//       const logincheck = async () => {
//         const user = await authCheck();

//         console.log("user from /auth/me is: ", user);

//         if (!user) {
//           router.push(`/customer/signin`)
//         }
//       }
//       logincheck();

//     }, [])

//   useEffect(() => {
//     console.log("response ", bookingId)
//     if (!bookingId) return
//     const fetchBookingDetails = async () => {
//       console.log("response ")
//       try {
//         setLoading(true)
//         const response = await fetch(`${baseUrl}/booking/details/${bookingId}`)
//         console.log("response ", response)

//         if (!response.ok) {
//           throw new Error("Failed to fetch booking details")
//         }

//         const result = await response.json()
//         if (result.success) {
//           console.log("result.data", result.data)
//           setData(result.data)
//         } else {
//           setError("Could not load booking confirmation")
//         }
//       } catch (err) {
//         console.error("Error fetching booking:", err)
//         setError(err instanceof Error ? err.message : "Failed to load confirmation")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchBookingDetails()

//   }, [bookingId])

//   const handlePrint = () => {
//     window.print()
//   }

//   if (loading) {
//     return (
//       <div className="bg-gray-50 w-full flex flex-col min-h-screen">
//         <Header />
//         <Navigation />
//         <div className="flex-1 flex items-center justify-center">
//           <Loader className="w-8 h-8 text-[#59A5B2] animate-spin" />
//         </div>
//         <Footer />
//       </div>
//     )
//   }

//   if (error || !data) {
//     return (
//       <div className="bg-gray-50 w-full flex flex-col min-h-screen">
//         <Header />
//         <Navigation />

//         <div className="flex-1 flex items-center justify-center px-4 pt-8 pb-16">
//           <Card className="p-8 max-w-md">
//             <div className="flex justify-center mb-4">
//               <AlertCircle className="w-12 h-12 text-red-500" />
//             </div>
//             <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Error Loading Confirmation</h2>
//             <p className="text-gray-600 text-center mb-6">{error || "The booking confirmation could not be loaded."}</p>
//             <Button className="w-full bg-[#59A5B2] hover:bg-[#4a8f9a] text-white">Back to Home</Button>
//           </Card>
//         </div>

//         <Footer />
//       </div>
//     )
//   }

//   return (
//     <div className="bg-gray-50 w-full flex flex-col min-h-screen">
//       <Header />
//       <Navigation />

//       {/* Main Content */}
//       <div className="flex-1 w-full px-4 md:px-8 lg:px-[203px] py-8 md:py-12">
//         <div className="mb-10 text-center">
//           <div className="flex justify-center mb-4">
//             <CheckCircle className="w-16 h-16 text-green-500" />
//           </div>
//           <h1
//             className="text-[32px] md:text-[40px] font-bold text-gray-900 mb-2"
//             style={{ fontFamily: "Poppins, sans-serif" }}
//           >
//             Your booking is confirmed
//           </h1>
//           <p className="text-lg text-gray-600 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
//             Confirmation ID: <span className="font-semibold text-[#59A5B2]">{data.confirmationId}</span>
//           </p>
//           <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
//             We've sent a confirmation email to <span className="font-semibold">{data.User.email}</span>
//           </p>
//           <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
//             Payment receipt will be sent via {data.payment.paymentMethod}
//           </p>
//         </div>

//         {/* Main Grid Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Booking Details */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Property Card */}
//             <Card className="p-6 md:p-8">
//               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-4 mb-6">
//                 <div className="flex-1">
//                   <h2
//                     className="text-[24px] font-bold text-[#59A5B2] mb-2"
//                     style={{ fontFamily: "Poppins, sans-serif" }}
//                   >
//                     {data.property.name}
//                   </h2>
//                   {data.property.subtitle && (
//                     <p className="text-gray-600 text-sm mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
//                       {data.property.subtitle}
//                     </p>
//                   )}
//                   <p className="text-gray-600 flex items-center gap-1 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
//                     <MapPin className="w-4 h-4 text-[#59A5B2] flex-shrink-0" />
//                     {data.property.address}
//                   </p>
//                   <a href={data.property.propertymaplink} target="_blank">
//                     <button className="text-[#59A5B2] hover:text-[#4a8f9a] text-sm font-medium transition-colors">
//                       Show directions →
//                     </button>
//                   </a>
//                 </div>
//               </div>

//               {/* Divider */}
//               <div className="border-t border-gray-200 my-6"></div>

//               {/* Booking Details */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 {/* Check-in */}
//                 <div>
//                   <p className="text-xs font-medium text-gray-500 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
//                     CHECK-IN
//                   </p>
//                   <p className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
//                     {formatDate1(data.dates.checkIn)}
//                   </p>
//                   <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
//                     From {data.property.checkInTime}
//                   </p>
//                 </div>

//                 {/* Check-out */}
//                 <div>
//                   <p className="text-xs font-medium text-gray-500 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
//                     CHECK-OUT
//                   </p>
//                   <p className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
//                     {formatDate1(data.dates.checkOut)}
//                   </p>
//                   <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
//                     Until {formatDate1(data.property.checkOutTime)}
//                   </p>
//                 </div>
//               </div>

//               {/* Guests Info */}
//               <div className="flex items-center gap-3 text-gray-700 mb-6">
//                 <Users className="w-5 h-5 text-[#59A5B2] flex-shrink-0" />
//                 <span style={{ fontFamily: "Inter, sans-serif" }}>
//                   {data.guests.adults} {data.guests.adults === 1 ? "Adult" : "Adults"}
//                   {data.guests.children > 0 && (
//                     <>
//                       , {data.guests.children} {data.guests.children === 1 ? "Child" : "Children"}
//                     </>
//                   )}
//                 </span>
//               </div>

//               {/* Divider */}
//               <div className="border-t border-gray-200 my-6"></div>

//               <div className="mb-6">
//                 <h3 className="text-lg font-bold text-[#59A5B2] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
//                   Your room details
//                 </h3>
//                 <div className="space-y-4">
//                   {data.rooms.map((room) => (
//                     <div
//                       key={room.bookingRoomId}
//                       className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
//                     >
//                       <div className="w-24 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
//                         {/* {room.roomImage && ( */}
//                         <img
//                           src={room.pic1}
//                           alt={room.roomName}
//                           className="w-full h-full object-cover"
//                         />
//                         {/* )} */}
//                       </div>
//                       <div className="flex-1">
//                         <p className="font-semibold text-gray-900 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
//                           {room.roomName}
//                         </p>
//                         <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
//                           {room.roomType} • Qty: {room.quantity}
//                         </p>
//                         <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "Inter, sans-serif" }}>
//                           CAD {room.subtotal}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Divider */}
//               <div className="border-t border-gray-200 my-6"></div>

//               {/* Contact Property Section */}
//               <div>
//                 <h3 className="text-lg font-bold text-[#59A5B2] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
//                   Contact property
//                 </h3>

//                 <div className="">
//                   <p
//                     className="flex items-center gap-2 text-sm text-gray-600 mb-2"
//                     style={{ fontFamily: "Inter, sans-serif" }}
//                   >

//                     <span className="text-md font-bold text-[#59A5B2] " >Owner Name:</span> {data.property.firstName} {data.property.lastName}
//                   </p>

//                   <p
//                     className="flex items-center gap-2 text-sm text-gray-600 mb-2"
//                     style={{ fontFamily: "Inter, sans-serif" }}
//                   >

//                     <span className="text-md font-bold text-[#59A5B2] " >Owner Email:</span> {data.property.email}

//                   </p>
//                   <p
//                     className="flex items-center gap-2 text-sm text-gray-600 mb-2"
//                     style={{ fontFamily: "Inter, sans-serif" }}
//                   >
//                     <span className="text-md font-bold text-[#59A5B2] " >Owner Phone:</span> {data.property.phoneno}

//                   </p>

//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-3 mb-4">
//                   <button className="flex items-center justify-center gap-2 px-4 py-2 border border-[#59A5B2] text-[#59A5B2] rounded-lg hover:bg-blue-50 transition-colors font-medium">
//                     <MessageSquare className="w-4 h-4" />
//                     Send a message
//                   </button>
//                   <button className="flex items-center justify-center gap-2 px-4 py-2 border border-[#59A5B2] text-[#59A5B2] rounded-lg hover:bg-blue-50 transition-colors font-medium">
//                     <Mail className="w-4 h-4" />
//                     Send an email
//                   </button>
//                 </div>

//                 <p
//                   className="flex items-center gap-2 text-sm text-gray-600"
//                   style={{ fontFamily: "Inter, sans-serif" }}
//                 >
//                   <Headset className="w-4 h-4 text-[#59A5B2]" />
//                   Please feel free to get in touch if you need further
//                   assistance.
//                 </p>

//               </div>

//             </Card>
//           </div>

//           {/* Right Column - Summary Card */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-4 overflow-hidden">
//               {/* Property Image */}
//               <div className="h-48 bg-gray-200 overflow-hidden">
//                 {data.property.image && (
//                   <img
//                     src={data.property.image || "/placeholder.svg"}
//                     alt={data.property.name}
//                     className="w-full h-full object-cover"
//                   />
//                 )}
//               </div>

//               {/* Summary Content */}
//               <div className="p-6">
//                 <h3 className="text-lg font-bold text-[#59A5B2] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
//                   Your stay
//                 </h3>

//                 {/* Dates */}
//                 <div className="mb-4 pb-4 border-b border-gray-200">
//                   <div className="flex items-center gap-2 text-gray-700 mb-2">
//                     <Calendar className="w-4 h-4 text-[#59A5B2] flex-shrink-0" />
//                     <span style={{ fontFamily: "Inter, sans-serif" }}>
//                       {formatDate1(data.dates.checkIn)} - {formatDate1(data.dates.checkOut)}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
//                     {data.dates.nights} night
//                     {data.dates.nights !== 1 ? "s" : ""}
//                   </p>
//                 </div>

//                 {/* Total */}
//                 <div className="bg-[#FEC328] rounded-lg p-4 mb-4">
//                   <div className="flex justify-between items-center">
//                     <span className="font-semibold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
//                       Total paid
//                     </span>
//                     <span className="text-2xl font-bold text-[#59A5B2]" style={{ fontFamily: "Poppins, sans-serif" }}>
//                       {data.payment.currency} {data.payment.total}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Payment Status */}
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
//                   <p className="text-sm text-green-900 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
//                     ✓ Paid via {data.payment.paymentMethod}
//                   </p>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   <Button
//                     onClick={handlePrint}
//                     className="w-full bg-[#59A5B2] hover:bg-[#4a8f9a] text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
//                   >
//                     <Printer className="w-4 h-4" />
//                     Print confirmation
//                   </Button>
//                   <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
//                     Back to home
//                   </button>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   )
// }

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
  Mail,
  MessageSquare,
  Printer,
  AlertCircle,
  Loader,
  Headset,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authCheck } from "@/services/authCheck";
import { InvoicePrint } from "@/components/InvoicePrint";

interface BookingConfirmationData {
  confirmationId: string;
  User: {
    email: string;
  };
  property: {
    name: string;
    subtitle?: string;
    address: string;
    propertymaplink: string;
    checkInTime: string;
    checkOutTime: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneno: string;
    image?: string;
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
  rooms: {
    bookingRoomId: string;
    roomName: string;
    roomType: string;
    quantity: number;
    subtotal: number;
    pic1?: string;
  }[];
  payment: {
    currency: string;
    total: number;
    paymentMethod: string;
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export default function BookingConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [data, setData] = useState<BookingConfirmationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate1 = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

const handleEmailClick = () => {
  const email = data?.property.email
  if (!email) return

  const subject = encodeURIComponent("Regarding your property booking")
  const body = encodeURIComponent(
    `Hello ${data.property.firstName},

I have a question regarding my recent booking.

Thank you.`
  )

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`

  window.open(gmailUrl, "_blank")
}


const handleWhatsAppClick = () => {
  let phone = data?.property.phoneno
  if (!phone) return

  // clean number (spaces, dashes remove)
  phone = phone.replace(/\D/g, "")

  const message = encodeURIComponent(
    "Hello, I have a question regarding my booking. Thank you."
  )

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
}


  useEffect(() => {
    const logincheck = async () => {
      const user = await authCheck();

      console.log("user from /auth/me is: ", user);

      if (!user) {
        router.push(`/customer/signin`);
      }
    };
    logincheck();
  }, []);

   const formatDate = (isoString:string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    console.log("response ", bookingId);
    if (!bookingId) return;
    const fetchBookingDetails = async () => {
      console.log("response ");
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}/booking/details/${bookingId}`);
        console.log("response ", response);

        if (!response.ok) {
          throw new Error("Failed to fetch booking details");
        }

        const result = await response.json();
        if (result.success) {
          console.log("result.data", result.data);
          setData(result.data);
        } else {
          setError("Could not load booking confirmation");
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load confirmation"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="bg-gray-50 w-full flex flex-col min-h-screen">
        <Header />
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <Loader className="w-8 h-8 text-[#59A5B2] animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-gray-50 w-full flex flex-col min-h-screen">
        <Header />
        <Navigation />

        <div className="flex-1 flex items-center justify-center px-4 pt-8 pb-16">
          <Card className="p-8 max-w-md">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Error Loading Confirmation
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {error || "The booking confirmation could not be loaded."}
            </p>
            <Button className="w-full bg-[#59A5B2] hover:bg-[#4a8f9a] text-white">
              Back to Home
            </Button>
          </Card>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />

      {data && <InvoicePrint data={data} />}

      {/* Main Content */}
      <div className="flex-1 w-full px-4 md:px-8 lg:px-[203px] py-8 md:py-12">
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
            <span className="font-semibold">{data.User.email}</span>
          </p>
          <p
            className="text-sm text-gray-500 mt-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Payment receipt will be sent via {data.payment.paymentMethod}
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
                  {data.property.subtitle && (
                    <p
                      className="text-gray-600 text-sm mb-3"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {data.property.subtitle}
                    </p>
                  )}
                  <p
                    className="text-gray-600 flex items-center gap-1 mb-3"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <MapPin className="w-4 h-4 text-[#59A5B2] flex-shrink-0" />
                    {data.property.address}
                  </p>
                  <a
                    href={data.property.propertymaplink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="text-[#59A5B2] hover:text-[#4a8f9a] text-sm font-medium transition-colors">
                      Show directions →
                    </button>
                  </a>
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
                  <p className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {formatDate(data.dates.checkIn)}
                  </p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                    From {formatDate(data.property.checkInTime)}
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
                    {formatDate1(data.dates.checkOut)}
                  </p>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Until {formatDate1(data.property.checkOutTime)}
                  </p>
                </div>
              </div>

              {/* Guests Info */}
              <div className="flex items-center gap-3 text-gray-700 mb-6">
                <Users className="w-5 h-5 text-[#59A5B2] flex-shrink-0" />
                <span style={{ fontFamily: "Inter, sans-serif" }}>
                  {data.guests.adults}{" "}
                  {data.guests.adults === 1 ? "Adult" : "Adults"}
                  {data.guests.children > 0 && (
                    <>
                      , {data.guests.children}{" "}
                      {data.guests.children === 1 ? "Child" : "Children"}
                    </>
                  )}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

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
                      key={room.bookingRoomId}
                      className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
                    >
                      <div className="w-24 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        {/* {room.roomImage && ( */}
                        <img
                          src={room.pic1 || "/placeholder.svg"}
                          alt={room.roomName}
                          className="w-full h-full object-cover"
                        />
                        {/* )} */}
                      </div>
                      <div className="flex-1">
                        <p
                          className="font-semibold text-gray-900 mb-1"
                          style={{ fontFamily: "Poppins, sans-serif" }}
                        >
                          {room.roomName}
                        </p>
                        <p
                          className="text-sm text-gray-600 mb-2"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {room.roomType} • Qty: {room.quantity}
                        </p>
                        <p
                          className="text-sm font-semibold text-gray-900"
                          style={{ fontFamily: "Inter, sans-serif" }}
                        >
                          CAD {room.subtotal}
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

                <div className="">
                  <p
                    className="flex items-center gap-2 text-sm text-gray-600 mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <span className="text-md font-bold text-[#59A5B2] ">
                      Owner Name:
                    </span>{" "}
                    {data.property.firstName} {data.property.lastName}
                  </p>

                  <p
                    className="flex items-center gap-2 text-sm text-gray-600 mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <span className="text-md font-bold text-[#59A5B2] ">
                      Owner Email:
                    </span>{" "}
                    {data.property.email}
                  </p>
                  <p
                    className="flex items-center gap-2 text-sm text-gray-600 mb-2"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <span className="text-md font-bold text-[#59A5B2] ">
                      Owner Phone:
                    </span>{" "}
                    {data.property.phoneno}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-[#59A5B2] text-[#59A5B2] rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Whatsapp Message
                  </button>

                  <button
                    onClick={handleEmailClick}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-[#59A5B2] text-[#59A5B2] rounded-lg hover:bg-blue-50 transition-colors font-medium"
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

          {/* Right Column - Summary Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 overflow-hidden">
              {/* Property Image */}
              <div className="h-48 bg-gray-200 overflow-hidden">
                {data.property.image && (
                  <img
                    src={data.property.image || "/placeholder.svg"}
                    alt={data.property.name}
                    className="w-full h-full object-cover"
                  />
                )}
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
                      {formatDate1(data.dates.checkIn)} -{" "}
                      {formatDate1(data.dates.checkOut)}
                    </span>
                  </div>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {data.dates.nights} night
                    {data.dates.nights !== 1 ? "s" : ""}
                  </p>
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
                      className="text-2xl font-bold text-[#fcfcfc]"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {data.payment.currency} {data.payment.total}
                    </span>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                  <p
                    className="text-sm text-green-900 font-medium"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    ✓ Paid via {data.payment.paymentMethod}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handlePrint}
                    className="w-full bg-[#59A5B2] hover:bg-[#4a8f9a] text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    Print confirmation
                  </Button>
                  <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Back to home
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
