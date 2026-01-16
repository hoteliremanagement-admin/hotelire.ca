"use client";
import { cn } from "@/lib/utils";

type StatusType = "Active" | "Suspended" | "Paid" | "Unpaid" | "Pending" | "Failed" | "Inactive";

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStyles = (s: string) => {
    switch (s.toLowerCase()) {
      case "active":
      case "paid":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "suspended":
      case "inactive":
      case "failed":
      case "unpaid":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
      getStyles(status),
      className
    )}>
      {status}
    </span>
  );
}
