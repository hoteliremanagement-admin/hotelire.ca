"use client"
import { useEffect, useState } from "react"
import { Users, Building, CalendarCheck, TrendingUp, DollarSign, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
interface DashboardStats {
  totalOwners: number
  ownersTrend: number
  totalProperties: number
  propertiesTrend: number
  totalBookings: number
  bookingsTrend: number
  totalRevenue: number
  revenueTrend: number
  chartData: Array<{ date: string; revenue: number }>
  quickStats: {
    activeSubscriptions: number
    bookingRate: number
    satisfaction: string | number
  }
}
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${baseUrl}/admin/dashboard`)
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])
  if (loading || !stats) {
    return <div className="p-8 text-center">Loading dashboard...</div>
  }
  const statCards = [
    {
      title: "Total Owners",
      value: stats.totalOwners,
      icon: Users,
      trend: `${stats.ownersTrend >= 0 ? "+" : ""}${stats.ownersTrend}`,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: Building,
      trend: `${stats.propertiesTrend >= 0 ? "+" : ""}${stats.propertiesTrend}`,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarCheck,
      trend: `${stats.bookingsTrend >= 0 ? "+" : ""}${stats.bookingsTrend}`,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Monthly Revenue (Prev)",
      value: `$${(stats.totalRevenue).toFixed(2)}`,
      icon: DollarSign,
      trend: `${stats.revenueTrend >= 0 ? "+" : ""}${stats.revenueTrend}`,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ]
  const handleExportStats = () => {
    setIsExporting(true);
    setTimeout(() => {
      try {
        const csvContent = "Stat,Value,Trend\n" +
          statCards.map(s => `${s.title},${s.value},${s.trend}%`).join("\n");
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
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
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
          <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2 font-display">{stat.value}</h3>
                  <p
                    className={`text-xs font-medium mt-1 flex items-center gap-1 ${Number(stat.trend) >= 0 ? "text-emerald-600" : "text-red-600"
                      }`}
                  >
                    <TrendingUp className="h-3 w-3" />
                    {Number(stat.trend) >= 0 }
                    {stat.trend}% from last month
                  </p>
                </div>
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
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
            <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
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
            <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <StatBar
              title="Active Subscriptions"
              subtitle="Premium Plan"
              value={`${stats.quickStats.activeSubscriptions}%`}
              percent={stats.quickStats.activeSubscriptions}
              color="bg-emerald-500"
            />
            <StatBar
              title="Booking Rate"
              subtitle="Avg. per property"
              value={stats.quickStats.bookingRate.toString()}
              percent={Math.min(stats.quickStats.bookingRate * 10, 100)}
              color="bg-secondary"
            />
            <StatBar
              title="Customer Satisfaction"
              subtitle="Based on reviews"
              value={`${stats.quickStats.satisfaction}/5`}
              percent={(Number.parseFloat(stats.quickStats.satisfaction.toString()) / 5) * 100}
              color="bg-primary"
            />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
/* Small helper component */
function StatBar({
  title,
  subtitle,
  value,
  percent,
  color,
}: {
  title: string
  subtitle: string
  value: string
  percent: number
  color: string
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
      <div
        className="w-full bg-muted rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}