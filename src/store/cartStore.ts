import { create } from "zustand";

type CartItem = {
  id: string;
  title: string;
  variantId: string;
  quantity: number;
  image?: string;
};

type CartState = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.find((p) => p.variantId === item.variantId);
      if (exists) {
        return {
          cart: state.cart.map((p) =>
            p.variantId === item.variantId
              ? { ...p, quantity: p.quantity + item.quantity }
              : p
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (variantId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.variantId !== variantId),
    })),
  clearCart: () => set({ cart: [] }),
}));
