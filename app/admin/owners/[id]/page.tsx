"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useOwner, useProperties } from "@/hooks/use-mock-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "../../components/StatusBadge";
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
} from "lucide-react";

export default function OwnerProfilePage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: owner } = useOwner(id);
  const { data: allProperties } = useProperties();

  const ownerProperties = allProperties.filter(
    (p) => p.ownerId === id
  );

  if (!owner) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Owner not found
      </div>
    );
  }

  return (
    <>
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/admin/owners">
          <Button
            variant="ghost"
            className="gap-2 pl-0 hover:bg-transparent hover:text-primary"
          >
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
            <h1 className="text-2xl font-bold font-display">
              {owner.fullName}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-1 text-muted-foreground">
              <span className="flex items-center gap-1.5 text-sm">
                <Mail className="h-4 w-4" /> {owner.email}
              </span>
              <span className="flex items-center gap-1.5 text-sm">
                <Phone className="h-4 w-4" /> {owner.mobile}
              </span>
            </div>

            <div className="flex gap-2 mt-4">
              <StatusBadge status={owner.status} />
              <StatusBadge
                status={owner.subscriptionStatus}
                className="bg-blue-100 text-blue-700 border-blue-200"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <Button variant="outline">Edit Profile</Button>
          <Button variant="destructive">Suspend Account</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Address Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{owner.address}</p>
                  <p className="text-muted-foreground">
                    {owner.city}, {owner.province}
                  </p>
                  <p className="text-muted-foreground">
                    {owner.postalCode}
                  </p>
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
              <DocumentRow
                title="Government ID"
                subtitle="Verified document"
              />
              <DocumentRow
                title="Ownership Deed"
                subtitle="PDF document"
              />
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
              value={owner.totalProperties ?? 0}
              className="bg-primary/5 border-primary/20"
            />
            <StatCard
              icon={<Calendar className="h-6 w-6" />}
              label="Bookings"
              value={owner.totalBookings ?? 0}
              className="bg-secondary/5 border-secondary/20"
            />
            <StatCard
              icon={<DollarSign className="h-6 w-6" />}
              label="Revenue"
              value={`$${(owner.totalRevenue ?? 0).toLocaleString()}`}
              className="bg-emerald-50 border-emerald-200"
            />
          </div>

          {/* Linked Properties */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">
                Linked Properties
              </CardTitle>
              <Button size="sm" variant="outline">
                Add Property
              </Button>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {ownerProperties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/admin/properties/${property.id}`}
                  >
                    <div className="flex items-center gap-4 p-3 border rounded-xl hover:shadow-md transition-all cursor-pointer bg-card">
                      <div className="h-20 w-28 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={property.imageUrl}
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold truncate">
                            {property.title}
                          </h4>
                          <StatusBadge
                            status={property.status}
                          />
                        </div>

                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {property.city}
                        </p>

                        <div className="flex gap-4 mt-2 text-sm">
                          <span className="font-medium">
                            {property.bookings} bookings
                          </span>
                          <span className="font-medium text-emerald-600">
                            ${(property.revenue ?? 0).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Link>
                ))}

                {ownerProperties.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No properties linked to this owner yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

/* Reusable components */

function StatCard({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">
            {label}
          </p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function DocumentRow({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border rounded-lg p-3 flex items-center justify-between hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-sm">{title}</p>
          <p className="text-xs text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <ExternalLink className="h-4 w-4" />
      </Button>
    </div>
  );
}
