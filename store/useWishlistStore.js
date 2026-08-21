// store/useWishlistStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlistIds: [],
      isWishlisted: (productId) => get().wishlistIds.includes(productId),
      setWishlistIds: (ids) => set({ wishlistIds: ids }),
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