"use client"

import type React from "react"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "../../components/StatusBadge"
import {
  ArrowLeft,
  MapPin,
  Mail,
  Phone,
  FileText,
  Building,
  Calendar,
  DollarSign,
  ExternalLink,
  ChevronRight,
} from "lucide-react"

interface OwnerDetails {
  id: number
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postalCode: string
  profilePic: string
  status: string
  documents: {
    idDocument: string | null
    residentialDoc: string | null
  }
  subscriptionStatus: string
  totalProperties: number
  totalBookings: number
  totalRevenue: number
  properties: Array<{
    id: number
    title: string
    subtitle: string
    city: string
    imageUrl: string
    bookings: number
    revenue: number
    status: string
  }>
  subscriptions: Array<{
    id: number
    amount: number
    currency: string
    startDate: string
    endDate: string
    createdAt: string
  }>
}
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function OwnerProfilePage() {
  const params = useParams()
  const id = Number(params.id)
  const [owner, setOwner] = useState<OwnerDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const response = await fetch(`${baseUrl}/admin/owners/${id}`)
        const data = await response.json()
        console.log("Fetched owner data:", data)
        setOwner(data)
      } catch (error) {
        console.error("Error fetching owner:", error)
      } finally {
        setLoading(false)
      }
    }



    
    fetchOwner()
  }, [id])

  if (loading) {
    return <div className="p-8 text-center">Loading owner details...</div>
  }

  if (!owner) {
    return <div className="p-8 text-center text-muted-foreground">Owner not found</div>
  }

  return (
    <>
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/admin/owners">
          <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Owners
          </Button>
        </Link>
      </div>

      {/* Profile Header */}
      <div className="bg-card border rounded-xl p-6 shadow-sm mb-6 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-primary/20">
            {owner.fullName.charAt(0)}
          </div>

          <div>
            <h1 className="text-2xl font-bold font-display">{owner.fullName}</h1>

            <div className="flex flex-wrap items-center gap-3 mt-1 text-muted-foreground">
              <span className="flex items-center gap-1.5 text-sm">
                <Mail className="h-4 w-4" /> {owner.email}
              </span>
              <span className="flex items-center gap-1.5 text-sm">
                <Phone className="h-4 w-4" /> {owner.phone}
              </span>
            </div>

            <div className=" gap-2 mt-4">
             Owner current Status: <StatusBadge status={owner.status} /> <br />
             Subscription Status: <StatusBadge status={owner.subscriptionStatus} className="bg-blue-100 ms-4 mt-3 text-blue-700 border-blue-200" />
            </div>
          </div>
        </div>  

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Address Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{owner.address}</p>
                  <p className="text-muted-foreground">
                    {owner.city}, {owner.province}
                  </p>
                  <p className="text-muted-foreground">{owner.postalCode}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {owner.documents.idDocument && (
                <DocumentRow title="Government ID" subtitle="Verified document" docUrl={owner.documents.idDocument} />
              )}
              {owner.documents.residentialDoc && (
                <DocumentRow
                  title="Residential Document"
                  subtitle="PDF document"
                  docUrl={owner.documents.residentialDoc}
                />
              )}
              {!owner.documents.idDocument && !owner.documents.residentialDoc && (
                <p className="text-sm text-muted-foreground">No documents uploaded</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={<Building className="h-6 w-6" />}
              label="Properties"
              value={owner.totalProperties}
              className="bg-primary/5 border-primary/20"
            />
            <StatCard
              icon={<Calendar className="h-6 w-6" />}
              label="Bookings"
              value={owner.totalBookings}
              className="bg-secondary/5 border-secondary/20"
            />
            <StatCard
              icon={<DollarSign className="h-6 w-6" />}
              label="Revenue"
              value={`$${owner.totalRevenue.toLocaleString()}`}
              className="bg-emerald-50 border-emerald-200"
            />
          </div>

          {/* Linked Properties */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Linked Properties</CardTitle>
              <a href="/admin/properties">
              <Button size="sm" variant="outline">
                See all Properties
              </Button>
              </a>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {owner.properties.length > 0 ? (
                  owner.properties.map((property) => (
                    <Link key={property.id} href={`/admin/properties/${property.id}`}>
                      <div className="flex items-center gap-4 p-3 border rounded-xl hover:shadow-md transition-all cursor-pointer bg-card">
                        <div className="h-20 w-28 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={property.imageUrl || "/placeholder.svg"}
                            alt={property.title}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold truncate">{property.title}</h4>
                            <StatusBadge status={property.status} />
                          </div>

                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {property.city}
                          </p>

                          <div className="flex gap-4 mt-2 text-sm">
                            <span className="font-medium">{property.bookings} bookings</span>
                            <span className="font-medium text-emerald-600">${property.revenue.toLocaleString()}</span>
                          </div>
                        </div>

                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No properties linked to this owner yet.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

/* Reusable components */

function StatCard({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  className?: string
}) {
  return (
    <Card className={className}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function DocumentRow({
  title,
  subtitle,
  docUrl,
}: {
  title: string
  subtitle: string
  docUrl: string
}) {
  return (
    <div className="border rounded-lg p-3 flex items-center justify-between hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <a href={docUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </a>
    </div>
  )
}
