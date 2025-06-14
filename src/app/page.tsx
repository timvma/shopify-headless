// app/page.tsx
import { shopifyClient } from "@/lib/shopify";
import { getProductsQuery } from "@/lib/queries";

export default async function HomePage() {
  const data = await shopifyClient.request(getProductsQuery);
  const products = data.products.edges;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {products.map(({ node }: any) => (
          <a
            key={node.id}
            className="border p-2 rounded"
            href={`/product/${node.handle}`}
          >
            <img
              src={node.images.edges[0]?.node.url}
              alt={node.images.edges[0]?.node.altText || node.title}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold mt-2">{node.title}</h2>
            <p className="text-sm">{node.description}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
