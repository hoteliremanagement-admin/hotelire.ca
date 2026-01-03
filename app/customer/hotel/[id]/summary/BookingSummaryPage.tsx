// "use client";

// import type React from "react";
// import { useEffect, useState } from "react";
// import { Header } from "@/components/Header";
// import { Navigation } from "@/components/Navigation";
// import { Footer } from "@/components/Footer";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { AlertCircle, MapPin, Calendar, Users, X } from "lucide-react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useRouter } from "next/navigation";
// import { authCheck } from "@/services/authCheck";
// import axios from "axios";
// import CustomerBookingPayment from "@/components/CustomerBookingPayment";

// interface GuestInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
// }

// interface BookingData {
//   property: {
//     id: number;
//     name: string;
//     location: string;
//     image: string;
//   };
//   dates: {
//     checkIn: string;
//     checkOut: string;
//     nights: number;
//   };
//   guests: {
//     adults: number;
//     children: number;
//   };
//   rooms: Array<{
//     id: number;
//     name: string;
//     quantity: number;
//     pricePerNight: number;
//     total: number;
//   }>;
//   pricing: {
//     subtotal: number;
//     taxes: number;
//     total: number;
//   };
// }

// interface FormErrors {
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   phone?: string;
// }

// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

// export default function BookingSummaryPage() {
//   const router = useRouter();
//   const stripe = useStripe();
//   const elements = useElements();

//   const [bookingData, setBookingData] = useState<BookingData | null>(null);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [guestInfo, setGuestInfo] = useState<GuestInfo>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   });
//   const MAX_PHONE_LEN = 10;

//   const sanitizePhone = (s: string) =>
//     s.replace(/\D/g, "").slice(0, MAX_PHONE_LEN);

//   const nameRegex = /^[A-Za-z\s-]{1,50}$/;
//   const nameSanitize = (s: string) =>
//     s
//       .replace(/[^A-Za-z\s-]/g, "")
//       .replace(/\s+/g, " ")
//       .slice(0, 50);

//   const displayNameRegex = /^[A-Za-z\s]{1,15}$/;
//   const displayNameSanitize = (s: string) =>
//     s
//       .replace(/[^A-Za-z\s]/g, "")
//       .replace(/\s+/g, " ")
//       .slice(0, 15);

//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [paymentError, setPaymentError] = useState<string | null>(null);
//   const [showErrorModal, setShowErrorModal] = useState(false);

//   const formatDate = (isoString: string) => {
//     const date = new Date(isoString);
//     return date.toLocaleDateString("en-CA", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getUser = async () => {
//     try {
//       const user = await authCheck();
//       if (user) {
//         setUserId(user.user.userid);
//         setGuestInfo((prev) => ({
//           ...prev,
//           firstName: user.user.firstname,
//           lastName: user.user.lastname,
//           email: user.user.email,
//           phone: user.user.phoneno?.replace(/^\+1/, ""),
//         }));
//       }
//     } catch (error) {
//       console.error("[v0] Auth check error:", error);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   useEffect(() => {
//     const raw = localStorage.getItem("booking_summary");
//     if (!raw) return;
//     setBookingData(JSON.parse(raw));
//   }, []);

//   if (!bookingData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">Loading booking summary...</p>
//       </div>
//     );
//   }

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};

//     // First name
//     if (!guestInfo.firstName.trim()) {
//       newErrors.firstName = "First name is required";
//     } else if (!nameRegex.test(guestInfo.firstName)) {
//       newErrors.firstName = "Only letters, spaces and hyphens allowed";
//     }

//     // Last name
//     if (!guestInfo.lastName.trim()) {
//       newErrors.lastName = "Last name is required";
//     } else if (!nameRegex.test(guestInfo.lastName)) {
//       newErrors.lastName = "Only letters, spaces and hyphens allowed";
//     }

//     // Email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!guestInfo.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(guestInfo.email)) {
//       newErrors.email = "Invalid email address";
//     }

//     // Phone
//     if (!guestInfo.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (guestInfo.phone.length !== MAX_PHONE_LEN) {
//       newErrors.phone = "Phone number must be 10 digits";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     let sanitizedValue = value;

