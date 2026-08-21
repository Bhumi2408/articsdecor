"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReviewSection({ productId, reviews }) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/account/login");
          return;
        }
        throw new Error(data.error || "Could not submit review");
      }
      setComment("");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-6">
        {reviews.length === 0 && <p className="text-muted text-sm">No reviews yet. Be the first to review this piece.</p>}
        {reviews.map((r) => (
          <div key={r._id} className="border-b border-border pb-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{r.userName}</span>
              <span className="text-gold text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
            </div>
            {r.comment && <p className="text-sm text-muted mt-1">{r.comment}</p>}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border border-border rounded-lg p-6 h-fit">
        <h4 className="font-serif text-lg mb-4">Write a review</h4>
        <label className="block text-sm mb-1">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border border-border rounded px-3 py-2 mb-4 text-sm"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} star{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
        <label className="block text-sm mb-1">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full border border-border rounded px-3 py-2 mb-4 text-sm"
          placeholder="Share your experience..."
        />
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <button type="submit" disabled={submitting} className="btn-gold px-5 py-2 rounded text-sm">
          {submitting ? "Submitting..." : "Submit review"}
        </button>
      </form>
    </div>
  );
}
