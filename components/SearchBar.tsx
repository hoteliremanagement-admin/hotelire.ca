

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronDownIcon,
  CalendarIcon,
  UsersIcon,
  MapPinIcon,
  Minus,
  Plus,
} from "lucide-react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

interface Province {
  canadian_province_id: number;
  canadian_province_name: string;
}

interface City {
  canadian_city_id: number;
  canadian_city_name: string;
  canadian_province_id: number;
  provinceName: string;
}

export function SearchBar() {
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const provinceRes = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/getCanadianProvinces`
        );

        const provincesData: Province[] = provinceRes.data.provinces;
        setProvinces(provincesData);

        let allCities: City[] = [];

        for (const province of provincesData) {
          const cityRes = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/getCanadianCities/${province.canadian_province_id}`
          );

          const mappedCities = cityRes.data.cities.map((c: any) => ({
            ...c,
            provinceName: province.canadian_province_name,
          }));

          allCities.push(...mappedCities);
        }

        setCities(allCities);
      } catch (error) {
        console.error("Failed to load provinces/cities", error);
      }
    };

    loadLocations();
  }, []);

  // Filter cities on typing
  useEffect(() => {
    if (!location) {
      setFilteredCities([]);
      return;
    }

    const q = location.toLowerCase();

    setFilteredCities(
      cities.filter(
        (c) =>
          c.canadian_city_name.toLowerCase().includes(q) ||
          c.provinceName.toLowerCase().includes(q)
      )
    );
  }, [location, cities]);

  // Select city from dropdown
  const selectCity = (city: City) => {
    setSelectedCity(city);
    setLocation(`${city.canadian_city_name}, ${city.provinceName}`);
    setShowSuggestions(false);
    setFilteredCities([]);
  };

  // ===============================
  // PREFILL FROM URL / LOCALSTORAGE
  // ===============================

  useEffect(() => {
    const stored = localStorage.getItem("hotelire_search_context");
    if (!stored) return;

    try {
      const data = JSON.parse(stored);

      if (data.cityName && data.provinceName) {
        setLocation(`${data.cityName}, ${data.provinceName}`);
      }

      if (data.cityId) {
        setSelectedCity({
          canadian_city_id: data.cityId,
          canadian_city_name: data.cityName,
          canadian_province_id: 0,
          provinceName: data.provinceName,
        });
      }

      if (data.checkIn) setCheckInDate(new Date(data.checkIn));
      if (data.checkOut) setCheckOutDate(new Date(data.checkOut));
      if (typeof data.adults === "number") setAdults(data.adults);
      if (typeof data.children === "number") setChildren(data.children);
    } catch (e) {
      console.warn("Invalid search context in localStorage");
    }
  }, []);

  // ===============================
  // SEARCH HANDLER
  // ===============================

  const handleSearch = () => {
    setDateError(false);

    if (!selectedCity) return;

    if (!checkInDate || !checkOutDate) {
      setDateError(true);
      return;
    }

    const formattedCheckIn = format(checkInDate, "yyyy-MM-dd");
    const formattedCheckOut = format(checkOutDate, "yyyy-MM-dd");

    

    const searchContext = {
      cityId: selectedCity.canadian_city_id,
      cityName: selectedCity.canadian_city_name,
      provinceName: selectedCity.provinceName,
      checkIn: formattedCheckIn,
      checkOut: formattedCheckOut,
      adults,
      children,
    };

    localStorage.setItem(
      "hotelire_search_context",
      JSON.stringify(searchContext)
    );

  

router.push(
  `/customer/listing?city=${selectedCity.canadian_city_id}&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}&adults=${adults}&children=${children}`
);
  };

  return (
    <div className="w-full max-w-[1240x] bg-white rounded flex flex-col md:flex-row items-stretch relative">
      {/* Location */}
      <div className="flex-1 px-4 md:px-[33px] py-3 md:py-0 md:border-r border-[#e5e5e5] flex flex-col justify-center relative">
        <label
          htmlFor="location"
          className="[font-family:'Poppins',Helvetica] font-semibold text-[#59A5B2] text-[13px] md:text-[15px] mb-1 flex items-center gap-2"
        >
          <MapPinIcon className="w-4 h-4" />
          Location
        </label>
        <Input
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => location && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Where are you going?"
          className="[font-family:'Poppins',Helvetica] font-normal text-[#919191] text-[12px] md:text-[13px] border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#919191] no-shadow"
          data-testid="input-location"
        />

        {/* <Input
          id="location"
          type="text"
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
          onFocus={() => location && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Where are you going?"
          className="[font-family:'Poppins',Helvetica] font-normal text-[#919191] text-[12px] md:text-[13px] border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#919191] no-shadow"
          data-testid="input-location"
        /> */}
        {showSuggestions && filteredCities.length > 0 && (
<div className="absolute left-0 top-full mt-2 z-50 w-full bg-white shadow-lg rounded-md max-h-64 overflow-y-auto">
            {filteredCities.slice(0, 8).map((city) => (
              <div
                key={city.canadian_city_id}
                onClick={() => selectCity(city)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {city.canadian_city_name}, {city.provinceName}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Check-in / Check-out */}
      <div className="flex-1 px-4 md:px-4 py-3 md:py-0 md:border-r border-[#e5e5e5] flex flex-col justify-center">
        <label htmlFor="date-picker" className="[font-family:'Poppins',Helvetica] font-semibold text-[#59A5B2] text-[10px]  md:text-sm mb-1 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          Check in - Check out
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="[font-family:'Poppins',Helvetica] font-normal text-[#919191] text-[12px] md:text-[13px] border-0 p-0 h-auto justify-start hover:bg-transparent"
              data-testid="button-date-picker"
            >
              {checkInDate && checkOutDate
                ? `${format(checkInDate, "MMM dd")} - ${format(
                    checkOutDate,
                    "MMM dd"
                  )}`
                : "Select dates"}
              <ChevronDownIcon
                className="ml-auto w-3.5 h-2"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4 flex flex-col md:flex-row gap-6">
              {/* Check-in Calendar */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#59A5B2] mb-2">
                  Check-in
                </p>
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>

              {/* Check-out Calendar */}
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#59A5B2] mb-2">
                  Check-out
                </p>
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={setCheckOutDate}
                  disabled={(date) => !checkInDate || date <= checkInDate}
                  className="rounded-md border"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
        {dateError && (
          <p className="[font-family:'Poppins',Helvetica] text-[#ff0000] text-[12px] mt-1">
            Please select check-in and check-out dates
          </p>
        )}
      </div>

      {/* Guests */}
      <div className="flex-1 px-4 md:px-6 py-3 md:py-0 flex flex-col justify-center">
        <label className="[font-family:'Poppins',Helvetica] font-semibold text-[#59A5B2] text-[13px] md:text-[15px] mb-1 flex items-center gap-2">
          <UsersIcon className="w-4 h-4" />
          Guests
        </label>
        <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="[font-family:'Poppins',Helvetica] font-normal text-[#919191] text-[12px] md:text-[13px] border-0 p-0 h-auto justify-start hover:bg-transparent"
              data-testid="button-guests"
            >
              {adults + children > 0
                ? `${adults} ${adults === 1 ? "adult" : "adults"}${
                    children > 0
                      ? ` - ${children} ${
                          children === 1 ? "child" : "children"
                        }`
                      : ""
                  }`
                : "Add guests"}
              <ChevronDownIcon
                className="ml-auto w-3.5 h-2"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-4" align="start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-semibold text-[#59A5B2] text-sm">
                    Adults
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] text-xs text-gray-500">
                    Age 13+
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    disabled={adults <= 1}
                    data-testid="button-decrease-adults"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span
                    className="w-8 text-center [font-family:'Poppins',Helvetica] font-semibold"
                    data-testid="text-adults-count"
                  >
                    {adults}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setAdults(adults + 1)}
                    data-testid="button-increase-adults"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="[font-family:'Poppins',Helvetica] font-semibold text-[#59A5B2] text-sm">
                    Children
                  </p>
                  <p className="[font-family:'Poppins',Helvetica] text-xs text-gray-500">
                    Age 0-12
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    disabled={children <= 0}
                    data-testid="button-decrease-children"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span
                    className="w-8 text-center [font-family:'Poppins',Helvetica] font-semibold"
                    data-testid="text-children-count"
                  >
                    {children}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setChildren(children + 1)}
                    data-testid="button-increase-children"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button
                className="w-full bg-[#59A5B2] hover:bg-[#4C7E87] text-white"
                onClick={() => setIsGuestsOpen(false)}
                data-testid="button-done-guests"
              >
                Done
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Search Button */}
      <Button
        className="w-full md:w-20 lg:w-24 h-[60px] md:h-[75px] bg-[#febc11] rounded-[0px_0px_4px_4px] md:rounded-[0px_4px_4px_0px] transition-all duration-200 hover:bg-[#febc11]/90 hover:shadow-lg"
        aria-label="Search hotels"
        data-testid="button-search"
        onClick={handleSearch}
      >
        <Image
          src="/figmaAssets/group.png"
          alt=""
          width={30}
          height={30}
          className="w-[25px] h-[25px] md:w-[30px] md:h-[30px]"
        />
      </Button>
    </div>
  );
}