//     if (name === "firstName" || name === "lastName") {
//       sanitizedValue = nameSanitize(value);
//     }

//     if (name === "phone") {
//       sanitizedValue = sanitizePhone(value);
//     }

//     setGuestInfo((prev) => ({
//       ...prev,
//       [name]: sanitizedValue,
//     }));

//     if (errors[name as keyof FormErrors]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: undefined,
//       }));
//     }
//   };



//   const handleUserUpdateInfo = async (e: any) => {
//     e.preventDefault();

//     if (!validateForm()) return;
//     if (!userId) {
//       alert("User not logged in");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const res = await fetch(`${baseUrl}/auth/updateCustomerInfo`, {
//         method: "PUT",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           userid: userId,
//           firstname: guestInfo.firstName,
//           lastname: guestInfo.lastName,
//           email: guestInfo.email,
//           phoneno: guestInfo.phone,
//         }),
//       },
//       );

//       const data = await res.json();

//       getUser()

//       if (!res.ok) {
//         throw new Error(data.message || "Update failed");
//       }

//       alert("Guest information updated successfully ✅");
//     } catch (error) {
//       console.error(error);
//       alert("Oops! Some thing went wrong While updating you information");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };



//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;
//     if (!stripe || !elements || !userId) {
//       setPaymentError("Payment system not ready. Please refresh the page.");
//       setShowErrorModal(true);
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Step 1: Create PaymentIntent
//       console.log("[v0] Creating payment intent...");
//       const intentRes = await fetch(`${baseUrl}/stripe/create-intent`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           amount: Math.round(bookingData.pricing.total), // cents
//         }),
//       });

//       if (!intentRes.ok) {
//         const errorText = await intentRes.text();
//         console.error("Stripe API error:", errorText);
//         throw new Error("Failed to create payment intent");
//       }

//       const { clientSecret } = await intentRes.json();
//       console.log("Stripe clientSecret received:", clientSecret);

//       // Step 2: Confirm card payment with Stripe
//       console.log("[v0] Confirming card payment...");
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement)!,
//           billing_details: {
//             name: `${guestInfo.firstName} ${guestInfo.lastName}`,
//             email: guestInfo.email,
//           },
//         },
//       });

//       console.log("Showing the result", result);

//       if (result.error) {
//         console.log("[v0] Payment error:", result.error.message);
//         setPaymentError(
//           result.error.message || "Payment failed. Please try again."
//         );
//         setShowErrorModal(true);
//         setIsSubmitting(false);
//         return;
//       }

//       if (result.paymentIntent?.status !== "succeeded") {
//         console.log(
//           "[v0] Payment not succeeded, status:",
//           result.paymentIntent?.status
//         );
//         setPaymentError("Payment was not completed. Please try again.");
//         setShowErrorModal(true);
//         setIsSubmitting(false);
//         return;
//       }

//       // Step 3: Create booking in database after successful payment
//       console.log("[v0] Payment succeeded, creating booking...");
//       const bookingRes = await axios.post(`${baseUrl}/booking/create`, {
//         userId,
//         propertyId: bookingData.property.id,
//         checkInDate: bookingData.dates.checkIn,
//         checkOutDate: bookingData.dates.checkOut,
//         rooms: bookingData.rooms.map((room) => ({
//           roomId: room.id,
//           quantity: room.quantity,
//           pricePerNight: room.pricePerNight,
//         })),
//         totalAmount: bookingData.pricing.total,
//         paymentIntentId: result.paymentIntent.id,
//         guestFirstName: guestInfo.firstName,
//         guestLastName: guestInfo.lastName,
//         guestEmail: guestInfo.email,
//         guestPhone: guestInfo.phone,
//         adults: bookingData.guests.adults,
//         children: bookingData.guests.children,
//       }, {
//         withCredentials: true
//       });

//       if (bookingRes.status !== 201)
//         throw new Error("Failed to create booking");

//       const { bookingId } = bookingRes.data;
//       console.log("[v0] Booking created successfully:", bookingId);

//       // Clear localStorage after successful booking
//       localStorage.removeItem("booking_summary");

