
"use client"

import { Suspense } from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Plus, ChevronRight, Trash2, Download } from "lucide-react"
import { StatusBadge } from "../components/StatusBadge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Owner {
  id: number
  fullName: string
  email: string
  city: string
  province: string
  totalProperties: number
  subscriptionStatus: string
  status: string
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


function OwnersContent() {

  const router = useRouter();
  const [owners, setOwners] = useState<Owner[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"properties" | "name">("properties")
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [isExporting, setIsExporting] = useState(false);


  // useEffect(() => {
  // const fetchOwners = async () => {
  //   try {
  //     const response = await fetch(`${baseUrl}/admin/owners`)
  //     const data = await response.json()
  //     setOwners(data);
  //     if(!data){
  //       alert("Owners data is empty ");
  //       router.push('/admin');
  //     }
  //   } catch (error) {
  //     console.error("Error fetching owners:", error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  //   fetchOwners()
  // }, [])


  //     fetchOwners()
  //   }, [])

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch(`${baseUrl}/admin/owners`)
        const data = await response.json()

        // ✅ SAFETY CHECK
        if (Array.isArray(data)) {
          setOwners(data)
        } else if (Array.isArray(data?.owners)) {
          setOwners(data.owners)
        } else if (Array.isArray(data?.data)) {
          setOwners(data.data)
        } else {
          setOwners([])
          console.warn("Owners response is not an array:", data)
        }
      } catch (error) {
        console.error("Error fetching owners:", error)
        setOwners([])
      } finally {
        setLoading(false)
      }
    }

    fetchOwners()
  }, [])


  const sortedOwners = [...owners].sort((a, b) => {
    if (sortBy === "properties") {
      return b.totalProperties - a.totalProperties
    }
    return a.fullName.localeCompare(b.fullName)
  })

  const filteredOwners = sortedOwners.filter(
    (owner) =>
      owner.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteOwner = async (ownerId: number) => {
    setDeleting(true)
    try {
      const response = await fetch(`${baseUrl}/admin/owners/${ownerId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setOwners((prev) => prev.filter((owner) => owner.id !== ownerId))
        setDeleteConfirm(null)
      } else {
        alert("Failed to delete owner")
      }
    } catch (error) {
      console.error("Error deleting owner:", error)
      alert("Error deleting owner")
    } finally {
      setDeleting(false)
    }
  }

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
      toast({
        title: "Success",
        description: "Owners list exported successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export owners list",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Property Owners</h1>

        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 gap-2"
            variant="outline"


            onClick={handleExportCSV}
            disabled={isExporting}
          >
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? "Exporting..." : "Export CSV"}
          </Button>

          <Link href="/admin/owners/add">
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
              <Plus className="mr-2 h-4 w-4" />
              Add Owner
            </Button>
          </Link>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            className="gap-2 bg-transparent"
            onClick={() => setSortBy(sortBy === "properties" ? "name" : "properties")}
          >
            <Filter className="h-4 w-4" />
            {sortBy === "properties" ? "Sort: Properties ↓" : "Sort: Name ↑"}
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading owners...
                </TableCell>
              </TableRow>
            ) : filteredOwners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No owners found
                </TableCell>
              </TableRow>
            ) : (
              filteredOwners.map((owner) => (
                <TableRow key={owner.id} className="hover:bg-muted/30 transition-colors group">
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
                          <p className="text-sm text-muted-foreground">{owner.email}</p>
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
                      <span className="font-bold">{owner.totalProperties}</span>
                      <span className="text-xs text-muted-foreground">Properties</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={owner.subscriptionStatus} />
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={owner.status} />
                  </TableCell>

                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <Link href={`/admin/owners/${owner.id}`}>
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-red-500"
                      onClick={() => setDeleteConfirm(owner.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Owner</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this owner? This action will also delete all their properties, bookings,
              and subscriptions. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteConfirm) {
                  handleDeleteOwner(deleteConfirm)
                }
              }}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default function OwnersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading owners...</div>}>
      <OwnersContent />
    </Suspense>
  )
}
