// store/useWishlistStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistIds: [],
      isWishlisted: (productId) => get().wishlistIds.includes(productId),
      setWishlistIds: (ids) => set({ wishlistIds: ids }),
      // Reconciles a single product's known server-side state into the
      // store without clobbering ids for other products that haven't
      // loaded yet (unlike setWishlistIds, which replaces the whole list).
      seed: (productId, inWishlist) => {
        const current = get().wishlistIds;
        const has = current.includes(productId);
        if (has === inWishlist) return;
        set({
          wishlistIds: inWishlist
            ? [...current, productId]
            : current.filter((id) => id !== productId),
        });
      },
      toggle: (productId) => {
        const current = get().wishlistIds;
        const exists = current.includes(productId);
        set({
          wishlistIds: exists
            ? current.filter((id) => id !== productId)
            : [...current, productId],
        });
      },
    }),
    { name: "wishlist-storage" }
  )
);