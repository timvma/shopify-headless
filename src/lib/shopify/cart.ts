import { shopifyClient } from "../shopify";
import { createCartInit } from "./queries";

export async function createCart() {
  const json: any = await shopifyClient.request(createCartInit);
  console.log(json);
  return json.cartCreate.cart;
}

// export async function fetchCart(cartId: string) {
//   const query = `
//     query {
//       cart(id: "${cartId}") {
//         id
//         checkoutUrl
//         lines(first: 10) {
//           edges {
//             node {
//               id
//               quantity
//               merchandise {
//                 ... on ProductVariant {
//                   id
//                   title
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `;

//   const json = await shopifyClient.request(query);

//   return json.data.cart;
// }

// export async function validateCart(cartId: string) {
//   try {
//     const cart = await fetchCart(cartId);
//     return !!cart && !cart.completedAt;
//   } catch {
//     return false;
//   }
// }
