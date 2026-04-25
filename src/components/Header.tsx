import { useState } from "react";
import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { useRfqStore } from "@/stores/rfqStore";
import { Search, User, Globe, MessageSquare, Menu, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  const [search, setSearch] = useState("");
  const rfqCount = useRfqStore((s) => s.items.length);
  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border shadow-sm">
      {/* Top utility bar */}
      <div className="bg-brand-dark text-white text-xs">
        <div className="container-wide flex h-8 items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Deliver to: 🇷🇼 Rwanda</span>
            <span className="hidden md:inline opacity-70">|</span>
            <a href="#help" className="hidden md:inline hover:text-brand-orange">Help Center</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#sell" className="hover:text-brand-orange">Sell on KigaliTrade</a>
            <span className="opacity-70 hidden sm:inline">|</span>
            <a href="#login" className="hover:text-brand-orange hidden sm:inline">Sign in</a>
            <a href="#register" className="hover:text-brand-orange hidden sm:inline">Register</a>
            <span className="flex items-center gap-1 opacity-80"><Globe className="h-3 w-3" /> EN / USD</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-wide flex h-20 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-10 w-10 rounded-md bg-brand-gradient flex items-center justify-center text-white font-extrabold text-lg">K</div>
          <div className="leading-tight hidden sm:block">
            <div className="font-extrabold text-xl tracking-tight">
              Kigali<span className="text-primary">Trade</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Rwanda B2B Marketplace</div>
          </div>
        </Link>

        {/* Search bar */}
        <form
          className="flex-1 max-w-3xl"
          onSubmit={(e) => {
            e.preventDefault();
            const el = document.getElementById("shop");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <div className="flex h-12 rounded-full border-2 border-primary overflow-hidden shadow-sm">
            <select className="hidden md:block bg-secondary px-4 text-sm border-r border-border outline-none">
              <option>All Categories</option>
              <option>Grains & Beans</option>
              <option>Coffee & Tea</option>
              <option>Packaging</option>
              <option>Fresh Produce</option>
            </select>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search beans, coffee, packaging..."
              className="flex-1 px-4 text-sm outline-none bg-background"
            />
            <button type="submit" className="bg-primary hover:bg-brand-orange-dark text-primary-foreground px-6 flex items-center gap-2 transition-colors">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline text-sm font-semibold">Search</span>
            </button>
          </div>
          <div className="hidden lg:flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
            <span className="font-medium">Popular:</span>
            {["Coffee beans", "Red beans", "Kraft boxes", "Cassava flour", "Honey"].map((t) => (
              <button key={t} type="button" onClick={() => setSearch(t)} className="hover:text-primary">{t}</button>
            ))}
          </div>
        </form>

        <div className="flex items-center gap-1 shrink-0">
          <Button asChild variant="ghost" size="sm" className="relative h-10 px-2 gap-1.5 text-xs font-semibold">
            <Link to="/my-list">
              <ListChecks className="h-5 w-5" />
              <span className="hidden md:inline">My List</span>
              {rfqCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary">
                  {rfqCount}
                </Badge>
              )}
            </Link>
          </Button>
          <CartDrawer />
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Category nav */}
      <nav className="border-t border-border bg-secondary/40">
        <div className="container-wide flex h-11 items-center gap-6 overflow-x-auto text-sm font-medium scrollbar-hide">
          <a href="#shop" className="text-primary font-semibold whitespace-nowrap">All Categories</a>
          <a href="#grains" className="hover:text-primary whitespace-nowrap">Grains & Beans</a>
          <a href="#coffee" className="hover:text-primary whitespace-nowrap">Coffee & Tea</a>
          <a href="#produce" className="hover:text-primary whitespace-nowrap">Fresh Produce</a>
          <a href="#packaging" className="hover:text-primary whitespace-nowrap">Food Packaging</a>
          <a href="#oils" className="hover:text-primary whitespace-nowrap">Oils & Honey</a>
          <a href="#suppliers" className="hover:text-primary whitespace-nowrap">Verified Suppliers</a>
          <a href="#rfq" className="hover:text-primary whitespace-nowrap">Request Quote</a>
          <a href="#shipping" className="hover:text-primary whitespace-nowrap">Logistics</a>
        </div>
      </nav>
    </header>
  );
};
