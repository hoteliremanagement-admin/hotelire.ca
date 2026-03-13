
"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { DestinationCard } from "@/components/DestinationCard";
import { HotelCard } from "@/components/HotelCard";
import { destinations, popularHotels } from "@/lib/data";
import { Mbanner } from "@/components/Mbanner";
import { Suspense } from "react";
import { GuestHouseCard } from "@/components/GuestHouseCard";
import { useEffect, useState } from "react";
import axios from "axios";

interface GuestHouse {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: string;
  reviews: string;
  image: string;
  stars: string;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: string;
  reviews: string;
  image: string;
  stars: string;
}



export default function CustomerHomePage() {
const [guestHouses, setGuestHouses] = useState<GuestHouse[]>([]);
const [popularHotels, setPopularHotels] = useState<Hotel[]>([]);

useEffect(() => {
  const loadProperties = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/ownerProperty/getProperties`,
        { withCredentials: true }
      );

      const properties = res.data.properties;

      const hotels: Hotel[] = [];
      const guestHouses: GuestHouse[] = [];

      properties.forEach((p: any) => {
        const city = p.canadian_cities?.canadian_city_name;
        const province = p.canadian_states?.canadian_province_name;

        let formattedLocation = "";

        if (city && province) {
          formattedLocation = `${city}, ${province}`;
        } else if (city) {
          formattedLocation = city;
        } else if (province) {
          formattedLocation = province;
        } else {
          formattedLocation = p.address || "";
        }

        const minPrice =
          p.propertyroom?.length > 0
            ? Math.min(
                ...p.propertyroom.map((r: any) => parseFloat(r.price))
              )
            : 0;

        const baseData = {
          id: String(p.propertyid),
          name: p.propertytitle,
          location: formattedLocation,
          rating: p.avgRating ? String(p.avgRating) : "0",
          reviews: "Verified guests",
          image: p.photo1_featured,
          price: minPrice,
        };

        if (p.propertyclassification?.propertyclassificationname === "Hotel") {
          hotels.push({
            ...baseData,
            type: "Hotel",
            stars: "/figmaAssets/group-316-1.png",
          });
        }

        if (
          p.propertyclassification?.propertyclassificationname ===
          "Guest House"
        ) {
          guestHouses.push({
            ...baseData,
            type: "Guest House",
            stars: "/figmaAssets/group-316-5.png",
          });
        }
      });

      // Top 4 hotels sorted by rating
      setPopularHotels(
        hotels
          .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
          .slice(0, 4)
      );

      // Top 4 guest houses
      setGuestHouses(guestHouses.slice(0, 4));
    } catch (error) {
      console.error("Failed to load properties", error);
    }
  };

  loadProperties();
}, []);



  return (
    <div className="bg-soft w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />


      {/* Hero Section */}
<section className="relative w-full min-h-[500px] md:min-h-[500px] lg:min-h-[536px]">
  <Image
    src="/figmaAssets/rectangle-290.png"
    alt="Hero background"
    fill
    className="object-cover"
    priority
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-[#080808] opacity-50 z-0" />

  <div className="relative z-10">
    <div className="site-container flex flex-col items-center justify-center text-center px-4 py-16 md:py-20 lg:py-0 min-h-[500px] md:min-h-[500px] lg:min-h-[536px]">
      
      {/* Heading Content */}
      <div className="mb-8 md:mb-12 lg:mb-[71px]">
        <h1 className="[text-shadow:4px_4px_4px_#00000040] font-normal text-[20px] md:text-[30px] lg:text-[38px] mb-2 md:mb-4">
          <span className="text-white">Your </span>
          <span className="font-bold text-[#febc11]">perfect stay</span>
          <span className="text-white"> is one click away</span>
        </h1>

        <h2 className="[text-shadow:4.45px_4.45px_4.45px_#00000040] font-bold text-white text-[28px] md:text-[40px] lg:text-[53.3px]">
          Find Your Dream Luxury Hotel
        </h2>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-5xl">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar />
        </Suspense>
      </div>

    </div>
  </div>
</section>

      {/* Explore Canada */}
      <section className="w-full bg-soft py-20 md:py-28 px-4 md:px-8 lg:px-[203px]">
        <div className=" w-full max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
                Destinations
              </span>
              <h2 className="font-bold text-[#3F2C77] text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Explore Canada
              </h2>
            </div>
            <p className="font-medium text-[#3F2C77] text-lg max-w-md">
              Discover most popular and trending destinations across the great
              white north.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Most Popular Hotels */}
      <section className="w-full py-20 md:py-28 px-4 md:px-8 lg:px-[203px] bg-white">
        <div className=" w-full max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
                Top Rated
              </span>
              <h2 className="font-bold text-[#3F2C77] text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Most Popular Hotels
              </h2>
            </div>
            <p className="font-medium text-[#3F2C77] text-lg max-w-md">
              Handpicked premium stays for your next unforgettable adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

{/* Offers */}
<section className="w-full bg-[#f0f9ff] py-20 md:py-28 px-4 md:px-8 lg:px-[203px]">
  <div className="max-w-[1400px] mx-auto">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
      <div>
        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-3 block">
          Exclusive
        </span>
        <h2 className="font-bold text-[#3F2C77] text-3xl md:text-4xl lg:text-5xl tracking-tight">
          Special Offers
        </h2>
      </div>
      <p className="font-medium text-[#3F2C77] text-lg max-w-md">
        Promotions, deals and unique experiences curated just for you.
      </p>
    </div>

    {/* Offers Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      <div className="group overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl h-[260px] relative">
        <Image
          src="/figmaAssets/offerbanner (1).jpeg"
          alt="Traveling banner"
          fill
          className="object transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="group overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl h-[260px] relative">
        <Image
          src="/figmaAssets/offerbanner (2).jpeg"
          alt="Traveling banner"
          fill
          className="object transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="group overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl h-[260px] relative">
        <Image
          src="/figmaAssets/offerbanner (3).jpeg"
          alt="Traveling banner"
          fill
          className="object transition-transform duration-700 group-hover:scale-105"
        />
      </div>

    </div>
  </div>
</section>

      {/* Unique Properties */}
      <section className="w-full py-20 md:py-28 px-4 md:px-8 lg:px-[203px] bg-soft">
        <div className=" w-full max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
                Guest Houses
              </span>
              <h2 className="font-bold text-[#3F2C77] text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
                Your perfect Guest House <br /> stay awaits
              </h2>
            </div>
            <p className="font-medium text-[#3F2C77] text-lg max-w-md">
              Trusted guest houses loved by travelers across Canada for that
              home-away-from-home feeling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {guestHouses.map((guestHouse) => (
              <GuestHouseCard key={guestHouse.id} property={guestHouse} />
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <a
              href="/customer/listing?type=Guest%20House"
              className="px-10 py-5 bg-white border-2 border-primary text-primary font-bold rounded-2xl transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-lg shadow-primary/5 flex items-center gap-2 group"
            >
              View all guest houses
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      <Mbanner />
      <Footer />
    </div>
  );
}
