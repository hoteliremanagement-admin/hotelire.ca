"use client";


import React, { useState, useEffect, useMemo } from "react";
import { OwnerLayout } from "@/components/owner/OwnerLayout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  ArrowUpRight,
  DollarSign,
  TrendingUp,
  CreditCard,
  Calendar as CalendarIcon,
  Filter,
  Download,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { Link } from "wouter";
import { authCheck } from "@/services/authCheck";
import { useRouter } from "next/navigation";


// --- Types ---
interface Transaction {
  id: string;
  date: string;
  bookingId: string;
  property: string;
  guest: string;
  amount: number;
  status: string;
  type: "Payment" | "Refund";
}

interface RevenueStats {
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayouts: number;
  growth: number;
}

interface ChartData {
  name: string;
  fullDate: string;
  revenue: number;
}

interface PropertyRevenue {
  name: string;
  value: number;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Revenue() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [revenueStats, setRevenueStats] = useState<RevenueStats>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    pendingPayouts: 0,
    growth: 0
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [propertyRevenueData, setPropertyRevenueData] = useState<PropertyRevenue[]>([]);
  const [user, setUser] = useState<any>(null);

  // Table State
  const [visibleColumns, setVisibleColumns] = useState({
    date: true,
    property: true,
    guest: true,
    amount: true,
    status: true,
    action: true
  });
  const [showColumnToggle, setShowColumnToggle] = useState(false);

  const router = useRouter();


  useEffect(() => {
    const init = async () => {
      try {
        const authData = await authCheck();
        if (authData?.user) {
          setUser(authData.user);
          await fetchData(authData.user.userid);
        }
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const fetchData = async (ownerId: number) => {
    try {
      const [statsRes, txRes] = await Promise.all([
        fetch(`${baseUrl}/owner/revenue/${ownerId}/stats`),
        fetch(`${baseUrl}/owner/revenue/${ownerId}/transactions`)
      ]);

      if (statsRes.ok && txRes.ok) {
        const statsData = await statsRes.json();
        const txData = await txRes.json();

        if (statsData.success) {
          setRevenueStats(statsData.data.stats);
          setChartData(statsData.data.chartData);
          setPropertyRevenueData(statsData.data.propertyRevenue);
        }

        if (txData.success) {
          setTransactions(txData.data);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const toggleColumn = (key: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) {
    return (
      <OwnerLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#59A5B2] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading Revenue Data...</p>
          </div>
        </div>
      </OwnerLayout>
    );
  }

  return (
    <OwnerLayout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-heading">Revenue Dashboard</h1>
            <p className="text-gray-500 mt-1">Track your earnings and payouts in real-time</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium shadow-sm transition-all">
              <CalendarIcon className="w-4 h-4" />
              <span>This Year</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#59A5B2] text-white rounded-xl hover:bg-[#4a9199] font-medium shadow-md shadow-[#59A5B2]/20 transition-all">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <DollarSign className="w-24 h-24 text-[#59A5B2]" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-gray-500 font-medium">Total Revenue</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-gray-900">${revenueStats.totalRevenue.toLocaleString()}</h3>
              <span className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                {revenueStats.growth}%
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-2">Gross earnings before fees</p>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="w-24 h-24 text-[#FEBC11]" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-gray-500 font-medium">This Month</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-gray-900">${revenueStats.monthlyRevenue.toLocaleString()}</h3>
            </div>
            <p className="text-sm text-gray-400 mt-2">Earnings for {format(new Date(), "MMMM")}</p>
          </div>

          {/* Pending Payouts */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CreditCard className="w-24 h-24 text-purple-500" />
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                <CreditCard className="w-6 h-6" />
              </div>
              <span className="text-gray-500 font-medium">Pending Payouts</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-gray-900">${revenueStats.pendingPayouts.toLocaleString()}</h3>
            </div>
            <p className="text-sm text-gray-400 mt-2">Estimated upcoming payouts</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Over Time */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue Trend</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#59A5B2" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#59A5B2" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF' }} tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#59A5B2', strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#59A5B2" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue by Property */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Revenue by Property</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={propertyRevenueData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#4B5563', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: '#F3F4F6' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#59A5B2" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>

            <div className="relative">
              <button
                onClick={() => setShowColumnToggle(!showColumnToggle)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                Customize Columns
              </button>

              {showColumnToggle && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-10 p-2 animate-in fade-in zoom-in-95 duration-200">
                  <p className="text-xs font-semibold text-gray-500 px-2 py-1 mb-1">Toggle Columns</p>
                  {Object.keys(visibleColumns).map((col) => (
                    <label key={col} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={visibleColumns[col as keyof typeof visibleColumns]}
                        onChange={() => toggleColumn(col as keyof typeof visibleColumns)}
                        className="rounded border-gray-300 text-[#59A5B2] focus:ring-[#59A5B2]"
                      />
                      <span className="text-sm text-gray-700 capitalize">{col}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  {visibleColumns.date && <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>}
                  {visibleColumns.property && <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>}
                  {visibleColumns.guest && <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest</th>}
                  {visibleColumns.amount && <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>}
                  {visibleColumns.status && <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>}
                  {visibleColumns.action && <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    {visibleColumns.date && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {format(parseISO(tx.date), "MMM d, yyyy")}
                      </td>
                    )}
                    {visibleColumns.property && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {tx.property}
                      </td>
                    )}
                    {visibleColumns.guest && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {tx.guest}
                      </td>
                    )}
                    {visibleColumns.amount && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#59A5B2]">
                        +${tx.amount.toLocaleString()}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {tx.status}
                        </span>
                      </td>
                    )}

                    {visibleColumns.action && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      
                        <button
                          onClick={() =>
                            router.push(`/owner/bookings?bookingId=${tx.bookingId.replace("BK", "")}`)
                          }
                        >


                          <span className="text-[#59A5B2] hover:text-[#4a9199] flex items-center justify-end gap-1 cursor-pointer">
                            View Booking <ArrowUpRight className="w-3 h-3" />
                          </span>
                        </button>


                      </td>
                    )}
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </OwnerLayout>
  );
} 