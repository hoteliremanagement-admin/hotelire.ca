"use client";

import { useState } from "react";
import { useDashboardStats } from "@/hooks/use-mock-data";
import {
  Users,
  Building,
  CalendarCheck,
  TrendingUp,
  DollarSign,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

/* Mock chart data */
const chartData = [
  { name: "Jan", revenue: 4000, bookings: 24 },
  { name: "Feb", revenue: 3000, bookings: 18 },
  { name: "Mar", revenue: 2000, bookings: 12 },
  { name: "Apr", revenue: 2780, bookings: 20 },
  { name: "May", revenue: 1890, bookings: 15 },
  { name: "Jun", revenue: 2390, bookings: 22 },
  { name: "Jul", revenue: 3490, bookings: 30 },
  { name: "Aug", revenue: 4200, bookings: 35 },
  { name: "Sep", revenue: 5100, bookings: 42 },
  { name: "Oct", revenue: 6500, bookings: 55 },
];

export default function DashboardPage() {
  const { data: stats } = useDashboardStats();
  const [isExporting, setIsExporting] = useState(false);

  const statCards = [
    {
      title: "Total Owners",
      value: stats.totalOwners,
      icon: Users,
      trend: "+12%",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: Building,
      trend: "+5%",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarCheck,
      trend: "+18%",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Monthly Revenue",
      value: `$${(stats.totalRevenue / 1000).toFixed(1)}k`,
      icon: DollarSign,
      trend: "+24%",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  const handleExportStats = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        const csvContent = "Stat,Value,Trend\n" + 
          statCards.map(s => `${s.title},${s.value},${s.trend}`).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `dashboard_stats_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        toast.success("Dashboard stats exported");
      } catch (e) {
        toast.error("Export failed");
      } finally {
        setIsExporting(false);
      }
    }, 1000);
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Dashboard
        </h1>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={handleExportStats}
          disabled={isExporting}
        >
          <Download className="h-4 w-4" />
          {isExporting ? "Exporting..." : "Export Stats"}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, i) => (
          <Card
            key={i}
            className="border-border/50 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-2 font-display">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend} from last month
                  </p>
                </div>
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bg}`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E2E8F0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748B", fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <StatBar
              title="Active Subscriptions"
              subtitle="Premium Plan"
              value="84%"
              percent={84}
              color="bg-emerald-500"
            />
            <StatBar
              title="Booking Rate"
              subtitle="Avg. per property"
              value="12.5"
              percent={65}
              color="bg-secondary"
            />
            <StatBar
              title="Customer Satisfaction"
              subtitle="Based on reviews"
              value="4.8/5"
              percent={96}
              color="bg-primary"
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

/* Small helper component */
function StatBar({
  title,
  subtitle,
  value,
  percent,
  color,
}: {
  title: string;
  subtitle: string;
  value: string;
  percent: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <span className="font-bold text-lg">{value}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
