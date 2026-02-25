// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ChevronDownIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { authCheck } from "@/services/authCheck";

// export function Navigation() {
//   const pathname = usePathname();
//   const isActive = (href: string) =>
//     pathname === href || pathname.startsWith(href);

//   const router = useRouter();
//   const [roleId, setRoleId] = useState<number | null>(null);

//   const [isownerVerificationComplete, setisownerVerificationComplete] = useState(false);

//   useEffect(() => {
//     const checkRole = async () => {
//       const user = await authCheck();

//       if (user?.user?.roleid) {
//         setRoleId(user.user.roleid);
//       }

//       if (user.user.roleid === 2) {
//         try {
//           const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/owner/checkOwnerDocuments`, {
//             method: "GET",
//             credentials: "include",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });
//           const data = await response.json();
//           if (data.success == true && data.documentsComplete == true) {
//             setisownerVerificationComplete(true);
//           }

//         } catch (error) {
//           console.error("Error checking owner documents:", error);
//         }
//       }
//     };

//     checkRole();
//   }, []);

//   const handleListPropertyClick = async () => {
//     const user = await authCheck();

//     // 1️⃣ Not signed in
//     if (!user || !user.user) {
//       router.push("/customer/signin");
//       return;
//     }

//     const roleId = user.user.roleid;

//     // 2️⃣ Customer
//     if (roleId === 3) {
//       router.push("/owner/verification");
//       return;
//     }

//     // 3️⃣ Owner
//     if (roleId === 2) {

//       if (isownerVerificationComplete == false) {
//         router.push("/owner/verification");
//         return;
//       }

//       router.push("/owner/overview");
//       return;
//     }

//     // 4️⃣ Admin
//     if (roleId === 1) {
//       router.push("/admin");
//       return;
//     }
//   };

//   return (
//     <nav className="w-full bg-white min-h-[80px] lg:h-[111px] flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-[203px] py-4 lg:py-0 gap-4 lg:gap-0">
//       <Link href="/">
//         <Image
//           src="/figmaAssets/logo_orignal1.png"
//           alt="Hotelire"
//           width={141}
//           height={94}
//           className="w-[auto] h-[54px] lg:w-[auto] lg:h-[54px]"
//         />
//       </Link>

//       <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 [font-family:'Inter',Helvetica] font-bold text-black text-[15px] lg:text-[15px]">
//       <Link
//           href="/"
//           prefetch={false}
//           className={`flex items-center gap-2 cursor-pointer transition-colors 
//               hover:text-[#3F2C77]
//             }`}
//         >
//           <span>HOME</span>
//           {/* <ChevronDownIcon className="w-[13px] h-2" aria-hidden="true" /> */}
//         </Link>
//         <Link
//           href="/customer/explore-canada"
//           prefetch={false}
//           className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 ${isActive("/customer/explore-canada")
//               ? "text-[#3F2C77] border-b-2 border-[#3F2C77]"
//               : "hover:text-[#3F2C77]"
//             }`}
//         >
//           <span>EXPLORE CANADA</span>
//           {/* <ChevronDownIcon className="w-[13px] h-2" aria-hidden="true" /> */}
//         </Link>
//         <Link
//           href="/customer/listing"
//           prefetch={false}
//           className={`cursor-pointer transition-colors duration-200 ${isActive("/customer/listing")
//               ? "text-[#3F2C77] border-b-2 border-[#3F2C77]"
//               : "hover:text-[#3F2C77]"
//             }`}
//         >
//           SEARCH
//         </Link>
//         <Link
//           href="/blog"
//           prefetch={false}
//           className={`cursor-pointer transition-colors duration-200 ${isActive("/blog")
//               ? "text-[#3F2C77] border-b-2 border-[#3F2C77]"
//               : "hover:text-[#3F2C77]"
//             }`}
//         >
//           BLOG
//         </Link>
//         <Link
//           href="/customer/contact"
//           prefetch={false}
//           className={`cursor-pointer transition-colors duration-200 ${isActive("/contact")
//               ? "text-[#3F2C77] border-b-2 border-[#3F2C77]"
//               : "hover:text-[#3F2C77]"
//             }`}
//         >
//           CONTACT
//         </Link>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
//         <Button
//           variant="outline"
//           onClick={handleListPropertyClick}
//           className="w-full sm:w-[160px] lg:w-[181px] h-[45px] lg:h-[55px] bg-[#f5f6fd] rounded-[5px] border border-solid border-[#d9d9d9] [font-family:'Poppins',Helvetica] font-semibold text-[#3F2C77] text-xs lg:text-sm transition-all duration-200 hover:shadow-lg"
//         >
//           {roleId === 1 ? "ADMIN PANEL" : "LIST YOUR PROPERTY"}
//         </Button>

