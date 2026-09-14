"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getReviewName(review) {
  return (
    review?.userName ||
    review?.name ||
    review?.reviewerName ||
    review?.reviewer_name ||
    review?.user?.name ||
    review?.User?.name ||
    "Customer"
  );
}

function getReviewId(review) {
  return review?._id || review?.id;
}

function getReviewOwnerId(review) {
  const owner =
    review?.user ??
    review?.userId ??
    review?.user_id ??
    review?.userID ??
    review?.ownerId ??
    review?.owner_id ??
    review?.customerId ??
    review?.customer_id ??
    review?.authorId ??
    review?.author_id;

  if (!owner) return null;

  if (typeof owner === "string" || typeof owner === "number") {
    return String(owner);
  }

  if (owner?.$oid) {
    return String(owner.$oid);
  }

  if (owner?._id) {
    return String(owner._id);
  }

  if (owner?.id) {
    return String(owner.id);
  }

  return null;
}

function sameId(a, b) {
  if (!a || !b) return false;
  return String(a) === String(b);
}

function getInitials(name) {
  return String(name || "Customer")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((x) => x[0])
    .join("")
    .toUpperCase();
}

function Star({ filled = false, size = 20 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M12 3.6l2.6 5.3 5.8.85-4.2 4.1 1 5.75L12 16.9l-5.2 2.7 1-5.75-4.2-4.1 5.8-.85z"
        fill={filled ? "#770800" : "none"}
        stroke="#770800"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity={filled ? 1 : 0.65}
      />
    </svg>
  );
}

function Stars({ rating = 0, size = 17 }) {
  const value = Number(rating) || 0;

  return (
    <div className="flex items-center gap-[3px]">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} filled={n <= Math.round(value)} />
      ))}
    </div>
  );
}

function averageRating(reviews) {
  if (!reviews.length) return 0;

  const total = reviews.reduce(
    (sum, review) => sum + Number(review.rating || 0),
    0,
  );

  return total / reviews.length;
}

function ratingCounts(reviews) {
  return [5, 4, 3, 2, 1].map((rating) => {
    return reviews.filter((review) => Number(review.rating) === rating).length;
  });
}

