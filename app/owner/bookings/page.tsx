import { Suspense } from "react"
import BookingsClient from "./BookingsClient"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10">Loading bookings...</div>}>
      <BookingsClient />
    </Suspense>
  )
}