//         {/* <Button className="w-full sm:w-[160px] lg:w-[181px] h-[45px] lg:h-[55px] bg-[#febc11] rounded-[5px] [font-family:'Poppins',Helvetica] font-semibold text-[#3F2C77] text-xs lg:text-sm transition-all duration-200 hover:bg-[#febc11]/90 hover:scale-105 hover:shadow-lg">
//           <a href="/" rel="noopener noreferrer">
//             DISCOVER MORE
//           </a>
//         </Button> */}
//       </div>
//     </nav>
//   );
// }
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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
    <>
      {/* Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Navigation Bar */}
      <nav className="w-full bg-white min-h-[70px] lg:h-[111px] flex items-center justify-between px-4 md:px-8 lg:px-[203px] py-4 lg:py-0 relative z-50 border-b border-gray-100">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/figmaAssets/logo_orignal1.png"
            alt="Hotelire"
            width={141}
            height={94}
            className="h-[50px] w-auto lg:h-[54px]"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center justify-center gap-8 font-bold text-gray-900 text-sm">
          <Link
            href="/"
            prefetch={false}
            className="transition-colors duration-200 hover:text-[#3f2c77]"
          >
            HOME
          </Link>
          <Link
            href="/customer/explore-canada"
            prefetch={false}
            className={`transition-colors duration-200 ${
              isActive("/customer/explore-canada")
                ? "text-[#3f2c77] border-b-2 border-[#3f2c77]"
                : "hover:text-[#3f2c77]"
            }`}
          >
            EXPLORE CANADA
          </Link>
          <Link
            href="/customer/listing"
            prefetch={false}
            className={`transition-colors duration-200 ${
              isActive("/customer/listing")
                ? "text-[#3f2c77] border-b-2 border-[#3f2c77]"
                : "hover:text-[#3f2c77]"
            }`}
          >
            SEARCH
          </Link>
          <Link
            href="/blog"
            prefetch={false}
            className={`transition-colors duration-200 ${
              isActive("/blog")
                ? "text-[#3f2c77] border-b-2 border-[#3f2c77]"
                : "hover:text-[#3f2c77]"
            }`}
          >
            BLOG
          </Link>
          <Link
            href="/customer/contact"
            prefetch={false}
            className={`transition-colors duration-200 ${
              isActive("/contact")
                ? "text-[#3f2c77] border-b-2 border-[#3f2c77]"
                : "hover:text-[#3f2c77]"
            }`}
          >
            CONTACT
          </Link>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block">
          <Button
            variant="outline"
            onClick={handleListPropertyClick}
            className="px-6 py-2.5 bg-blue-50 border border-blue-200 text-[#3f2c77] font-semibold rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            {roleId === 1 ? "ADMIN PANEL" : "LIST YOUR PROPERTY"}
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-sm bg-white shadow-2xl z-40 md:hidden transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Menu</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            href="/"
            prefetch={false}
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-4 py-3 text-gray-900 font-semibold text-lg rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            HOME
          </Link>
          <Link
            href="/customer/explore-canada"
            prefetch={false}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-4 py-3 font-semibold text-lg rounded-lg transition-colors duration-200 ${
              isActive("/customer/explore-canada")
                ? "bg-blue-50 text-[#3f2c77]"
                : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            EXPLORE CANADA
          </Link>
          <Link
            href="/customer/listing"
            prefetch={false}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-4 py-3 font-semibold text-lg rounded-lg transition-colors duration-200 ${
              isActive("/customer/listing")
                ? "bg-blue-50 text-[#3f2c77]"
                : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            SEARCH
          </Link>
          <Link
            href="/blog"
            prefetch={false}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-4 py-3 font-semibold text-lg rounded-lg transition-colors duration-200 ${
              isActive("/blog")
                ? "bg-blue-50 text-[#3f2c77]"
                : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            BLOG
          </Link>
          <Link
            href="/customer/contact"
            prefetch={false}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-4 py-3 font-semibold text-lg rounded-lg transition-colors duration-200 ${
              isActive("/contact")
                ? "bg-blue-50 text-[#3f2c77]"
                : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            CONTACT
          </Link>
        </nav>

        {/* Divider */}
        <div className="border-b border-gray-200 my-2" />

        {/* CTA Button */}
        <div className="p-4">
          <Button
            onClick={() => {
              handleListPropertyClick();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-3 bg-[#3f2c77] hover:bg-[#2a1c5a] text-white font-semibold text-base rounded-lg transition-colors duration-200"
          >
            {roleId === 1 ? "ADMIN PANEL" : "LIST YOUR PROPERTY"}
          </Button>
        </div>
      </div>
    </>
  );
}
