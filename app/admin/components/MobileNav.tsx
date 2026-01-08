"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Building,
  CreditCard,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Owners", href: "/admin/owners", icon: Users },
  { label: "Properties", href: "/admin/properties", icon: Building },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/80 px-4 backdrop-blur lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-16 items-center border-b px-6 font-display font-bold text-xl text-primary">
            <Building2 className="h-6 w-6 text-secondary mr-2" />
            PropAdmin
          </div>

          <nav className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
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
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2 font-display font-bold text-lg text-primary">
        <Building2 className="h-5 w-5 text-secondary" />
        PropAdmin
      </div>
    </div>
  );
}
