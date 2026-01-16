"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GuestHouse} from "@/types";
import { useRouter } from "next/navigation";   // ✅ Added


interface GuestHouseCardProps {
  property: GuestHouse;
}

export function GuestHouseCard({ property }: GuestHouseCardProps) {
  const router = useRouter();   // ✅ Added
  return (
    <Link href={`/customer/hotel/${property.id}`} prefetch={false}>
      <Card className="overflow-hidden border border-gray-100 hover:shadow-[0px_8px_24px_rgba(63,44,119,0.1)] transition-all duration-300">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative w-full h-[250px] md:h-[280px] lg:h-[308px] rounded-[5px] overflow-hidden">
            <Image
              src={property.image}
              alt={property.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {/* 👁 View Details Button */}
            <button
              className="absolute top-3 left-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-110 z-10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/customer/hotel/${property.id}`); // Correct detail page URL
              }}
              aria-label="View details"
              data-testid={`button-view-${property.id}`}
            >
              <Eye className="w-4 h-4 text-[#59A5B2]" />
            </button>
          </div>
          <div className="mt-4 flex-1 flex flex-col">
            <p className="[font-family:'Inter',Helvetica] font-medium text-[#acacac] text-sm md:text-base mb-2 pl-3">
              {property.type}
            </p>
            <h3 className="[font-family:'Inter',Helvetica] font-bold text-[#59A5B2] text-sm md:text-base mb-1 pl-3 min-h-[40px] md:min-h-[48px] transition-colors duration-200 group-hover:text-[#2a2158]">
              {property.name}
            </h3>
            <p className="[font-family:'Inter',Helvetica] font-medium text-black text-sm md:text-base mb-4 pl-3">
              {property.location}
            </p>

            <div className="flex items-start gap-4 mt-auto">
              <div className="w-[55px] h-14 bg-[#59A5B2] rounded-[5px] flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-[#2a2158]">
                <span className="font-bold text-[#fff2f2] text-base [font-family:'Inter',Helvetica]">
                  {property.rating}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="relative w-[96.5px] h-[15.55px]">
                  <Image
                    src={property.stars}
                    alt={`${property.rating} stars`}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="[font-family:'Inter',Helvetica] font-medium text-[#59A5B2] text-xs md:text-sm">
                  {property.reviews}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}