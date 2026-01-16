// // "use client";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import {
// //   faBuilding,
// //   faCalendarCheck,
// //   faDollarSign,
// //   faStar,
// //   faArrowUp,
// //   faArrowDown,
// // } from "@fortawesome/free-solid-svg-icons";
// // import {
// //   LineChart,
// //   Line,
// //   BarChart,
// //   Bar,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// //   Legend,
// // } from "recharts";
// // import { OwnerLayout } from "@/components/owner/OwnerLayout";

// // const statsCards = [
// //   {
// //     title: "Total Properties",
// //     value: "12",
// //     change: "+2",
// //     changeType: "increase",
// //     icon: faBuilding,
// //     color: "#59A5B2",
// //   },
// //   {
// //     title: "Bookings This Month",
// //     value: "48",
// //     change: "+12%",
// //     changeType: "increase",
// //     icon: faCalendarCheck,
// //     color: "#FEBC11",
// //   },
// //   {
// //     title: "Revenue This Month",
// //     value: "$24,580",
// //     change: "+8.5%",
// //     changeType: "increase",
// //     icon: faDollarSign,
// //     color: "#10B981",
// //   },
// //   {
// //     title: "Average Rating",
// //     value: "4.8",
// //     change: "-0.1",
// //     changeType: "decrease",
// //     icon: faStar,
// //     color: "#F59E0B",
// //   },
// // ];

// // const revenueData = [
// //   { month: "Jan", revenue: 12400 },
// //   { month: "Feb", revenue: 15600 },
// //   { month: "Mar", revenue: 18200 },
// //   { month: "Apr", revenue: 16800 },
// //   { month: "May", revenue: 21400 },
// //   { month: "Jun", revenue: 24580 },
// // ];

// // const bookingsData = [
// //   { month: "Jan", bookings: 28 },
// //   { month: "Feb", bookings: 35 },
// //   { month: "Mar", bookings: 42 },
// //   { month: "Apr", bookings: 38 },
// //   { month: "May", bookings: 45 },
// //   { month: "Jun", bookings: 48 },
// // ];

// // const propertyDistribution = [
// //   { name: "Luxury Suites", value: 4, color: "#59A5B2" },
// //   { name: "Standard Rooms", value: 5, color: "#FEBC11" },
// //   { name: "Budget Rooms", value: 3, color: "#10B981" },
// // ];

// // export default function OverviewPage() {
// //   return (
// //     <OwnerLayout>
// //       <div className="space-y-6">
// //         {/* Page Header */}
// //         <div>
// //           <h1
// //             className="text-2xl md:text-3xl font-bold text-[#59A5B2]"
// //             style={{ fontFamily: "Poppins, sans-serif" }}
// //           >
// //             Dashboard Overview
// //           </h1>
// //           <p className="text-gray-500 dark:text-gray-400 mt-1">
// //             Welcome back, John! Here's what's happening with your properties.
// //           </p>
// //         </div>

// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
// //           {statsCards.map((card, index) => (
// //             <div
// //               key={index}
// //               className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-shadow hover:shadow-lg"
// //               data-testid={`stat-card-${index}`}
// //             >
// //               <div className="flex items-start justify-between">
// //                 <div>
// //                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
// //                     {card.title}
// //                   </p>
// //                   <h3
// //                     className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white"
// //                     style={{ fontFamily: "Poppins, sans-serif" }}
// //                   >
// //                     {card.value}
// //                   </h3>
// //                   <div
// //                     className={`flex items-center gap-1 mt-2 text-sm ${
// //                       card.changeType === "increase"
// //                         ? "text-green-500"
// //                         : "text-red-500"
// //                     }`}
// //                   >
// //                     <FontAwesomeIcon
// //                       icon={card.changeType === "increase" ? faArrowUp : faArrowDown}
// //                       className="w-3 h-3"
// //                     />
// //                     <span>{card.change} from last month</span>
// //                   </div>
// //                 </div>
// //                 <div
// //                   className="w-12 h-12 rounded-xl flex items-center justify-center"
// //                   style={{ backgroundColor: `${card.color}20` }}
// //                 >
// //                   <FontAwesomeIcon
// //                     icon={card.icon}
// //                     className="w-6 h-6"
// //                     style={{ color: card.color }}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Charts Row */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //           {/* Revenue Line Chart */}
// //           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
// //             <h3
// //               className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
// //               style={{ fontFamily: "Poppins, sans-serif" }}
// //             >
// //               Revenue Trend
// //             </h3>
// //             <ResponsiveContainer width="100%" height={280}>
// //               <LineChart data={revenueData}>
// //                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
// //                 <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
// //                 <YAxis stroke="#9ca3af" fontSize={12} />
// //                 <Tooltip
// //                   contentStyle={{
// //                     backgroundColor: "#1f2937",
// //                     border: "none",
// //                     borderRadius: "8px",
// //                     color: "#fff",
// //                   }}
// //                 />
// //                 <Line
// //                   type="monotone"
// //                   dataKey="revenue"
// //                   stroke="#59A5B2"
// //                   strokeWidth={3}
// //                   dot={{ fill: "#59A5B2", strokeWidth: 2 }}
// //                 />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* Bookings Bar Chart */}
// //           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
// //             <h3
// //               className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
// //               style={{ fontFamily: "Poppins, sans-serif" }}
// //             >
// //               Monthly Bookings
// //             </h3>
// //             <ResponsiveContainer width="100%" height={280}>
// //               <BarChart data={bookingsData}>
// //                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
// //                 <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
// //                 <YAxis stroke="#9ca3af" fontSize={12} />
// //                 <Tooltip
// //                   contentStyle={{
// //                     backgroundColor: "#1f2937",
// //                     border: "none",
// //                     borderRadius: "8px",
// //                     color: "#fff",
// //                   }}
// //                 />
// //                 <Bar dataKey="bookings" fill="#FEBC11" radius={[4, 4, 0, 0]} />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         </div>

// //         {/* Property Distribution */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
// //             <h3
// //               className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
// //               style={{ fontFamily: "Poppins, sans-serif" }}
// //             >
// //               Property Distribution
// //             </h3>
// //             <ResponsiveContainer width="100%" height={220}>
// //               <PieChart>
// //                 <Pie
// //                   data={propertyDistribution}
// //                   cx="50%"
// //                   cy="50%"
// //                   innerRadius={50}
// //                   outerRadius={80}
// //                   paddingAngle={5}
// //                   dataKey="value"
// //                 >
// //                   {propertyDistribution.map((entry, index) => (
// //                     <Cell key={`cell-${index}`} fill={entry.color} />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip
// //                   contentStyle={{
// //                     backgroundColor: "#1f2937",
// //                     border: "none",
// //                     borderRadius: "8px",
// //                     color: "#fff",
// //                   }}
// //                 />
// //                 <Legend />
// //               </PieChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* Recent Activity */}
// //           <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
// //             <h3
// //               className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
// //               style={{ fontFamily: "Poppins, sans-serif" }}
// //             >
// //               Recent Activity
// //             </h3>
// //             <div className="space-y-4">
// //               {[
// //                 {
// //                   type: "booking",
// //                   text: "New booking for Luxury King Suite",
// //                   time: "2 hours ago",
// //                   color: "#59A5B2",
// //                 },
// //                 {
// //                   type: "review",
// //                   text: "5-star review received for Oceanview Room",
// //                   time: "5 hours ago",
// //                   color: "#FEBC11",
// //                 },
// //                 {
// //                   type: "payment",
// //                   text: "Payment of $1,200 received",
// //                   time: "1 day ago",
// //                   color: "#10B981",
// //                 },
// //                 {
// //                   type: "booking",
// //                   text: "Booking cancelled for Standard Room",
// //                   time: "2 days ago",
// //                   color: "#EF4444",
// //                 },
// //               ].map((activity, index) => (
// //                 <div
// //                   key={index}
// //                   className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
// //                 >
// //                   <div
// //                     className="w-2 h-2 rounded-full"
// //                     style={{ backgroundColor: activity.color }}
// //                   />
// //                   <div className="flex-1">
// //                     <p className="text-sm text-gray-700 dark:text-gray-200">
// //                       {activity.text}
// //                     </p>
// //                     <p className="text-xs text-gray-500 dark:text-gray-400">
// //                       {activity.time}
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </OwnerLayout>
// //   );
// // }









// "use client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBuilding,
//   faCalendarCheck,
//   faDollarSign,
//   faStar,
//   faArrowUp,
//   faArrowDown,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { OwnerLayout } from "@/components/owner/OwnerLayout";

