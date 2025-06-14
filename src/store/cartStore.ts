import { createCart } from "@/lib/shopify/cart";
import { create } from "zustand";
// import { createCart, fetchCart, validateCart } from "@/lib/shopify/cart";

// type CartState = {
//   cartId: string | null;
//   cart: any;
//   loading: boolean;
//   initCart: () => Promise<void>;
//   setCart: (cart: any) => void;
// };

const generateCart = async () => {
  const cart = await createCart();
  return cart;
};

const getInitialCart = () => {
  try {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) return JSON.parse(storedCart);

    const cart = generateCart();
    return cart;
  } catch (err) {
    console.error("Failed to parse cart from localStorage:", err);
    return null;
  }
};
export const useCartStore = create<any>((set) => ({
  cart: getInitialCart(),
  loading: false,

  setCart: (cart: any) => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
    }
    set({ cart });
  },

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: null });
  },
}));
