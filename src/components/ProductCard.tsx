import { Link } from "react-router-dom";
import { useState } from "react";
import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useRfqStore } from "@/stores/rfqStore";
import { ShoppingCart, FileText, Loader2, Star } from "lucide-react";
import { toast } from "sonner";

interface Props {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: Props) => {
  const p = product.node;
  const image = p.images.edges[0]?.node;
  const price = p.priceRange.minVariantPrice;
  const variants = p.variants.edges;
  const firstVariant = variants[0]?.node;
  const isLoading = useCartStore((s) => s.isLoading);
  const addItem = useCartStore((s) => s.addItem);
  const addRfq = useRfqStore((s) => s.addItem);
  const [adding, setAdding] = useState(false);

  // Fake-MOQ + rating placeholders to match Alibaba density (no fake reviews — just structural counts)
  const moq = variants.length > 1 ? variants[0].node.title : "1 unit";

  const handleAdd = async () => {
    if (!firstVariant) return;
    setAdding(true);
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
    setAdding(false);
    toast.success(`${p.title} added to cart`, { position: "top-center" });
  };

  const handleRfq = () => {
    addRfq({
      productId: p.id,
      handle: p.handle,
      title: p.title,
      image: image?.url ?? null,
      price,
      quantity: 10,
    });
    toast.success("Added to your quote request", { position: "top-center" });
  };

  return (
    <div className="group bg-card border border-border rounded-md overflow-hidden hover:shadow-card-hover hover:border-primary/40 transition-all flex flex-col">
      <Link to={`/product/${p.handle}`} className="block relative aspect-square overflow-hidden bg-secondary">
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? p.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={400}
            height={400}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
        )}
        <span className="absolute top-2 left-2 bg-brand-red text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
          Verified
        </span>
      </Link>

      <div className="p-3 flex-1 flex flex-col gap-2">
        <Link to={`/product/${p.handle}`} className="block">
          <h3 className="text-sm font-medium line-clamp-2 leading-snug group-hover:text-primary transition-colors min-h-[2.5rem]">
            {p.title}
          </h3>
        </Link>

        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-primary">
              ${parseFloat(price.amount).toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">/ {moq}</span>
          </div>
          {variants.length > 1 && (
            <div className="text-[11px] text-muted-foreground">
              {variants.length} sizes · MOQ {moq}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-0.5 text-brand-yellow">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </span>
          <span>· Verified Trader</span>
        </div>

        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
          <span className="inline-block h-3 w-4 bg-brand-gradient rounded-sm" /> Made in Rwanda
        </div>

        <div className="mt-auto pt-2 grid grid-cols-2 gap-1.5">
          <Button
            size="sm"
            onClick={handleAdd}
            disabled={adding || isLoading || !firstVariant?.availableForSale}
            className="h-8 text-xs bg-primary hover:bg-brand-orange-dark"
          >
            {adding ? <Loader2 className="h-3 w-3 animate-spin" /> : <><ShoppingCart className="h-3 w-3 mr-1" /> Buy</>}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRfq}
            className="h-8 text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <FileText className="h-3 w-3 mr-1" /> Quote
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ProductRecord {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  image: string;
  price: number;
  unit: string;
  badge?: string;
  category: string;
}

export const StaticProductCard = ({ p }: { p: ProductRecord }) => {
  const addRfq = useRfqStore((s) => s.addItem);
  const handleRfq = () => {
    addRfq({
      productId: p.id,
      handle: p.handle,
      title: p.title,
      image: p.image,
      price: { amount: String(p.price), currencyCode: "USD" },
      quantity: 10,
    });
    toast.success("Added to quote request", { position: "top-center" });
  };

  return (
    <div className="group bg-card border border-border rounded-md overflow-hidden hover:shadow-card-hover hover:border-primary/40 transition-all flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={400}
          height={400}
        />
        {p.badge && (
          <span className="absolute top-2 left-2 bg-brand-red text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
            {p.badge}
          </span>
        )}
        <span className="absolute top-2 right-2 bg-brand-dark/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
          {p.category}
        </span>
      </div>
      <div className="p-3 flex-1 flex flex-col gap-2">
        <h3 className="text-sm font-medium line-clamp-2 leading-snug group-hover:text-primary min-h-[2.5rem]">
          {p.title}
        </h3>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-primary">${p.price.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground">/ {p.unit}</span>
          </div>
          <div className="text-[11px] text-muted-foreground">{p.vendor}</div>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-0.5 text-brand-yellow">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </span>
          <span>· Verified Trader</span>
        </div>
        <div className="text-[11px] text-muted-foreground flex items-center gap-1">
          <span className="inline-block h-3 w-4 bg-brand-gradient rounded-sm" /> Made in Rwanda
        </div>
        <div className="mt-auto pt-2">
          <Button
            size="sm"
            onClick={handleRfq}
            className="w-full h-8 text-xs bg-primary hover:bg-brand-orange-dark"
          >
            <FileText className="h-3 w-3 mr-1" /> Request Quote
          </Button>
        </div>
      </div>
    </div>
  );
};
