"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Heart, MapPin, Star } from "lucide-react";
import { EXPLORE_CITIES } from "@/config/exploreCities";
import { usePathname } from "next/navigation"

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const provinceRes = await axios.get(
  `${baseUrl}/auth/getCanadianProvinces`
);

const provinces = provinceRes.data.provinces;

const cityIdMap = new Map<string, number>();



for (const city of EXPLORE_CITIES) {
  const province = provinces.find(
    (p: any) =>
      p.canadian_province_name.toLowerCase() ===
      city.province.toLowerCase()
  );

  if (!province) continue;

  const cityRes = await axios.get(
    `${baseUrl}/auth/getCanadianCities/${province.canadian_province_id}`
  );

  const matchedCity = cityRes.data.cities.find(
    (c: any) =>
      c.canadian_city_name.toLowerCase() ===
      city.city.toLowerCase()
  );

  if (matchedCity) {
    cityIdMap.set(city.slug, matchedCity.canadian_city_id);
  }
}

/* ---------------- SimpleHotelCard (SAME AS BEFORE) ---------------- */
function SimpleHotelCard({ hotel }: { hotel: any }) {
  return (
    <div className="group h-full">
      <a
        href={`/customer/hotel/${hotel.id}`}
        className="block h-full overflow-hidden bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300"
      >
        <div className="flex flex-col h-full">
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-[#59A5B2] uppercase">
                {hotel.type}
              </span>
            </div>
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-[#333] text-base">
                {hotel.name}
              </h3>
              <div className="flex items-center gap-1 bg-[#f0f9fa] px-2 py-1 rounded">
                <Star className="w-3 h-3 fill-[#FEBC11]" />
                <span className="text-xs font-bold text-[#59A5B2]">
                  {hotel.rating}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-500 flex items-center gap-1 mb-4">
              <MapPin className="w-3 h-3" />
              {hotel.location}
            </p>

            <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-400 italic">
                {hotel.reviews}
              </span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(hotel.rating)
                        ? "fill-[#FEBC11] text-[#FEBC11]"
                        : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

/* ---------------- Explore Canada Page ---------------- */
export default function ExploreCanadaPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
const pathname = usePathname();
  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get(
        `${baseUrl}/ownerProperty/getProperties`,
        { withCredentials: true }
      );

      const properties = res.data.properties;

      const result = EXPLORE_CITIES.map((city) => {
        const cityId = cityIdMap.get(city.slug);

const hotels = properties
  .filter((p: any) => p.canadian_city_id === cityId)
  .slice(0, 4)
  .map((p: any) => ({
    id: p.propertyid,
    name: p.propertytitle,
    image: p.photo1_featured,
    type: p.propertyclassification?.propertyclassificationname,
    rating: 4,
    reviews: "Verified guests",
    location: `${city.city}, ${city.province}`,
  }));


        return {
          ...city,
          description: `Top rated stays in ${city.city}, ${city.province}`,
          hotels,
        };
      });

      setDestinations(result);
      setLoading(false);
    };

    loadData();
  }, []);

  

useEffect(() => {
  if (loading) return;

  const hash = window.location.hash;
  if (!hash) return;

  const id = hash.replace("#", "");
  const el = document.getElementById(id);

  if (el) {
    setTimeout(() => {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // ✨ highlight
      el.classList.add("section-highlight");

      // remove highlight after 2 seconds
      setTimeout(() => {
        el.classList.remove("section-highlight");
      }, 2000);
    }, 100);
  }
}, [pathname, loading]);


if (loading) return null;
  return (
    <div className="bg-[#fafafa] min-h-screen">
      <Header />
      <Navigation />
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center">
        <Image
          src="/figmaAssets/rectangle-290.png"
          alt="Explore Canada Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-[#febc11] text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Explore Canada
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            Discover the most beautiful destinations and luxury stays across the Great White North.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="site-container py-16">
        {/* Intro Section */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-[#59A5B2] font-bold text-3xl md:text-4xl mb-6">
            Your Canadian Journey Starts Here
          </h2>
          <div className="h-1 w-20 bg-[#59A5B2] mx-auto mb-8 rounded-full" />
          <p className="text-gray-600 text-lg leading-relaxed">
            From vibrant city lights to serene mountain escapes; discover where Canadians and travelers from around the world love to stay. Find your perfect getaway in these top destinations.
          </p>
        </div>
        </main>
      {/* Main Content */}
      <main className="site-container py-16 space-y-24">
        {destinations.map((destination) => (
          <section
            key={destination.slug}
            id={destination.slug}
            className="scroll-mt-20 p-6"
          >
            <div className="flex justify-between items-end mb-10 pb-6 border-b">
              <div>
                <h3 className="text-2xl font-bold">
                  {destination.city},{" "}
                  <span className="text-[#59A5B2]">
                    {destination.province}
                  </span>
                </h3>
                <p className="text-gray-500 mt-1">
                  {destination.description}
                </p>
              </div>

              {/* 👇 VIEW ALL PROPERTIES (RESTORED) */}
              <a
                href={`/customer/listing?city=${destination.slug}`}
                className="text-[#59A5B2] font-semibold text-sm hover:underline"
              >
                View all properties →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destination.hotels.map((hotel: any) => (
                <SimpleHotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
