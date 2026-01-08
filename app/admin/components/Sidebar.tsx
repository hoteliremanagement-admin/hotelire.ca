"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building,
  CreditCard,
  Settings,
  LogOut,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";


const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Owners", href: "/admin/owners", icon: Users },
  { label: "Properties", href: "/admin/properties", icon: Building },
    { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
const router = useRouter();


 const  handleLogout = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );
      router.push("/");
    } catch (ex) {
      alert("Something went wrong! Unable to logout");
    }
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card shadow-sm hidden lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 font-display font-bold text-xl text-primary"
          >
            <img src="/Logo_H.png" alt="Hotelire Logo" className="h-8 w-auto" />
            <span>AdminPanel</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all cursor-pointer",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
