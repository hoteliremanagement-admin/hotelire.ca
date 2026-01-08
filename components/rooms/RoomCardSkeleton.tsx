export function RoomCardSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  )
}