//       // Redirect to confirmation page
//       router.push(
//         `/customer/hotel/${bookingData.property.id}/confirmation?bookingId=${bookingId}`
//       );
//     } catch (error: any) {
//       console.error("[v0] Booking creation error:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "An unexpected error occurred. Please try again.";
//       setPaymentError(errorMessage);
//       setShowErrorModal(true);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };




//   const isFormValid =
//     guestInfo.firstName &&
//     guestInfo.lastName &&
//     guestInfo.email &&
//     guestInfo.phone &&
//     Object.keys(errors).length === 0;

//   return (
//     <div className="bg-gray-50 w-full flex flex-col min-h-screen">
//       <Header />
//       <Navigation />

//       <div className="flex-1 w-full px-4 md:px-8 lg:px-[203px] py-8 md:py-12">
//         <div className="mb-8">
//           <h1
//             className="text-[28px] md:text-[36px] font-bold text-[#59A5B2] mb-2"
//             style={{ fontFamily: "Poppins, sans-serif" }}
//           >
//             Complete Your Booking
//           </h1>
//           <p
//             className="text-gray-600 text-sm md:text-base"
//             style={{ fontFamily: "Inter, sans-serif" }}
//           >
//             Review your details and finalize your reservation
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">



//             <form onSubmit={handleUserUpdateInfo} className="space-y-8">
//               {/* Guest Information Section */}
//               <Card className="p-6 md:p-8">
//                 <h2
//                   className="text-[20px] font-bold text-[#59A5B2] mb-6"
//                   style={{ fontFamily: "Poppins, sans-serif" }}
//                 >
//                   Guest Information
//                 </h2>

//                 <div className="space-y-5">
//                   <div>
//                     <label
//                       htmlFor="firstName"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                       style={{ fontFamily: "Poppins, sans-serif" }}
//                     >
//                       First Name <span className="text-red-500">*</span>
//                     </label>
//                     <Input
//                       id="firstName"
//                       name="firstName"
//                       type="text"
//                       value={guestInfo.firstName}
//                       onChange={handleInputChange}
//                       placeholder="Enter your first name"
//                       className={`w-full px-4 py-3 rounded-lg border text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent transition-all ${errors.firstName
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 bg-white"
//                         }`}
//                       style={{ fontFamily: "Inter, sans-serif" }}
//                     />
//                     {errors.firstName && (
//                       <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         {errors.firstName}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="lastName"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                       style={{ fontFamily: "Poppins, sans-serif" }}
//                     >
//                       Last Name <span className="text-red-500">*</span>
//                     </label>
//                     <Input
//                       id="lastName"
//                       name="lastName"
//                       type="text"
//                       value={guestInfo.lastName}
//                       onChange={handleInputChange}
//                       placeholder="Enter your last name"
//                       className={`w-full px-4 py-3 rounded-lg border text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent transition-all ${errors.lastName
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 bg-white"
//                         }`}
//                       style={{ fontFamily: "Inter, sans-serif" }}
//                     />
//                     {errors.lastName && (
//                       <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         {errors.lastName}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                       style={{ fontFamily: "Poppins, sans-serif" }}
//                     >
//                       Email Address <span className="text-red-500">*</span>
//                     </label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       disabled={true}
//                       value={guestInfo.email}
//                       onChange={handleInputChange}
//                       placeholder="your.email@example.com"
//                       className={`w-full px-4 py-3 rounded-lg border text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent transition-all ${errors.email
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 bg-white"
//                         }`}
//                       style={{ fontFamily: "Inter, sans-serif" }}
//                     />
//                     {errors.email && (
//                       <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="phone"
//                       className="block text-sm font-medium text-gray-700 mb-2"
//                       style={{ fontFamily: "Poppins, sans-serif" }}
//                     >
//                       Phone Number <span className="text-red-500">*</span>
//                     </label>
//                     <Input
//                       id="phone"
//                       name="phone"
//                       type="tel"
//                       value={guestInfo.phone}
//                       onChange={handleInputChange}
//                       placeholder="+1 (555) 123-4567"
//                       className={`w-full px-4 py-3 rounded-lg border text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent transition-all ${errors.phone
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 bg-white"
//                         }`}
//                       style={{ fontFamily: "Inter, sans-serif" }}
//                     />
//                     {errors.phone && (
//                       <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         {errors.phone}
//                       </p>
//                     )}
//                   </div>
//                   <Button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-[#59A5B2] hover:bg-[#4a8f9a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all"
//                   >
//                     {isSubmitting ? "Updating..." : "Update Guest Information"}
//                   </Button>
//                 </div>

