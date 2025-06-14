"use client";
import { cartLinesAdd } from "@/lib/shopify/queries";
import { useCartStore } from "@/store/cartStore";
import { shopifyFetch } from "@/store/shopify";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function AddToCart({ variant }: any) {
  const [loading, setLoading] = useState(false);
  const { cart, setCart } = useCartStore();

  const handleClick = async () => {
    setLoading(true);
    try {
      if (cart) {
        const lines = [
          {
            merchandiseId: variant.id,
            quantity: 2,
          },
        ];

        const data = await shopifyFetch(cartLinesAdd, {
          cartId: cart.id,
          lines,
        });
        console.log("added", data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {cart && cart.id} <br />
      <button onClick={handleClick}>
        {loading ? <Loader className="animate-spin" /> : "Add to Cart"}
      </button>
    </>
  );
}
