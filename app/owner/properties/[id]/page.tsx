"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPencil,
  faWifi,
  faSquareParking,
  faSwimmingPool,
  faDumbbell,
  faSnowflake,
  faTv,
  faUtensils,
  faMugHot,
  faBell,
  faFireExtinguisher,
  faBriefcaseMedical,
  faKey,
  faShieldHalved,
  faCouch,
  faMountainSun,
  faTree,
  faChevronLeft,
  faChevronRight,
  faStar,
  faLocationDot,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { OwnerLayout } from "@/components/owner/OwnerLayout";
import { RoomCardSkeleton } from "@/components/rooms/RoomCardSkeleton";

// Mock data for property
const propertyData = {
  id: 1,
  title: "Luxury King Suite",
  subtitle: "Premium Waterfront Property",
  city: "Ottawa",
  state: "Ontario",
  rating: 4.9,
  reviews: 124,
  images: [
    "/gallery1.jpg",
    "/gallery2.jpg",
    "/gallery3.jpg",
    "/gallery4.jpg",
    "/gallery5.jpg",
  ],
  description: `Welcome to our Luxury King Suite, a premium waterfront property offering breathtaking views and world-class amenities. This exquisite accommodation features a spacious living area, state-of-the-art entertainment system, and a private balcony overlooking the serene waters.

Perfect for both business and leisure travelers, our suite provides a sanctuary of comfort and elegance. The property is conveniently located near major attractions, fine dining restaurants, and shopping districts.`,
  rules: [
    "Check-in: 3:00 PM - Check-out: 11:00 AM",
    "No smoking on premises",
    "No parties or events",
    "Pets allowed with prior approval",
    "Quiet hours: 10:00 PM - 8:00 AM",
  ],
  amenities: [
    { icon: faWifi, label: "High-Speed Wi-Fi" },
    { icon: faSquareParking, label: "Free Parking" },
    { icon: faSwimmingPool, label: "Pool Access" },
    { icon: faDumbbell, label: "Fitness Center" },
    { icon: faSnowflake, label: "Air Conditioning" },
    { icon: faTv, label: "Smart TV" },
    { icon: faUtensils, label: "Full Kitchen" },
    { icon: faMugHot, label: "Coffee Maker" },
  ],
  safetyFeatures: [
    { icon: faBell, label: "Smoke Detector" },
    { icon: faBell, label: "CO Detector" },
    { icon: faFireExtinguisher, label: "Fire Extinguisher" },
    { icon: faBriefcaseMedical, label: "First Aid Kit" },
    { icon: faKey, label: "Keyless Entry" },
    { icon: faShieldHalved, label: "24/7 Security" },
  ],
  sharedSpaces: [
    { icon: faCouch, label: "Lounge Area" },
    { icon: faMountainSun, label: "Rooftop Terrace" },
    { icon: faTree, label: "Garden" },
    { icon: faSwimmingPool, label: "Pool Deck" },
  ],
  rooms: [
    {
      id: 1,
      name: "King Suite",
      image1: "/room1a.jpg",
      image2: "/room1b.jpg",
      type: "Suite",
      pricePerNight: 12000,
      count: 4,
      enabled: true,
    },
    {
      id: 2,
      name: "Queen Deluxe",
      image1: "/room2a.jpg",
      image2: "/room2b.jpg",
      type: "Deluxe",
      pricePerNight: 8500,
      count: 6,
      enabled: true,
    },
    {
      id: 3,
      name: "Standard Double",
      image1: "/room3a.jpg",
      image2: "/room3b.jpg",
      type: "Standard",
      pricePerNight: 5500,
      count: 10,
      enabled: true,
    },
    {
      id: 4,
      name: "Budget Single",
      image1: "/room4a.jpg",
      image2: "/room4b.jpg",
      type: "Economy",
      pricePerNight: 3000,
      count: 8,
      enabled: false,
    },
  ],
};