//               </Card>
//             </form>

//             <form onSubmit={handleSubmit}>

//               <Card className="p-6 md:p-8">
//                 <div className="mb-6">
//                   <h2
//                     className="text-[20px] font-bold text-[#59A5B2] mb-2"
//                     style={{ fontFamily: "Poppins, sans-serif" }}
//                   >
//                     Secure Payment
//                   </h2>
//                   <p
//                     className="text-gray-600 text-sm"
//                     style={{ fontFamily: "Inter, sans-serif" }}
//                   >
//                     Your card will only be used to guarantee your booking
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-3 mb-6 text-gray-500 text-xs">
//                   <span>We accept</span>
//                   <img
//                     src="/cards/visa-svgrepo-com.svg"
//                     className="h-10"
//                     alt="Visa"
//                   />
//                   <img
//                     src="/cards/mastercard-svgrepo-com.svg"
//                     className="h-10"
//                     alt="Mastercard"
//                   />
//                   <img
//                     src="/cards/amex-svgrepo-com.svg"
//                     className="h-10"
//                     alt="Amex"
//                   />
//                   <img
//                     src="/cards/discover-svgrepo-com.svg"
//                     className="h-10"
//                     alt="Discover"
//                   />
//                 </div>

//                 <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4 focus-within:ring-2 focus-within:ring-[#59A5B2] transition-all">
//                   <CardElement
//                     options={{
//                       style: {
//                         base: {
//                           fontSize: "16px",
//                           color: "#1f2937",
//                           fontFamily: "Inter, sans-serif",
//                           "::placeholder": {
//                             color: "#9ca3af",
//                           },
//                         },
//                         invalid: {
//                           color: "#dc2626",
//                         },
//                       },
//                     }}
//                   />
//                 </div>

//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//                   <p
//                     className="text-blue-900 text-sm flex items-center gap-2"
//                     style={{ fontFamily: "Inter, sans-serif" }}
//                   >
//                     <span className="text-lg">🔒</span>
//                     Your payment information is secure and encrypted
//                   </p>
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={!stripe || !isFormValid || isSubmitting}
//                   className="w-full bg-[#59A5B2] hover:bg-[#4a8f9a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all"
//                 >
//                   {isSubmitting
//                     ? "Processing..."
//                     : `Confirm & Pay CAD ${bookingData.pricing.total}`}
//                 </Button>
//               </Card>
//             </form>





//           </div>

//           <div className="lg:col-span-1">
//             <Card className="sticky top-4 overflow-hidden">
//               <div className="h-48 bg-gray-200 overflow-hidden">
//                 <img
//                   src={bookingData.property.image || "/placeholder.svg"}
//                   alt={bookingData.property.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               <div className="p-6">
//                 <h3
//                   className="text-[18px] font-bold text-[#59A5B2] mb-1"
//                   style={{ fontFamily: "Poppins, sans-serif" }}
//                 >
//                   {bookingData.property.name}
//                 </h3>
//                 <p
//                   className="text-gray-600 text-sm flex items-center gap-1 mb-4"
//                   style={{ fontFamily: "Inter, sans-serif" }}
//                 >
//                   <MapPin className="w-4 h-4 flex-shrink-0" />
//                   {bookingData.property.location}
//                 </p>

//                 <div className="border-t border-gray-200 my-4"></div>

