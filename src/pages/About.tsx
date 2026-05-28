import { Header } from "@/components/Header";
import { ShieldCheck, Truck, CreditCard, Headphones } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-6">
        <section className="py-14 border-b border-border">
          <div className="container-wide grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">About Us</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">About this site</h1>
              <p className="text-sm text-muted-foreground mb-3">
                Online Market is a B2B marketplace connecting local producers, cooperatives and manufacturers with buyers across East Africa and beyond. We make it easy to source food, packaging, electronics and office supplies at wholesale prices — directly from verified suppliers.
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Our mission is to empower businesses by giving them a trusted digital storefront, transparent pricing and access to international buyers. Every supplier on the platform is vetted for business registration, product quality and export readiness.
              </p>
              <p className="text-sm text-muted-foreground">
                Whether you're a retailer in the city, a distributor in a neighboring country or an importer overseas, Online Market is your single window into the best products available.
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

        <section className="py-14">
          <div className="container-wide">
            <h2 className="text-2xl font-bold mb-6">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: ShieldCheck, title: "Trust", desc: "Every supplier is vetted for quality and reliability." },
                { icon: Truck, title: "Delivery", desc: "Fast logistics across East Africa and international shipping." },
                { icon: CreditCard, title: "Security", desc: "Secure payments with buyer protection on every order." },
                { icon: Headphones, title: "Support", desc: "Round-the-clock help in multiple languages." },
              ].map((v) => (
                <div key={v.title} className="bg-card border border-border rounded-md p-5">
                  <v.icon className="h-6 w-6 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
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
            <li><a href="/" className="hover:text-brand-yellow">Browse products</a></li>
            <li><a href="/" className="hover:text-brand-yellow">Request a quote</a></li>
            <li><a href="/" className="hover:text-brand-yellow">Buyer protection</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">For Suppliers</h4>
          <ul className="space-y-1.5 text-white/70">
            <li><a href="/" className="hover:text-brand-yellow">Sell on Online Market</a></li>
            <li><a href="#" className="hover:text-brand-yellow">Verification process</a></li>
            <li><a href="#" className="hover:text-brand-yellow">Supplier dashboard</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Get Updates</h4>
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
  );
}
