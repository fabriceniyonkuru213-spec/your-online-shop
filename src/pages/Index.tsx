import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { ProductCard, StaticProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ShopifyProduct, STOREFRONT_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { ArrowRight, Truck, ShieldCheck, CreditCard, Headphones, Zap, Package } from "lucide-react";
import heroImage from "@/assets/hero-rwanda.jpg";
import beans from "@/assets/products/beans.jpg";
import coffee from "@/assets/products/coffee.jpg";
import tea from "@/assets/products/tea.jpg";
import maize from "@/assets/products/maize.jpg";
import bananas from "@/assets/products/bananas.jpg";
import honey from "@/assets/products/honey.jpg";
import kraftBoxes from "@/assets/products/kraft-boxes.jpg";
import vacuumBags from "@/assets/products/vacuum-bags.jpg";
import sorghum from "@/assets/products/sorghum.jpg";
import cassava from "@/assets/products/cassava.jpg";
import palmOil from "@/assets/products/palm-oil.jpg";
import bagasse from "@/assets/products/bagasse-containers.jpg";
import cookingOil from "@/assets/products/cooking-oil.jpg";
import biscuits from "@/assets/products/biscuits.jpg";
import pens from "@/assets/products/pens.jpg";
import notebooks from "@/assets/products/notebooks.jpg";
import registers from "@/assets/products/registers.jpg";
import faceOil from "@/assets/products/face-oil.jpg";
import laptop from "@/assets/products/laptop.jpg";
import smartphone from "@/assets/products/smartphone.jpg";
import desktopComputer from "@/assets/products/desktop-computer.jpg";
import deskPhone from "@/assets/products/desk-phone.jpg";
import tablet from "@/assets/products/tablet.jpg";
import earbuds from "@/assets/products/earbuds.jpg";
import gamingLaptop from "@/assets/products/gaming-laptop.jpg";
import ultrabook from "@/assets/products/ultrabook.jpg";
import aioPc from "@/assets/products/aio-pc.jpg";
import gamingPc from "@/assets/products/gaming-pc.jpg";
import miniPc from "@/assets/products/mini-pc.jpg";
import convertibleLaptop from "@/assets/products/convertible-laptop.jpg";
import chromebook from "@/assets/products/chromebook.jpg";
import server from "@/assets/products/server.jpg";

const staticProducts = [
  { id: "s-coffee", handle: "coffee", title: "Premium Rwandan Arabica Coffee Beans (Single Origin)", vendor: "Kigali Coffee Co.", image: coffee, price: 9.50, unit: "250g", badge: "Hot", category: "Coffee" },
  { id: "s-tea", handle: "tea", title: "Rwandan Black Tea Leaves — Premium Highland Grade", vendor: "Nyanza Tea Estates", image: tea, price: 6.80, unit: "200g", badge: "Top", category: "Tea" },
  { id: "s-maize", handle: "maize-flour", title: "Fresh Maize Flour (Ifu y'Ibigori) — Bulk Bag", vendor: "Rwanda Grain Ltd", image: maize, price: 18.00, unit: "25kg", category: "Grains" },
  { id: "s-bananas", handle: "matoke-bananas", title: "Fresh Cooking Bananas (Matoke / Igitoke)", vendor: "Eastern Province Farms", image: bananas, price: 4.20, unit: "bunch", badge: "Fresh", category: "Produce" },
  { id: "s-honey", handle: "honey", title: "Pure Rwandan Highland Honey — Glass Jar", vendor: "Akagera Apiaries", image: honey, price: 8.50, unit: "500g", category: "Honey" },
  { id: "s-kraft", handle: "kraft-boxes", title: "Eco Kraft Food Boxes & Stand-Up Pouches Set", vendor: "PackRwanda", image: kraftBoxes, price: 0.45, unit: "pc", badge: "Wholesale", category: "Packaging" },
  { id: "s-vac", handle: "vacuum-bags", title: "Food Vacuum Sealing Bags — Roll", vendor: "PackRwanda", image: vacuumBags, price: 12.00, unit: "roll", category: "Packaging" },
  { id: "s-sorghum", handle: "sorghum", title: "Red Sorghum Grain (Amasaka) — Wholesale Sack", vendor: "Rwanda Grain Ltd", image: sorghum, price: 22.00, unit: "20kg", category: "Grains" },
  { id: "s-cassava", handle: "cassava-flour", title: "Cassava Flour (Ifu y'Imyumbati) — Fine Grade", vendor: "Southern Mills", image: cassava, price: 14.00, unit: "10kg", category: "Flour" },
  { id: "s-palm", handle: "palm-oil", title: "Pure Red Palm Oil — Cold-Pressed", vendor: "Akagera Oils", image: palmOil, price: 7.20, unit: "750ml", category: "Oils" },
  { id: "s-bagasse", handle: "bagasse-containers", title: "Biodegradable Bagasse Food Containers", vendor: "EcoPack RW", image: bagasse, price: 0.30, unit: "pc", badge: "Eco", category: "Packaging" },
  // Cooking oil — multiple sizes
  { id: "s-oil-20l", handle: "cooking-oil-20l", title: "Pure Sunflower Cooking Oil — 20L Jerrycan", vendor: "Akagera Oils", image: cookingOil, price: 48.00, unit: "20L", badge: "Bulk", category: "Oils" },
  { id: "s-oil-10l", handle: "cooking-oil-10l", title: "Pure Sunflower Cooking Oil — 10L Jerrycan", vendor: "Akagera Oils", image: cookingOil, price: 26.00, unit: "10L", category: "Oils" },
  { id: "s-oil-5l", handle: "cooking-oil-5l", title: "Pure Sunflower Cooking Oil — 5L Bottle", vendor: "Akagera Oils", image: cookingOil, price: 14.50, unit: "5L", category: "Oils" },
  { id: "s-oil-1l", handle: "cooking-oil-1l", title: "Pure Sunflower Cooking Oil — 1L Bottle", vendor: "Akagera Oils", image: cookingOil, price: 3.20, unit: "1L", category: "Oils" },
  // Stationery & snacks packages
  { id: "s-biscuits", handle: "biscuits-carton", title: "Assorted Biscuits — Wholesale Carton (48 packs)", vendor: "Kigali Foods Ltd", image: biscuits, price: 22.00, unit: "carton", badge: "Wholesale", category: "Snacks" },
  { id: "s-pens", handle: "pens-box", title: "Blue Ballpoint Pens — Box of 50", vendor: "Office Supplies RW", image: pens, price: 6.50, unit: "box/50", category: "Stationery" },
  { id: "s-notebooks", handle: "notebooks-pack", title: "School Exercise Notebooks — Pack of 20", vendor: "Office Supplies RW", image: notebooks, price: 12.00, unit: "pack/20", category: "Stationery" },
  { id: "s-registers", handle: "registers-pack", title: "Hardcover Office Registers — Pack of 6", vendor: "Office Supplies RW", image: registers, price: 18.00, unit: "pack/6", category: "Stationery" },
  { id: "s-face-oil", handle: "face-oil-pack", title: "Natural Face Oil with Dropper — Wholesale Pack of 12", vendor: "Rwanda Naturals", image: faceOil, price: 36.00, unit: "pack/12", badge: "New", category: "Cosmetics" },
  // Electronics
  { id: "s-laptop", handle: "laptop-15", title: "Business Laptop 15.6\" — Intel i5, 8GB RAM, 512GB SSD", vendor: "Kigali Electronics", image: laptop, price: 620.00, unit: "unit", badge: "New", category: "Electronics" },
  { id: "s-desktop", handle: "desktop-pc", title: "Desktop Computer Set — Monitor, Keyboard & Mouse", vendor: "Kigali Electronics", image: desktopComputer, price: 540.00, unit: "set", category: "Electronics" },
  { id: "s-smartphone", handle: "smartphone-128", title: "Android Smartphone — 6.5\" Display, 128GB Storage", vendor: "Kigali Electronics", image: smartphone, price: 220.00, unit: "unit", badge: "Hot", category: "Electronics" },
  { id: "s-deskphone", handle: "desk-phone", title: "Office Desk Telephone — Corded Landline with Caller ID", vendor: "Office Supplies RW", image: deskPhone, price: 28.00, unit: "unit", category: "Electronics" },
  { id: "s-tablet", handle: "tablet-10", title: "Android Tablet 10\" — 64GB, Wi-Fi + LTE", vendor: "Kigali Electronics", image: tablet, price: 180.00, unit: "unit", category: "Electronics" },
  { id: "s-earbuds", handle: "earbuds-tws", title: "Wireless Bluetooth Earbuds with Charging Case", vendor: "Kigali Electronics", image: earbuds, price: 18.00, unit: "pair", badge: "Wholesale", category: "Electronics" },
  // Different types of computers
  { id: "s-gaming-laptop", handle: "gaming-laptop", title: "Gaming Laptop 15.6\" — RTX GPU, 16GB RAM, 1TB SSD, RGB Keyboard", vendor: "Kigali Electronics", image: gamingLaptop, price: 1250.00, unit: "unit", badge: "New", category: "Computers" },
  { id: "s-ultrabook", handle: "ultrabook", title: "Ultrabook 14\" — Intel i7, 16GB RAM, 512GB SSD, Lightweight", vendor: "Kigali Electronics", image: ultrabook, price: 890.00, unit: "unit", category: "Computers" },
  { id: "s-aio-pc", handle: "all-in-one-pc", title: "All-in-One Desktop PC 24\" — Intel i5, 8GB RAM, 256GB SSD", vendor: "Kigali Electronics", image: aioPc, price: 720.00, unit: "unit", category: "Computers" },
  { id: "s-gaming-pc", handle: "gaming-pc", title: "Gaming Desktop Tower — RTX 4060, 32GB RAM, 1TB NVMe, RGB", vendor: "Kigali Electronics", image: gamingPc, price: 1480.00, unit: "unit", badge: "Hot", category: "Computers" },
  { id: "s-mini-pc", handle: "mini-pc", title: "Mini PC — Intel N100, 8GB RAM, 256GB SSD, Office Ready", vendor: "Kigali Electronics", image: miniPc, price: 240.00, unit: "unit", category: "Computers" },
  { id: "s-convertible", handle: "convertible-2in1", title: "2-in-1 Convertible Laptop 13\" — Touchscreen, 8GB RAM, 256GB", vendor: "Kigali Electronics", image: convertibleLaptop, price: 680.00, unit: "unit", category: "Computers" },
  { id: "s-chromebook", handle: "chromebook", title: "Chromebook 11.6\" — Student Laptop, 4GB RAM, 64GB eMMC", vendor: "Kigali Electronics", image: chromebook, price: 220.00, unit: "unit", badge: "Wholesale", category: "Computers" },
  { id: "s-server", handle: "rack-server", title: "Rack Mount Server 1U — Xeon CPU, 32GB ECC RAM, 2TB Storage", vendor: "Kigali Electronics", image: server, price: 2150.00, unit: "unit", category: "Computers" },
];

const Index = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(STOREFRONT_QUERY, { first: 24, query: null });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });

  const shopifyProducts = data ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero / Banner */}
      <section className="relative bg-brand-banner text-white overflow-hidden">
        <img src={heroImage} alt="Rwanda hills" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="container-wide relative py-10 lg:py-14 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1 rounded-full text-xs">
              <span className="h-2 w-2 rounded-full bg-brand-yellow animate-pulse" />
              Trusted by 1,200+ Rwandan traders & exporters
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Source Rwandan Food &<br />
              <span className="text-brand-yellow">Packaging at Wholesale Prices</span>
            </h1>
            <p className="text-white/80 max-w-xl">
              Buy directly from verified producers — coffee, tea, beans, fresh produce, and food packaging. Pay online by card, MoMo, or bank transfer.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#shop">
                <Button size="lg" className="bg-primary hover:bg-brand-orange-dark text-base font-semibold">
                  Shop Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#rfq">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-brand-dark text-base font-semibold">
                  Request a Quote
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm">
              {[
                { icon: ShieldCheck, label: "Verified suppliers" },
                { icon: Truck, label: "Logistics across EAC" },
                { icon: CreditCard, label: "Secure payments" },
                { icon: Headphones, label: "24/7 trade support" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-1.5 text-white/85">
                  <f.icon className="h-4 w-4 text-brand-yellow" /> {f.label}
                </div>
              ))}
            </div>
          </div>

          {/* Quote-request callout card */}
          <div id="rfq" className="lg:col-span-4 bg-white text-foreground rounded-lg p-5 shadow-card">
            <h3 className="font-bold text-lg mb-1">One Request, Multiple Quotes</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tell us what you need. Get tailored bulk pricing from verified Rwandan suppliers within 24 hours.
            </p>
            <ol className="space-y-2 text-sm mb-4">
              {[
                "Browse and add items to your quote list",
                "Submit your contact details",
                "Receive supplier offers & negotiate",
                "Pay securely and track shipment",
              ].map((step, i) => (
                <li key={step} className="flex gap-2">
                  <span className="h-5 w-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <a href="#shop">
              <Button className="w-full bg-primary hover:bg-brand-orange-dark">Start Building Quote</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Promo strip */}
      <section className="bg-brand-yellow/15 border-y border-brand-yellow/30">
        <div className="container-wide flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
          <div className="flex items-center gap-2 font-semibold">
            <Zap className="h-4 w-4 text-brand-red" /> Harvest Deals — up to 30% off bulk grain orders this week
          </div>
          <a href="#shop" className="text-primary font-semibold hover:underline">Shop deals →</a>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="container-wide">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Browse by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "Grains & Beans", img: beans, count: "120+ products" },
              { name: "Coffee & Tea", img: coffee, count: "80+ products" },
              { name: "Fresh Produce", img: bananas, count: "60+ products" },
              { name: "Honey & Oils", img: honey, count: "45+ products" },
              { name: "Flour & Staples", img: cassava, count: "70+ products" },
              { name: "Food Packaging", img: kraftBoxes, count: "200+ products" },
            ].map((cat) => (
              <a
                key={cat.name}
                href="#shop"
                className="group bg-card border border-border rounded-md p-3 flex flex-col items-center text-center hover:shadow-card-hover hover:border-primary/40 transition-all"
              >
                <div className="aspect-square w-full overflow-hidden rounded mb-2 bg-secondary">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                </div>
                <h3 className="text-sm font-semibold group-hover:text-primary">{cat.name}</h3>
                <p className="text-[11px] text-muted-foreground">{cat.count}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured deals strip */}
      <section className="py-6 bg-secondary/40">
        <div className="container-wide grid md:grid-cols-3 gap-4">
          {[
            { title: "Coffee Harvest", desc: "Fresh Q2 batch · Save 25%", img: coffee, color: "from-amber-700 to-amber-900" },
            { title: "Bulk Grains", desc: "From $0.90/kg", img: maize, color: "from-yellow-600 to-orange-700" },
            { title: "Eco Packaging", desc: "Wholesale prices on biodegradable boxes", img: bagasse, color: "from-emerald-600 to-emerald-900" },
          ].map((d) => (
            <a key={d.title} href="#shop" className={`relative overflow-hidden rounded-md bg-gradient-to-br ${d.color} text-white p-5 flex items-center gap-4 hover:shadow-card-hover transition-shadow`}>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider opacity-80">Featured</p>
                <h3 className="text-xl font-bold">{d.title}</h3>
                <p className="text-sm opacity-90">{d.desc}</p>
                <span className="inline-block mt-2 text-xs font-semibold bg-white/20 backdrop-blur px-3 py-1 rounded-full">Shop now →</span>
              </div>
              <img src={d.img} alt={d.title} className="w-24 h-24 object-cover rounded-md shadow-lg" loading="lazy" />
            </a>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <section id="shop" className="py-10">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">Marketplace</p>
              <h2 className="text-2xl md:text-3xl font-bold">Top products from Rwanda</h2>
            </div>
            <a href="#shop" className="text-sm text-primary font-semibold hover:underline hidden md:inline">View all →</a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-secondary rounded animate-pulse" />
                ))
              : shopifyProducts.map((p) => <ProductCard key={p.node.id} product={p} />)}

            {staticProducts.map((p) => (
              <StaticProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Payment / trust strip */}
      <section className="py-10 bg-secondary/40 border-y border-border">
        <div className="container-wide">
          <h2 className="text-xl font-bold mb-1">Pay securely, ship globally</h2>
          <p className="text-sm text-muted-foreground mb-6">
            All payments are processed through Shopify's secure checkout. Orders ship from Rwanda via verified logistics partners.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: CreditCard, title: "Card payments", desc: "Visa, Mastercard, Amex accepted at checkout." },
              { icon: Package, title: "Mobile Money", desc: "MTN MoMo & Airtel Money supported via Shopify." },
              { icon: Truck, title: "Logistics", desc: "DHL, Bolloré, EAC ground shipping." },
              { icon: ShieldCheck, title: "Buyer protection", desc: "Full refund if order doesn't match the listing." },
            ].map((b) => (
              <div key={b.title} className="bg-card rounded-md border border-border p-4">
                <b.icon className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-semibold mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-14 border-t border-border">
        <div className="container-wide grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">About Us</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">About this site</h2>
            <p className="text-sm text-muted-foreground mb-3">
              KigaliTrade is Rwanda's B2B marketplace connecting local producers, cooperatives and manufacturers with buyers across East Africa and beyond. We make it easy to source food, packaging, electronics and office supplies at wholesale prices — directly from verified suppliers.
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Our mission is to empower Rwandan businesses by giving them a trusted digital storefront, transparent pricing and access to international buyers. Every supplier on the platform is vetted for business registration, product quality and export readiness.
            </p>
            <p className="text-sm text-muted-foreground">
              Whether you're a retailer in Kigali, a distributor in Nairobi or an importer overseas, KigaliTrade is your single window into the best of Rwanda's products.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { k: "1,200+", v: "Verified suppliers" },
              { k: "15,000+", v: "Products listed" },
              { k: "30+", v: "Countries served" },
              { k: "24/7", v: "Trade support" },
            ].map((s) => (
              <div key={s.v} className="bg-card border border-border rounded-md p-5 text-center">
                <div className="text-2xl font-extrabold text-primary">{s.k}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-14 bg-secondary/40 border-t border-border">
        <div className="container-wide">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Services</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">What we do</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            From sourcing to shipping, KigaliTrade handles every step of the B2B trade journey so you can focus on growing your business.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Package, title: "Wholesale Sourcing", desc: "Browse thousands of products from verified Rwandan suppliers at competitive bulk prices." },
              { icon: ShieldCheck, title: "Supplier Verification", desc: "Every supplier is checked for business registration, quality standards and export readiness." },
              { icon: Headphones, title: "Quote Management", desc: "Submit one request and receive multiple supplier offers within 24 hours — negotiate easily." },
              { icon: Truck, title: "Logistics & Shipping", desc: "Door-to-door delivery in Kigali, EAC ground freight, and international air & sea shipping." },
              { icon: CreditCard, title: "Secure Payments", desc: "Pay safely by card, Mobile Money or bank transfer with full buyer protection." },
              { icon: Zap, title: "Trade Support", desc: "24/7 customer support for buyers and suppliers — in English, Kinyarwanda and French." },
            ].map((s) => (
              <div key={s.title} className="bg-card border border-border rounded-md p-5 hover:shadow-card-hover transition-shadow">
                <s.icon className="h-7 w-7 text-primary mb-3" />
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section id="payment" className="py-14 border-t border-border">
        <div className="container-wide">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Payment Methods</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">All the ways you can pay</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            Choose the payment method that works best for your business. All transactions are protected by our buyer guarantee.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Credit & Debit Cards", desc: "Visa, Mastercard, American Express and Discover accepted at secure checkout." },
              { title: "MTN Mobile Money", desc: "Pay instantly from your MTN MoMo wallet — fast and convenient across Rwanda." },
              { title: "Airtel Money", desc: "Use Airtel Money for quick mobile payments with no hidden fees." },
              { title: "Bank Transfer", desc: "Direct wire transfer to our escrow account — recommended for large bulk orders." },
              { title: "PayPal", desc: "International buyers can pay securely using their PayPal balance or linked card." },
              { title: "Cash on Delivery", desc: "Available within Kigali for verified business accounts on orders under $500." },
              { title: "Letter of Credit (L/C)", desc: "Bank-guaranteed payment for export orders above $10,000 — handled by our trade team." },
              { title: "Cheque", desc: "Local Rwandan cheques accepted for registered businesses with prior approval." },
              { title: "Crypto (USDT)", desc: "Stablecoin payments accepted for international orders — instant settlement." },
            ].map((p) => (
              <div key={p.title} className="bg-card border border-border rounded-md p-5">
                <CreditCard className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-semibold mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-secondary/60 border border-border rounded-md p-5 flex items-start gap-3">
            <ShieldCheck className="h-6 w-6 text-brand-green shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">100% Buyer Protection</h3>
              <p className="text-sm text-muted-foreground">
                Every payment is held securely until you confirm the order matches the listing. Full refund if anything goes wrong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white">
        <div className="container-wide py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-9 w-9 rounded-md bg-brand-gradient flex items-center justify-center text-white font-extrabold">O</div>
              <div className="font-extrabold text-lg">Online Market</div>
            </div>
            <p className="text-white/70">A trusted B2B marketplace connecting buyers to verified suppliers.</p>
          </div>
          <div>
            <h4 className="font-bold mb-3">For Buyers</h4>
            <ul className="space-y-1.5 text-white/70">
              <li><a href="#shop" className="hover:text-brand-yellow">Browse products</a></li>
              <li><a href="#rfq" className="hover:text-brand-yellow">Request a quote</a></li>
              <li><a href="#shipping" className="hover:text-brand-yellow">Logistics & shipping</a></li>
              <li><a href="#help" className="hover:text-brand-yellow">Buyer protection</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">For Suppliers</h4>
            <ul className="space-y-1.5 text-white/70">
              <li><a href="#sell" className="hover:text-brand-yellow">Sell on Online Market</a></li>
              <li><a href="#" className="hover:text-brand-yellow">Verification process</a></li>
              <li><a href="#" className="hover:text-brand-yellow">Supplier dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Get Trade Updates</h4>
            <p className="text-white/70 mb-3">Weekly market prices and new supplier alerts.</p>
            <form className="flex">
              <input type="email" placeholder="Email address" className="flex-1 bg-white/10 border border-white/20 px-3 py-2 text-sm rounded-l outline-none placeholder:text-white/50" />
              <button className="bg-primary hover:bg-brand-orange-dark px-4 text-sm font-semibold rounded-r">Join</button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container-wide py-4 text-xs text-white/50 flex flex-wrap items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} Online Market. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
