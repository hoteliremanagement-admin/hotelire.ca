
"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, MapPin, Grid, Map } from "lucide-react";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ListingCard } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Listing } from "@/types";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export function ListingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);

  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [Properties, setProperties] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const typeParam = searchParams.get("type");
    const priceParam = searchParams.get("price");
    const starsParam = searchParams.get("stars");
    const facilitiesParam = searchParams.get("facilities");
    const sortParam = searchParams.get("sort");

    if (typeParam) {
      setSelectedTypes(typeParam.split(","));
    }
    if (priceParam) {
      const [min, max] = priceParam.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        setPriceRange([min, max]);
      }
    }
    if (starsParam) {
      setSelectedStars(starsParam.split(",").map(Number));
    }
    if (facilitiesParam) {
      setSelectedFacilities(facilitiesParam.split(","));
    }
    if (sortParam) {
      setSortBy(sortParam);
    }
  }, [searchParams]);

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();

    if (selectedTypes.length > 0) {
      params.set("type", selectedTypes.join(","));
    }
    if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
      params.set("price", `${priceRange[0]}-${priceRange[1]}`);
    }
    if (selectedFacilities.length > 0) {
      params.set("facilities", selectedFacilities.join(","));
    }
    if (selectedStars.length > 0) {
      params.set("stars", selectedStars.join(","));
    }
    if (sortBy !== "recommended") {
      params.set("sort", sortBy);
    }

    const queryString = params.toString();
    const newURL = queryString ? `/customer/listing?${queryString}` : "/customer/listing";
    router.push(newURL, { scroll: false });
  }, [
    selectedTypes,
    priceRange,
    selectedFacilities,
    selectedStars,
    sortBy,
    router,
  ]);

  useEffect(() => {
    updateURL();
  }, [
    selectedTypes,
    priceRange,
    selectedFacilities,
    selectedStars,
    sortBy,
    updateURL,
  ]);

  const mapPropertyToCard = (property: any) => {
    const roomTypes = [
      ...new Set(
        property.propertyroom
          ?.map((room: any) => room.roomtype?.roomtypename)
          .filter(Boolean)
      ),
    ];

    const featuredAmenities = property.propertyamenities
      ?.filter((a: any) => a.features === true)
      .map((a: any) => a.amenities?.amenitiesname)
      .filter(Boolean);

    const prices = property.propertyroom
      ?.map((room: any) => room.price)
      .filter((p: number) => p !== null && p !== undefined);

    const minPrice = prices?.length ? Math.min(...prices) : null;

    return {
      id: property.propertyid,
      name: property.propertytitle,
      classification:
        property.propertyclassification?.propertyclassificationname,
      mapUrl: property.propertymaplink,
      rating: 4.0,
      image: property.photo1_featured,
      roomTypes,
      checkIn: property.checkintime,
      checkOut: property.checkouttime,
      amenities: featuredAmenities,
      price: minPrice,
    };
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${baseUrl}/ownerProperty/getProperties`, {
          withCredentials: true,
        });
        console.log("Property Object for search",res.data);
        const cardsData = res.data.properties.map((p: any) =>
          mapPropertyToCard(p)
        );
        setProperties(cardsData);
      } catch (ex) {
        alert("Something went wrong");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [router]);

  const filteredAndSortedListings = useMemo(() => {
    let results = [...Properties];

    // Filter by search query (property name)
    if (searchQuery) {
      results = results.filter((listing) =>
        listing.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by property type
    if (selectedTypes.length > 0) {
      results = results.filter((listing) =>
        selectedTypes.some(
          (type) => listing.classification?.toLowerCase() === type.toLowerCase()
        )
      );
    }

    // Filter by price range
    if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
      results = results.filter((listing) => {
        const price = listing.price || 0;
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }

    // Filter by facilities (property must have ALL selected facilities)
    if (selectedFacilities.length > 0) {
      results = results.filter((listing) => {
        const amenities = (listing.amenities || []).map((a) => a.toLowerCase());
        return selectedFacilities.every((facility) =>
          amenities.some((amenity) => amenity.includes(facility.toLowerCase()))
        );
      });
    }

    // Filter by star rating
    if (selectedStars.length > 0) {
      results = results.filter((listing) =>
        selectedStars.includes(Math.floor(listing.rating))
      );
    }

    if (sortBy === "price-low") {
      results.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-high") {
      results.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    }
    // "recommended" is default, no sorting needed

    return results;
  }, [
    Properties,
    searchQuery,
    selectedTypes,
    priceRange,
    selectedFacilities,
    selectedStars,
    sortBy,
  ]);

  const handleTypeChange = useCallback((type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  const handleFacilityChange = useCallback((facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    );
  }, []);

  const handleStarChange = useCallback((star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  }, []);

  return (
    <section className="flex-1 w-full px-4 md:px-8 lg:px-[203px] py-6 md:py-8">
        <div className="site-container">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-[280px] flex-shrink-0">
          <FilterSidebar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            selectedTypes={selectedTypes}
            onTypeChange={handleTypeChange}
            selectedFacilities={selectedFacilities}
            onFacilityChange={handleFacilityChange}
            selectedStars={selectedStars}
            onStarChange={handleStarChange}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header with Sort and View Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#59a5b2] text-xl md:text-2xl mb-2">
                Places in Canada
              </h1>
              <p className="[font-family:'Inter',Helvetica] font-medium text-gray-600 text-sm md:text-base">
                {filteredAndSortedListings.length} properties found
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="lg:hidden flex items-center gap-2 flex-1 sm:flex-initial bg-transparent"
                    data-testid="button-mobile-filters"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="[font-family:'Poppins',Helvetica] font-bold text-[#59a5b2]">
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      priceRange={priceRange}
                      onPriceChange={setPriceRange}
                      selectedTypes={selectedTypes}
                      onTypeChange={handleTypeChange}
                      selectedFacilities={selectedFacilities}
                      onFacilityChange={handleFacilityChange}
                      selectedStars={selectedStars}
                      onStarChange={handleStarChange}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger
                  className="w-full sm:w-[180px]"
                  data-testid="select-sort"
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="recommended"
                    data-testid="option-recommended"
                  >
                    Recommended
                  </SelectItem>
                  <SelectItem value="price-low" data-testid="option-price-low">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem
                    value="price-high"
                    data-testid="option-price-high"
                  >
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="rating" data-testid="option-rating">
                    Rating: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-1 border border-gray-300 rounded-md p-1">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  className={`px-3 ${
                    viewMode === "list" ? "bg-[#59a5b2] hover:bg-[#2a2158]" : ""
                  }`}
                  onClick={() => setViewMode("list")}
                  data-testid="button-view-list"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  className={`px-3 ${
                    viewMode === "map" ? "bg-[#59a5b2] hover:bg-[#2a2158]" : ""
                  }`}
                  onClick={() => setViewMode("map")}
                  data-testid="button-view-map"
                >
                  <Map className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Listings - List View */}
          {viewMode === "list" && (
            <div className="space-y-4">
              {filteredAndSortedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          {/* Map View */}
          {viewMode === "map" && (
            <div className="w-full h-[600px] bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#59a5b2] mx-auto mb-4" />
                <p className="[font-family:'Poppins',Helvetica] font-semibold text-[#59a5b2] text-lg mb-2">
                  Map View
                </p>
                <p className="[font-family:'Inter',Helvetica] text-gray-600 text-sm">
                  Map integration coming soon
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
