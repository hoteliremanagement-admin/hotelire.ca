// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Calendar } from "lucide-react"
// import { Header } from "@/components/Header"
// import { Footer } from "@/components/Footer"
// import { Navigation } from "@/components/Navigation"

// interface Booking {
//   id: string
//   bookingId: string
//   hotelName: string
//   propertyImage: string
//   checkInDate: string
//   checkOutDate: string
//   totalNights: number
//   totalAmount: number
//   status: "Confirmed" | "Completed" | "Cancelled"
// }

// const BookingCard = ({ booking, onViewClick }: { booking: Booking; onViewClick: (id: string) => void }) => {
//   const statusConfig = {
//     Confirmed: { bg: "bg-green-50", text: "text-green-700", label: "Confirmed" },
//     Completed: { bg: "bg-gray-50", text: "text-gray-700", label: "Completed" },
//     Cancelled: { bg: "bg-red-50", text: "text-red-700", label: "Cancelled" },
//   }

//   const config = statusConfig[booking.status]

//   return (
  
//     <Card className="overflow-hidden hover:shadow-md transition-shadow">
//       <div className="flex flex-col md:flex-row gap-6 p-6">
//         {/* Property Image */}
//         <div className="md:w-1/3 shrink-0">
//           <img
//             src={booking.propertyImage || "/placeholder.svg"}
//             alt={booking.hotelName}
//             className="w-full h-48 md:h-40 object-cover rounded-lg"
//           />
//         </div>

//         {/* Booking Details */}
//         <div className="flex-1 flex flex-col justify-between">
//           <div className="space-y-3">
//             {/* Header with name and status */}
//             <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
//               <div>
//                 <h3 className="text-lg font-semibold text-foreground">{booking.hotelName}</h3>
//                 <p className="text-sm text-muted-foreground">Booking ID: {booking.bookingId}</p>
//               </div>
//               <span className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${config.bg} ${config.text}`}>
//                 {config.label}
//               </span>
//             </div>

//             {/* Dates and nights */}
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               <div className="flex items-center gap-2">
//                 <Calendar className="w-4 h-4 text-muted-foreground" />
//                 <div>
//                   <p className="text-xs text-muted-foreground">Check-in</p>
//                   <p className="text-sm font-medium text-foreground">{booking.checkInDate}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Calendar className="w-4 h-4 text-muted-foreground" />
//                 <div>
//                   <p className="text-xs text-muted-foreground">Check-out</p>
//                   <p className="text-sm font-medium text-foreground">{booking.checkOutDate}</p>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-xs text-muted-foreground">Nights</p>
//                 <p className="text-sm font-medium text-foreground">{booking.totalNights}</p>
//               </div>
//             </div>
//           </div>

//           {/* Footer with amount and button */}
//           <div className="flex items-center justify-between pt-4 border-t border-border">
//             <div>
//               <p className="text-xs text-muted-foreground">Total Amount</p>
//               <p className="text-xl font-bold text-primary">${booking.totalAmount.toLocaleString()}</p>
//             </div>
//             <Button onClick={() => onViewClick(booking.id)} size="sm">
//               View Booking
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   )
// }

// const BookingCardSkeleton = () => (
//   <Card className="overflow-hidden">
//     <div className="flex flex-col md:flex-row gap-6 p-6">
//       <Skeleton className="md:w-1/3 h-48 md:h-40 shrink-0 rounded-lg" />
//       <div className="flex-1 space-y-4">
//         <div className="space-y-2">
//           <Skeleton className="h-6 w-1/2" />
//           <Skeleton className="h-4 w-1/3" />
//         </div>
//         <Skeleton className="h-4 w-1/4" />
//         <div className="flex items-center justify-between pt-4 border-t border-border">
//           <Skeleton className="h-8 w-1/4" />
//           <Skeleton className="h-10 w-24" />
//         </div>
//       </div>
//     </div>
//   </Card>
// )

// const EmptyState = ({ onExploreClick }: { onExploreClick: () => void }) => (
//   <div className="flex flex-col items-center justify-center py-20 px-4">
//     <div className="text-center max-w-md">
//       <div className="mb-6 text-6xl">🏨</div>
//       <h2 className="text-2xl font-semibold text-foreground mb-2">You don't have any bookings yet.</h2>
//       <p className="text-muted-foreground mb-6">Start exploring and book your next unforgettable stay with us.</p>
//       <Button onClick={onExploreClick} size="lg">
//         Explore Properties
//       </Button>
//     </div>
//   </div>
// )

// export default function MyBookingsPage() {
//   const router = useRouter()
//   const [bookings, setBookings] = useState<Booking[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         setIsLoading(true)
//         setError(null)

//         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           },
//         })

//         if (!response.ok) {
//           throw new Error("Failed to fetch bookings")
//         }

//         const data = await response.json()
//         setBookings(data.bookings || [])
//       } catch (err) {
//         console.error("[v0] Error fetching bookings:", err)
//         setError(err instanceof Error ? err.message : "Failed to load bookings")
//         setBookings([])
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchBookings()
//   }, [])

//   const handleViewBooking = (bookingId: string) => {
//     router.push(`/customer/bookings/${bookingId}`)
//   }

//   const handleExploreProperties = () => {
//     router.push("/customer/listing")
//   }

