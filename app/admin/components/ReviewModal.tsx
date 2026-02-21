"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Calendar, User, Building } from "lucide-react";

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

interface ReviewModalProps {
  review: Review;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ review, isOpen, onClose }: ReviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-dark">Review Details</DialogTitle>
        </DialogHeader>
        
        <div className="py-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                <User className="h-3 w-3" /> Reviewer
              </label>
              <p className="font-semibold text-dark">{review.reviewerName}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
                <Calendar className="h-3 w-3" /> Date
              </label>
              <p className="font-semibold text-dark">{review.date}</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1.5">
              <Building className="h-3 w-3" /> Property Info
            </label>
            <div>
              <p className="font-semibold text-dark">{review.propertyName}</p>
              <p className="text-sm text-muted">Owned by {review.ownerName}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-primary uppercase tracking-widest">Rating</label>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 text-accent bg-accent/10 px-3 py-1.5 rounded-lg w-fit">
                <span className="font-bold text-sm">{review.rating}.0</span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating ? "fill-current" : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 bg-soft p-4 rounded-xl border border-slate-100">
            <label className="text-xs font-bold text-primary uppercase tracking-widest">Review Text</label>
            <p className="text-dark leading-relaxed italic italic-font-serif">
              "{review.reviewText}"
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full sm:w-auto px-8 bg-primary hover:bg-dark rounded-xl">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
