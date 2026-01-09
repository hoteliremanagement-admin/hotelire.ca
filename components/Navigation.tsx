"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authCheck } from "@/services/authCheck";

export function Navigation() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href);

  const router = useRouter();
  const [roleId, setRoleId] = useState<number | null>(null);

  const [isownerVerificationComplete, setisownerVerificationComplete] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      const user = await authCheck();

      if (user?.user?.roleid) {
        setRoleId(user.user.roleid);
      }

      if (user.user.roleid === 2) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/owner/checkOwnerDocuments`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (data.success == true && data.documentsComplete == true) {
            setisownerVerificationComplete(true);
          }

        } catch (error) {
          console.error("Error checking owner documents:", error);
        }
      }
    };

    checkRole();
  }, []);

  const handleListPropertyClick = async () => {
    const user = await authCheck();

    // 1️⃣ Not signed in
    if (!user || !user.user) {
      router.push("/customer/signin");
      return;
    }

    const roleId = user.user.roleid;

    // 2️⃣ Customer
    if (roleId === 3) {
      router.push("/owner/verification");
      return;
    }

    // 3️⃣ Owner
    if (roleId === 2) {

      if (isownerVerificationComplete == false) {
        router.push("/owner/verification");
        return;
      }


      router.push("/owner/overview");
      return;
    }

    // 4️⃣ Admin
    if (roleId === 1) {
      router.push("/admin");
      return;
    }
  };

  return (
    <nav className="w-full bg-white min-h-[80px] lg:h-[111px] flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-[203px] py-4 lg:py-0 gap-4 lg:gap-0">
      <Link href="/">
        <Image
          src="/figmaAssets/logo_orignal.png"
          alt="Hotelire"
          width={141}
          height={94}
          className="w-[auto] h-[54px] lg:w-[auto] lg:h-[54px]"
        />
      </Link>

      <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 [font-family:'Inter',Helvetica] font-bold text-black text-[15px] lg:text-[15px]">
        <Link
          href="/customer/explore-canada"
          prefetch={false}
          className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 ${isActive("/customer/explore-canada")
              ? "text-[#59A5B2] border-b-2 border-[#59A5B2]"
              : "hover:text-[#59A5B2]"
            }`}
        >
          <span>EXPLORE CANADA</span>
          {/* <ChevronDownIcon className="w-[13px] h-2" aria-hidden="true" /> */}
        </Link>
        <Link
          href="/customer/listing"
          prefetch={false}
          className={`cursor-pointer transition-colors duration-200 ${isActive("/customer/listing")
              ? "text-[#59A5B2] border-b-2 border-[#59A5B2]"
              : "hover:text-[#59A5B2]"
            }`}
        >
          SEARCH
        </Link>
        <Link
          href="/blog"
          prefetch={false}
          className={`cursor-pointer transition-colors duration-200 ${isActive("/blog")
              ? "text-[#59A5B2] border-b-2 border-[#59A5B2]"
              : "hover:text-[#59A5B2]"
            }`}
        >
          BLOG
        </Link>
        <Link
          href="/customer/contact"
          prefetch={false}
          className={`cursor-pointer transition-colors duration-200 ${isActive("/contact")
              ? "text-[#59A5B2] border-b-2 border-[#59A5B2]"
              : "hover:text-[#59A5B2]"
            }`}
        >
          CONTACT
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
        <Button
          variant="outline"
          onClick={handleListPropertyClick}
          className="w-full sm:w-[160px] lg:w-[181px] h-[45px] lg:h-[55px] bg-[#f5f6fd] rounded-[5px] border border-solid border-[#d9d9d9] [font-family:'Poppins',Helvetica] font-semibold text-[#59A5B2] text-xs lg:text-sm transition-all duration-200 hover:shadow-lg"
        >
          {roleId === 1 ? "ADMIN PANEL" : "LIST YOUR PROPERTY"}
        </Button>

        {/* <Button className="w-full sm:w-[160px] lg:w-[181px] h-[45px] lg:h-[55px] bg-[#febc11] rounded-[5px] [font-family:'Poppins',Helvetica] font-semibold text-[#59A5B2] text-xs lg:text-sm transition-all duration-200 hover:bg-[#febc11]/90 hover:scale-105 hover:shadow-lg">
          <a href="/" rel="noopener noreferrer">
            DISCOVER MORE
          </a>
        </Button> */}
      </div>
    </nav>
  );
}
