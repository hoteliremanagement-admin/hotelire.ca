"use client"

import type React from "react"
import { useState, useEffect } from "react" 
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, CreditCard, Lock, Calendar, AlertTriangle, Zap, TrendingUp } from "lucide-react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

interface SubscriptionStatus {
  hasSubscription: boolean
  status?: string
  amount?: number
  nextBillingDate?: string
  daysSinceFailed?: number | null
  consecutiveFailures?: number
  isWarning?: boolean
  isDisabled?: boolean
}

export function SubscriptionSection() {
  const stripe = useStripe()
  const elements = useElements()

  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    fetchSubscriptionStatus()
  }, [])

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch(`${baseUrl}/stripes/subscription-status`, {
        credentials: "include",
      })
      const data = await response.json()
      setSubscription(data.subscription || null)
    } catch (err) {
      console.error("Error fetching subscription:", err)
      setError("Failed to load subscription status")
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsSubscribing(true)
    setError("")
    setMessage("")

    try {
      const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)!,
      })

      if (pmError) {
        setError(pmError.message || "Failed to create payment method")
        return
      }

      const res = await fetch(`${baseUrl}/stripes/create-subscription`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Subscription failed")
      }

      if (!data.clientSecret) throw new Error("No client secret")

      const result = await stripe.confirmCardPayment(data.clientSecret)

      console.log("resss", result)

      window.location.href = "/owner";

      if (result.error) {
        setError(result.error.message ?? "")
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("✅ Subscription created! CAD $10 will be charged on the 10th of each month.")
      }

      if (data.pending) {
        const message = `Subscription is pending`
        setError(message)
        console.log(message)
      }

      if (data.active) {
        console.log("Subscription active:", data.subscriptionId)
      }

      elements.getElement(CardElement)?.clear()
      fetchSubscriptionStatus()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Subscription failed")
    } finally {
      setIsSubscribing(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!confirm("Are you sure? Your properties will become unavailable for booking.")) return

    try {
      const response = await fetch(`${baseUrl}/stripes/cancel-subscription`, {
        method: "POST",
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Cancellation failed")
        return
      }

      setMessage("✅ Subscription canceled successfully")
      fetchSubscriptionStatus()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cancellation failed")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#59A5B2] mb-3"></div>
          <p className="text-gray-600 font-medium">Loading subscription status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 ">
      <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-gradient-to-br from-[#59A5B2]/10 via-transparent to-transparent">
        <div className="p-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900">Subscription Management</h3>
              <div className="px-3 py-1 bg-[#59A5B2]/20 text-[#59A5B2] text-xs font-semibold rounded-full">
                Required
              </div>
            </div>
            <p className="text-gray-600 text-sm">Manage your account to list and manage properties on the platform</p>
          </div>
          <div className="bg-[#59A5B2]/15 p-4 rounded-xl">
            <CreditCard className="w-7 h-7 text-[#59A5B2]" />
          </div>
        </div>
      </div>

      {subscription?.isDisabled && (
        <Alert className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <AlertDescription className="text-red-900 font-bold">Payment Overdue</AlertDescription>
              <p className="text-red-800 text-sm mt-1">
                Your properties have been disabled due to failed payment. Update your payment method immediately to
                reactivate listings.
              </p>
            </div>
          </div>
        </Alert>
      )}

      {subscription?.isWarning && (
        <Alert className="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <AlertDescription className="text-amber-900 font-bold">Payment Failed</AlertDescription>
              <p className="text-amber-800 text-sm mt-1">
                {subscription.daysSinceFailed} days since first failure. Update your payment method or properties will
                be disabled after 20 days.
              </p>
            </div>
          </div>
        </Alert>
      )}


      <div className="bg-gradient-to-br from-[#59A5B2]/5 to-transparent border border-[#59A5B2]/20 rounded-xl p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Monthly Subscription</p>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-4xl font-bold text-[#59A5B2]">$10</span>
              <span className="text-gray-600 text-sm">/month</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">Billed on the 10th of each month</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-green-600">Auto-renews</p>
            <p className="text-xs text-gray-600 mt-1">No hidden fees</p>
          </div>
        </div>
      </div>


      {subscription?.hasSubscription ? (
        <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="bg-gradient-to-r from-[#59A5B2] to-[#4a9199] h-2"></div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Active Subscription</h4>
                  <p className="text-gray-500 text-sm">Your properties are live and bookable</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-xs font-bold">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                {subscription.status?.toUpperCase()}
              </span>
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-150">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#59A5B2]" />
                  <p className="text-xs text-gray-600 font-semibold">Monthly Amount</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">CAD $10</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-150">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-[#59A5B2]" />
                  <p className="text-xs text-gray-600 font-semibold">Next Billing</p>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {subscription.nextBillingDate ? new Date(subscription.nextBillingDate).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>

            {subscription.consecutiveFailures && subscription.consecutiveFailures > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-xs text-red-600 font-semibold mb-1">Failed Payment Attempts</p>
                <p className="text-xl font-bold text-red-700">{subscription.consecutiveFailures}</p>
              </div>
            )}

            <Button
              onClick={handleCancelSubscription}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Cancel Subscription
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden border border-gray-200 shadow-sm">


          <div className="p-8 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-[#59A5B2]/10 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-5 h-5 text-[#59A5B2]" />
                </div>
                <p className="text-xs font-semibold text-gray-900">Boost Visibility</p>
                <p className="text-xs text-gray-600 mt-1">Get your properties featured</p>
              </div>
              <div className="text-center">
                <div className="bg-[#59A5B2]/10 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-5 h-5 text-[#59A5B2]" />
                </div>
                <p className="text-xs font-semibold text-gray-900">Manage Bookings</p>
                <p className="text-xs text-gray-600 mt-1">Full booking control</p>
              </div>
              <div className="text-center">
                <div className="bg-[#59A5B2]/10 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-5 h-5 text-[#59A5B2]" />
                </div>
                <p className="text-xs font-semibold text-gray-900">24/7 Active</p>
                <p className="text-xs text-gray-600 mt-1">Always available</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-900">
                Card Details <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="bg-white border-2 border-gray-300 rounded-xl p-4 focus-within:border-[#59A5B2] focus-within:ring-2 focus-within:ring-[#59A5B2]/20 transition-all duration-200">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": { color: "#aab7c4" },
                          fontFamily: "system-ui, -apple-system, sans-serif",
                        },
                        invalid: { color: "#9e2146" },
                      },
                    }}
                  />
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  <span>PCI DSS compliant - Your card data is secure</span>
                </div>
              </div>
            </div>

            {error && (
              <Alert className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <AlertDescription className="text-red-800 text-sm font-medium">{error}</AlertDescription>
                </div>
              </Alert>
            )}

            {message && (
              <Alert className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <AlertDescription className="text-green-800 text-sm font-medium">{message}</AlertDescription>
                </div>
              </Alert>
            )}


            <Button
              type="submit"
              onClick={handleSubscribe}
              disabled={!stripe || isSubscribing}
              className="w-full bg-[#59A5B2] hover:bg-[#4a9199] disabled:bg-gray-400 text-white font-bold py-5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Zap className="w-5 h-5" />
              {isSubscribing ? "Processing Payment..." : "Activate Subscription Now"}
            </Button>

            <p className="text-center text-xs text-gray-500">
              Your subscription is required to keep your properties visible and accept bookings on the platform.
            </p>
          </div>
        </Card>
      )}

      <hr className="border-t border-gray-200" />
    </div>
  )
}
