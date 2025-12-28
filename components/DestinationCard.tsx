import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      href={`/customer/explore-canada#${destination.slug}`}
      scroll={true}
    >
      <Card className="overflow-hidden border-0 shadow-none bg-transparent cursor-pointer">
        <CardContent className="p-0">
          <div className="relative w-full h-[180px] md:h-[200px] lg:h-[218px] rounded-lg overflow-hidden">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="mt-4">
            <h3 className="[font-family:'Poppins',Helvetica] font-bold text-[#3554d1] text-lg md:text-xl mb-2 transition-colors duration-200 hover:text-[#2a3fa8]">
              {destination.name}
            </h3>
            <p className="[font-family:'Poppins',Helvetica] font-normal text-[#59A5B2] text-sm">
              {destination.properties}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
