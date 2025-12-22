"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RoomForm } from "@/components/rooms/RoomForm";

export default function EditRoomPage() {
  const { id, roomId } = useParams()
  const propertyId = id
  const router = useRouter();

  const [room, setRoom] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/room/${roomId}`)
      .then((r) => r.json())
      .then((data) => {
        setRoom({
          roomname: data.roomname,
          roomtypeid: data.roomtypeid,
          roomcount: data.roomcount,
          price: data.price,
          pic1Preview: data.pic1,
          pic2Preview: data.pic2,
        });
      });
  }, []);

  const submit = async () => {
    const formData = new FormData();

    Object.entries(room).forEach(([k, v]) => {
      if (v) formData.append(k, v as any);
    });

    await fetch(`/api/room/update/${roomId}`, {
      method: "PUT",
      body: formData,
    });

    router.push(`/owner/properties/${propertyId}`);
  };

  if (!room) return null;

  return (
    <RoomForm
      mode="edit"
      room={room}
      setRoom={setRoom}
      roomTypes={[]}
      errors={{}}
      onSubmit={submit}
    />
  );
}
