"use client"

import { Upload, X } from "lucide-react"
import StyledSelect from "@/components/StyledSelected"

interface RoomFormProps {
  mode: "add" | "edit"
  room: any
  setRoom: (room: any) => void
  roomTypes: any[]
  onSubmit: () => void
  errors: any
}

export function RoomForm({ mode, room, setRoom, roomTypes, onSubmit, errors }: RoomFormProps) {
  const update = (key: string, value: any) => {
    setRoom({ ...room, [key]: value })
  }

  const handleImage = (key: "pic1" | "pic2", file: File) => {
    update(key, file)
    update(`${key}Preview`, URL.createObjectURL(file))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{mode === "add" ? "Add New Room" : "Edit Room"}</h1>
        <p className="text-gray-500 mt-2">
          {mode === "add" ? "Fill in the details to add a new room to your property" : "Update the room details below"}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-8">
        {/* Name + Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Room Name <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#59A5B2] focus:border-transparent outline-none transition-all"
              placeholder="e.g., Deluxe King Suite"
              value={room.roomname}
              onChange={(e) => update("roomname", e.target.value)}
            />
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
              onChange={(e) => update("roomcount", Number(e.target.value))}
            />
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
                onChange={(e) => update("price", e.target.value)}
              />
            </div>
          </div>
        </div>

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
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-video rounded-xl overflow-hidden group">
                    <img
                      src={room[`${key || "/placeholder.svg"}Preview`]}
                      alt={`Room preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          update(key, null)
                          update(`${key}Preview`, "")
                        }}
                        className="bg-white hover:bg-red-50 text-red-600 p-3 rounded-full shadow-lg transition-all hover:scale-110"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onSubmit}
            className="flex-1 py-3.5 px-6 bg-[#59A5B2] text-white font-medium rounded-lg hover:bg-[#4a9199] active:scale-[0.98] transition-all shadow-sm"
          >
            {mode === "add" ? "Create Room" : "Update Room"}
          </button>
        </div>
      </div>
    </div>
  )
}
