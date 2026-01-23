
"use client"

import { useEffect, useMemo, useCallback, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"

import { FilterSidebar } from "@/components/FilterSidebar"
import { ListingCard } from "@/components/ListingCard"

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export function ListingPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  /* -------------------- STATE -------------------- */

  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  // Property Type
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  // Amenities (DB: propertyamenities)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  // Stars
  const [selectedStars, setSelectedStars] = useState<number[]>([])

  const [properties, setProperties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  /* -------------------- URL → STATE -------------------- */

  const citySlugToIdMap = new Map<string, number>([
    ["toronto", 81],
    ["vancouver", 11],
    ["montreal", 106],
    ["banff", 1], // not in DB - it is a twon in Alberta
    ["niagara-falls", 654], // not in DB - it is a twon in ontario
    ["quebec-city", 107],
  ])

  useEffect(() => {
    const typeParam = searchParams.get("type")
    const amenitiesParam = searchParams.get("amenities")
    const priceParam = searchParams.get("price")
    const starsParam = searchParams.get("stars")
    const cityParam = searchParams.get("city")

    if (typeParam) setSelectedTypes(typeParam.split(","))
    if (amenitiesParam) setSelectedAmenities(amenitiesParam.split(","))
    if (starsParam) setSelectedStars(starsParam.split(",").map(Number))

    if (priceParam) {
      const [min, max] = priceParam.split("-").map(Number)
      if (!isNaN(min) && !isNaN(max)) setPriceRange([min, max])
    }
    if (cityParam) {
      setSelectedCity(cityParam)
    }
  }, [searchParams])

  /* -------------------- STATE → URL -------------------- */

  const updateURL = useCallback(() => {
    const params = new URLSearchParams()

    // 🏙️ CITY (MOST IMPORTANT)
    if (selectedCity) {
      params.set("city", selectedCity)
    }

    // 🏨 Property Type
    if (selectedTypes.length) {
      params.set("type", selectedTypes.join(","))
    }

    // 🧩 Amenities
    if (selectedAmenities.length) {
      params.set("amenities", selectedAmenities.join(","))
    }

    // ⭐ Rating
    if (selectedStars.length) {
      params.set("stars", selectedStars.join(","))
    }

    // 💰 Price
    if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
      params.set("price", `${priceRange[0]}-${priceRange[1]}`)
    }

    // 🔁 IMPORTANT: replace (not push)
    router.replace(`/customer/listing?${params.toString()}`, {
      scroll: false,
    })
  }, [selectedCity, selectedTypes, selectedAmenities, selectedStars, priceRange, router])

  useEffect(() => {
    updateURL()
  }, [selectedCity, selectedTypes, selectedAmenities, selectedStars, priceRange]) //  searchQuery intentionally excluded

  /* -------------------- FETCH DATA -------------------- */

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true)

        if (!baseUrl) {
          console.error("[v0] NEXT_PUBLIC_BACKEND_URL is not set")
          setProperties([])
          setIsLoading(false)
          return
        }

        const res = await axios.get(`${baseUrl}/ownerProperty/getProperties`, {
          withCredentials: true,
        })

        console.log(" API Response:", res.data)

        const propertyArray = res.data?.property || res.data?.properties || []

        if (!Array.isArray(propertyArray)) {
          console.error("Expected property/properties to be an array, got:", typeof propertyArray)
          setProperties([])
          setIsLoading(false)
          return
        }

        const mapped = propertyArray.map((p: any) => {
          const prices = p.propertyroom?.map((r: any) => r.price).filter(Boolean) || []

          const roomTypes = [...new Set(p.propertyroom?.map((r: any) => r.roomtype?.roomtypename).filter(Boolean))]

          return {
            id: p.propertyid,
            name: p.propertytitle,
            classification: p.propertyclassification?.propertyclassificationname,
            image: p.photo1_featured,
            avgRating: p.avgRating ?? 0,
            price: prices.length ? Math.min(...prices) : 0,

            // 🏙️ ADD THESE (IMPORTANT FOR CITY FILTER)
            canadian_city_id: p.canadian_city_id,
            canadian_province_id: p.canadian_province_id,

            // ✅ REQUIRED BY ListingCard
            roomTypes,
            checkIn: p.checkintime,
            checkOut: p.checkouttime,
            mapUrl: p.propertymaplink,

            // Amenities
            amenities:
              p.propertyamenities
                ?.filter((a: any) => a.features === true)
                .map((a: any) => a.amenities?.amenitiesname) || [],
          }
        })

        setProperties(mapped)
      } catch (error) {
        console.error("[v0] Error fetching properties:", error)
        setProperties([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [router])

  /* -------------------- DERIVED FILTER DATA -------------------- */

  const propertyTypes = useMemo(() => {
    const map = new Map<string, number>()
    properties.forEach((p) => {
      if (!p.classification) return
      map.set(p.classification, (map.get(p.classification) || 0) + 1)
    })
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
  }, [properties])

  const amenities = useMemo(() => {
    const map = new Map<string, number>()
    properties.forEach((p) => {
      ;(p.amenities || []).forEach((a: string) => {
        map.set(a, (map.get(a) || 0) + 1)
      })
    })
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
  }, [properties])

  /* -------------------- FILTERING -------------------- */

  const filteredProperties = useMemo(() => {
    let result = [...properties]

    // 🔍 Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter((p) => typeof p.name === "string" && p.name.toLowerCase().includes(q))
    }

    // 🏨 Property Type
    if (selectedTypes.length) {
      result = result.filter((p) => selectedTypes.includes(p.classification))
    }

    // 🧩 Amenities
    if (selectedAmenities.length) {
      result = result.filter((p) => selectedAmenities.every((a) => (p.amenities || []).includes(a)))
    }

    // ⭐ Rating
    if (selectedStars.length) {
      result = result.filter((p) => selectedStars.includes(Math.floor(p.avgRating)))
    }

    // 🏙️ CITY FILTER (✅ NEW — STEP 2)

    // if (selectedCity) {
    //   const cityId = citySlugToIdMap.get(selectedCity)

    //   if (cityId) {
    //     result = result.filter((p) => p.canadian_city_id === cityId)
    //   }
    // }

// 🏙️ CITY FILTER (ID PRIMARY + NAME FALLBACK)
// 🏙️ CITY FILTER (ID BASED — FIXED)
if (selectedCity) {
  const cityId = Number(selectedCity);

  if (!isNaN(cityId)) {
    result = result.filter(
      (p) => Number(p.canadian_city_id) === cityId
    );
  }
}


 // 💰 Price Range
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    return result
  }, [
    properties,
    searchQuery,
    selectedTypes,
    selectedAmenities,
    selectedStars,
    priceRange,
    selectedCity, // 👈 IMPORTANT
  ])

  /* -------------------- HANDLERS -------------------- */

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const toggleStar = (star: number) => {
    setSelectedStars((prev) => (prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]))
  }

  /* -------------------- RENDER -------------------- */

  return (
    <section className="flex-1 w-full px-4 md:px-8 lg:px-[203px] py-6 md:py-8">
      <div className="site-container">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-[280px] hidden lg:block">
            <FilterSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              selectedTypes={selectedTypes}
              onTypeChange={toggleType}
              propertyTypes={propertyTypes}
              selectedAmenities={selectedAmenities}
              onAmenityChange={toggleAmenity}
              amenities={amenities}
              selectedStars={selectedStars}
              onStarChange={toggleStar}
            />
          </aside>

          <div className="flex-1 space-y-4">
            {filteredProperties.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
