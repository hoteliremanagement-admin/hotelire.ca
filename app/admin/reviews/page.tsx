"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReviewTable } from "../components/ReviewTable";

const MOCK_REVIEWS = [
  {
    id: 1,
    reviewerName: "John Doe",
    ownerName: "Alice Smith",
    propertyName: "Grand Plaza Hotel",
    rating: 5,
    reviewText: "Amazing stay! The service was exceptional and the rooms were spotless.",
    date: "2024-02-15",
    status: "Enabled",
  },
  {
    id: 2,
    reviewerName: "Jane Miller",
    ownerName: "Bob Johnson",
    propertyName: "Seaside Resort",
    rating: 4,
    reviewText: "Great location, but the breakfast options could be better.",
    date: "2024-02-14",
    status: "Enabled",
  },
  {
    id: 3,
    reviewerName: "Robert Brown",
    ownerName: "Alice Smith",
    propertyName: "Grand Plaza Hotel",
    rating: 2,
    reviewText: "The room was noisy and the AC wasn't working properly.",
    date: "2024-02-12",
    status: "Disabled",
  },
  {
    id: 4,
    reviewerName: "Sarah Wilson",
    ownerName: "Charlie Davis",
    propertyName: "Mountain View Lodge",
    rating: 5,
    reviewText: "Breath-taking views and very cozy rooms. Highly recommend!",
    date: "2024-02-10",
    status: "Enabled",
  },
  {
    id: 5,
    reviewerName: "Michael Chen",
    ownerName: "Bob Johnson",
    propertyName: "Seaside Resort",
    rating: 3,
    reviewText: "Average experience. The pool was crowded.",
    date: "2024-02-08",
    status: "Enabled",
  },
  {
    id: 6,
    reviewerName: "Emily Davis",
    ownerName: "Charlie Davis",
    propertyName: "Mountain View Lodge",
    rating: 1,
    reviewText: "Terrible experience. The staff was rude and the place was dirty.",
    date: "2024-02-05",
    status: "Disabled",
  },
  {
    id: 7,
    reviewerName: "David Lee",
    ownerName: "Alice Smith",
    propertyName: "Grand Plaza Hotel",
    rating: 4,
    reviewText: "Professional staff and comfortable beds.",
    date: "2024-02-01",
    status: "Enabled",
  },
  {
    id: 8,
    reviewerName: "Sophia Garcia",
    ownerName: "Bob Johnson",
    propertyName: "Seaside Resort",
    rating: 5,
    reviewText: "Best vacation ever! Everything was perfect.",
    date: "2024-01-28",
    status: "Enabled",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.reviewerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.propertyName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus =
        statusFilter === "all" || review.status.toLowerCase() === statusFilter.toLowerCase();
      
      const matchesRating =
        ratingFilter === "all" || review.rating.toString() === ratingFilter;

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [reviews, searchTerm, statusFilter, ratingFilter]);

  const handleDelete = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: r.status === "Enabled" ? "Disabled" : "Enabled" }
          : r
      )
    );
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">Review Management</h1>
          <p className="text-muted mt-1">Manage and moderate all property reviews</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm">
          Total Reviews: {reviews.length}
        </div>
      </div>

      <div className="bg-card rounded-xl border shadow-sm">
        <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by reviewer or property..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="enabled">Enabled</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ratingFilter} onValueChange={setRatingFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2" onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setRatingFilter("all");
            }}>
              Reset
            </Button>
          </div>
        </div>

        <ReviewTable 
          reviews={filteredReviews} 
          onDelete={handleDelete} 
          onToggleStatus={handleToggleStatus} 
        />
      </div>
    </div>
  );
}
