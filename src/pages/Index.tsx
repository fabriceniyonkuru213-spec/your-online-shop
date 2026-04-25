import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ShopifyProduct, STOREFRONT_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero.jpg";

const Index = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(STOREFRONT_QUERY, { first: 12, query: null });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  const products = data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative">
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          <div className="flex items-center px-6 lg:px-16 py-20 bg-gradient-hero order-2 lg:order-1">
            <div className="max-w-xl space-y-8">
              <p className="text-xs uppercase tracking-[0.3em] text-clay">Spring Edition 2026</p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05]">
                Quiet objects for considered living.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A small studio crafting heirloom-quality pieces from natural materials. Made slowly, in limited runs, to last a lifetime.
              </p>
              <div className="flex items-center gap-4">
                <a href="#shop">
                  <Button className="bg-ink text-background hover:bg-ink/90 rounded-none h-12 px-8 text-sm uppercase tracking-wider">
                    Shop the Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="#story" className="text-sm uppercase tracking-wider underline underline-offset-4 hover:text-clay">
                  Our Story
                </a>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden order-1 lg:order-2 min-h-[50vh] lg:min-h-full">
            <img src={heroImage} alt="Maison Sable collection" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border py-6 bg-secondary/40">
        <div className="container-narrow grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm">
          <div><span className="text-muted-foreground">Free shipping</span> over $150</div>
          <div><span className="text-muted-foreground">Made by hand</span> in small batches</div>
          <div><span className="text-muted-foreground">Natural</span> materials only</div>
          <div><span className="text-muted-foreground">Lifetime</span> repair promise</div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="py-24">
        <div className="container-narrow">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-clay mb-3">The Collection</p>
              <h2 className="font-serif text-4xl md:text-5xl">New arrivals</h2>
            </div>
            <a href="#" className="hidden md:block text-sm uppercase tracking-wider underline underline-offset-4 hover:text-clay">
              View all
            </a>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[4/5] bg-secondary animate-pulse rounded" />
                  <div className="h-4 bg-secondary animate-pulse rounded w-2/3" />
                  <div className="h-3 bg-secondary animate-pulse rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="border border-dashed border-border rounded p-16 text-center">
              <h3 className="font-serif text-2xl mb-3">No products yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Tell me what you'd like to sell and the price — I'll add it to your store right away.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-24 bg-secondary/40">
        <div className="container-narrow grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-clay mb-3">Our Story</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Slow craft, made to be lived with.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We believe in objects that earn their place — pieces that age gracefully, that gather meaning over time, that you'll want to pass on.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Each item is designed in our studio and made in collaboration with independent makers who share our values: patience, restraint, and respect for material.
            </p>
          </div>
          <div className="aspect-[4/5] bg-gradient-warm rounded" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-16">
        <div className="container-narrow grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-serif text-2xl mb-4">Maison Sable</h3>
            <p className="text-sm text-muted-foreground">Quiet objects for considered living.</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#shop" className="hover:text-foreground">All products</a></li>
              <li><a href="#" className="hover:text-foreground">New arrivals</a></li>
              <li><a href="#" className="hover:text-foreground">Best sellers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#story" className="hover:text-foreground">Our story</a></li>
              <li><a href="#" className="hover:text-foreground">Journal</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-3">Receive updates on new arrivals.</p>
            <form className="flex border border-border">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none"
              />
              <button className="bg-ink text-background px-4 text-xs uppercase tracking-wider">Join</button>
            </form>
          </div>
        </div>
        <div className="container-narrow mt-12 pt-8 border-t border-border text-xs text-muted-foreground">
          © {new Date().getFullYear()} Maison Sable. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
