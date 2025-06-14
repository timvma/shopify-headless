"use client";

import { cartCreateMutation } from "@/lib/queries";
import { useCartStore } from "@/store/cartStore";
import { shopifyFetch } from "@/store/shopify";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const router = useRouter();

  const checkout = async () => {
    const lineItems = cart.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    const lines = [
      {
        merchandiseId: "gid://shopify/ProductVariant/44871132020992",
        quantity: 1,
      },
    ];
    const data = await shopifyFetch(cartCreateMutation, {
      input: { lines },
    });
    console.log(data);
    const url = data.cartCreate.cart.checkoutUrl;

    clearCart();
    window.location.href = url; // redirect to Shopify checkout
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item.variantId}>
          <p>{item.title}</p>
          <button onClick={() => removeFromCart(item.variantId)}>Remove</button>
        </div>
      ))}
      <button onClick={checkout}>Go to Checkout</button>
    </div>
  );
}
