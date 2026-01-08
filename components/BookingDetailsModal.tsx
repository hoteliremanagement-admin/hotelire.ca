import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  property: string;
  room: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  status: string;
  paymentStatus: string;
}

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}



export function BookingDetailsModal({ isOpen, onClose, booking }: BookingDetailsModalProps) {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#59A5B2]">Booking Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Booking ID</h4>
              <p className="font-semibold">{booking.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Status</h4>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                booking.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                booking.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-700"
              }`}>
                {booking.status}
              </span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Property</h4>
              <p>{booking.property}</p>
            </div>
             <div>
              <h4 className="text-sm font-medium text-gray-500">Room</h4>
              <p>{booking.room}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Guest</h4>
              <p>{booking.guestName}</p>
              <p className="text-sm text-gray-500">{booking.guestEmail}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Dates</h4>
              <p>{booking.checkIn} - {booking.checkOut}</p>
            </div>
             <div>
              <h4 className="text-sm font-medium text-gray-500">Amount</h4>
              <p className="text-[#FEBC11] font-bold">${booking.amount.toLocaleString()}</p>
            </div>
             <div>
              <h4 className="text-sm font-medium text-gray-500">Payment Status</h4>
              <p>{booking.paymentStatus}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
