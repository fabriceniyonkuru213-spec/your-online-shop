import { Header } from "@/components/Header";
import { Package, ShieldCheck, Headphones, Truck, CreditCard, Zap } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-6">
        <section className="py-14 border-b border-border">
          <div className="container-wide">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Services</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">What we do</h1>
            <p className="text-sm text-muted-foreground mb-10 max-w-2xl">
              From sourcing to shipping, Online Market handles every step of the B2B trade journey so you can focus on growing your business.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Package, title: "Wholesale Sourcing", desc: "Browse thousands of products from verified suppliers at competitive bulk prices." },
                { icon: ShieldCheck, title: "Supplier Verification", desc: "Every supplier is checked for business registration, quality standards and export readiness." },
                { icon: Headphones, title: "Quote Management", desc: "Submit one request and receive multiple supplier offers within 24 hours — negotiate easily." },
                { icon: Truck, title: "Logistics & Shipping", desc: "Door-to-door delivery, regional ground freight, and international air & sea shipping." },
                { icon: CreditCard, title: "Secure Payments", desc: "Pay safely by card, Mobile Money or bank transfer with full buyer protection." },
                { icon: Zap, title: "Trade Support", desc: "24/7 customer support for buyers and suppliers — in English and other local languages." },
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

        <section className="py-14">
          <div className="container-wide">
            <h2 className="text-2xl font-bold mb-6">How it works</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: "01", title: "Browse", desc: "Search products and suppliers across categories." },
                { step: "02", title: "Request", desc: "Add items to your quote list and submit." },
                { step: "03", title: "Receive", desc: "Get offers from multiple suppliers within 24 hours." },
                { step: "04", title: "Order", desc: "Choose the best offer, pay securely and track delivery." },
              ].map((s) => (
                <div key={s.step} className="bg-card border border-border rounded-md p-5">
                  <div className="text-3xl font-extrabold text-primary mb-2">{s.step}</div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
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
