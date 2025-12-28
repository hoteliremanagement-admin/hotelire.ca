"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useProperties } from "@/hooks/use-mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, LayoutGrid, List, Download, Filter } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

export default function PropertiesPage() {
  const { data: propertiesData } = useProperties();
  const [properties, setProperties] = useState(propertiesData);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const filteredProperties = useMemo(() => {
    return properties.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [properties, searchQuery]);

  const handleExportCSV = () => {
    setIsExporting(true);
    try {
      const headers = ["ID", "Title", "Owner", "City", "Status", "Revenue"];
      const rows = filteredProperties.map(p => [
        p.id,
        `"${p.title}"`,
        `"${p.ownerName}"`,
        p.city,
        p.status,
        p.revenue
      ]);
      
      const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `properties_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Properties exported successfully");
    } catch (error) {
      toast.error("Failed to export properties");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Properties
        </h1>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={handleExportCSV}
            disabled={isExporting}
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Exporting..." : "Export CSV"}
          </Button>

          <div className="border rounded-lg p-1 flex bg-muted/20">
            <button
              onClick={() => setViewMode("grid")}
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
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search properties..." 
            className="pl-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Button variant="outline" className="gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Properties Grid/List */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-muted/10 rounded-xl border border-dashed">
          <p className="text-muted-foreground">No properties found matching your search.</p>
        </div>
      ) : (
        <div
          className={cn(
            "grid gap-6",
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          )}
        >
          {filteredProperties.map((property) => (
            <Link
              key={property.id}
              href={`/admin/properties/${property.id}`}
              className="h-full"
            >
              <div
                className={cn(
                  "bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer h-full",
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
                      ${property.revenue?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
