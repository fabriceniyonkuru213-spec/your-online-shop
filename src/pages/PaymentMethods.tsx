import { Header } from "@/components/Header";
import { CreditCard, ShieldCheck } from "lucide-react";

export default function PaymentMethodsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-6">
        <section className="py-14 border-b border-border">
          <div className="container-wide">
            <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Payment Methods</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">All the ways you can pay</h1>
            <p className="text-sm text-muted-foreground mb-10 max-w-2xl">
              Choose the payment method that works best for your business. All transactions are protected by our buyer guarantee.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Credit & Debit Cards", desc: "Visa, Mastercard, American Express and Discover accepted at secure checkout." },
                { title: "MTN Mobile Money", desc: "Pay instantly from your MTN MoMo wallet — fast and convenient." },
                { title: "Airtel Money", desc: "Use Airtel Money for quick mobile payments with no hidden fees." },
                { title: "Bank Transfer", desc: "Direct wire transfer to our escrow account — recommended for large bulk orders." },
                { title: "PayPal", desc: "International buyers can pay securely using their PayPal balance or linked card." },
                { title: "Cash on Delivery", desc: "Available for verified business accounts on orders under $500." },
                { title: "Letter of Credit (L/C)", desc: "Bank-guaranteed payment for export orders above $10,000 — handled by our trade team." },
                { title: "Cheque", desc: "Local cheques accepted for registered businesses with prior approval." },
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

        <section className="py-14">
          <div className="container-wide">
            <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
            <div className="space-y-4">
              {[
                { q: "When is my payment processed?", a: "Payments are processed immediately for cards and mobile money. Bank transfers and L/C may take 1-3 business days." },
                { q: "Can I get a refund?", a: "Yes — our buyer protection covers full refunds if the order doesn't match the listing or is not delivered." },
                { q: "Is there a payment fee?", a: "Card payments include standard processing fees. Mobile money and bank transfers have no extra fees." },
                { q: "How do I set up a business account?", a: "Register on our platform, complete your business profile, and our team will verify your account within 24 hours." },
              ].map((faq) => (
                <div key={faq.q} className="bg-card border border-border rounded-md p-5">
                  <h3 className="font-semibold mb-1">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
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