export default function ReviewSection({
  productId,
  reviews: initialReviews = [],
  currentUserId = null,
}) {
  const router = useRouter();

  const [reviews, setReviews] = useState(
    Array.isArray(initialReviews) ? initialReviews : [],
  );

  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [sort, setSort] = useState("recent");
  const [activeTab, setActiveTab] = useState("all");

  const [openMenu, setOpenMenu] = useState(null);

  const [editingReview, setEditingReview] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [editSubmitting, setEditSubmitting] = useState(false);

  const avg = averageRating(reviews);
  const counts = ratingCounts(reviews);

  const distribution = counts.map((count) => ({
    count,
    percentage: reviews.length ? Math.round((count / reviews.length) * 100) : 0,
  }));

  const sortedReviews = useMemo(() => {
    let list = [...reviews];

    if (activeTab === "highest") {
      list.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    } else if (activeTab === "lowest") {
      list.sort((a, b) => Number(a.rating || 0) - Number(b.rating || 0));
    } else {
      if (sort === "highest") {
        list.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
      } else if (sort === "lowest") {
        list.sort((a, b) => Number(a.rating || 0) - Number(b.rating || 0));
      } else {
        list.sort((a, b) => {
          const da = new Date(a.createdAt || a.updatedAt || 0).getTime();

          const db = new Date(b.createdAt || b.updatedAt || 0).getTime();

          return db - da;
        });
      }
    }

    return list;
  }, [reviews, activeTab, sort]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Please write your review.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          rating,
          comment: comment.trim(),
        }),
      });

      if (res.status === 401) {
        toast.error("Please sign in to leave a review.");
        router.push("/account/login");
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(
          data?.error || data?.message || "Could not submit your review.",
        );
        return;
      }

      const newReview =
        data?.review || data?.data || data?.createdReview || data;

      if (newReview && newReview._id) {
        setReviews((prev) => [newReview, ...prev]);
      } else {
        router.refresh();
      }

      setComment("");
      setRating(5);

      toast.success("Thanks — your review is live.");
    } catch (error) {
      console.error(error);
      toast.error("Could not reach the server. Check your connection.");
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(review) {
    setOpenMenu(null);

    setEditingReview(review);
    setEditRating(Number(review.rating) || 5);
    setEditComment(review.comment || "");
  }

  function cancelEdit() {
    setEditingReview(null);
    setEditRating(5);
    setEditComment("");
  }

  async function handleEditSubmit(e) {
    e.preventDefault();

    if (!editingReview) return;

    if (!editComment.trim()) {
      toast.error("Please write your review.");
      return;
    }

    const id = getReviewId(editingReview);

    if (!id) {
      toast.error("Review ID is missing.");
      return;
    }

    setEditSubmitting(true);

    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: editRating,
          comment: editComment.trim(),
        }),
      });

      if (res.status === 401) {
        toast.error("Please sign in again.");
        router.push("/account/login");
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(
          data?.error || data?.message || "Could not update your review.",
        );
        return;
      }

      const updated = data?.review || data?.data || data;

      setReviews((prev) =>
        prev.map((review) =>
          getReviewId(review) === id
            ? {
                ...review,
                ...(updated?._id ? updated : {}),
                rating: editRating,
                comment: editComment.trim(),
                updatedAt: new Date().toISOString(),
              }
            : review,
        ),
      );

      toast.success("Review updated successfully.");

      cancelEdit();
    } catch (error) {
      console.error(error);
      toast.error("Could not update your review.");
    } finally {
      setEditSubmitting(false);
    }
  }

  async function handleDelete(review) {
    setOpenMenu(null);

    const id = getReviewId(review);

    if (!id) {
      toast.error("Review ID is missing.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      });

      if (res.status === 401) {
        toast.error("Please sign in again.");
        router.push("/account/login");
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(
          data?.error || data?.message || "Could not delete your review.",
        );
        return;
      }

      setReviews((prev) => prev.filter((item) => getReviewId(item) !== id));

      toast.success("Review deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete your review.");
    }
  }

  const activeRating = hovered || rating;

  return (
    <div className="review-layout">
      {/* =====================================================
          LEFT — REVIEWS
      ===================================================== */}
      <div className="reviews-main">
        {/* ================= SUMMARY ================= */}
        <div className="review-summary">
          {/* SCORE */}
          <div className="review-score">
            <strong>{reviews.length ? avg.toFixed(1) : "0.0"}</strong>

            <div className="review-score-stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n}>{n <= Math.round(avg) ? "★" : "☆"}</span>
              ))}
            </div>

            <p>
              Based on {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>

          {/* BARS */}
          <div className="review-bars">
            {[5, 4, 3, 2, 1].map((ratingValue, index) => (
              <div className="review-bar-row" key={ratingValue}>
                <span>{ratingValue} ★</span>

                <div className="review-bar">
                  <div
                    style={{
                      width: `${distribution[index].percentage}%`,
                    }}
                  />
                </div>

                <b>{distribution[index].percentage}%</b>
              </div>
            ))}
          </div>

          {/* TRUST */}
          <div className="review-trust">
            <div>
              <span className="review-trust-icon">♢</span>

              <div>
                <strong>Verified Purchases</strong>
                <small>Real customers, real opinions</small>
              </div>
            </div>

            <div>
              <span className="review-trust-icon">♧</span>

              <div>
                <strong>Honest Feedback</strong>
                <small>Helps others make better choices</small>
              </div>
            </div>

            <div>
              <span className="review-trust-icon">♡</span>

              <div>
                <strong>Community Driven</strong>
                <small>Built by real experiences</small>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FILTER BAR ================= */}
        <div className="review-filter-bar">
          <div className="review-tabs">
            <button
              type="button"
              className={activeTab === "all" ? "active" : ""}
              onClick={() => {
                setActiveTab("all");
                setSort("recent");
              }}
            >
              All Reviews ({reviews.length})
            </button>

            <button
              type="button"
              className={activeTab === "recent" ? "active" : ""}
              onClick={() => {
                setActiveTab("recent");
                setSort("recent");
              }}
            >
              Most Recent
            </button>

            <button
              type="button"
              className={activeTab === "highest" ? "active" : ""}
              onClick={() => {
                setActiveTab("highest");
                setSort("highest");
              }}
            >
              Highest Rated
            </button>

            <button
              type="button"
              className={activeTab === "lowest" ? "active" : ""}
              onClick={() => {
                setActiveTab("lowest");
                setSort("lowest");
              }}
            >
              Lowest Rated
            </button>
          </div>

          <div className="review-sort">
            <span>Sort by</span>

            <select
              value={sort}
              onChange={(e) => {
                const value = e.target.value;

                setSort(value);

                if (value === "highest") {
                  setActiveTab("highest");
                } else if (value === "lowest") {
                  setActiveTab("lowest");
                } else {
                  setActiveTab("recent");
                }
              }}
            >
              <option value="recent">Most Recent</option>

              <option value="highest">Highest Rated</option>

              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        </div>

        {/* ================= SCROLLABLE REVIEW LIST ================= */}
        <div className="review-list">
          {sortedReviews.length === 0 ? (
            <div className="review-empty">
              <span className="review-empty-eyebrow">CUSTOMER FEEDBACK</span>

              <h3>Be the first to review.</h3>

              <p>
                Share your experience and help other customers make confident
                choices.
              </p>
            </div>
          ) : (
            sortedReviews.map((review, index) => {
              const name = getReviewName(review);
              const id = getReviewId(review);

              const reviewOwnerId = getReviewOwnerId(review);

const isOwnReview =
  Boolean(currentUserId) &&
  Boolean(reviewOwnerId) &&
  String(reviewOwnerId).trim() === String(reviewOwnerId).trim() &&
  String(reviewOwnerId).trim() === String(currentUserId).trim();

              return (
                <article className="review-item" key={id || index}>
                  {/* AVATAR */}
                  <div className="review-avatar">{getInitials(name)}</div>

                  {/* CONTENT */}
                  <div className="review-content">
                    <div className="review-meta">
                      <div>
                        <h3>
                          {name}

                          <span className="verified-mark">✓</span>
                        </h3>

                        <time>
                          {formatDate(review.createdAt || review.updatedAt)}
                        </time>
                      </div>

                      {/* THREE DOT MENU — ONLY OWNER */}
                      {isOwnReview && (
                        <div className="relative">
                          <button
                            type="button"
                            className="review-more"
                            aria-label="Review options"
                            onClick={() =>
                              setOpenMenu(openMenu === id ? null : id)
                            }
                          >
                            •••
                          </button>

                          {openMenu === id && (
                            <div className="absolute right-0 top-9 z-30 w-[145px] overflow-hidden rounded-[5px] border border-[#132c47]/10 bg-white shadow-[0_12px_35px_rgba(19,44,71,0.14)]">
                              <button
                                type="button"
                                onClick={() => startEdit(review)}
                                className="block w-full px-4 py-3 text-left text-[11px] font-medium text-[#132c47] transition-colors hover:bg-[#f5f3ee] hover:text-[#770800]"
                              >
                                Edit Review
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDelete(review)}
                                className="block w-full border-t border-[#132c47]/8 px-4 py-3 text-left text-[11px] font-medium text-[#770800] transition-colors hover:bg-[#fdf1ef]"
                              >
                                Delete Review
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* STARS */}
                    <div className="review-stars">
                      <Stars rating={review.rating} size={16} />
                    </div>

                    {/* TEXT */}
                    {review.comment && (
                      <p className="review-text">{review.comment}</p>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>

      {/* =====================================================
          RIGHT — FIXED WRITE REVIEW FORM
      ===================================================== */}
      <aside className="review-form-card">
        {/* DECORATION */}
        <div className="review-form-decoration" />

        <div className="review-form-inner">
          <span className="review-form-eyebrow">YOUR TURN</span>

          <h2>Write a Review</h2>

          <p className="review-form-intro">
            Share your experience and help others make confident choices.
          </p>

          <div className="review-form-divider" />

          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col"
          >
            {/* RATING */}
            <div>
              <span className="mb-3 block text-[11px] font-semibold text-[#506174]">
                Your Rating
              </span>

              <div
                className="flex items-center gap-3"
                onMouseLeave={() => setHovered(0)}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHovered(n)}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className="p-0 transition-transform hover:scale-110"
                  >
                    <Star size={31} filled={n <= activeRating} />
                  </button>
                ))}
              </div>
            </div>

            {/* COMMENT */}
            <div className="mt-7 flex min-h-0 flex-1 flex-col">
              <label
                htmlFor={`review-comment-${productId}`}
                className="mb-3 block text-[11px] font-semibold text-[#506174]"
              >
                Your Review
              </label>

              <textarea
                id={`review-comment-${productId}`}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How does it look, feel and hold up outdoors?"
                className="min-h-[135px] flex-1 resize-none rounded-[5px] border border-[#132c47]/12 bg-white px-4 py-3.5 text-[13px] leading-[1.7] text-[#132c47] outline-none placeholder:text-[#a0a9b1] focus:border-[#770800] focus:ring-2 focus:ring-[#770800]/10"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-5 w-full rounded-[5px] bg-[#132c47] py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#770800] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>

            <p className="mt-4 text-center text-[10px] leading-5 text-[#929ba3]">
              Your email will not be published. We value your privacy.
            </p>
          </form>
        </div>
      </aside>

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}
      {editingReview && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#132c47]/45 px-5 backdrop-blur-[3px]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              cancelEdit();
            }
          }}
        >
          <div className="w-full max-w-[560px] rounded-[6px] border border-[#132c47]/10 bg-[#fffdfa] p-7 shadow-[0_25px_80px_rgba(19,44,71,0.2)] sm:p-9">
            <div className="mb-6 flex items-start justify-between gap-5">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#770800]">
                  YOUR REVIEW
                </span>

                <h3 className="mt-3 font-serif text-[30px] leading-none text-[#132c47]">
                  Edit Review
                </h3>
              </div>

              <button
                type="button"
                onClick={cancelEdit}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[22px] text-[#66717c] transition-colors hover:bg-[#f5f3ee] hover:text-[#770800]"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <label className="mb-3 block text-[11px] font-semibold text-[#506174]">
                Your Rating
              </label>

              <div className="mb-7 flex gap-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setEditRating(n)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star size={29} filled={n <= editRating} />
                  </button>
                ))}
              </div>

              <label
                htmlFor="edit-review-comment"
                className="mb-3 block text-[11px] font-semibold text-[#506174]"
              >
                Your Review
              </label>

              <textarea
                id="edit-review-comment"
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                rows={7}
                className="w-full resize-y rounded-[5px] border border-[#132c47]/12 bg-white px-4 py-3.5 text-[13px] leading-[1.7] text-[#132c47] outline-none focus:border-[#770800] focus:ring-2 focus:ring-[#770800]/10"
              />

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 rounded-[5px] border border-[#132c47]/15 bg-white py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#132c47] hover:bg-[#f5f3ee]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={editSubmitting}
                  className="flex-1 rounded-[5px] bg-[#132c47] py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-[#770800] disabled:opacity-60"
                >
                  {editSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
