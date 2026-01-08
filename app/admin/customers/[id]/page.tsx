"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Mail, Phone, Building, Calendar, DollarSign, ChevronRight } from "lucide-react"

interface CustomerDetails {
  id: number
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
  status: string
  totalBookings: number
  totalSpent: number
  bookings: Array<{
    id: number
    checkIn: string
    checkOut: string
    amount: number
    status: string
    property: {
      title: string
      image: string
      owner: string
    }
  }>
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function CustomerProfilePage() {
  const params = useParams()
  const id = Number(params.id)
  const [customer, setCustomer] = useState<CustomerDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`${baseUrl}/admin/customers/${id}`)
        const data = await response.json()
        setCustomer(data)
      } catch (error) {
        console.error("Error fetching customer:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCustomer()
  }, [id])

  if (loading) return <div className="p-8 text-center">Loading...</div>
  if (!customer) return <div className="p-8 text-center">Customer not found</div>


    const formatDate1 = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  return (
    <div className="p-8">
      <Link href="/admin/customers">
        <Button variant="ghost" className="mb-6 gap-2"><ArrowLeft className="h-4 w-4" /> Back to Customers</Button>
      </Link>

      <div className="bg-card border rounded-xl p-6 shadow-sm mb-6 flex gap-6">
        <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center text-white text-3xl font-bold">{customer.fullName.charAt(0)}</div>
        <div>
          <h1 className="text-2xl font-bold">{customer.fullName}</h1>
          <div className="flex gap-4 mt-2 text-muted-foreground text-sm">
            <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {customer.email}</span>
            <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> {customer.phone}</span>
          </div>
          <div className="mt-4"><span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold uppercase">{customer.status}</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Address</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div><p className="font-medium">{customer.address}</p><p className="text-muted-foreground">{customer.city}, {customer.province}</p><p className="text-muted-foreground">{customer.postalCode}</p></div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-primary/5"><CardContent className="p-4 flex items-center gap-4"><Calendar className="h-6 w-6" /><div><p className="text-xs text-muted-foreground uppercase font-bold">Bookings</p><p className="text-xl font-bold">{customer.totalBookings}</p></div></CardContent></Card>
            <Card className="bg-emerald-50"><CardContent className="p-4 flex items-center gap-4"><DollarSign className="h-6 w-6" /><div><p className="text-xs text-muted-foreground uppercase font-bold">Spent</p><p className="text-xl font-bold">${customer.totalSpent.toLocaleString()}</p></div></CardContent></Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Booking History</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {customer.bookings.length > 0 ? customer.bookings.map((b) => (
                <div key={b.id} className="flex items-center gap-4 p-3 border rounded-xl">
                  <div className="h-16 w-24 bg-muted rounded-lg overflow-hidden flex-shrink-0"><img src={b.property.image || "/placeholder.svg"} className="h-full w-full object-cover" /></div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{b.property.title}</h4>
                    <p className="text-sm text-muted-foreground">Owner: {b.property.owner}</p>
                    <div className="flex gap-4 mt-1 text-xs"><span>{formatDate1(b.checkIn)} - {formatDate1(b.checkOut) }</span><span className="font-bold text-emerald-600">${b.amount}</span></div>
                  </div>
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-[10px] font-bold uppercase">{b.status}</span>
                </div>
              )) : <p className="text-center py-8 text-muted-foreground">No bookings found</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
