"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { AlertTitle, AlertDescription } from "@/components/ui/alert"

interface AlertStripProps {
  title?: string
  message: string
  type?: "info" | "warning" | "success" | "error"
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

export default function AlertStrip({ title, message, type = "info", icon, action }: AlertStripProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const variants = {
    info: "bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-200 text-blue-900",
    warning: "bg-gradient-to-r from-amber-50 to-amber-100/50 border-amber-200 text-amber-900",
    success: "bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-emerald-200 text-emerald-900",
    error: "bg-gradient-to-r from-red-50 to-red-100/50 border-red-200 text-red-900",
  }

  return (
    <div className="mt-5 px-4 md:px-6 lg:px-3">
    <div className={`w-full rounded-lg border px-4 py-4 shadow-sm ${variants[type]}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          {icon && <div className="mt-0.5 flex-shrink-0">{icon}</div>}

          <div className="flex-1 min-w-0">
            {title && <AlertTitle className="text-sm font-semibold text-current mb-1">{title}</AlertTitle>}
            <AlertDescription className="text-sm text-current/80">{message}</AlertDescription>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 flex-shrink-0">
          {action && (
            <button
              onClick={action.onClick}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
                type === "info"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : type === "warning"
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : type === "success"
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {action.label}
            </button>
          )}

          <button
            onClick={() => setIsVisible(false)}
            className={`p-1.5 rounded-md transition-all duration-200 hover:bg-white/40 text-current/60 hover:text-current flex-shrink-0`}
            aria-label="Close alert"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}
