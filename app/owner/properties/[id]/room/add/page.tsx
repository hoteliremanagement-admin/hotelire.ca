"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Upload, X } from "lucide-react"
import StyledSelect from "@/components/StyledSelected"

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export default function AddRoomPage() {
  const { id } = useParams()
  const propertyId = id
  const router = useRouter()

  const [room, setRoom] = useState<any>({
    roomname: "",
    roomtypeid: "",
    roomcount: 1,
    price: "",
    pic1: null,
    pic2: null,
    pic1Preview: "",
    pic2Preview: "",
  })

  const [roomTypes, setRoomTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch(`${baseUrl}/ownerProperty/roomtypes`)
        const data = await response.json()
        console.log("[v0] Room types API response:", data)
        setRoomTypes(data.roomtypes || [])
      } catch (error) {
        console.error("[v0] Error fetching room types:", error)
        setRoomTypes([])
      }
    }

    fetchRoomTypes()
  }, [])

  const update = (key: string, value: any) => {
    setRoom({ ...room, [key]: value })
  }

  const isFormValid = () => {
    if (!room.roomname?.trim()) return false
    if (!room.roomtypeid) return false
    if (!room.roomcount || room.roomcount < 1 || room.roomcount > 999) return false

    const priceNum = Number(room.price)
    if (!room.price || isNaN(priceNum) || priceNum <= 0 || priceNum > 99999) return false

    if (!room.pic1 || !room.pic2) return false

    if (Object.values(localErrors).some(Boolean)) return false

    return true
  }

  const handleImage = (key: "pic1" | "pic2", file: File) => {
    console.log("[v0] Image selected for", key, file)

    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      setLocalErrors((prev) => ({ ...prev, [key]: "Only JPG or PNG allowed" }))
      return
    }

    if (file.size > 1024 * 1024) {
      setLocalErrors((prev) => ({ ...prev, [key]: "Image must be less than 1MB" }))
      return
    }

    setRoom((prev: any) => ({
      ...prev,
      [key]: file,
      [`${key}Preview`]: URL.createObjectURL(file),
    }))
    setLocalErrors((prev) => ({ ...prev, [key]: "" }))

    console.log("[v0] Image set successfully for", key)
  }

  const handleSubmit = async () => {
    if (!isFormValid()) return

    setLoading(true)

    try {
      const formData = new FormData()

      formData.append("propertyid", propertyId as string)
      formData.append("roomname", room.roomname)
      formData.append("roomtypeid", room.roomtypeid.toString()) // Send roomtypeid as string
      formData.append("roomcount", room.roomcount.toString())
      formData.append("price", room.price.toString())

      if (room.pic1) {
        formData.append("pic1", room.pic1)
      }
      if (room.pic2) {
        formData.append("pic2", room.pic2)
      }

      console.log("[v0] Submitting room data:", {
        propertyid: propertyId,
        roomname: room.roomname,
        roomtypeid: room.roomtypeid,
        roomcount: room.roomcount,
        price: room.price,
      })

      const response = await fetch(`${baseUrl}/ownerProperty/addRoom`, {
        method: "POST",
        body: formData,
        credentials: "include",
      })

      const result = await response.json()
      console.log("[v0] API response:", result)

      if (response.ok) {
        alert("Room added successfully!")
        router.push(`/owner/properties/${propertyId}`)
      } else {
        alert(result.message || "Failed to add room")
      }
    } catch (error) {
      console.error("[v0] Error adding room:", error)
      alert("An error occurred while adding the room, make sure images must be jpg, jpeg, png only and compressed (1Mb)")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-2">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Room</h1>
          <p className="text-gray-500 mt-2">Fill in the details to add a new room to your property</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-8">
          {/* Name + Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Room Name <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent outline-none transition-all ${
                  localErrors.roomname ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., Deluxe King Suite"
                value={room.roomname}
                onChange={(e) => {
                  const value = e.target.value

                  if (/[^a-zA-Z\s]/.test(value)) return

                  update("roomname", value)

                  if (!value.trim()) {
                    setLocalErrors((prev) => ({ ...prev, roomname: "Room name is required" }))
                  } else {
                    setLocalErrors((prev) => ({ ...prev, roomname: "" }))
                  }
                }}
              />
              {localErrors.roomname && <p className="text-xs text-red-500">{localErrors.roomname}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Room Type <span className="text-red-500">*</span>
              </label>
              <StyledSelect
                options={roomTypes.map((t) => ({
                  value: t.roomtypeid.toString(),
                  label: t.roomtypename,
                }))}
                value={room.roomtypeid?.toString()}
                onChange={(v) => update("roomtypeid", Number(v))}
                placeholder="Select Room Type"
              />
              {localErrors.roomtypeid && <p className="text-xs text-red-500">{localErrors.roomtypeid}</p>}
            </div>
          </div>

          {/* Count + Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Room Count <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min={1}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent outline-none transition-all"
                placeholder="Number of rooms available"
                value={room.roomcount}
                onChange={(e) => {
                  const value = e.target.value

                  if (!/^\d*$/.test(value)) return
                  if (value.length > 3) return

                  const num = Number(value)
                  update("roomcount", num)

                  if (!num || num < 1) {
                    setLocalErrors((prev) => ({ ...prev, roomcount: "Room count must be at least 1" }))
                  } else if (num > 999) {
                    setLocalErrors((prev) => ({ ...prev, roomcount: "Room count cannot exceed 999" }))
                  } else {
                    setLocalErrors((prev) => ({ ...prev, roomcount: "" }))
                  }
                }}
              />
              {localErrors.roomcount && <p className="text-xs text-red-500">{localErrors.roomcount}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Price per Night <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input
                  type="number"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent outline-none transition-all"
                  placeholder="0.00"
                  value={room.price}
                  onChange={(e) => {
                    const value = e.target.value

                    if (!/^\d*\.?\d*$/.test(value)) return

                    update("price", value)

                    const num = Number(value)

                    if (!value || isNaN(num) || num <= 0) {
                      setLocalErrors((prev) => ({ ...prev, price: "Valid price required" }))
                    } else if (num > 99999) {
                      setLocalErrors((prev) => ({ ...prev, price: "Price cannot exceed $99,999" }))
                    } else {
                      setLocalErrors((prev) => ({ ...prev, price: "" }))
                    }
                  }}
                />
              </div>
              {localErrors.price && <p className="text-xs text-red-500">{localErrors.price}</p>}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Room Images <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500">Upload high-quality images of your room (recommended: 1920x1080)</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["pic1", "pic2"].map((key, index) => (
                <div key={key} className="space-y-2">
                  <span className="text-xs font-medium text-gray-600">Image {index + 1}</span>
                  {!room[`${key}Preview`] ? (
                    <div className="relative group">
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={(e) => e.target.files && handleImage(key as any, e.target.files[0])}
                      />
                      <div className="aspect-video border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 hover:border-[#59A5B2] transition-all cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-[#59A5B2]/10 flex items-center justify-center">
                          <Upload className="w-6 h-6 text-[#59A5B2]" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-700">Click to upload</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 1MB</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-video rounded-xl overflow-hidden group">
                      <img
                        src={room[`${key || "/placeholder.svg"}Preview`] || "/placeholder.svg"}
                        alt={`Room preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setRoom((prev: any) => ({
                              ...prev,
                              [key]: null,
                              [`${key}Preview`]: "",
                            }))
                          }}
                          className="bg-white hover:bg-red-50 text-red-600 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                  {localErrors[key] && <p className="text-xs text-red-500">{localErrors[key]}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              disabled={!isFormValid() || loading}
              onClick={handleSubmit}
              className={`flex-1 py-3.5 px-6 font-medium rounded-lg transition-all shadow-sm ${
                isFormValid() && !loading
                  ? "bg-[#59A5B2] text-white hover:bg-[#4a9199] active:scale-[0.98]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Creating Room..." : "Create Room"}
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-lg font-medium">Adding room...</p>
          </div>
        </div>
      )}
    </div>
  )
}
