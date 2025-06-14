import AddToCart from "@/components/AddToCart";
import HorizontalScrollContainer from "@/components/ui/HorizontalScrollContainer";
import Video from "@/components/ui/Video";
import { shopifyClient } from "@/lib/shopify";
import { getProductByHandle } from "@/lib/shopify/queries";

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const variables = { handle: params.handle };
  const data = await shopifyClient.request(getProductByHandle, variables);

  const product = data?.product;
  const variants = product.variants.nodes;
  const medias = product.media.nodes;

  console.log(medias);

  const selectedVariant = variants[0];

  return (
    <main className="grid gap-2 w-[95vw] max-w-[1223px] mx-auto">
      <HorizontalScrollContainer>
        <div className="flex overflow-x-auto h-96 gap-2 scrollbar-hidden">
          {medias.map((media, i) => {
            switch (media.mediaContentType) {
              case "IMAGE":
                return (
                  <div
                    key={i}
                    className="w-full aspect-square h-full object-cover"
                  >
                    <img
                      src={media.image.url}
                      alt={media.image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );

              case "VIDEO":
                return (
                  <div key={i} className="aspect-square w-full h-full">
                    <Video media={media} />
                  </div>
                );

              default:
                return <div key={i}>helo</div>;
            }
          })}

          <div className="w-full aspect-square h-full object-cover">
            placeholder
          </div>
          <div className="w-full aspect-square h-full object-cover">
            placeholder
          </div>
          <div className="w-full aspect-square h-full object-cover">
            placeholder
          </div>
        </div>
      </HorizontalScrollContainer>
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>

        <p className="mt-4">{product.description}</p>

        <AddToCart variant={selectedVariant} />
      </div>
    </main>
  );
}
