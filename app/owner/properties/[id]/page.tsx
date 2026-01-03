"use client"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import * as Icons from "@fortawesome/free-solid-svg-icons"
import { faArrowLeft, faPencil, faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { OwnerLayout } from "@/components/owner/OwnerLayout"
import { RoomCardSkeleton } from "@/components/rooms/RoomCardSkeleton"

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ""

interface Amenities {
  label: string
  icon: string
}

interface SafetyFeatures {
  label: string
  icon: string
}

interface SharedSpaces {
  label: string
  icon: string
}

interface PropertyDetail {
  propertyid: number
  propertytitle: string
  propertysubtitle: string
  canadian_province_name: string
  canadian_city_name: string
  postalcode: string
  propertyclassificationname: string
  checkintime: string
  checkouttime: string
  propertymaplink: string
  photo1_featured: string | null
  photo2: string | null
  photo3: string | null
  photo4: string | null
  photo5: string | null
  houserules: string
  avgRating: number
  PropertyRoom: Array<{
    propertyroomid: number
    roomname: string
    roomcount: number
    price: number
    available: boolean
    pic1: string | null
    pic2: string | null
    roomtypename: string
    roomtypeid: number
  }>
}

export default function PropertyDetailPage() {
  const router = useRouter()
  const { id } = useParams()

  const propertyId = id as string

  const [propertyDetail, setPropertyDetail] = useState<PropertyDetail | null>(null)
  const [PropertyAmenities, setPropertyAmenities] = useState<Amenities[]>([])
  const [PropertySafetyFeatures, setPropertySafetyFeatures] = useState<SafetyFeatures[]>([])
  const [PropertySharedSpaces, setPropertySharedSpaces] = useState<SharedSpaces[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoadingRooms, setIsLoadingRooms] = useState(false)

  console.log("Property ID from route:", propertyId)

  function getIcon(iconName: string): IconDefinition | undefined {
    const icon = (Icons as any)[iconName as keyof typeof Icons]
    return typeof icon === "object" && icon !== null && "iconName" in icon ? (icon as IconDefinition) : undefined
  }

  const mapPropertyToDetail = (raw: any): PropertyDetail => {
    // Reset amenities arrays to avoid accumulating duplicates
    setPropertyAmenities([])
    setPropertySafetyFeatures([])
    setPropertySharedSpaces([])

    const mapped: PropertyDetail = {
      propertyid: raw.propertyid,
      propertytitle: raw.propertytitle,
      propertysubtitle: raw.propertysubtitle,
      canadian_province_name: raw.canadian_states?.canadian_province_name ?? "",
      canadian_city_name: raw.canadian_cities?.canadian_city_name ?? "",
      postalcode: raw.postalcode,
      propertyclassificationname: raw.propertyclassification?.propertyclassificationname ?? "",
      checkintime: raw.checkintime,
      checkouttime: raw.checkouttime,
      propertymaplink: raw.propertymaplink,
      photo1_featured: raw.photo1_featured,
      photo2: raw.photo2,
      photo3: raw.photo3,
      photo4: raw.photo4,
      photo5: raw.photo5,
      houserules: raw.houserules,
      PropertyRoom:
        raw.propertyroom?.map((room: any) => ({
          propertyroomid: room.propertyroomid,
          roomname: room.roomname,
          roomcount: room.roomcount,
          price: room.price,
          available: room.available,
          pic1: room.pic1,
          pic2: room.pic2,
          roomtypename: room.roomtype?.roomtypename ?? "",
          roomtypeid: room.roomtype?.roomtypeid,
        })) ?? [],
      avgRating: raw.avgRating ?? 0.0,
    }
    ;(raw.propertyamenities ?? []).forEach((a: any) => {
      if (a?.amenities?.amenitiesname) {
        setPropertyAmenities((prev) => [...prev, { label: a.amenities?.amenitiesname, icon: a.amenities?.icons }])
      }
    })
    ;(raw.propertysafetyfeatures ?? []).forEach((a: any) => {
      if (a?.safetyfeatures?.safetyfeaturesname) {
        setPropertySafetyFeatures((prev) => [
          ...prev,
          { label: a.safetyfeatures?.safetyfeaturesname, icon: a.safetyfeatures?.icons },
        ])
      }
    })
    ;(raw.propertysharedspaces ?? []).forEach((a: any) => {
      if (a?.sharedspaces?.sharedspacesname) {
        setPropertySharedSpaces((prev) => [
          ...prev,
          { label: a.sharedspaces?.sharedspacesname, icon: a.sharedspaces?.icons },
        ])
      }
    })

    return mapped
  }

  useEffect(() => {
    if (!id || id === "") {
      router.push("/not-found")
      return
    }

    const fetchProperty = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`${baseUrl}/ownerProperty/getProperties/${id}`, {
          withCredentials: true,
        })

        console.log(res)

        if (!res || !res.data || !res.data.properties) {
          router.push("/not-found")
          return
        }

        const Details = res.data.properties.map((p: any) => mapPropertyToDetail(p))
        setPropertyDetail(Details[0] ?? null)
      } catch (ex: any) {
        if (ex?.response?.status === 404) {
          router.push("/not-found")
          return
        }
        console.error("Error fetching property:", ex)
        alert("Something went wrong while loading property details")
        router.push("/not-found")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperty()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0
        ? propertyDetail?.photo1_featured
          ? 4
          : propertyDetail?.photo2
            ? 3
            : propertyDetail?.photo3
              ? 2
              : propertyDetail?.photo4
                ? 1
                : 0
        : prev - 1,
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev ===
      (propertyDetail?.photo1_featured
        ? 4
        : propertyDetail?.photo2
          ? 3
          : propertyDetail?.photo3
            ? 2
            : propertyDetail?.photo4
              ? 1
              : 0)
        ? 0
        : prev + 1,
    )
  }

  const toggleRoomStatus = (roomId: number) => {
    setPropertyDetail((prev) => {
      if (!prev) return null
      return {
        ...prev,
        PropertyRoom: prev.PropertyRoom.map((room) =>
          room.propertyroomid === roomId ? { ...room, available: !room.available } : room,
        ),
      }
    })
  }

  if (isLoading) {
    return (
      <OwnerLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59A5B2]"></div>
        </div>
      </OwnerLayout>
    )
  }

  if (!propertyDetail) {
    return (
      <OwnerLayout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
          <Link href="/owner/properties" className="text-[#59A5B2] hover:underline">
            Back to Properties
          </Link>
        </div>
      </OwnerLayout>
    )
  }

  const propertyImages = [
    propertyDetail.photo1_featured,
    propertyDetail.photo2,
    propertyDetail.photo3,
    propertyDetail.photo4,
    propertyDetail.photo5,
  ].filter(Boolean) as string[]

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
                {propertyDetail.propertytitle}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{propertyDetail.propertysubtitle}</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                  <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-[#59A5B2]" />
                  <span>
                    {propertyDetail.canadian_city_name}, {propertyDetail.canadian_province_name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-[#FEBC11]" />
                  <span className="font-medium text-gray-800 dark:text-white">{propertyDetail.avgRating ?? 0}</span>
                  <span className="text-gray-500 dark:text-gray-400">({propertyDetail.avgRating * 25} reviews)</span>
                </div>
              </div>
            </div>

            <Link href={`/owner/add-property/step-1?id=${propertyId}`}>
              <button
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors ${
                  isEditing
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
            <button
              onClick={() => setCurrentImageIndex(0)}
              className="relative h-64 lg:h-full w-full rounded-xl overflow-hidden group"
            >
              {propertyImages[0] ? (
                <>
                  <img
                    src={propertyImages[0] || "/placeholder.svg"}
                    alt="Featured"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-lg">
                  Featured Image 1
                </div>
              )}
            </button>

            {/* Right Side: 2x2 Grid of 4 Images */}
            <div className="grid grid-cols-2 gap-3 h-64 lg:h-full">
              {[1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className="relative w-full h-full rounded-xl overflow-hidden group"
                >
                  {propertyImages[index] ? (
                    <>
                      <img
                        src={propertyImages[index] || "/placeholder.svg"}
                        alt={`Image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 text-sm">
                      Image {index + 1}
                    </div>
                  )}

                  {/* Show "View All Photos" badge on last image if there are more */}
                  {index === 3 && propertyImages.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-2xl font-bold">+{propertyImages.length - 5}</div>
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
               {propertyDetail.houserules ?

                propertyDetail.houserules.split("\n").map(
                  (rule, index) =>
                    rule.trim() && (
                      <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#59A5B2] mt-2 flex-shrink-0" />
                        {rule}
                      </li>
                    ),
                ) : "No house rules provided."
              
              }
          </p>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Rule of Timing:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#59A5B2] mt-2 flex-shrink-0" />
                Check-in: {propertyDetail.checkintime} - Check-out: {propertyDetail.checkouttime}
              </li>
           


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
            {PropertyAmenities.length > 0 ? (
              PropertyAmenities.map((amenity, index) => {
                const iconDef = getIcon(amenity.icon)
                return (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                  >
                    {iconDef && <FontAwesomeIcon icon={iconDef} className="w-4 h-4 text-[#59A5B2]" />}
                    {amenity.label}
                  </span>
                )
              })
            ) : (
              <p className="text-gray-500">No amenities available</p>
            )}
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
            {PropertySafetyFeatures.length > 0 ? (
              PropertySafetyFeatures.map((feature, index) => {
                const iconDef = getIcon(feature.icon)
                return (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                  >
                    {iconDef && <FontAwesomeIcon icon={iconDef} className="w-4 h-4 text-[#59A5B2]" />}
                    {feature.label}
                  </span>
                )
              })
            ) : (
              <p className="text-gray-500">No safety features available</p>
            )}
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
            {PropertySharedSpaces.length > 0 ? (
              PropertySharedSpaces.map((space, index) => {
                const iconDef = getIcon(space.icon)
                return (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                  >
                    {iconDef && <FontAwesomeIcon icon={iconDef} className="w-4 h-4 text-[#59A5B2]" />}
                    {space.label}
                  </span>
                )
              })
            ) : (
              <p className="text-gray-500">No shared spaces available</p>
            )}
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
              {propertyDetail.PropertyRoom.map((room) => (
                <div
                  key={room.propertyroomid}
                  onClick={() => router.push(`/owner/properties/${propertyId}/room/edit/${room.propertyroomid}`)}
                  className="group cursor-pointer border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-white"
                >
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={room.pic1 || "/placeholder.svg"}
                      alt={room.roomname}
                      className="w-full h-full object-cover"
                    />
                    {/* Room count badge on top-right */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                      <span className="text-sm font-semibold text-gray-800">
                        {room.roomcount} {room.roomcount === 1 ? "Room" : "Rooms"}
                      </span>
                    </div>
                    {/* Status badge - subtle on image */}
                    <div
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                        room.available ? "bg-green-500/90 text-white" : "bg-gray-500/90 text-white"
                      }`}
                    >
                      {room.available ? "Active" : "Inactive"}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    {/* Room name */}
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-[#59A5B2] transition-colors">
                      {room.roomname}
                    </h3>

                    {/* Room type badge */}
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#59A5B2]/10 text-[#59A5B2] border border-[#59A5B2]/20">
                        {room.roomtypename}
                      </span>
                    </div>

                    {/* Price - highlighted */}
                    <div className="flex items-baseline gap-1 pt-1">
                      <span className="text-2xl font-bold text-[#FEBC11]">${room.price.toLocaleString()}</span>
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
          {!isLoadingRooms && propertyDetail.PropertyRoom.length === 0 && (
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
  )
}
