"use client";
import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
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
import axios from "axios";
export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  // Set this based on your env setup
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    fetchReviews();
  }, []);
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/review/admin/all`, {
        withCredentials: true
      });
      if (response.data.success) {
        setReviews(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setIsLoading(false);
    }
  };
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.reviewerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.propertyName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || review.status?.toLowerCase() === statusFilter.toLowerCase();

      const matchesRating =
        ratingFilter === "all" || review.rating?.toString() === ratingFilter;
      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [reviews, searchTerm, statusFilter, ratingFilter]);
  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`${API_URL}/review/admin/${id}`, {
        withCredentials: true
      });
      if (response.data.success) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };
  const handleToggleStatus = async (id: number) => {
    try {
      const response = await axios.patch(`${API_URL}/review/admin/${id}/toggle-status`, {}, {
        withCredentials: true
      });
      if (response.data.success) {
        setReviews((prev) =>
          prev.map((r) =>
            r.id === id
              ? { ...r, status: response.data.data.isActive ? "Enabled" : "Disabled" }
              : r
          )
        );
      }
    } catch (error) {
      console.error("Failed to update review status", error);
    }
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
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading reviews...</div>
        ) : (
          <ReviewTable
            reviews={filteredReviews}
            onDelete
            ={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </div>
    </div>
  );
}