// "use client"

// import { Search } from "lucide-react"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Slider } from "@/components/ui/slider"

// interface FilterSidebarProps {
//   searchQuery: string
//   onSearchChange: (query: string) => void
//   priceRange: [number, number]
//   onPriceChange: (range: [number, number]) => void
//   selectedTypes: string[]
//   onTypeChange: (type: string) => void
//   selectedFacilities: string[]
//   onFacilityChange: (facility: string) => void
//   selectedStars: number[]
//   onStarChange: (star: number) => void
// }

// export function FilterSidebar({
//   searchQuery,
//   onSearchChange,
//   priceRange,
//   onPriceChange,
//   selectedTypes,
//   onTypeChange,
//   selectedFacilities,
//   onFacilityChange,
//   selectedStars,
//   onStarChange,
// }: FilterSidebarProps) {
//   const propertyTypes = [
//     { name: "Hotels", count: 407 },
//     { name: "Resorts", count: 407 },
//     { name: "Motels", count: 407 },
//     { name: "Guest Rooms", count: 407 },
//   ]

//   const facilities = [
//     { name: "Parking", count: 407 },
//     { name: "Keyless Entry", count: 407 },
//     { name: "Wifi", count: 407 },
//     { name: "Swimming Pool", count: 407 },
//     { name: "Air Condition", count: 407 },
//     { name: "Laundry", count: 407 },
//     { name: "Breakfast Included", count: 407 },
//   ]

//   const toggleType = (type: string) => {
//     onTypeChange(type)
//   }

//   const toggleFacility = (facility: string) => {
//     onFacilityChange(facility)
//   }

//   const toggleStar = (star: number) => {
//     onStarChange(star)
//   }

//   return (
//     <div className="space-y-6">
//       {/* Search by Property Name */}
//       <div>
//         <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-base mb-3">
//           Search by property name
//         </h3>
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//           <Input
//             type="text"
//             placeholder="e.g. Best Western"
//             value={searchQuery}
//             onChange={(e) => onSearchChange(e.target.value)}
//             className="pl-10 [font-family:'Inter',Helvetica] text-sm"
//             data-testid="input-search-property"
//           />
//         </div>
//       </div>

//       {/* Price Range */}
//       <div>
//         <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-base mb-3">Price Range</h3>
//         <div className="space-y-4">
//           <Slider
//             value={priceRange}
//             onValueChange={onPriceChange}
//             max={1000}
//             step={10}
//             className="w-full"
//             data-testid="slider-price-range"
//           />
//           <div className="flex items-center justify-between">
//             <span className="[font-family:'Inter',Helvetica] text-sm text-gray-600">CAD ${priceRange[0]}</span>
//             <span className="[font-family:'Inter',Helvetica] text-sm text-gray-600">CAD ${priceRange[1]}</span>
//           </div>
//         </div>
//       </div>