// const statsCards = [
//   {
//     title: "Total Properties",
//     value: "12",
//     change: "+2",
//     changeType: "increase",
//     icon: faBuilding,
//     color: "#59A5B2",
//   },
//   {
//     title: "Bookings This Month",
//     value: "48",
//     change: "+12%",
//     changeType: "increase",
//     icon: faCalendarCheck,
//     color: "#FEBC11",
//   },
//   {
//     title: "Revenue This Month",
//     value: "$24,580",
//     change: "+8.5%",
//     changeType: "increase",
//     icon: faDollarSign,
//     color: "#10B981",
//   },
//   {
//     title: "Average Rating",
//     value: "4.8",
//     change: "-0.1",
//     changeType: "decrease",
//     icon: faStar,
//     color: "#F59E0B",
//   },
// ];

// const revenueData = [
//   { month: "Jan", revenue: 12400 },
//   { month: "Feb", revenue: 15600 },
//   { month: "Mar", revenue: 18200 },
//   { month: "Apr", revenue: 16800 },
//   { month: "May", revenue: 21400 },
//   { month: "Jun", revenue: 24580 },
// ];

// const bookingsData = [
//   { month: "Jan", bookings: 28 },
//   { month: "Feb", bookings: 35 },
//   { month: "Mar", bookings: 42 },
//   { month: "Apr", bookings: 38 },
//   { month: "May", bookings: 45 },
//   { month: "Jun", bookings: 48 },
// ];

// const propertyDistribution = [
//   { name: "Luxury Suites", value: 4, color: "#59A5B2" },
//   { name: "Standard Rooms", value: 5, color: "#FEBC11" },
//   { name: "Budget Rooms", value: 3, color: "#10B981" },
// ];

// export default function OverviewPage() {
//   return (
//     <OwnerLayout>
//       <div className="space-y-6">
//         {/* Page Header */}
//         <div>
//           <h1
//             className="text-2xl md:text-3xl font-bold text-[#59A5B2]"
//             style={{ fontFamily: "Poppins, sans-serif" }}
//           >
//             Dashboard Overview
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400 mt-1">
//             Welcome back, John! Here's what's happening with your properties.
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//           {statsCards.map((card, index) => (
//             <div
//               key={index}
//               className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-shadow hover:shadow-lg"
//               data-testid={`stat-card-${index}`}
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
//                     {card.title}
//                   </p>
//                   <h3
//                     className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white"
//                     style={{ fontFamily: "Poppins, sans-serif" }}
//                   >
//                     {card.value}
//                   </h3>
//                   <div
//                     className={`flex items-center gap-1 mt-2 text-sm ${
//                       card.changeType === "increase"
//                         ? "text-green-500"
//                         : "text-red-500"
//                     }`}
//                   >
//                     <FontAwesomeIcon
//                       icon={card.changeType === "increase" ? faArrowUp : faArrowDown}
//                       className="w-3 h-3"
//                     />
//                     <span>{card.change} from last month</span>
//                   </div>
//                 </div>
//                 <div
//                   className="w-12 h-12 rounded-xl flex items-center justify-center"
//                   style={{ backgroundColor: `${card.color}20` }}
//                 >
//                   <FontAwesomeIcon
//                     icon={card.icon}
//                     className="w-6 h-6"
//                     style={{ color: card.color }}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Charts Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Revenue Line Chart */}
//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//             <h3
//               className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
//               style={{ fontFamily: "Poppins, sans-serif" }}
//             >
//               Revenue Trend
//             </h3>
//             <ResponsiveContainer width="100%" height={280}>
//               <LineChart data={revenueData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
//                 <YAxis stroke="#9ca3af" fontSize={12} />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1f2937",
//                     border: "none",
//                     borderRadius: "8px",
//                     color: "#fff",
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="revenue"
//                   stroke="#59A5B2"
//                   strokeWidth={3}
//                   dot={{ fill: "#59A5B2", strokeWidth: 2 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Bookings Bar Chart */}
//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//             <h3
//               className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
//               style={{ fontFamily: "Poppins, sans-serif" }}
//             >
//               Monthly Bookings
//             </h3>
//             <ResponsiveContainer width="100%" height={280}>
//               <BarChart data={bookingsData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                 <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
//                 <YAxis stroke="#9ca3af" fontSize={12} />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1f2937",
//                     border: "none",
//                     borderRadius: "8px",
//                     color: "#fff",
//                   }}
//                 />
//                 <Bar dataKey="bookings" fill="#FEBC11" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Property Distribution */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//             <h3
//               className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
//               style={{ fontFamily: "Poppins, sans-serif" }}
//             >
//               Property Distribution
//             </h3>
//             <ResponsiveContainer width="100%" height={220}>
//               <PieChart>
//                 <Pie
//                   data={propertyDistribution}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={50}
//                   outerRadius={80}
//                   paddingAngle={5}
//                   dataKey="value"
//                 >
//                   {propertyDistribution.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1f2937",
//                     border: "none",
//                     borderRadius: "8px",
//                     color: "#fff",
//                   }}
//                 />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Recent Activity */}
//           <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
//             <h3
//               className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
//               style={{ fontFamily: "Poppins, sans-serif" }}
//             >
//               Recent Activity
//             </h3>
//             <div className="space-y-4">
//               {[
//                 {
//                   type: "booking",
//                   text: "New booking for Luxury King Suite",
//                   time: "2 hours ago",
//                   color: "#59A5B2",
//                 },
//                 {
//                   type: "review",
//                   text: "5-star review received for Oceanview Room",
//                   time: "5 hours ago",
//                   color: "#FEBC11",
//                 },
//                 {
//                   type: "payment",
//                   text: "Payment of $1,200 received",
//                   time: "1 day ago",
//                   color: "#10B981",
//                 },
//                 {
//                   type: "booking",
//                   text: "Booking cancelled for Standard Room",
//                   time: "2 days ago",
//                   color: "#EF4444",
//                 },
//               ].map((activity, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
//                 >
//                   <div
//                     className="w-2 h-2 rounded-full"
//                     style={{ backgroundColor: activity.color }}
//                   />
//                   <div className="flex-1">
//                     <p className="text-sm text-gray-700 dark:text-gray-200">
//                       {activity.text}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       {activity.time}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </OwnerLayout>
//   );
// }