//   return (
//     <div className="bg-[#fafafa] w-full flex flex-col min-h-screen">
//     < Header />
//     < Navigation />
//     <div className="min-h-screen bg-background">
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
//           <p className="text-muted-foreground">View and manage your hotel reservations</p>
//         </div>

//         {/* Error State */}
//         {error && (
//           <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
//             <p className="text-destructive text-sm">{error}</p>
//           </div>
//         )}

//         {/* Loading State */}
//         {isLoading ? (
//           <div className="space-y-6">
//             {[1, 2, 3].map((i) => (
//               <BookingCardSkeleton key={i} />
//             ))}
//           </div>
//         ) : bookings.length === 0 ? (
//           /* Empty State */
//           <EmptyState onExploreClick={handleExploreProperties} />
//         ) : (
//           /* Bookings List */
//           <div className="space-y-6">
//             {bookings.map((booking) => (
//               <BookingCard key={booking.id} booking={booking} onViewClick={handleViewBooking} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//     < Footer />
//     </div>
//   )
// }




"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Navigation } from "@/components/Navigation"
import { authCheck } from "@/services/authCheck"

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

interface Booking {
  id: string
  bookingId: string
  hotelName: string
  propertyImage: string
  checkInDate: string
  checkOutDate: string
  totalNights: number
  totalAmount: number
  status: "Confirmed" | "Completed" | "Cancelled"
}

const BookingCard = ({ booking, onViewClick }: { booking: Booking; onViewClick: (id: string) => void }) => {
  const statusConfig = {
    Confirmed: { bg: "bg-green-50", text: "text-green-700", label: "Confirmed" },
    Completed: { bg: "bg-gray-50", text: "text-gray-700", label: "Completed" },
    Cancelled: { bg: "bg-red-50", text: "text-red-700", label: "Cancelled" },
  }

  const config = statusConfig[booking.status]

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Property Image */}
        <div className="md:w-1/3 shrink-0">
          <img
            src={booking.propertyImage || "/placeholder.svg?height=200&width=300"}
            alt={booking.hotelName}
            className="w-full h-48 md:h-40 object-cover rounded-lg"
          />
        </div>

        {/* Booking Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Header with name and status */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{booking.hotelName}</h3>
                <p className="text-sm text-muted-foreground">Booking ID: {booking.bookingId}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${config.bg} ${config.text}`}>
                {config.label}
              </span>
            </div>

            {/* Dates and nights */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Check-in</p>
                  <p className="text-sm font-medium text-foreground">{booking.checkInDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Check-out</p>
                  <p className="text-sm font-medium text-foreground">{booking.checkOutDate}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Nights</p>
                <p className="text-sm font-medium text-foreground">{booking.totalNights}</p>
              </div>
            </div>
          </div>

          {/* Footer with amount and button */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground">Total Amount</p>
              <p className="text-xl font-bold text-primary">CAD ${booking.totalAmount.toLocaleString()}</p>
            </div>
            <Button onClick={() => onViewClick(booking.id)} size="sm">
              View Booking
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

const BookingCardSkeleton = () => (
  <Card className="overflow-hidden">
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <Skeleton className="md:w-1/3 h-48 md:h-40 shrink-0 rounded-lg" />
      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-4 w-1/4" />
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  </Card>
)

const EmptyState = ({ onExploreClick }: { onExploreClick: () => void }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4">
    <div className="text-center max-w-md">
      <div className="mb-6 text-6xl">🏨</div>
      <h2 className="text-2xl font-semibold text-foreground mb-2">You don't have any bookings yet.</h2>
      <p className="text-muted-foreground mb-6">Start exploring and book your next unforgettable stay with us.</p>
      <Button onClick={onExploreClick} size="lg">
        Explore Properties
      </Button>
    </div>
  </div>
)

export default function MyBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) 

  useEffect(() => {
    const logincheck = async () => {
      const user = await authCheck()

      console.log("[v0] User from /auth/me:", user)

      if (!user) {
        router.push(`/customer/signin`)
      }
    }
    logincheck()
  }, [])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true)
        setError(null)

        console.log("[v0] Fetching bookings from API")

        const response = await fetch(`${baseUrl}/booking/my-bookings`, {
          credentials: "include",
        })

        console.log("[v0] Response status:", response.status)

        if (!response.ok) {
          throw new Error("Failed to fetch bookings")
        }

        const data = await response.json()
        console.log("[v0] Bookings data:", data)

        // Handle empty or null bookings array safely
        if (data.success && Array.isArray(data.bookings)) {
          setBookings(data.bookings)
        } else {
          setBookings([])
        }
      } catch (err) {
        console.error("[v0] Error fetching bookings:", err)
        setError(err instanceof Error ? err.message : "Failed to load bookings")
        setBookings([]) // Set empty array on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const handleViewBooking = (bookingId: string) => {
    router.push(`/customer/booking-confirmation?bookingId=${bookingId}`)
  }

  const handleExploreProperties = () => {
    router.push("/customer/listing")
  }

  return (
    <div className="bg-[#fafafa] w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
            <p className="text-muted-foreground">View and manage your hotel reservations</p>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <BookingCardSkeleton key={i} />
              ))}
            </div>
          ) : bookings.length === 0 ? (
            /* Empty State */
            <EmptyState onExploreClick={handleExploreProperties} />
          ) : (
            /* Bookings List */
            <div className="space-y-6">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} onViewClick={handleViewBooking} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
