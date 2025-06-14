import AddToCart from "@/components/AddToCart";
import { shopifyClient } from "@/lib/shopify";

const query = `
query ProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    title
    description
    images(first: 2) {
      edges {
        node {
          url
          altText
        }
      }
    }
  }
}
`;

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const variables = { handle: params.handle };
  const data = await shopifyClient.request(query, variables);
  const product = data.productByHandle;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        {product.images.edges.map(({ node }: any, i: number) => (
          <img
            key={i}
            src={node.url}
            alt={node.altText || ""}
            className="w-64 h-64 object-cover"
          />
        ))}
      </div>
      <p className="mt-4">{product.description}</p>
      <AddToCart variant={product} />
    </main>
  );
}
