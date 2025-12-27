"use client";

import { useState } from "react";
import Link from "next/link";
import { useProperties } from "@/hooks/use-mock-data";
import { Input } from "@/components/ui/input";
import { Search, MapPin, LayoutGrid, List } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";
import { cn } from "@/lib/utils";

export default function PropertiesPage() {
  const { data: properties } = useProperties();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Properties
        </h1>

        <div
          className="border rounded-lg p-1 flex bg-muted/20"
          role="tablist"
          aria-label="View mode"
        >
          <button
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
            className={cn(
              "p-1.5 rounded-md transition-all",
              viewMode === "grid"
                ? "bg-white shadow-sm"
                : "text-muted-foreground"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>

          <button
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
            className={cn(
              "p-1.5 rounded-md transition-all",
              viewMode === "list"
                ? "bg-white shadow-sm"
                : "text-muted-foreground"
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search properties..." className="pl-9" />
      </div>

      {/* Properties Grid/List */}
      <div
        className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
        )}
      >
        {properties.map((property) => (
          <Link
            key={property.id}
            href={`/admin/properties/${property.id}`}
            className="group h-full block"
          >
            <article
              className={cn(
                "bg-card border rounded-xl overflow-hidden shadow-sm transition-all h-full",
                "group-hover:shadow-md cursor-pointer",
                viewMode === "list" && "flex flex-row h-40"
              )}
            >
              {/* Image */}
              <div
                className={cn(
                  "relative bg-muted",
                  viewMode === "grid"
                    ? "h-52 w-full"
                    : "h-full w-64 flex-shrink-0"
                )}
              >
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <StatusBadge
                    status={property.status}
                    className="shadow-sm backdrop-blur-sm bg-white/90"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-lg leading-tight text-foreground">
                    {property.title}
                  </h3>

                  <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-2">
                    <MapPin className="h-3.5 w-3.5" />
                    {property.city}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">
                    {property.ownerName}
                  </span>

                  <span className="font-semibold text-emerald-600">
                    ${(property.revenue ?? 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
