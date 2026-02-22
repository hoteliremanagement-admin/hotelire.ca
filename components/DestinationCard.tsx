// import Image from "next/image";
// import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";
// import { Destination } from "@/types";

// interface DestinationCardProps {
//   destination: Destination;
// }

// export function DestinationCard({ destination }: DestinationCardProps) {
//   return (
//     <Link
//       href={`/customer/explore-canada#${destination.slug}`}
//       scroll={true}
//     >
//       <Card className="overflow-hidden border-0 shadow-none bg-transparent cursor-pointer">
//         <CardContent className="p-0">
//           <div className="relative w-full h-[180px] md:h-[200px] lg:h-[218px] rounded-lg overflow-hidden">
//             <Image
//               src={destination.image}
//               alt={destination.name}
//               fill
//               className="object-cover"
//               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//             />
//           </div>
//           <div className="mt-4">
//             <h3 className="[font-family:'Poppins',Helvetica] font-bold text-[#3554d1] text-lg md:text-xl mb-2 transition-colors duration-200 hover:text-[#2a3fa8]">
//               {destination.name}
//             </h3>
//             <p className="[font-family:'Poppins',Helvetica] font-normal text-[#59A5B2] text-sm">
//               {destination.properties}
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// }
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="w-full max-w-[1400px] mx-auto">
    <Link
      href={`/customer/explore-canada#${destination.slug}`}
      scroll={true}
      className="group block"
    >
      <Card className="overflow-hidden border-0 shadow-none bg-transparent cursor-pointer">
        <CardContent className="p-0">
          <div className="relative w-full h-[180px] md:h-[220px] lg:h-[250px] rounded-3xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6">
              <span className="text-white font-bold text-lg md:text-xl block translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                {destination.name}
              </span>
              <span className="text-[#ffffff] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {destination.properties}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
    </div>
  );
}
