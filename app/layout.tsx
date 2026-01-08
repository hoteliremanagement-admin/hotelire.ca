// import type { Metadata } from "next";
// import { Poppins, Inter } from "next/font/google";
// import "./globals.css";
// import { Providers } from "./providers";
// import Script from "next/script";
// import { config } from "@fortawesome/fontawesome-svg-core";
// import "@fortawesome/fontawesome-svg-core/styles.css";
// import { Toaster } from "react-hot-toast";

// config.autoAddCss = false;

// const poppins = Poppins({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   subsets: ["latin"],
//   variable: "--font-poppins",
//   display: "swap",
// });

// const inter = Inter({
//   weight: ["500", "700"],
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "Hotelire",
//   description: "Find Your Dream Luxury Hotel",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin="anonymous"
//         />
//       </head>

//       <body suppressHydrationWarning>
//         <Providers>
//           {children}

//           {/* ✅ Global Toast Notifications */}
//           <Toaster
//             position="bottom-left"
//             toastOptions={{
//               duration: 3000,
//               style: {
//                 background: "#1f2937", // dark gray
//                 color: "#fff",
//                 fontSize: "14px",
//               },
//               success: {
//                 iconTheme: {
//                   primary: "#59A5B2",
//                   secondary: "#fff",
//                 },
//               },
//               error: {
//                 iconTheme: {
//                   primary: "#ef4444",
//                   secondary: "#fff",
//                 },
//               },
//             }}
//           />
//         </Providers>

//         {/* Google Identity */}
//         <script
//           src="https://accounts.google.com/gsi/client"
//           async
//         ></script>

//         {/* Google Maps */}
//         <Script
//           src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
//           strategy="beforeInteractive"
//         />
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "react-hot-toast";

config.autoAddCss = false;

const poppins = Poppins({
  weight: ["100","200","300","400","500","600","700","800","900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  weight: ["500","700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hotelire | Book Hotels in Canada",
    template: "%s | Hotelire",
  },
  description:
    "Hotelire helps you book the best hotels across Canada. Discover luxury, budget, and family-friendly hotels with secure booking and verified listings.",
  keywords: [
    "hotels in canada",
    "best hotels in canada",
    "canada hotels booking",
    "toronto hotels",
    "vancouver hotels",
    "luxury hotels canada",
  ],
  metadataBase: new URL("https://hotelire.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Hotelire | Book Hotels in Canada",
    description:
      "Find and book the best hotels across Canada with Hotelire. Verified properties, best prices and secure booking.",
    url: "https://hotelire.com",
    siteName: "Hotelire",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotelire | Book Hotels in Canada",
    description:
      "Book top hotels across Canada with Hotelire. Luxury & budget hotels available.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>

      <body suppressHydrationWarning>
        <Providers>
          {children}

          <Toaster
            position="bottom-left"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#1f2937",
                color: "#fff",
                fontSize: "14px",
              },
              success: {
                iconTheme: {
                  primary: "#59A5B2",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </Providers>

        {/* Google Identity */}
        <script
          src="https://accounts.google.com/gsi/client"
          async
        ></script>

        {/* Google Maps */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
