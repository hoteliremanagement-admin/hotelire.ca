// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// export default function OwnerSubscriptionPayment() {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [cardElement, setCardElement] = useState(null);

//   const handleSubscriptionPayment = async () => {
//     setLoading(true);
//     setError("");
//     setMessage("");

//     try {
//       // Receive paymentMethodId from form (would come from Stripe Elements in actual implementation)
//       const paymentMethodId = (document.getElementById("paymentMethodId") as HTMLInputElement)?.value;

//       if (!paymentMethodId) {
//         setError("Payment method is required");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(`${baseUrl}/stripe/subscription/create`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ paymentMethodId }),
//       });

//       const data = await response.json();

//       console.log("response",response)

//       if (!response.ok) {
//         setError(data.error || "Failed to create subscription");
//         return;
//       }

//       setMessage(
//         `Subscription created successfully! Next billing: ${new Date(data.subscription.nextBillingDate).toLocaleDateString()}`
//       );
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelSubscription = async () => {
//     setLoading(true);
//     setError("");
//     setMessage("");

//     try {
//       const response = await fetch(`${baseUrl}/api/stripe/subscription/cancel`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error || "Failed to cancel subscription");
//         return;
//       }

//       setMessage("Subscription canceled successfully");
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle>Property Listing Subscription</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="bg-blue-50 p-4 rounded">
//           <p className="font-semibold">CAD $10/month</p>
//           <p className="text-sm text-gray-600">
//             Keep your property listing active
//           </p>
//         </div>

//         <div>
//           <label htmlFor="paymentMethodId" className="block text-sm font-medium mb-2">
//             Stripe Payment Method ID
//           </label>
//           <input
//             id="paymentMethodId"
//             type="text"
//             placeholder="pm_xxxxxxxx"
//             className="w-full px-3 py-2 border rounded-md"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Provided by Stripe Elements on frontend
//           </p>
//         </div>

//         {error && (
//           <Alert variant="destructive">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         {message && (
//           <Alert className="bg-green-50 border-green-200">
//             <AlertDescription className="text-green-800">{message}</AlertDescription>
//           </Alert>
//         )}

//         <div className="space-y-2">
//           <Button
//             onClick={handleSubscriptionPayment}
//             disabled={loading}
//             className="w-full"
//           >
//             {loading ? "Processing..." : "Subscribe Now"}
//           </Button>
//           <Button
//             onClick={handleCancelSubscription}
//             disabled={loading}
//             variant="outline"
//             className="w-full"
//           >
//             Cancel Subscription
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }



"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function OwnerSubscriptionPayment() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cardElement, setCardElement] = useState(null);

  const handleSubscriptionPayment = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Receive paymentMethodId from form (would come from Stripe Elements in actual implementation)
      const paymentMethodId = (document.getElementById("paymentMethodId") as HTMLInputElement)?.value;

      if (!paymentMethodId) {
        setError("Payment method is required");
        setLoading(false);
        return;
      }

      const response = await fetch(`${baseUrl}/api/stripe/subscription/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ paymentMethodId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create subscription");
        return;
      }

      setMessage(
        `Subscription created successfully! Next billing: ${new Date(data.subscription.nextBillingDate).toLocaleDateString()}`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${baseUrl}/api/stripe/subscription/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to cancel subscription");
        return;
      }

      setMessage("Subscription canceled successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Property Listing Subscription</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 p-4 rounded">
          <p className="font-semibold">CAD $10/month</p>
          <p className="text-sm text-gray-600">
            Keep your property listing active
          </p>
        </div>

        <div>
          <label htmlFor="paymentMethodId" className="block text-sm font-medium mb-2">
            Stripe Payment Method ID
          </label>
          <input
            id="paymentMethodId"
            type="text"
            placeholder="pm_xxxxxxxx"
            className="w-full px-3 py-2 border rounded-md"
          />
          <p className="text-xs text-gray-500 mt-1">
            Provided by Stripe Elements on frontend
          </p>
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

        <div className="space-y-2">
          <Button
            onClick={handleSubscriptionPayment}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Processing..." : "Subscribe Now"}
          </Button>
          <Button
            onClick={handleCancelSubscription}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            Cancel Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
