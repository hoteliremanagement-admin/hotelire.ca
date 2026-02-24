// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Container, Eye } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Hotel } from "@/types";
// import { useRouter } from "next/navigation";   // ✅ Added

// interface HotelCardProps {
//   hotel: Hotel;
// }

// export function HotelCard({ hotel }: HotelCardProps) {
//   const router = useRouter();   // ✅ Added

//   return (
    
//     <Link
//   href={`/customer/hotel/${hotel.id}`}
//   prefetch={false}
//   className="block w-full"
// >

//       <Card className="overflow-hidden border border-gray-100 hover:shadow-[0px_8px_24px_rgba(63,44,119,0.1)] transition-all duration-300">
//         <CardContent className="p-0 flex flex-col h-full">
//           <div className="relative w-full h-[250px] md:h-[280px] lg:h-[308px] rounded-[5px] overflow-hidden">
//             <Image
//               src={hotel.image}
//               alt={hotel.name}
//               fill
//               className="object-cover"
//               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//             />

//             {/* 👁 View Details Button */}
//             <button
//               className="absolute top-3 left-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-110 z-10"
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 router.push(`/customer/hotel/${hotel.id}`); // Correct detail page URL
//               }}
//               aria-label="View details"
//               data-testid={`button-view-${hotel.id}`}
//             >
//               <Eye className="w-4 h-4 text-[#3F2C77]" />
//             </button>

//           </div>

//           <div className="mt-4 flex-1 flex flex-col">
//             <p className="[font-family:'Inter',Helvetica] font-medium text-[#5f5f5f] text-sm md:text-base mb-2 pl-3">
//               {hotel.type}
//             </p>

//             <h3 className="[font-family:'Inter',Helvetica] font-bold text-[#3F2C77] text-sm md:text-base mb-1 pl-3 min-h-[40px] md:min-h-[48px] transition-colors duration-200 group-hover:text-[#2a2158]">
//               {hotel.name}
//             </h3>

//             <p className="[font-family:'Inter',Helvetica] font-medium text-black text-sm md:text-base mb-4 pl-3">
//               {hotel.location}
//             </p>

//             <div className="flex items-start gap-4 mt-auto">
//               <div className="w-[55px] h-14 bg-[#3F2C77] rounded-[5px] flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-[#2a2158]">
//                 <span className="font-bold text-[#fff2f2] text-base [font-family:'Inter',Helvetica]">
//                   {hotel.rating}
//                 </span>
//               </div>

//               <div className="flex flex-col gap-1">
//                 <span className="[font-family:'Inter',Helvetica] font-medium text-[#3F2C77] text-xs md:text-sm">
//                   {hotel.reviews}
//                 </span>
//               </div>
//             </div>

//           </div>
//         </CardContent>
//       </Card>
      
//     </Link>
    
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Hotel } from "@/types";
import { useRouter } from "next/navigation";

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const router = useRouter();

  return (
    <Link
      href={`/customer/hotel/${hotel.id}`}
      prefetch={false}
      className="block w-full group"
    >
      <Card className="overflow-hidden border border-gray-200 shadow-md h-full">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image Container */}
          <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
            <Image
              src={hotel.image}
              alt={hotel.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Heart Icon Button - Top Right */}
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg z-10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              aria-label="Save to favorites"
              data-testid={`button-favorite-${hotel.id}`}
            >
              <Eye className="w-5 h-5 text-gray-400 hover:text-[#3F2C77] transition-colors" />
            </button>

            {/* Stars Row - Positioned on image */}
            {/* <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div> */}
          </div>

          {/* Content Container */}
          <div className="p-4 flex-1 flex flex-col gap-3">
            {/* Hotel Type */}
            <p className="font-medium text-gray-600 text-xs uppercase tracking-wider">
              {hotel.type}
            </p>

            {/* Hotel Name and Badge Row */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-gray-900 text-base leading-tight flex-1">
                {hotel.name}
              </h3>
              {/* <span className="inline-block px-2 py-1 bg-[#3F2C77] text-white text-xs font-bold rounded whitespace-nowrap">
                Genius
              </span> */}
            </div>

            {/* Location */}
            <p className="font-medium text-gray-700 text-sm">
              {/* {hotel.location} */} Canada
            </p>

            {/* Rating and Reviews Row */}
            <div className="flex items-center gap-3 mt-auto">
              <div className="bg-[#3F2C77] rounded px-3 py-1.5 flex items-center justify-center min-w-fit">
                <span className="font-bold text-white text-sm">
                  {hotel.rating}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-gray-900 text-sm">
                  Excellent
                </span>
                <span className="font-medium text-gray-600 text-xs">
                  {hotel.reviews} reviews
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="border-t border-gray-200 pt-3 mt-auto">
              <p className="text-gray-600 text-xs font-medium mb-1">
                Starting from
              </p>
              <div className="flex items-baseline gap-2">
                {/* {hotel.originalPrice && (
                  <span className="text-gray-400 text-sm line-through">
                    {hotel.originalPrice} 
                  </span>
                )} */}
                <span className="font-bold text-gray-900 text-lg">
                  ${hotel.price || "0"}
                  <span className="font-medium text-gray-600 text-xs">/night</span>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
