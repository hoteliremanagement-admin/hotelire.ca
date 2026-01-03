// "use client";
// import { useEffect, useState } from "react";


// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


// export default function OwnerSubscriptionDetails() {
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     (async () => {
//       const res = await fetch(`${baseUrl}/stripes/subscription/details`, {
//         credentials: "include",
//       });
//       const json = await res.json();
//       setData(json);
//     })();
//   }, []);


//   if (!data) return <p>Loading...</p>;

//   return (
//     <div className="p-6 space-y-4 border rounded shadow">

//       <h2 className="text-2xl font-bold">
//         Subscription Overview
//       </h2>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="p-3 rounded border">
//           <p>Status:</p>
//           <b>{data.status}</b>
//         </div>

//         <div className="p-3 rounded border">
//           <p>Plan Price:</p>
//           <b>
//             {data.currency} {data.pricePerMonth}/month
//           </b>
//         </div>

//         <div className="p-3 rounded border">
//           <p>Total Paid:</p>
//           <b>
//             {data.currency} {data.totalPaid}
//           </b>
//         </div>

//         <div className="p-3 rounded border">
//           <p>Paid Months:</p>
//           <b>{data.paidMonths}</b>
//         </div>

//         <div className="p-3 rounded border col-span-2">
//           <p>Next Billing Date:</p>
//           <b>{new Date(data.nextBillingDate).toLocaleString()}</b>
//         </div>
//       </div>

//       <h3 className="text-xl font-semibold mt-4">
//         Payment History
//       </h3>

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Date</th>
//             <th className="p-2 border">Amount</th>
//             <th className="p-2 border">Status</th>
//             <th className="p-2 border">Invoice</th>
//           </tr>
//         </thead>

//         <tbody>
//           {data.history.map((h: any) => (
//             <tr key={h.invoiceId}>
//               <td className="p-2 border">
//                 {new Date(h.createdAt).toLocaleDateString()}
//               </td>

//               <td className="p-2 border">
//                 {data.currency} {h.amount}
//               </td>

//               <td className="p-2 border">
//                 {h.status}
//               </td>

//               <td className="p-2 border text-blue-600 underline">
//                 <a href={h.hostedInvoiceUrl} target="_blank">
//                   View
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { Calendar, CreditCard, TrendingUp, FileText, AlertCircle } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function OwnerSubscriptionDetails() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/stripes/subscription/details`, {
                credentials: "include",
            });
            const json = await res.json();
            setData(json);
        })();
    }, []);


    console.log(data);

    if (!data) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
                    <p className="text-gray-600">Loading subscription details...</p>
                </div>
            </div>
        );

    }

    const statusColors: Record<string, string> = {
        active: "bg-green-50 text-green-700 border border-green-200",
        inactive: "bg-gray-50 text-gray-700 border border-gray-200",
        pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
        cancelled: "bg-red-50 text-red-700 border border-red-200",
    };


    if (data.message === "No subscription found") {
        return (<>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-900">
                <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-red-600 font-medium">{data.message}</p>
                </div>
                <div className="text-lg mt-4  ms-5 font-semibold text-green-700 tracking-wide">

                    Please,  Subscribe in order to show case your properties to the world
                </div>
            </div>

        </>);
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-900">Subscription Overview</h2>
                <p className="text-gray-600 text-sm mt-1">Manage and monitor your subscription details</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium mb-2">Subscription Status</p>
                            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[data.status?.toLowerCase()] || statusColors.inactive}`}>
                                {data.status}
                            </div>
                        </div>
                        <div className="text-blue-600 opacity-20">
                            <CreditCard size={24} />
                        </div>
                    </div>
                </div>

                {/* Plan Price Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium mb-2">Monthly Plan Price</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {data.currency} {data.pricePerMonth}
                                <span className="text-lg text-gray-600 font-normal">/month</span>
                            </p>
                        </div>
                        <div className="text-blue-600 opacity-20">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </div>

                {/* Total Paid Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium mb-2">Total Amount Paid</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {data.currency} {data.totalPaid}
                            </p>
                        </div>
                        <div className="text-green-600 opacity-20">
                            <CreditCard size={24} />
                        </div>
                    </div>
                </div>

                {/* Paid Months Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium mb-2">Months Subscribed</p>
                            <p className="text-3xl font-bold text-gray-900">{data.paidMonths}</p>
                            <p className="text-xs text-gray-500 mt-1">consecutive months</p>
                        </div>
                        <div className="text-purple-600 opacity-20">
                            <Calendar size={24} />
                        </div>
                    </div>
                </div>

               
            </div>










            

            {/* Payment History Section */}
            <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText size={20} />
                    Payment History
                </h3>

                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.history.map((h: any) => (
                                    <tr key={h.invoiceId} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {new Date(h.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                            {data.currency}{h.amount}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${h.status?.toLowerCase() === "paid"
                                                    ? "bg-green-50 text-green-700 border border-green-200"
                                                    : h.status?.toLowerCase() === "pending"
                                                        ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                                                        : "bg-gray-50 text-gray-700 border border-gray-200"
                                                }`}>
                                                {h.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={h.hostedInvoiceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                                            >
                                                <FileText size={16} />
                                                View Invoice
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>



    );
}