export default function PropertyDetailPage() {
const router = useRouter();
const { id } = useParams();

const propertyId = id as string;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: propertyData.title,
    subtitle: propertyData.subtitle,
    city: propertyData.city,
    state: propertyData.state,
  });
  const [rooms, setRooms] = useState(propertyData.rooms);
 const [isLoadingRooms, setIsLoadingRooms] = useState(false)
  console.log("Property ID from route:", propertyId);
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? propertyData.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === propertyData.images.length - 1 ? 0 : prev + 1
    );
  };

  const toggleRoomStatus = (roomId: number) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, enabled: !room.enabled } : room
      )
    );
  };

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          href="/owner/properties"
          className="inline-flex items-center gap-2 text-[#59A5B2] hover:text-[#4a9199] transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
          <span className="font-medium">Back to Properties</span>
        </Link>


        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

            <div>
              <h1
                className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {editData.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{editData.subtitle}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                  <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-[#59A5B2]" />
                  <span>{editData.city}, {editData.state}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-[#FEBC11]" />
                  <span className="font-medium text-gray-800 dark:text-white">
                    {propertyData.rating}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({propertyData.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>



            <Link href={`/owner/add-property/step-1?id=${propertyId}`}>
              <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors ${isEditing
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-[#59A5B2] hover:bg-[#4a9199] text-white"
                  }`}
                data-testid="edit-property-button"
              >

                <FontAwesomeIcon icon={faPencil} className="w-4 h-4" />
                {"Edit Property"}
              </button>
            </Link>



          </div>
        </div>

        {/* Image Gallery */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2
            className="text-xl font-bold text-gray-800 dark:text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Gallery
          </h2>

          {/* Desktop: 1 large + 2x2 grid | Mobile: Stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-auto lg:h-[500px]">
            {/* Large Featured Image - Left Side */}
            <button
              onClick={() => setCurrentImageIndex(0)}
              className="relative h-64 lg:h-full w-full rounded-xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-lg">
                Featured Image 1
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 transform scale-100 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-400 text-lg bg-gray-200 dark:bg-gray-700">
                Featured Image 1
              </div>
            </button>

            {/* Right Side: 2x2 Grid of 4 Images */}
            <div className="grid grid-cols-2 gap-3 h-64 lg:h-full">
              {[1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className="relative w-full h-full rounded-xl overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-sm">
                    Image {index + 1}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 transform scale-100 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-gray-400 text-sm bg-gray-200 dark:bg-gray-700">
                    Image {index + 1}
                  </div>

                  {/* Show "View All Photos" badge on last image if there are more */}
                  {index === 3 && propertyData.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-2xl font-bold">+{propertyData.images.length - 5}</div>
                        <div className="text-sm">More Photos</div>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview & Rules */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2
            className="text-xl font-bold text-gray-800 dark:text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Overview & Rules
          </h2>
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line mb-6">
            {propertyData.description}
          </p>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">House Rules</h3>
            <ul className="space-y-2">
              {propertyData.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#59A5B2] mt-2 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2
            className="text-xl font-bold text-gray-800 dark:text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Most Popular Amenities
          </h2>
          <div className="flex flex-wrap gap-3">
            {propertyData.amenities.map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
              >
                <FontAwesomeIcon icon={amenity.icon} className="w-4 h-4 text-[#59A5B2]" />
                {amenity.label}
              </span>
            ))}
          </div>
        </div>

        {/* Safety Features */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2
            className="text-xl font-bold text-gray-800 dark:text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Safety Features
          </h2>
          <div className="flex flex-wrap gap-3">
            {propertyData.safetyFeatures.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
              >
                <FontAwesomeIcon icon={feature.icon} className="w-4 h-4 text-[#59A5B2]" />
                {feature.label}
              </span>
            ))}
          </div>
        </div>

        {/* Shared Spaces */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2
            className="text-xl font-bold text-gray-800 dark:text-white mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Shared Spaces
          </h2>
          <div className="flex flex-wrap gap-3">
            {propertyData.sharedSpaces.map((space, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
              >
                <FontAwesomeIcon icon={space.icon} className="w-4 h-4 text-[#59A5B2]" />
                {space.label}
              </span>
            ))}
          </div>
        </div>

    
        {/* Available Rooms */}
 <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Available Rooms</h2>
              <p className="text-sm text-gray-500 mt-1">Manage your property's room inventory</p>
            </div>

            <button
              onClick={() => router.push(`/owner/properties/${propertyId}/room/add`)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#59A5B2] text-white font-medium rounded-lg hover:bg-[#4a9199] active:scale-[0.98] transition-all shadow-sm"
            >
              <span className="text-lg">+</span>
              <span>Add New Room</span>
            </button>
          </div>

          {isLoadingRooms ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <RoomCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => router.push(`/owner/properties/${propertyId}/room/edit/${room.id}`)}
                  className="group cursor-pointer border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white"
                >
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={room.image1 || "/placeholder.svg"}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Room count badge on top-right */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                      <span className="text-sm font-semibold text-gray-800">
                        {room.count} {room.count === 1 ? "Room" : "Rooms"}
                      </span>
                    </div>
                    {/* Status badge - subtle on image */}
                    <div
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                        room.enabled ? "bg-green-500/90 text-white" : "bg-gray-500/90 text-white"
                      }`}
                    >
                      {room.enabled ? "Active" : "Inactive"}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    {/* Room name */}
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-[#59A5B2] transition-colors">
                      {room.name}
                    </h3>

                    {/* Room type badge */}
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#59A5B2]/10 text-[#59A5B2] border border-[#59A5B2]/20">
                        {room.type}
                      </span>
                    </div>

                    {/* Price - highlighted */}
                    <div className="flex items-baseline gap-1 pt-1">
                      <span className="text-2xl font-bold text-[#FEBC11]">${room.pricePerNight.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 font-medium">/ night</span>
                    </div>

                    {/* Click to edit hint */}
                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-400 group-hover:text-[#59A5B2] transition-colors">
                        Click to edit details →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoadingRooms && rooms.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-gray-400">🏨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No rooms added yet</h3>
              <p className="text-gray-500 mb-6">Start by adding your first room to this property</p>
              <button
                onClick={() => router.push(`/owner/properties/${propertyId}/room/add`)}
                className="px-6 py-3 bg-[#59A5B2] text-white font-medium rounded-lg hover:bg-[#4a9199] transition-all"
              >
                Add Your First Room
              </button>
            </div>
          )}
        </div>

      </div>
    </OwnerLayout>
  );
}
