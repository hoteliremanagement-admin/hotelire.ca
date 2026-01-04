import { Suspense } from "react"
import ReviewClient from "./ReviewClient"

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10">Loading reviews...</div>}>
      <ReviewClient />
    </Suspense>
  )
}
