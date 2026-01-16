"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface BookingPaymentProps {
  bookingId: number;
  propertyId: number;
  totalAmount: number;
  ownerName: string;
}

export default function CustomerBookingPayment({
  bookingId,
  propertyId,
  totalAmount,
  ownerName,
}: BookingPaymentProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    paymentMethodId: "",
    stripeConnectAccountId: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (!formData.paymentMethodId || !formData.stripeConnectAccountId) {
        setError("Payment method and Connect account are required");
        setLoading(false);
        return;
      }

      const response = await fetch(`${baseUrl}/api/stripe/booking-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          bookingId,
          propertyId,
          amount: totalAmount,
          paymentMethodId: formData.paymentMethodId,
          stripeConnectAccountId: formData.stripeConnectAccountId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Payment failed");
        return;
      }

      setMessage(
        `Payment of CAD $${totalAmount} processed successfully! Booking confirmed.`
      );
      setFormData({ paymentMethodId: "", stripeConnectAccountId: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Confirm Booking Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Property Owner:</span>
            <span className="font-semibold">{ownerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-bold text-lg">CAD ${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Booking ID:</span>
            <span>{bookingId}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label htmlFor="paymentMethodId" className="block text-sm font-medium mb-2">
              Stripe Payment Method ID
            </label>
            <Input
              id="paymentMethodId"
              name="paymentMethodId"
              type="text"
              placeholder="pm_xxxxxxxx"
              value={formData.paymentMethodId}
              onChange={handleInputChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              From Stripe Elements token (card payment)
            </p>
          </div>

          <div>
            <label htmlFor="stripeConnectAccountId" className="block text-sm font-medium mb-2">
              Owner's Stripe Connect Account ID
            </label>
            <Input
              id="stripeConnectAccountId"
              name="stripeConnectAccountId"
              type="text"
              placeholder="acct_xxxxxxxx"
              value={formData.stripeConnectAccountId}
              onChange={handleInputChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Owner must provide their Stripe Connect account ID
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {message && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">{message}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handlePayment}
          disabled={loading || !formData.paymentMethodId}
          className="w-full"
        >
          {loading ? "Processing Payment..." : "Complete Payment"}
        </Button>
      </CardContent>
    </Card>
  );
}
