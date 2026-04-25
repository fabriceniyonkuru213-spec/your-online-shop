import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";

interface Props {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: Props) => {
  const p = product.node;
  const image = p.images.edges[0]?.node;
  const price = p.priceRange.minVariantPrice;

  return (
    <Link to={`/product/${p.handle}`} className="group block">
      <div className="aspect-[4/5] overflow-hidden bg-secondary mb-4 rounded">
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? p.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="font-serif text-xl leading-tight">{p.title}</h3>
        <p className="text-sm text-muted-foreground">
          {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};
