"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Star, AlertCircle, CheckCircle } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface ReviewData {
  bookingId: number;
  propertyId: number;
  userId: number;
  propertyName: string;
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
}

export default function ReviewPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviewData = async () => {
      if (!token) {
        setError("No review token found. This link may have expired.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${baseUrl}/review/page-data?token=${token}`
        );
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Failed to load review page");
          setLoading(false);
          return;
        }

        setReviewData(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching review data:", err);
        setError("Failed to load review page. Please try again.");
        setLoading(false);
      }
    };

    fetchReviewData();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      setError("Please select a rating");
      return;
    }

    if (!token) {
      setError("Review token is missing");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${baseUrl}/review/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          rating,
          comment: comment || null,
          isPublic,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to submit review");
        return;
      }

      setSuccess(true);
      setComment("");
      setRating(0);

      setTimeout(() => {
        if (reviewData?.propertyId) {
          window.location.href = `/customer`;
        }
      }, 3000);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white w-full flex flex-col min-h-screen">
        <Header />
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading review page...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!reviewData) {
    return (
      <div className="bg-white w-full flex flex-col min-h-screen">
        <Header />
        <Navigation />
        <div className="flex-1 max-w-2xl mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              {error || "Unable to load review page"}
            </AlertDescription>
          </Alert>
        </div>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="bg-white w-full flex flex-col min-h-screen">
        <Header />
        <Navigation />
        <div className="flex-1 max-w-2xl mx-auto px-4 py-12">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Thank You for Your Review!
              </h2>
              <p className="text-green-700 mb-4">
                Your feedback helps us and other travelers. Redirecting you now...
              </p>
              <p className="text-sm text-green-600">
                If not redirected, click{" "}
                <a
                  href={`/customer/hotel/${reviewData.propertyId}`}
                  className="underline font-semibold"
                >
                  here
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 w-full flex flex-col min-h-screen">
      <Header />
      <Navigation />

      <div className="flex-1 max-w-2xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#59A5B2] mb-2">
            Share Your Experience
          </h1>
          <p className="text-gray-600">
            Help other travelers by sharing your honest feedback
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-[#59A5B2]">
              {reviewData.propertyName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Guest:</span>
              <span className="font-medium">{reviewData.guestName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Check-in:</span>
              <span className="font-medium">
                {new Date(reviewData.checkInDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Check-out:</span>
              <span className="font-medium">
                {new Date(reviewData.checkOutDate).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#59A5B2]">Your Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  How would you rate your stay?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-12 h-12 ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-4 text-lg font-semibold text-[#59A5B2]">
                      {rating} / 5
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share your experience (optional)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your stay..."
                  maxLength={500}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#59A5B2] resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {comment.length}/500 characters
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700">
                  Make this review public
                </label>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={!rating || isSubmitting}
                className="w-full bg-[#59A5B2] hover:bg-[#4a9199]"
                size="lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
