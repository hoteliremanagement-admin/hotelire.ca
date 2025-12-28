"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useOwners } from "@/hooks/use-mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, ChevronRight, Download } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";
import { toast } from "react-hot-toast";

export default function OwnersPage() {
  const { data: ownersData } = useOwners();
  const [owners, setOwners] = useState(ownersData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const filteredOwners = useMemo(() => {
    return owners.filter((o) =>
      o.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.city?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [owners, searchQuery]);

  const handleExportCSV = () => {
    setIsExporting(true);
    try {
      const headers = ["ID", "Name", "Email", "Location", "Properties", "Status"];
      const rows = filteredOwners.map(o => [
        o.id,
        `"${o.fullName}"`,
        o.email,
        `"${o.city}, ${o.province}"`,
        o.totalProperties,
        o.status
      ]);
      
      const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `owners_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Owners list exported successfully");
    } catch (error) {
      toast.error("Failed to export owners list");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Property Owners
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
          
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" />
            Add Owner
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row items-center gap-4 justify-between bg-muted/10">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search owners by name or email..."
              className="pl-9 bg-background border-border/60 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[300px]">Name & Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Properties</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredOwners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  No owners found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredOwners.map((owner) => (
                <TableRow
                  key={owner.id}
                  className="hover:bg-muted/30 transition-colors group"
                >
                  <TableCell>
                    <Link href={`/admin/owners/${owner.id}`} className="block">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {owner.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {owner.fullName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {owner.email}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </TableCell>

                  <TableCell>
                    <p className="text-sm">
                      {owner.city}, {owner.province}
                    </p>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">
                        {owner.totalProperties}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Properties
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={owner.subscriptionStatus} />
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={owner.status} />
                  </TableCell>

                  <TableCell className="text-right">
                    <Link href={`/admin/owners/${owner.id}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-primary"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Footer / Pagination */}
        <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
          <p>Showing {filteredOwners.length} owners</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
