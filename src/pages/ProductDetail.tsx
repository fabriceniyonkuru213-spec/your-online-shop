import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { ChevronLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const [variantIdx, setVariantIdx] = useState(0);
  const [activeImage, setActiveImage] = useState(0);

  const { data, isLoading: loading } = useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const res = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return res?.data?.product;
    },
    enabled: !!handle,
  });

  const product = data;
  const variants = useMemo(() => product?.variants?.edges?.map((e: { node: unknown }) => e.node) ?? [], [product]);
  const selected = variants[variantIdx];
  const images = product?.images?.edges?.map((e: { node: { url: string; altText: string | null } }) => e.node) ?? [];

  const handleAdd = async () => {
    if (!product || !selected) return;
    await addItem({
      product: { node: product },
      variantId: selected.id,
      variantTitle: selected.title,
      price: selected.price,
      quantity: 1,
      selectedOptions: selected.selectedOptions || [],
    });
    toast.success("Added to bag", { position: "top-center" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-narrow py-24 text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-narrow py-24 text-center">
          <h1 className="font-serif text-3xl mb-4">Product not found</h1>
          <Link to="/" className="text-sm underline underline-offset-4">Return home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container-narrow py-8">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Link>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-4">
            <div className="aspect-[4/5] overflow-hidden bg-secondary rounded">
              {images[activeImage] && (
                <img src={images[activeImage].url} alt={images[activeImage].altText ?? product.title} className="w-full h-full object-cover" />
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((img: { url: string; altText: string | null }, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square overflow-hidden bg-secondary rounded border-2 transition-colors ${
                      activeImage === i ? "border-ink" : "border-transparent"
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:py-8">
            <h1 className="font-serif text-4xl md:text-5xl mb-3">{product.title}</h1>
            <p className="text-xl mb-8">
              {selected?.price.currencyCode} {parseFloat(selected?.price.amount ?? "0").toFixed(2)}
            </p>

            {variants.length > 1 && (
              <div className="mb-8">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Options</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v: { id: string; title: string; availableForSale: boolean }, i: number) => (
                    <button
                      key={v.id}
                      onClick={() => setVariantIdx(i)}
                      disabled={!v.availableForSale}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        variantIdx === i ? "border-ink bg-ink text-background" : "border-border hover:border-ink"
                      } ${!v.availableForSale ? "opacity-40 line-through" : ""}`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleAdd}
              disabled={isLoading || !selected?.availableForSale}
              className="w-full bg-ink text-background hover:bg-ink/90 rounded-none h-12 text-sm uppercase tracking-wider mb-8"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : selected?.availableForSale ? "Add to Bag" : "Sold Out"}
            </Button>

            {product.description && (
              <div className="prose prose-sm text-muted-foreground leading-relaxed border-t border-border pt-8">
                <p className="whitespace-pre-line">{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