"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCalendarCheck,
  faDollarSign,
  faStar,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { OwnerLayout } from "@/components/owner/OwnerLayout";

// Types
interface OverviewData {
  stats: {
    totalProperties: number;
    bookingsThisMonth: number;
    revenueThisMonth: number;
    averageRating: string | number;
  };
  revenueData: { month: string; revenue: number }[];
  bookingsData: { month: string; bookings: number }[];
  propertyDistribution: { name: string; value: number; color: string }[];
  recentActivity: {
    type: string;
    text: string;
    time: string;
    guest?: string;
    color: string;
    amount?: number;
    status?: string;
  }[];
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function OverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from /api/owner/overview
        // Since we are in mockup mode, we'll try to fetch, but fallback to mock data if it fails (which it will because we can't update the server)
        
        const response = await fetch(`${baseUrl}/owner/overview`,{
          credentials: "include",
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setData(result.data);
          } else {
            throw new Error(result.error || "Failed to fetch data");
          }
        } else {
          // FALLBACK MOCK DATA (Because backend endpoint doesn't exist in this environment)
          console.warn("API endpoint /api/owner/overview not found. Using fallback mock data for demonstration.");
          
          // Simulating the structure returned by getOwnerOverviewData
          // const mockData: OverviewData = {
          //   stats: {
          //     totalProperties: 12, // Dynamic: Count of properties where isSuspended = false
          //     bookingsThisMonth: 48, // Dynamic: Bookings count current month
          //     revenueThisMonth: 24580, // Dynamic: Revenue sum current month
          //     averageRating: "4.8", // Dynamic: Avg rating
          //   },
          //   revenueData: [ // Graph 1: Revenue Trend
          //     { month: "Aug", revenue: 12400 },
          //     { month: "Sep", revenue: 15600 },
          //     { month: "Oct", revenue: 18200 },
          //     { month: "Nov", revenue: 16800 },
          //     { month: "Dec", revenue: 21400 },
          //     { month: "Jan", revenue: 24580 },
          //   ],
          //   bookingsData: [ // Graph 2: Monthly Bookings
          //     { month: "Aug", bookings: 28 },
          //     { month: "Sep", bookings: 35 },
          //     { month: "Oct", bookings: 42 },
          //     { month: "Nov", bookings: 38 },
          //     { month: "Dec", bookings: 45 },
          //     { month: "Jan", bookings: 48 },
          //   ],
          //   propertyDistribution: [ // Graph 3: Room Distribution (by Room Type)
          //     { name: "Luxury Suites", value: 15, color: "#59A5B2" },
          //     { name: "Standard Rooms", value: 25, color: "#FEBC11" },
          //     { name: "Budget Rooms", value: 10, color: "#10B981" },
          //   ],
          //   recentActivity: [ // Last Card: Top 4 Recent Bookings
          //     {
          //       type: "booking",
          //       text: "New booking for Luxury King Suite",
          //       guest: "John Doe",
          //       time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
          //       color: "#59A5B2",
          //       amount: 450,
          //       status: "CONFIRMED"
          //     },
          //     {
          //       type: "booking",
          //       text: "New booking for Oceanview Room",
          //       guest: "Sarah Smith",
          //       time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
          //       color: "#59A5B2",
          //       amount: 320,
          //       status: "COMPLETED"
          //     },
          //     {
          //       type: "booking",
          //       text: "New booking for Standard Room",
          //       guest: "Mike Johnson",
          //       time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
          //       color: "#59A5B2",
          //       amount: 150,
          //       status: "CONFIRMED"
          //     },
          //     {
          //       type: "booking",
          //       text: "New booking for Family Suite",
          //       guest: "Emily Davis",
          //       time: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
          //       color: "#59A5B2",
          //       amount: 550,
          //       status: "PENDING"
          //     },
          //   ],
          // };
          // setData(mockData);
        }
      } catch (err) {
        console.error("Error fetching overview data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <OwnerLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59A5B2]"></div>
        </div>
      </OwnerLayout>
    );
  }

  if (error || !data) {
    return (
      <OwnerLayout>
        <div className="flex items-center justify-center h-96 text-red-500">
          {error || "No data available"}
        </div>
      </OwnerLayout>
    );
  }

  const statsCards = [
    {
      title: "Total Properties",
      value: data.stats.totalProperties,
      // change: "+2", // You would calculate this if you had last month's data
      // changeType: "increase",
      icon: faBuilding,
      color: "#59A5B2",
    },
    {
      title: "Bookings This Month",
      value: data.stats.bookingsThisMonth,
      // change: "+12%",
      // changeType: "increase",
      icon: faCalendarCheck,
      color: "#FEBC11",
    },
    {
      title: "Revenue This Month",
      value: `$${data.stats.revenueThisMonth.toLocaleString()}`,
      // change: "+8.5%",
      // changeType: "increase",
      icon: faDollarSign,
      color: "#10B981",
    },
    {
      title: "Average Rating",
      value: data.stats.averageRating,
      // change: "-0.1",
      // changeType: "decrease",
      icon: faStar,
      color: "#F59E0B",
    },
  ];

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold text-[#59A5B2] font-heading"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Dashboard Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your properties.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-shadow hover:shadow-lg"
              data-testid={`stat-card-${index}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {card.title}
                  </p>
                  <h3
                    className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {card.value}
                  </h3>
                  {/* Change indicator removed as backend logic for previous month wasn't fully requested/implemented in basic query */}
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${card.color}20` }}
                >
                  <FontAwesomeIcon
                    icon={card.icon}
                    className="w-6 h-6"
                    style={{ color: card.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Graph 1: Revenue Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3
              className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#59A5B2"
                  strokeWidth={3}
                  dot={{ fill: "#59A5B2", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Graph 2: Monthly Bookings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3
              className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Monthly Bookings
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.bookingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="bookings" fill="#FEBC11" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2: Property Distribution & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Graph 3: Room Distribution by Room Type */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3
              className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Room Type Distribution
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={data.propertyDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.propertyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity: Top 4 Bookings */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3
              className="text-lg font-semibold text-gray-800 dark:text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Recent Booking Activity
            </h3>
            <div className="space-y-4">
              {data.recentActivity.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No recent bookings found.</p>
              ) : (
                data.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activity.color }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {activity.text}
                        </p>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                          {activity.status}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                           Guest: {activity.guest}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {formatTimeAgo(activity.time)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
