/**
 * MOCK DATA STORE
 * As per requirements, we are using static dummy data instead of API calls.
 */

import { Owner, Property, Payment } from "@shared/schema";

// --- Types ---
// Extending types for frontend display purposes
export type OwnerWithStats = Owner & {
  lastActive: string;
};

export type PropertyWithOwner = Property & {
  ownerName: string;
  imageUrl: string;
};

// --- Mock Data ---

const MOCK_OWNERS: OwnerWithStats[] = [
  {
    id: 1,
    fullName: "Sarah Jenkins",
    displayName: "S. Jenkins",
    email: "sarah.j@example.com",
    mobile: "+1 (555) 123-4567",
    province: "California",
    city: "San Francisco",
    address: "123 Market St, Suite 400",
    postalCode: "94105",
    status: "Active",
    subscriptionStatus: "Paid",
    totalProperties: 3,
    totalBookings: 45,
    totalRevenue: 12500,
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    fullName: "Michael Chen",
    displayName: "Mike Chen",
    email: "m.chen@properties.co",
    mobile: "+1 (555) 987-6543",
    province: "New York",
    city: "New York",
    address: "88 Broadway Ave",
    postalCode: "10012",
    status: "Active",
    subscriptionStatus: "Paid",
    totalProperties: 5,
    totalBookings: 120,
    totalRevenue: 45000,
    lastActive: "1 day ago"
  },
  {
    id: 3,
    fullName: "Elena Rodriguez",
    displayName: "E. Rodriguez",
    email: "elena.r@example.com",
    mobile: "+1 (555) 456-7890",
    province: "Florida",
    city: "Miami",
    address: "45 Ocean Drive",
    postalCode: "33139",
    status: "Suspended",
    subscriptionStatus: "Unpaid",
    totalProperties: 1,
    totalBookings: 8,
    totalRevenue: 2400,
    lastActive: "2 weeks ago"
  }
];

const MOCK_PROPERTIES: PropertyWithOwner[] = [
  {
    id: 101,
    ownerId: 1,
    title: "Luxury Downtown Loft",
    city: "San Francisco",
    status: "Active",
    revenue: 5200,
    bookings: 12,
    ownerName: "Sarah Jenkins",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 102,
    ownerId: 1,
    title: "Cozy Sunset Studio",
    city: "San Francisco",
    status: "Active",
    revenue: 3100,
    bookings: 8,
    ownerName: "Sarah Jenkins",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 201,
    ownerId: 2,
    title: "Manhattan Penthouse",
    city: "New York",
    status: "Active",
    revenue: 15000,
    bookings: 24,
    ownerName: "Michael Chen",
    imageUrl: "https://images.unsplash.com/photo-1502005229766-939cb9342704?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 301,
    ownerId: 3,
    title: "Beachfront Condo",
    city: "Miami",
    status: "Inactive",
    revenue: 2400,
    bookings: 8,
    ownerName: "Elena Rodriguez",
    imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop&q=60"
  }
];

const MOCK_PAYMENTS: Payment[] = [
  {
    id: 1001,
    ownerId: 1,
    month: "October 2023",
    amount: 10,
    status: "Paid",
    method: "Stripe"
  },
  {
    id: 1002,
    ownerId: 2,
    month: "October 2023",
    amount: 10,
    status: "Paid",
    method: "Stripe"
  },
  {
    id: 1003,
    ownerId: 3,
    month: "September 2023",
    amount: 10,
    status: "Failed",
    method: "Stripe"
  },
  {
    id: 1004,
    ownerId: 1,
    month: "September 2023",
    amount: 10,
    status: "Paid",
    method: "Stripe"
  },
  {
    id: 1005,
    ownerId: 2,
    month: "September 2023",
    amount: 10,
    status: "Paid",
    method: "Stripe"
  }
];

// --- Hook Facade ---
// In a real app, these would use React Query

export function useOwners() {
  return { data: MOCK_OWNERS, isLoading: false };
}

export function useOwner(id: number) {
  const owner = MOCK_OWNERS.find(o => o.id === id);
  return { data: owner, isLoading: false };
}

export function useProperties() {
  return { data: MOCK_PROPERTIES, isLoading: false };
}

export function useProperty(id: number) {
  const property = MOCK_PROPERTIES.find(p => p.id === id);
  return { data: property, isLoading: false };
}

export function usePayments() {
  // Enriched with owner names for display
  const enriched = MOCK_PAYMENTS.map(p => ({
    ...p,
    ownerName: MOCK_OWNERS.find(o => o.id === p.ownerId)?.fullName || "Unknown"
  }));
  return { data: enriched, isLoading: false };
}

export function useDashboardStats() {
  return {
    data: {
      totalOwners: MOCK_OWNERS.length,
      totalProperties: MOCK_PROPERTIES.length,
      totalBookings: MOCK_PROPERTIES.reduce((acc, curr) => acc + (curr.bookings || 0), 0),
      totalRevenue: MOCK_PROPERTIES.reduce((acc, curr) => acc + (curr.revenue || 0), 0),
      monthlyGrowth: 12.5,
    },
    isLoading: false
  };
}
