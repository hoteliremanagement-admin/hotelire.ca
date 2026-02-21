"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Ban, CheckCircle, Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "./StatusBadge";
import { ReviewModal } from "./ReviewModal";

interface Review {
  id: number;
  reviewerName: string;
  ownerName: string;
  propertyName: string;
  rating: number;
  reviewText: string;
  date: string;
  status: string;
}

interface ReviewTableProps {
  reviews: Review[];
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export function ReviewTable({ reviews, onDelete, onToggleStatus }: ReviewTableProps) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4">
          <Star className="h-10 w-10 text-muted-foreground opacity-20" />
        </div>
        <h3 className="text-xl font-semibold text-dark">No reviews available yet.</h3>
        <p className="text-muted max-w-xs mx-auto mt-2">
          When users submit reviews for properties, they will appear here for management.
        </p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reviewer</TableHead>
            <TableHead>Property / Owner</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="max-w-[200px]">Review</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id} className="group">
              <TableCell className="font-medium">{review.reviewerName}</TableCell>
              <TableCell>
                <div>
                  <p className="font-semibold text-dark">{review.propertyName}</p>
                  <p className="text-xs text-muted">Owner: {review.ownerName}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating ? "fill-current" : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell className="max-w-[200px]">
                <p className="truncate text-sm text-muted-foreground" title={review.reviewText}>
                  {review.reviewText}
                </p>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                {review.date}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={review.status === "Enabled"}
                    onCheckedChange={() => onToggleStatus(review.id)}
                  />
                  <StatusBadge
                    status={review.status === "Enabled" ? "Active" : "Inactive"}
                    className="w-20 justify-center"
                  />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                    onClick={() => setSelectedReview(review)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${
                      review.status === "Enabled"
                        ? "text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                        : "text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                    onClick={() => onToggleStatus(review.id)}
                    title={review.status === "Enabled" ? "Disable" : "Enable"}
                  >
                    {review.status === "Enabled" ? (
                      <Ban className="h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onDelete(review.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          isOpen={!!selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}
    </>
  );
}
