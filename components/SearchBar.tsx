"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const canadianCities = [
  "Toronto, Ontario",
  "Montreal, Quebec",
  "Vancouver, British Columbia",
  "Calgary, Alberta",
  "Edmonton, Alberta",
  "Ottawa, Ontario",
  "Mississauga, Ontario",
  "Winnipeg, Manitoba",
  "Quebec City, Quebec",
  "Hamilton, Ontario",
  "Brampton, Ontario",
  "Surrey, British Columbia",
  "Kitchener, Ontario",
  "Laval, Quebec",
  "Halifax, Nova Scotia",
  "London, Ontario",
  "Victoria, British Columbia",
  "Markham, Ontario",
  "St. Catharines, Ontario",
  "Niagara Falls, Ontario",
  "Vaughan, Ontario",
  "Gatineau, Quebec",
  "Windsor, Ontario",
  "Saskatoon, Saskatchewan",
  "Longueuil, Quebec",
  "Burnaby, British Columbia",
  "Regina, Saskatchewan",
  "Richmond, British Columbia",
  "Richmond Hill, Ontario",
  "Oakville, Ontario",
  "Burlington, Ontario",
  "Greater Sudbury, Ontario",
  "Sherbrooke, Quebec",
  "Oshawa, Ontario",
  "Saguenay, Quebec",
  "Lévis, Quebec",
  "Barrie, Ontario",
  "Abbotsford, British Columbia",
  "Coquitlam, British Columbia",
  "Trois-Rivières, Quebec",
  "St. John's, Newfoundland and Labrador",
  "Guelph, Ontario",
  "Cambridge, Ontario",
  "Whitby, Ontario",
  "Kelowna, British Columbia",
  "Kingston, Ontario",
  "Ajax, Ontario",
  "Langley, British Columbia",
  "Saanich, British Columbia",
  "Terrebonne, Quebec",
  "Milton, Ontario",
  "Thunder Bay, Ontario",
  "Waterloo, Ontario",
  "Delta, British Columbia",
  "Chatham-Kent, Ontario",
  "Red Deer, Alberta",
  "Kamloops, British Columbia",
  "Brantford, Ontario",
  "Cape Breton, Nova Scotia",
  "Lethbridge, Alberta",
  "Saint-Jean-sur-Richelieu, Quebec",
  "Clarington, Ontario",
  "Pickering, Ontario",
  "Nanaimo, British Columbia",
  "Sudbury, Ontario",
  "North Vancouver, British Columbia",
  "Brossard, Quebec",
  "Repentigny, Quebec",
  "Newmarket, Ontario",
  "Chilliwack, British Columbia",
  "White Rock, British Columbia",
  "Maple Ridge, British Columbia",
  "Peterborough, Ontario",
  "Kawartha Lakes, Ontario",
  "Prince George, British Columbia",
  "Sault Ste. Marie, Ontario",
  "Sarnia, Ontario",
  "Wood Buffalo, Alberta",
  "New Westminster, British Columbia",
  "Châteauguay, Quebec",
  "Saint-Jérôme, Quebec",
  "Drummondville, Quebec",
  "Saint John, New Brunswick",
  "Caledon, Ontario",
  "St. Albert, Alberta",
  "Granby, Quebec",
  "Medicine Hat, Alberta",
  "Grande Prairie, Alberta",
  "St. Thomas, Ontario",
  "Airdrie, Alberta",
  "Halton Hills, Ontario",
  "Saint-Hyacinthe, Quebec",
  "Lac-Brome, Quebec",
  "Port Coquitlam, British Columbia",
  "Fredericton, New Brunswick",
  "Blainville, Quebec",
  "Aurora, Ontario",
  "Welland, Ontario",
  "North Bay, Ontario",
  "Beloeil, Quebec",
  "Belleville, Ontario",
  "Mirabel, Quebec",
  "Shawinigan, Quebec",
  "Dollard-des-Ormeaux, Quebec",
  "Brandon, Manitoba",
  "Rimouski, Quebec",
  "Cornwall, Ontario",
  "Stouffville, Ontario",
  "Georgina, Ontario",
  "Victoriaville, Quebec",
  "Vernon, British Columbia",
  "Duncan, British Columbia",
  "Saint-Eustache, Quebec",
  "Quinte West, Ontario",
  "Charlottetown, Prince Edward Island",
  "Mascouche, Quebec",
  "West Vancouver, British Columbia",
  "Salaberry-de-Valleyfield, Quebec",
  "Rouyn-Noranda, Quebec",
  "Timmins, Ontario",
  "Sorel-Tracy, Quebec",
  "New Tecumseth, Ontario",
  "Woodstock, Ontario",
  "Boucherville, Quebec",
  "Mission, British Columbia",
  "Vaudreuil-Dorion, Quebec",
  "Brant, Ontario",
  "Lakeshore, Ontario",
  "Innisfil, Ontario",
  "Prince Albert, Saskatchewan",
  "Langford Station, British Columbia",
  "Bradford West Gwillimbury, Ontario",
  "Campbell River, British Columbia",
  "Spruce Grove, Alberta",
  "Moose Jaw, Saskatchewan",
  "Penticton, British Columbia",
  "Port Moody, British Columbia",
  "Leamington, Ontario",
  "East Kelowna, British Columbia",
  "Côte-Saint-Luc, Quebec",
  "Val-d'Or, Quebec",
  "Owen Sound, Ontario",
  "Stratford, Ontario",
  "Lloydminster, Saskatchewan",
  "Pointe-Claire, Quebec",
  "Orillia, Ontario",
  "Alma, Quebec",
  "Orangeville, Ontario",
  "Fort Erie, Ontario",
  "LaSalle, Ontario",
  "Sainte-Julie, Quebec",
  "Leduc, Alberta",
  "North Cowichan, British Columbia",
];

export function SearchBar() {
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  const filteredCities = location
    ? canadianCities.filter((city) =>
        city.toLowerCase().includes(location.toLowerCase()),
      )
    : [];

  const handleLocationChange = (value: string) => {
    setLocation(value);
    setShowSuggestions(value.length > 0);
  };

  const selectCity = (city: string) => {
    setLocation(city);
    setShowSuggestions(false);
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
          id="location"
          type="text"
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
          onFocus={() => location && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Where are you going?"
          className="[font-family:'Poppins',Helvetica] font-normal text-[#919191] text-[12px] md:text-[13px] border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#919191] no-shadow"
          data-testid="input-location"
        />
        {showSuggestions && filteredCities.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e5e5e5] rounded-md shadow-lg max-h-[300px] overflow-y-auto z-50">
            {filteredCities.slice(0, 10).map((city) => (
              <button
                key={city}
                onClick={() => selectCity(city)}
                className="w-full text-left px-4 py-2 hover:bg-[#f5f6fd] [font-family:'Poppins',Helvetica] text-sm text-[#59A5B2] transition-colors duration-200"
                data-testid={`suggestion-${city}`}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Check-in / Check-out */}
      <div className="flex-1 px-4 md:px-6 py-3 md:py-0 md:border-r border-[#e5e5e5] flex flex-col justify-center">
        <label className="[font-family:'Poppins',Helvetica] font-semibold text-[#59A5B2] text-[13px] md:text-[14px] mb-1 flex items-center gap-2">
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
                ? `${format(checkInDate, "MMM dd")} - ${format(checkOutDate, "MMM dd")}`
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
                ? `${adults} ${adults === 1 ? "adult" : "adults"}${children > 0 ? ` - ${children} ${children === 1 ? "child" : "children"}` : ""}`
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
