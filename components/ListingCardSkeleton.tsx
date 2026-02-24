export function ListingCardSkeleton() {
  return (
    <div className="flex gap-4 p-4 border rounded-xl bg-white shadow-sm animate-pulse">
      
      {/* Image Skeleton */}
      <div className="w-[250px] h-[180px] bg-gray-200 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        
        {/* Title */}
        <div className="h-6 w-2/3 bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 shimmer" />
        </div>

        {/* Rating */}
        <div className="h-4 w-1/4 bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 shimmer" />
        </div>

        {/* Room Types */}
        <div className="h-4 w-1/2 bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 shimmer" />
        </div>

        {/* Amenities */}
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 shimmer" />
          </div>
          <div className="h-8 w-20 bg-gray-200 rounded relative overflow-hidden">
            <div className="absolute inset-0 shimmer" />
          </div>
        </div>

        {/* Price */}
        <div className="h-6 w-24 bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 shimmer" />
        </div>

      </div>
    </div>
  )
}