import { GraphQLClient } from "graphql-request";

const endpoint = `https://${process.env.SHOPIFY_DOMAIN}/api/2025-04/graphql.json`;

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token":
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
