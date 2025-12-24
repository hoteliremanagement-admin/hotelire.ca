import Image from "next/image";
import Link from "next/link";
import { discoverLinks, resourceLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-[#fffdf6] w-full pt-12 md:pt-16 lg:pt-[114px] pb-0">
             <div className="site-container">

      <div className="px-4 md:px-8 lg:px-[203px] pb-12 md:pb-16 lg:pb-[2px]">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-12 md:mb-16 lg:mb-[80px]">
          <div className="flex flex-col">
            <Image
              src="/figmaAssets/logo_orignal.png"
              alt="Hotelire Logo"
              width={163}
              height={108}
              className="w-[160px] h-[54px] md:w-[173px] md:h-[54px] mb-6 md:mb-[39px]"
            />
            <div className="[font-family:'Inter',Helvetica] font-medium text-black text-base md:text-lg mb-3">
              Toll Free Customer Care
            </div>
            <a
              href="tel:+11234567890"
              className="font-medium text-[#59A5B2] text-base md:text-lg [font-family:'Inter',Helvetica] mb-6 md:mb-9 hover:text-[#2a2158] transition-colors duration-200"
            >
              +(1) 123 456 7890
            </a>
            <div className="[font-family:'Inter',Helvetica] font-bold text-[#febc11] text-base md:text-lg mb-3">
              Need live support?
            </div>
            <a
              href="mailto:info@hotelire.ca"
              className="text-[#59A5B2] text-base md:text-lg [font-family:'Poppins',Helvetica] font-normal hover:text-[#2a2158] transition-colors duration-200"
            >
              info@hotelire.ca
            </a>
          </div>

          <div className="flex flex-col">
            <h3 className="[font-family:'Inter',Helvetica] font-bold text-black text-[20px] md:text-[22px] mb-6 md:mb-[51px]">
              Discover
            </h3>
            {discoverLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                prefetch={false}
                className="[font-family:'Inter',Helvetica] font-medium text-black text-[17px] md:text-[19px] mb-4 transition-colors duration-200 hover:text-[#59A5B2]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col">
            <h3 className="[font-family:'Inter',Helvetica] font-bold text-black text-[20px] md:text-[22px] mb-6 md:mb-[51px]">
              Resources
            </h3>
            {resourceLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                prefetch={false}
                className="[font-family:'Inter',Helvetica] font-medium text-black text-[17px] md:text-[19px] mb-4 transition-colors duration-200 hover:text-[#59A5B2]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
</div>
      <div className="w-full h-auto md:h-[52px] bg-[#59A5B2] flex items-center justify-center py-4 px-4">
        <p className="[font-family:'Inter',Helvetica] font-medium text-white text-[15px] md:text-[19px] text-center">
          Copyright © 2025 Hotelier.ca™. All Rights Reserved. Developed by
          Sasquatch Innovations
        </p>
      </div>
      
    </footer>
  );
}