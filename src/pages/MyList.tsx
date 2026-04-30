import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  ShoppingCart,
  ArrowLeft,
  ListChecks,
  Truck,
  ShieldCheck,
  Send,
} from "lucide-react";
import { useRfqStore } from "@/stores/rfqStore";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const MyList = () => {
  const navigate = useNavigate();
  const {
    items,
    buyerName,
    buyerEmail,
    buyerPhone,
    buyerCompany,
    message,
    updateQuantity,
    removeItem,
    setBuyer,
    clear,
  } = useRfqStore();
  const cartCheckoutUrl = useCartStore((s) => s.checkoutUrl);
  const [submitted, setSubmitted] = useState(false);

  const subtotal = items.reduce(
    (s, i) => s + parseFloat(i.price.amount) * i.quantity,
    0
  );
  const totalUnits = items.reduce((s, i) => s + i.quantity, 0);

  // USD → FRW conversion (indicative rate)
  const USD_TO_FRW = 1350;
  const frw = (usd: number) =>
    new Intl.NumberFormat("en-RW", { maximumFractionDigits: 0 }).format(
      Math.round(usd * USD_TO_FRW)
    );

  const handleSubmitRfq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail) {
      toast.error("Please fill in your name and email");
      return;
    }
    console.log("RFQ submitted from My List", {
      buyer: { buyerName, buyerEmail, buyerPhone, buyerCompany },
      message,
      items,
      submittedAt: new Date().toISOString(),
    });
    setSubmitted(true);
    toast.success("Quote request sent to suppliers");
    setTimeout(() => {
      clear();
      setSubmitted(false);
      navigate("/");
    }, 2800);
  };

  const handleCheckout = () => {
    if (cartCheckoutUrl) {
      window.location.href = cartCheckoutUrl;
    } else {
      toast.info(
        "Add items to your cart with the 'Buy' button to checkout online."
      );
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />

      {/* Page header */}
      <section className="bg-brand-dark text-white">
        <div className="container-wide py-6">
          <div className="flex items-center gap-2 text-xs text-white/70 mb-2">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-white">My List</span>
          </div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                <ListChecks className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold">My Sourcing List</h1>
                <p className="text-sm text-white/70">
                  Build your bulk-order list, then checkout or request a quote.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className="text-xl font-bold text-primary">{items.length}</div>
                <div className="text-[11px] text-white/70 uppercase">Products</div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-xl font-bold text-primary">{totalUnits}</div>
                <div className="text-[11px] text-white/70 uppercase">Units</div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div className="text-center">
                <div className="text-xl font-bold text-primary">
                  ${subtotal.toFixed(2)}
                </div>
                <div className="text-[11px] text-white/70 uppercase">Est. total</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container-wide py-8">
        {submitted ? (
          <div className="max-w-xl mx-auto bg-card border border-border rounded-lg p-10 text-center">
            <CheckCircle2 className="h-20 w-20 text-brand-green mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Quote request sent!</h2>
            <p className="text-muted-foreground">
              Suppliers will reply within 24 hours with bulk pricing and shipping
              options. Redirecting you home…
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="max-w-xl mx-auto bg-card border border-border rounded-lg p-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Your list is empty</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Browse the marketplace and click <b className="text-primary">"Quote"</b> on
              any product to start building your bulk sourcing list.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-brand-orange-dark">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse products
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-6">
            {/* Items table */}
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-secondary/50">
                  <h2 className="font-semibold text-sm uppercase tracking-wide">
                    Items in your list ({items.length})
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clear}
                    className="text-xs text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Clear all
                  </Button>
                </div>

                <div className="divide-y divide-border">
                  {items.map((item) => {
                    const lineTotal = parseFloat(item.price.amount) * item.quantity;
                    return (
                      <div
                        key={item.productId}
                        className="p-4 flex gap-4 hover:bg-secondary/30 transition-colors"
                      >
                        <Link
                          to={`/product/${item.handle}`}
                          className="w-24 h-24 bg-secondary rounded overflow-hidden shrink-0 border border-border"
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </Link>

                        <div className="flex-1 min-w-0 flex flex-col">
                          <Link
                            to={`/product/${item.handle}`}
                            className="font-medium text-sm hover:text-primary line-clamp-2"
                          >
                            {item.title}
                          </Link>
                          <div className="mt-1 flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary" className="text-[10px]">
                              Verified Supplier
                            </Badge>
                            <span className="text-[11px] text-muted-foreground">
                              ${parseFloat(item.price.amount).toFixed(2)} / unit
                            </span>
                          </div>
                          <div className="mt-auto pt-2 flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <input
                              type="number"
                              value={item.quantity}
                              min={1}
                              onChange={(e) =>
                                updateQuantity(
                                  item.productId,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-20 h-7 text-center text-sm border border-border rounded"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <span className="text-xs text-muted-foreground">units</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-between shrink-0">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary">
                              ${lineTotal.toFixed(2)}
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              {item.quantity} × ${parseFloat(item.price.amount).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Buyer details */}
              <form
                onSubmit={handleSubmitRfq}
                id="rfq-form"
                className="bg-card border border-border rounded-lg p-5 space-y-4"
              >
                <div>
                  <h3 className="font-semibold text-base">Your details (for the quote)</h3>
                  <p className="text-xs text-muted-foreground">
                    Suppliers use these to send you bulk pricing & shipping options.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input
                    placeholder="Full name *"
                    value={buyerName}
                    onChange={(e) => setBuyer({ buyerName: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Company name"
                    value={buyerCompany}
                    onChange={(e) => setBuyer({ buyerCompany: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="Email *"
                    value={buyerEmail}
                    onChange={(e) => setBuyer({ buyerEmail: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Phone (e.g. +250...)"
                    value={buyerPhone}
                    onChange={(e) => setBuyer({ buyerPhone: e.target.value })}
                  />
                </div>
                <Textarea
                  placeholder="Notes — destination country, target delivery date, packaging requirements..."
                  value={message}
                  onChange={(e) => setBuyer({ message: e.target.value })}
                  rows={4}
                />
              </form>
            </div>

            {/* Summary sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
              <div className="bg-card border border-border rounded-lg p-5 space-y-4">
                <h3 className="font-semibold text-base">Order summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Products</span>
                    <span className="font-medium">{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total units</span>
                    <span className="font-medium">{totalUnits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal (list price)</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-muted-foreground italic">Quoted by supplier</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between items-baseline">
                    <span className="font-semibold">Estimated total</span>
                    <span className="text-2xl font-bold text-primary">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    type="submit"
                    form="rfq-form"
                    size="lg"
                    className="w-full bg-primary hover:bg-brand-orange-dark"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Quote Request
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    onClick={handleCheckout}
                    className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Checkout cart online
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="w-full text-xs">
                    <Link to="/">
                      <ArrowLeft className="h-3 w-3 mr-1" />
                      Continue browsing
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 space-y-3 text-xs">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Trade Assurance</div>
                    <div className="text-muted-foreground">
                      Refund if products don't match descriptions.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Logistics handled</div>
                    <div className="text-muted-foreground">
                      Air, sea & overland from Kigali to your door.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-brand-yellow shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">24h supplier response</div>
                    <div className="text-muted-foreground">
                      Verified Rwandan exporters reply within one day.
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyList;
