// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Download, Filter, FileText, Loader2 } from "lucide-react";
// import { StatusBadge } from "../components/StatusBadge";
// import { Card, CardContent } from "@/components/ui/card";

// interface Payment {
//   id: string;
//   ownerName: string;
//   month: string;
//   amount: number;
//   method: string;
//   status: string;
// }

// interface Stats {
//   totalCollected: number;
//   pending: number;
//   failed: number;
// }
// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// export default function PaymentsPage() {
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [stats, setStats] = useState<Stats>({
//     totalCollected: 0,
//     pending: 0,
//     failed: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/admin/payments`,{
//           credentials: "include",
//         });
//         if (response.ok) {
//           const result = await response.json();
//           if (result.success) {
//             setPayments(result.payments);
//             setStats(result.stats);
//           }
//         } else {
//           // Fallback to mock data for presentation if API not ready
//           console.warn("API /api/admin/payments not found. Showing demo data.");
//           setPayments([
//             { id: "in_1QwErT", ownerName: "John Smith", month: "January 2026", amount: 120.0, method: "Credit Card", status: "paid" },
//             { id: "in_2AzXcV", ownerName: "Sarah Connor", month: "January 2026", amount: 80.0, method: "Credit Card", status: "paid" },
//             { id: "in_3PoLiK", ownerName: "Mike Tyson", month: "January 2026", amount: 40.0, method: "Credit Card", status: "open" },
//           ]);
//           setStats({
//             totalCollected: 200.0,
//             pending: 40.0,
//             failed: 0,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching payments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Page Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-display font-bold text-foreground">
//           Payments & Invoices
//         </h1>
//         <p className="text-muted-foreground mt-1">
//           Track owner subscriptions and monthly transactions (Live Stripe Data)
//         </p>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100 dark:from-emerald-950/20 dark:to-background">
//           <CardContent className="p-6">
//             <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400">
//               Total Collected (This Month)
//             </p>
//             <h3 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mt-2">
//               ${stats.totalCollected.toFixed(2)}
//             </h3>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100 dark:from-amber-950/20 dark:to-background">
//           <CardContent className="p-6">
//             <p className="text-sm font-medium text-amber-800 dark:text-amber-400">Pending</p>
//             <h3 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mt-2">
//               ${stats.pending.toFixed(2)}
//             </h3>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-br from-rose-50 to-white border-rose-100 dark:from-rose-950/20 dark:to-background">
//           <CardContent className="p-6">
//             <p className="text-sm font-medium text-rose-800 dark:text-rose-400">
//               Failed Transactions
//             </p>
//             <h3 className="text-3xl font-bold text-rose-900 dark:text-rose-100 mt-2">
//               {stats.failed}
//             </h3>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Transactions Table */}
//       <div className="bg-card rounded-xl border shadow-sm">
//         <div className="p-4 border-b flex justify-between items-center">
//           <h3 className="font-semibold">Transaction History</h3>
//           <div className="flex gap-2">
//             <Button variant="outline" size="sm" className="gap-2">
//               <Filter className="h-4 w-4" />
//               Filter
//             </Button>
//             <Button variant="outline" size="sm" className="gap-2">
//               <Download className="h-4 w-4" />
//               Export CSV
//             </Button>
//           </div>
//         </div>

//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Invoice ID</TableHead>
//               <TableHead>Owner</TableHead>
//               <TableHead>Month</TableHead>
//               <TableHead>Amount</TableHead>
//               <TableHead>Method</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Action</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {payments.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
//                   No transactions found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               payments.map((payment) => (
//                 <TableRow key={payment.id}>
//                   <TableCell className="font-mono text-xs text-muted-foreground">
//                     #{payment.id.substring(0, 12)}...
//                   </TableCell>
//                   <TableCell className="font-medium">
//                     {payment.ownerName}
//                   </TableCell>
//                   <TableCell>{payment.month}</TableCell>
//                   <TableCell>
//                     ${payment.amount.toFixed(2)}
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <span className="h-2 w-2 rounded-full bg-indigo-500" />
//                       {payment.method}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <StatusBadge status={payment.status} />
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="gap-2 hover:text-primary"
//                     >
//                       <FileText className="h-4 w-4" />
//                       View
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </>
//   );
// }




"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Filter, FileText, Loader2, ArrowUpDown } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";

interface Payment {
  id: string;
  ownerName: string;
  month: string;
  amount: number;
  method: string;
  status: string;
  date: string;
  invoicePdf: string;
}

interface Stats {
  totalCollected: number;
  pending: number;
  failed: number;
}
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "/api";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalCollected: 0,
    pending: 0,
    failed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const fetchPayments = async (order: 'asc' | 'desc' = 'desc') => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/admin/payments?sort=${order}`, {
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setPayments(result.payments);
          setStats(result.stats);
        }
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(sortOrder);
  }, []);

  const toggleSort = () => {
    const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newOrder);
    fetchPayments(newOrder);
  };

  const exportToCSV = () => {
    if (payments.length === 0) return;
    
    const headers = ["Invoice ID", "Owner", "Month", "Amount", "Method", "Status", "Date"];
    const csvContent = [
      headers.join(","),
      ...payments.map(p => [
        p.id,
        `"${p.ownerName}"`,
        p.month,
        p.amount.toFixed(2),
        p.method,
        p.status,
        p.date
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `payments_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewInvoice = (pdfUrl: string) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      alert("Invoice PDF not available for this transaction.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Payments & Invoices
        </h1>
        <p className="text-muted-foreground mt-1">
          Track owner subscriptions and monthly transactions (Live Stripe Data)
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100 dark:from-emerald-950/20 dark:to-background">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400">
              Total Collected (This Month)
            </p>
            <h3 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mt-2">
              ${stats.totalCollected.toFixed(2)}
            </h3>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100 dark:from-amber-950/20 dark:to-background">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-400">Pending</p>
            <h3 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mt-2">
              ${stats.pending.toFixed(2)}
            </h3>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50 to-white border-rose-100 dark:from-rose-950/20 dark:to-background">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-rose-800 dark:text-rose-400">
              Failed Transactions
            </p>
            <h3 className="text-3xl font-bold text-rose-900 dark:text-rose-100 mt-2">
              {stats.failed}
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <div className="bg-card rounded-xl border shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">Transaction History</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={toggleSort}>
              <Filter className="h-4 w-4" />
              {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={exportToCSV}>
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    #{payment.id.substring(0, 12)}...
                  </TableCell>
                  <TableCell className="font-medium">
                    {payment.ownerName}
                  </TableCell>
                  <TableCell>{payment.month}</TableCell>
                  <TableCell>
                    ${payment.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                      {payment.method}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={payment.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 hover:text-primary"
                      onClick={() => handleViewInvoice(payment.invoicePdf)}
                    >
                      <FileText className="h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
