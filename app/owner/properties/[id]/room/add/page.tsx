"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { RoomForm } from "@/components/rooms/RoomForm";

export default function AddRoomPage() {
const { id } = useParams()
const propertyId = id

  const router = useRouter();

  const [room, setRoom] = useState<any>({
    roomname: "",
    roomtypeid: "",
    roomcount: 1,
    price: "",
    pic1: null,
    pic2: null,
  });

  const submit = async () => {
    const formData = new FormData();

    Object.entries(room).forEach(([k, v]) => {
      if (v) formData.append(k, v as any);
    });

    formData.append("propertyid", propertyId as string);

    await fetch("/api/room/create", {
      method: "POST",
      body: formData,
    });

router.push(`/owner/properties/${propertyId}/room/add`)
  };

  return (
    <RoomForm
      mode="add"
      room={room}
      setRoom={setRoom}
      roomTypes={[]}
      errors={{}}
      onSubmit={submit}
    />
  );
}