//       {/* Property Type */}
//       <div>
//         <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-base mb-3">Property Type</h3>
//         <div className="space-y-2">
//           {propertyTypes.map((type) => (
//             <div key={type.name} className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id={`type-${type.name}`}
//                   checked={selectedTypes.includes(type.name)}
//                   onCheckedChange={() => toggleType(type.name)}
//                   data-testid={`checkbox-type-${type.name.toLowerCase().replace(/\s+/g, "-")}`}
//                 />
//                 <Label
//                   htmlFor={`type-${type.name}`}
//                   className="cursor-pointer [font-family:'Inter',Helvetica] text-sm text-gray-700"
//                 >
//                   {type.name}
//                 </Label>
//               </div>
//               <span className="[font-family:'Inter',Helvetica] text-sm text-gray-500">{type.count}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Facilities */}
//       <div>
//         <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-base mb-3">Facilities</h3>
//         <div className="space-y-2">
//           {facilities.map((facility) => (
//             <div key={facility.name} className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id={`facility-${facility.name}`}
//                   checked={selectedFacilities.includes(facility.name)}
//                   onCheckedChange={() => toggleFacility(facility.name)}
//                   data-testid={`checkbox-facility-${facility.name.toLowerCase().replace(/\s+/g, "-")}`}
//                 />
//                 <Label
//                   htmlFor={`facility-${facility.name}`}
//                   className="cursor-pointer [font-family:'Inter',Helvetica] text-sm text-gray-700"
//                 >
//                   {facility.name}
//                 </Label>
//               </div>
//               <span className="[font-family:'Inter',Helvetica] text-sm text-gray-500">{facility.count}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Property Rating */}
//       <div>
//         <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-base mb-1">Property rating</h3>
//         <p className="[font-family:'Inter',Helvetica] text-xs text-gray-600 mb-3">
//           Find high quality hotels and vacation rentals
//         </p>
//         <div className="space-y-2">
//           {[1, 2, 3, 4, 5].map((stars) => (
//             <div key={stars} className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id={`stars-${stars}`}
//                   checked={selectedStars.includes(stars)}
//                   onCheckedChange={() => toggleStar(stars)}
//                   data-testid={`checkbox-stars-${stars}`}
//                 />
//                 <Label
//                   htmlFor={`stars-${stars}`}
//                   className="cursor-pointer [font-family:'Inter',Helvetica] text-sm text-gray-700"
//                 >
//                   {stars} {stars === 1 ? "star" : "stars"}
//                 </Label>
//               </div>
//               <span className="[font-family:'Inter',Helvetica] text-sm text-gray-500">407</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface FilterSidebarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void

  // Property classification (Hotel, Motel, Resort, Guest House)
  selectedTypes: string[]
  onTypeChange: (type: string) => void
  propertyTypes: { name: string; count: number }[]

  // Amenities (DB: propertyamenities → amenities.amenitiesname)
  selectedAmenities: string[]
  onAmenityChange: (amenity: string) => void
  amenities: { name: string; count: number }[]

  // Stars (already handled in parent)
  selectedStars: number[]
  onStarChange: (star: number) => void
}

export function FilterSidebar({
  searchQuery,
  onSearchChange,
  priceRange,
  onPriceChange,

  selectedTypes,
  onTypeChange,
  propertyTypes,

  selectedAmenities,
  onAmenityChange,
  amenities,

  selectedStars,
  onStarChange,
}: FilterSidebarProps) {

  return (
    <div className="space-y-6">
      {/* Search by Property Name */}
      <div>
        <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-base mb-3">
          Search by property name
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="e.g. Best Western"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 [font-family:'Inter',Helvetica] text-sm"
          />
        </div>
      </div>

      {/* Price Range (UNCHANGED) */}
      <div>
        <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-base mb-3">
          Price Range
        </h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={onPriceChange}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between">
            <span className="[font-family:'Inter',Helvetica] text-sm text-gray-600">
              CAD ${priceRange[0]}
            </span>
            <span className="[font-family:'Inter',Helvetica] text-sm text-gray-600">
              CAD ${priceRange[1]}
            </span>
          </div>
        </div>
      </div>

      {/* Property Type (DB driven) */}
      <div>
        <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-base mb-3">
          Property Type
        </h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <div key={type.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedTypes.includes(type.name)}
                  onCheckedChange={() => onTypeChange(type.name)}
                />
                <Label className="cursor-pointer [font-family:'Inter',Helvetica] text-sm text-gray-700">
                  {type.name}
                </Label>
              </div>
              <span className="[font-family:'Inter',Helvetica] text-sm text-gray-500">
                {type.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities (DB: propertyamenities) */}
      <div>
        <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-base mb-3">
          Amenities
        </h3>
        <div className="space-y-2">
          {amenities.map((amenity) => (
            <div key={amenity.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedAmenities.includes(amenity.name)}
                  onCheckedChange={() => onAmenityChange(amenity.name)}
                />
                <Label className="cursor-pointer [font-family:'Inter',Helvetica] text-sm text-gray-700">
                  {amenity.name}
                </Label>
              </div>
              <span className="[font-family:'Inter',Helvetica] text-sm text-gray-500">
                {amenity.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Property Rating */}
      <div>
        <h3 className="[font-family:'Poppins',Helvetica] font-semibold text-black text-base mb-1">
          Property rating
        </h3>
        <p className="[font-family:'Inter',Helvetica] text-xs text-gray-600 mb-3">
          Find high quality hotels and vacation rentals
        </p>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((stars) => (
            <div key={stars} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedStars.includes(stars)}
                  onCheckedChange={() => onStarChange(stars)}
                />
                <Label className="[font-family:'Inter',Helvetica] text-sm text-gray-700">
                  {stars} {stars === 1 ? "star" : "stars"}
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