//                 <div className="space-y-3 mb-4">
//                   <div className="flex items-start gap-3">
//                     <Calendar className="w-5 h-5 text-[#59A5B2] flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p
//                         className="text-xs text-gray-500 font-medium"
//                         style={{ fontFamily: "Poppins, sans-serif" }}
//                       >
//                         Check-in
//                       </p>
//                       <p
//                         className="text-sm font-semibold text-gray-900"
//                         style={{ fontFamily: "Inter, sans-serif" }}
//                       >
//                         {formatDate(bookingData.dates.checkIn)}
//                       </p>
//                       <p
//                         className="text-xs text-gray-500 font-medium mt-2"
//                         style={{ fontFamily: "Poppins, sans-serif" }}
//                       >
//                         Check-out
//                       </p>
//                       <p
//                         className="text-sm font-semibold text-gray-900"
//                         style={{ fontFamily: "Inter, sans-serif" }}
//                       >
//                         {formatDate(bookingData.dates.checkOut)}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <Users className="w-5 h-5 text-[#59A5B2] flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p
//                         className="text-xs text-gray-500 font-medium"
//                         style={{ fontFamily: "Poppins, sans-serif" }}
//                       >
//                         Guests
//                       </p>
//                       <p
//                         className="text-sm font-semibold text-gray-900"
//                         style={{ fontFamily: "Inter, sans-serif" }}
//                       >
//                         {bookingData.guests.adults}{" "}
//                         {bookingData.guests.adults === 1 ? "Adult" : "Adults"}
//                         {bookingData.guests.children > 0 && (
//                           <>
//                             , {bookingData.guests.children}{" "}
//                             {bookingData.guests.children === 1
//                               ? "Child"
//                               : "Children"}
//                           </>
//                         )}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-200 my-4"></div>

//                 <div className="mb-4">
//                   <p
//                     className="text-xs font-medium text-gray-500 mb-3"
//                     style={{ fontFamily: "Poppins, sans-serif" }}
//                   >
//                     ROOMS
//                   </p>
//                   <div className="space-y-2">
//                     {bookingData.rooms.map((room) => (
//                       <div
//                         key={room.id}
//                         className="flex justify-between text-sm"
//                       >
//                         <span style={{ fontFamily: "Inter, sans-serif" }}>
//                           {room.name} x {room.quantity}
//                         </span>
//                         <span
//                           className="font-semibold text-gray-900"
//                           style={{ fontFamily: "Inter, sans-serif" }}
//                         >
//                           CAD ${room.total}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-200 my-4"></div>

//                 <div className="space-y-2 mb-4">
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span style={{ fontFamily: "Inter, sans-serif" }}>
//                       Subtotal ({bookingData.dates.nights} nights)
//                     </span>
//                     <span style={{ fontFamily: "Inter, sans-serif" }}>
//                       CAD ${bookingData.pricing.subtotal}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span style={{ fontFamily: "Inter, sans-serif" }}>
//                       Taxes
//                     </span>
//                     <span style={{ fontFamily: "Inter, sans-serif" }}>
//                       CAD ${bookingData.pricing.taxes}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-200 my-4"></div>

//                 <div className="flex justify-between items-center">
//                   <span
//                     className="text-lg font-bold text-gray-900"
//                     style={{ fontFamily: "Poppins, sans-serif" }}
//                   >
//                     Total
//                   </span>
//                   <span
//                     className="text-2xl font-bold text-[#59A5B2]"
//                     style={{ fontFamily: "Poppins, sans-serif" }}
//                   >
//                     CAD ${bookingData.pricing.total}
//                   </span>
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>

//       <Footer />

//       {showErrorModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-md bg-white">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
//                     <AlertCircle className="w-6 h-6 text-red-600" />
//                   </div>
//                   <h3
//                     className="text-lg font-bold text-gray-900"
//                     style={{ fontFamily: "Poppins, sans-serif" }}
//                   >
//                     Payment Failed
//                   </h3>
//                 </div>
//                 <button
//                   onClick={() => setShowErrorModal(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               <p
//                 className="text-gray-600 mb-6"
//                 style={{ fontFamily: "Inter, sans-serif" }}
//               >
//                 {paymentError ||
//                   "Your payment could not be processed. Please check your card details and try again."}
//               </p>

//               <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//                 <p
//                   className="text-red-800 text-sm"
//                   style={{ fontFamily: "Inter, sans-serif" }}
//                 >
//                   No booking has been created for this transaction. Please try
//                   again.
//                 </p>
//               </div>

//               <Button
//                 onClick={() => setShowErrorModal(false)}
//                 className="w-full bg-[#59A5B2] hover:bg-[#4a8f9a] text-white font-semibold py-2 rounded-lg"
//               >
//                 Try Again
//               </Button>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }









