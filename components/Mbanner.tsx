// "use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { authCheck } from "@/services/authCheck";

// export function Mbanner() {
//   const router = useRouter();

//   const handleBannerClick = async () => {
//     const user = await authCheck();

//     // 1️⃣ Not signed in
//     if (!user || !user.user) {
//       router.push("/customer/signin");
//       return;
//     }

//     const roleId = user.user.roleid;

//     // 2️⃣ Admin → toast only
//     if (roleId === 1) {
//       toast(
//         "You are logged in as an administrator. Please use the Admin Panel to manage the platform.",
//         {
//           icon: "ℹ️",
//           duration: 3500,
//         }
//       );

//       return;
//     }

//     // 3️⃣ Customer
//     if (roleId === 3) {
//       router.push("/owner/verification");
//       return;
//     }

//     // 4️⃣ Owner
//     if (roleId === 2) {
//       router.push("/owner/overview");
//       return;
//     }
//   };

//   return (
//     <section className="w-full bg-[#e3fdff] py-12 md:py-16 lg:py-[50px] relative overflow-hidden">
//       <div className="absolute top-[-45px] left-[210px] w-[244px] h-[498px] -rotate-90 bg-[linear-gradient(180deg,rgba(255,255,255,0)_56%,rgba(254,188,17,1)_89%)] hidden lg:block" />

//       <Image
//         src="/figmaAssets/hotel-owner-1.png"
//         alt="Hotel owner"
//         width={581}
//         height={326}
//         className="absolute top-0 left-0 w-full md:w-[581px] h-[200px] md:h-[326px] object-cover opacity-50 md:opacity-100"
//       />

//       <div className="relative z-10 px-4 md:px-8 lg:ml-[622px] lg:mr-[203px] pt-[180px] md:pt-0">
//         <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#3F2C77] text-[22px] md:text-[26px] mb-6 md:mb-[37px]">
//           Grow Your Business with Hotelire
//         </h2>

//         <p className="[font-family:'Poppins',Helvetica] font-medium text-black text-base md:text-lg mb-6 md:mb-[32px] max-w-[601px]">
//           Join Hotelire and showcase your property to travelers looking for
//           their next memorable stay.
//         </p>

//         <Button
//           onClick={handleBannerClick}
//           className="w-full md:w-[500px] lg:w-[612px] h-[55px] md:h-[68px] bg-[#3F2C77] rounded-[10px] [font-family:'Inter',Helvetica] font-bold text-white text-lg md:text-xl transition-all duration-200 hover:bg-[#2E2059] hover:scale-[1.02] hover:shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
//         >
//           SIGN UP AS PROPERTY OWNER
//         </Button>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ListingModal } from "@/components/ListingModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authCheck } from "@/services/authCheck";

export function Mbanner() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBannerClick = async () => {
    const user = await authCheck();

    // 1️⃣ Not signed in
    if (!user || !user.user) {
      router.push("/customer/signin");
      return;
    }

    const roleId = user.user.roleid;

    // 2️⃣ Admin → toast only
    if (roleId === 1) {
      toast(
        "You are logged in as an administrator. Please use the Admin Panel to manage the platform.",
        {
          icon: "ℹ️",
          duration: 3500,
        }
      );

      return;
    }

    // 3️⃣ Customer
    if (roleId === 3) {
      router.push("/owner/verification");
      return;
    }

    // 4️⃣ Owner
    if (roleId === 2) {
      router.push("/owner/overview");
      return;
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            {/* Subtitle Badge */}
            <div className="inline-flex items-center gap-2 w-fit">
              <div className="w-2 h-2 rounded-full bg-[#3F2C77]" />
              <span className="text-sm font-semibold text-[#3F2C77] uppercase tracking-wide">
                For Property Owners
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h2 className="font-bold text-gray-900 text-4xl md:text-5xl lg:text-6xl leading-tight">
                Grow Your Business with <span className="text-[#3F2C77]">Hotelire</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              Join thousands of property owners showcasing their unique accommodations to travelers worldwide. Reach more guests, increase bookings, and grow your hospitality business.
            </p>

            {/* Stats Row */}
            {/* <div className="grid grid-cols-3 gap-4 pt-4">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">50K+</p>
                <p className="text-sm text-gray-600 mt-1">Properties Listed</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">2M+</p>
                <p className="text-sm text-gray-600 mt-1">Monthly Travelers</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">180+</p>
                <p className="text-sm text-gray-600 mt-1">Countries</p>
              </div>
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleBannerClick}
                className="px-8 py-4 md:py-5 bg-[#3F2C77] hover:bg-[#2a1c5a] text-white font-bold text-lg rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 w-full sm:w-auto"
              >
                Start Your Journey
              </Button>
              <Button
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                className="px-8 py-4 md:py-5 border-2 border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold text-lg rounded-full transition-all duration-200 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>

            {/* Listing Modal */}
            <ListingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-[500px] lg:h-[550px] hidden lg:block">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/figmaAssets/hotel-owner-1.png"
                alt="Hotel owner success"
                fill
                className="object-cover"
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating card accent */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-6 max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="font-bold text-gray-900">Verified Owner</span>
              </div>
              <p className="text-sm text-gray-600">
                Join verified property owners earning more with Hotelire
              </p>
            </div>
          </div>

          {/* Mobile Image */}
          <div className="relative h-64 md:h-96 lg:hidden rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/figmaAssets/hotel-owner-1.png"
              alt="Hotel owner success"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
