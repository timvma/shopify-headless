import { shopifyClient } from "@/lib/shopify";
import { getProductsQuery } from "@/lib/shopify/queries";
import Link from "next/link";

export default async function Home() {
  const data = await shopifyClient.request(getProductsQuery);
  const products = data?.products?.edges;

  return (
    <>
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {products.map(({ node }: any) => (
          <Link
            key={node.id}
            className="border p-2 rounded"
            href={`/products/${node.handle}`}
          >
            <h2 className="text-lg font-semibold mt-2">{node.title}</h2>
            <p className="text-sm">{node.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
