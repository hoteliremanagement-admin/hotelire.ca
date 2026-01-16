"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Plus, ChevronRight, Trash2, Download } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Customer {
  id: number
  fullName: string
  email: string
  city: string
  province: string
  totalBookings: number
  status: string
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function CustomersContent() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${baseUrl}/admin/customers`)
        const data = await response.json()
        setCustomers(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error fetching customers:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCustomers()
  }, [])

  const filteredCustomers = customers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = async (id: number) => {
    setDeleting(true)
    try {
      const response = await fetch(`${baseUrl}/admin/customers/${id}`, { method: "DELETE" })
      if (response.ok) {
        setCustomers((prev) => prev.filter((c) => c.id !== id))
        setDeleteConfirm(null)
      }
    } catch (error) {
      console.error("Error deleting customer:", error)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Customers</h1>
        <div className="flex gap-2">
          <Link href="/admin/customers/add">
            <Button className="bg-primary text-white"><Plus className="mr-2 h-4 w-4" /> Add Customer</Button>
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm">
        <div className="p-4 border-b flex justify-between gap-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Sort</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name & Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
            ) : filteredCustomers.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <Link href={`/admin/customers/${c.id}`}>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold">{c.fullName.charAt(0)}</div>
                      <div>
                        <p className="font-medium">{c.fullName}</p>
                        <p className="text-sm text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{c.city}, {c.province}</TableCell>
                <TableCell>{c.totalBookings}</TableCell>
                <TableCell>{c.status}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/customers/${c.id}`}><Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button></Link>
                  <Button variant="ghost" size="icon" className="hover:text-red-500" onClick={() => setDeleteConfirm(c.id)}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* <AlertDialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer</AlertDialogTitle>
            <AlertDialogDescription>Are you sure? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteConfirm && handleDelete(deleteConfirm)} disabled={deleting} className="bg-red-600">
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog> */}


        {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Owner</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? Deleting user will remove all associated data. This action cannot be undone. 
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteConfirm) {
                  handleDelete(deleteConfirm)
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
    </div>
  )
}

export default function CustomersPage() {
  return <Suspense fallback={<div>Loading...</div>}><CustomersContent /></Suspense>
}
