"use client";

import CartCard from "@/features/cart/CartCard";
import { createCart } from "@/lib/shopify/cart";
import {
  cartCreateMutation,
  cartLinesAdd,
  getCartQuery,
} from "@/lib/shopify/queries";
import { useCartStore } from "@/store/cartStore";
import { shopifyFetch } from "@/store/shopify";
import Link from "next/link";
import { useEffect, useState } from "react";

// Check if cart id exist
// Check if ID expired else Create a cart ID

export default function CartPage() {
  const [loading, setLoading] = useState(true);

  const [checkoutURL, setCheckoutUrl] = useState("/");

  const { cart, setCart } = useCartStore();

  const [lineItems, setLineItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await shopifyFetch(getCartQuery, { id: cart.id });
      console.log("products", data.cart.lines.nodes);
      setLineItems([data.cart.lines.nodes]);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <h1>Your Cart</h1>
      {cart && cart?.id}
      <div className="grid grid-cols-3">
        {lineItems.map((line, i) => (
          <CartCard key={i} line={line} />
        ))}
      </div>
      <br />
      {cart.checkoutUrl} <br />
      <Link href={cart.checkoutUrl}>Checkout</Link>
    </>
  );
}
