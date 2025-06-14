"use client";
import { useCartStore } from "@/store/cartStore";

export default function AddToCart(variant: any) {
  const { addToCart } = useCartStore();

  ///const handleClick = () => addToCart(variant);
  const handleClick = () => console.log(variant);

  return <button onClick={handleClick}>Add to Cart</button>;
}