"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, MapPin, Calendar, Users, X } from "lucide-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { authCheck } from "@/services/authCheck";
import axios from "axios";

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

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export default function BookingSummaryPage() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const MAX_PHONE_LEN = 10;

  const sanitizePhone = (s: string) =>
    s.replace(/\D/g, "").slice(0, MAX_PHONE_LEN);

  const nameRegex = /^[A-Za-z\s-]{1,50}$/;
  const nameSanitize = (s: string) =>
    s
      .replace(/[^A-Za-z\s-]/g, "")
      .replace(/\s+/g, " ")
      .slice(0, 50);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };


  useEffect(() => {

    const logincheck = async () => {
      const user = await authCheck();

      console.log("user from /auth/me is: ", user);

      if (!user) {
        router.push(`/customer/signin`)
      }
    }
    logincheck();

  }, [])

  const getUser = async () => {
    try {
      const user = await authCheck();
      if (user) {
        setUserId(user.user.userid);
        setGuestInfo((prev) => ({
          ...prev,
          firstName: user.user.firstname,
          lastName: user.user.lastname,
          email: user.user.email,
          phone: user.user.phoneno?.replace(/^\+1/, ""),
        }));
      }
    } catch (error) {
      console.error("[v0] Auth check error:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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

    if (!guestInfo.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!nameRegex.test(guestInfo.firstName)) {
      newErrors.firstName = "Only letters, spaces and hyphens allowed";
    }

    if (!guestInfo.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!nameRegex.test(guestInfo.lastName)) {
      newErrors.lastName = "Only letters, spaces and hyphens allowed";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!guestInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(guestInfo.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!guestInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (guestInfo.phone.length !== MAX_PHONE_LEN) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let sanitizedValue = value;

    if (name === "firstName" || name === "lastName") {
      sanitizedValue = nameSanitize(value);
    }

    if (name === "phone") {
      sanitizedValue = sanitizePhone(value);
    }

    setGuestInfo((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleUserUpdateInfo = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!userId) {
      alert("User not logged in");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${baseUrl}/auth/updateCustomerInfo`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: userId,
          firstname: guestInfo.firstName,
          lastname: guestInfo.lastName,
          email: guestInfo.email,
          phoneno: guestInfo.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      getUser();
      alert("Guest information updated successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while updating your information");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!stripe || !elements || !userId) {
      setPaymentError("Payment system not ready. Please refresh the page.");
      setShowErrorModal(true);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("[v0] Creating payment intent for property:", bookingData.property.id);

      // Step 1: Create PaymentIntent with property ID to route to owner's Stripe account
      const intentRes = await fetch(`${baseUrl}/stripe/create-intent`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: bookingData.pricing.total,
          propertyId: bookingData.property.id,
        }),
      });

      if (!intentRes.ok) {
        const errorData = await intentRes.json();
        throw new Error(errorData.error || "Failed to create payment intent");
      }

      const { clientSecret, paymentIntentId } = await intentRes.json();
      console.log("[v0] Payment intent created:", paymentIntentId);

      // Step 2: Confirm card payment with Stripe
      console.log("[v0] Confirming card payment with owner's Stripe account...");
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
        console.log("[v0] Payment error:", result.error.message);
        setPaymentError(
          result.error.message || "Payment failed. Please try again."
        );
        setShowErrorModal(true);
        setIsSubmitting(false);
        return;
      }

      if (result.paymentIntent?.status !== "succeeded") {
        console.log(
          "[v0] Payment not succeeded, status:",
          result.paymentIntent?.status
        );
        setPaymentError("Payment was not completed. Please try again.");
        setShowErrorModal(true);
        setIsSubmitting(false);
        return;
      }




      // Step 3: Create booking in database after successful payment
      console.log("[v0] Payment succeeded, creating booking...");





      const bookingRes = await axios.post(
        `${baseUrl}/booking/create`,
        {
          userId,
          propertyId: bookingData.property.id,
          checkInDate: bookingData.dates.checkIn,
          checkOutDate: bookingData.dates.checkOut,
          rooms: bookingData.rooms.map((room) => ({
            roomId: room.id,
            quantity: room.quantity,
            pricePerNight: room.pricePerNight,
          })),
          totalAmount: bookingData.pricing.total,
          totalNights: bookingData.dates.nights,
          paymentIntentId: result.paymentIntent.id,
          guestFirstName: guestInfo.firstName,
          guestLastName: guestInfo.lastName,
          guestEmail: guestInfo.email,
          guestPhone: guestInfo.phone,
          adults: bookingData.guests.adults,
          children: bookingData.guests.children,
        },
        {
          withCredentials: true,
        }



      );

      if (bookingRes.status !== 201) {
        throw new Error("Failed to create booking");
      }

      const { bookingId } = bookingRes.data;
      console.log("[v0] Booking created successfully:", bookingId);


      
      // Clear localStorage after successful booking
      localStorage.removeItem("booking_summary");

      // Redirect to confirmation page
      router.push(
        `/customer/hotel/${bookingData.property.id}/confirmation?bookingId=${bookingId}`
      );
    } catch (error: any) {
      console.error("[v0] Booking creation error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "An unexpected error occurred. Please try again.";
      setPaymentError(errorMessage);
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    guestInfo.firstName &&
    guestInfo.lastName &&
    guestInfo.email &&
    guestInfo.phone &&
    Object.keys(errors).length === 0;

  return (
    <div className="bg-gray-50 w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />

      <div className="flex-1 w-full px-4 md:px-8 lg:px-[203px] py-8 md:py-12 site-container">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleUserUpdateInfo} className="space-y-8">
              {/* Guest Information Section */}
              <Card className="p-6 md:p-8">
                <h2
                  className="text-[20px] font-bold text-[#59A5B2] mb-6"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Guest Information
                </h2>

                <div className="space-y-5">
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
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

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
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={guestInfo.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={guestInfo.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit phone"
                      maxLength={MAX_PHONE_LEN}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-[#59A5B2] hover:bg-[#4a9199]"
                >
                  {isSubmitting ? "Updating..." : "Update Information"}
                </Button>
              </Card>

              {/* Payment Information Section */}
              <Card className="p-6 md:p-8">
                <h2
                  className="text-[20px] font-bold text-[#59A5B2] mb-6"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Payment Details
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Card Details <span className="text-red-500">*</span>
                  </label>
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>

                {paymentError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-800">Payment Error</h3>
                      <p className="text-red-700 text-sm">{paymentError}</p>
                    </div>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className="w-full bg-[#59A5B2] hover:bg-[#4a9199]"
                >
                  {isSubmitting
                    ? "Processing Payment..."
                    : `Pay CAD $${bookingData.pricing.total}`}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  🔒 Your payment is secure and encrypted
                </p>
              </Card>
            </form>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 p-6">
              <h2
                className="text-[18px] font-bold text-[#59A5B2] mb-6"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Booking Summary
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div>
                  <p className="text-sm text-gray-600">Property</p>
                  <p className="font-semibold">{bookingData.property.name}</p>
                </div>

                <div className="flex gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Check-in</p>
                    <p className="text-sm font-medium">
                      {formatDate(bookingData.dates.checkIn)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Check-out</p>
                    <p className="text-sm font-medium">
                      {formatDate(bookingData.dates.checkOut)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-medium">
                    {bookingData.guests.adults + bookingData.guests.children}{" "}
                    guests
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Nights</span>
                  <span className="font-medium">{bookingData.dates.nights}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b">
                {bookingData.rooms.map((room) => (
                  <div key={room.id} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>{room.name}</span>
                      <span className="font-medium">
                        CAD ${room.total}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {room.quantity} × CAD ${room.pricePerNight}/night
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>CAD ${bookingData.pricing.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span>CAD ${bookingData.pricing.taxes}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4 border-t">
                  <span>Total</span>
                  <span className="text-[#59A5B2]">
                    CAD ${bookingData.pricing.total}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="mx-4 p-6 max-w-md">
            <div className="flex gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">Payment Error</h3>
                <p className="text-gray-600 mb-4">{paymentError}</p>
                <Button
                  onClick={() => setShowErrorModal(false)}
                  className="w-full bg-[#59A5B2] hover:bg-[#4a9199]"
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}
