"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faReply,
  faEnvelope, // Changed from faPaperPlane/faTimes
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { OwnerLayout } from "@/components/owner/OwnerLayout";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

// Use relative path or env var as needed, assuming proxy setup or same domain
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Review {
  id: number;
  guestName: string;
  guestAvatar: string;
  guestEmail: string; // Added email for mailto
  property: string;
  date: string;
  rating: number;
  text: string;
  // reply removed as per instruction
}

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={star <= rating ? faStar : faStarEmpty}
          className={`${sizeClass} ${star <= rating ? "text-[#FEBC11]" : "text-gray-300 dark:text-gray-600"}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  // Fetch reviews from backend
  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ["ownerReviews"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/review/owner`,{credentials:"include"});
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      return data.reviews as Review[];
    },
  });

  const reviews = reviewsData || [];

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";
    
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (r) => reviews.filter((review) => review.rating === r).length
  );

  // Calculate Sentiment/Response readiness (mock "Interested" metric)
  const positiveReviews = reviews.filter(r => r.rating >= 4).length;
  const satisfactionRate = reviews.length ? Math.round((positiveReviews / reviews.length) * 100) : 0;

  if (isLoading) {
    return (
      <OwnerLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#59A5B2]" />
        </div>
      </OwnerLayout>
    );
  }

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold text-[#59A5B2]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Reviews
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage guest reviews and feedback
          </p>
        </div>

        {/* Rating Summary & Dynamic Interested Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Standard Rating Summary */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span
                    className="text-5xl font-bold text-gray-800 dark:text-white"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {averageRating}
                  </span>
                  <FontAwesomeIcon icon={faStar} className="w-8 h-8 text-[#FEBC11]" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Based on {reviews.length} reviews
                </p>
              </div>
              <div className="flex-1 space-y-2 w-full">
                {[5, 4, 3, 2, 1].map((rating, index) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-6">{rating}</span>
                    <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-[#FEBC11]" />
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FEBC11] rounded-full transition-all"
                        style={{ width: `${reviews.length ? (ratingCounts[index] / reviews.length) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 w-8">
                      {ratingCounts[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interested Dynamic Card - Guest Satisfaction */}
          <div className="bg-gradient-to-br from-[#59A5B2] to-[#4a9199] rounded-xl p-6 shadow-sm text-white flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold opacity-90">Guest Satisfaction</h3>
              <p className="text-sm opacity-75">Positive reviews (4+ stars)</p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <span className="text-4xl font-bold">{satisfactionRate}%</span>
                <span className="text-sm opacity-80 ml-1">satisfaction rate</span>
              </div>
              <div className="bg-white/20 p-2 rounded-lg">
                <FontAwesomeIcon icon={faStar} className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-1000" 
                style={{ width: `${satisfactionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-[#59A5B2] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">{review.guestAvatar}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {review.guestName} 
                      </h3>
                      <h6 className="font-semibold text-gray-500 dark:text-white">{review.guestEmail}</h6>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {review.property} • {review.date}
                      </p>
                    </div>
                    <StarRating rating={review.rating} />
                    
                  </div>
                  

                  <p className="text-gray-600 dark:text-gray-300 mb-4">{review.text}</p>

                  {/* Reply Action - Opens Email Client */}
                  <a
                    href={`mailto:${review.guestEmail}?subject=Reply to your review for ${review.property}&body=Dear ${review.guestName},%0D%0A%0D%0AThank you for your review...`}
                    className="inline-flex items-center gap-2 text-[#59A5B2] hover:text-[#4a9199] text-sm font-medium transition-colors hover:underline"
                    data-testid={`reply-email-${review.id}`}
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                    Reply via Email
                  </a>
                </div>
              </div>
            </div>
          ))}

          {reviews.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No reviews found for your properties yet.
            </div>
          )}
        </div>
      </div>
    </OwnerLayout>
  );
}

