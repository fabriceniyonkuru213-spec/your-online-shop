import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Trash2, Plus, Minus, CheckCircle2 } from "lucide-react";
import { useRfqStore } from "@/stores/rfqStore";
import { toast } from "sonner";

export const RfqDrawer = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const total = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail) {
      toast.error("Please enter your name and email");
      return;
    }
    // In real backend this would POST to a function. For now we save locally and confirm.
    const payload = {
      buyer: { buyerName, buyerEmail, buyerPhone, buyerCompany },
      message,
      items,
      submittedAt: new Date().toISOString(),
    };
    console.log("RFQ submitted", payload);
    setSubmitted(true);
    setTimeout(() => {
      clear();
      setSubmitted(false);
      setOpen(false);
    }, 2500);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-10 px-2 gap-1.5 text-xs font-semibold">
          <FileText className="h-5 w-5" />
          <span className="hidden md:inline">My Quote</span>
          {items.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary">
              {items.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Request for Quote ({items.length})
          </SheetTitle>
          <p className="text-xs text-muted-foreground text-left">
            Build a list of products and send the supplier a single quote request for bulk pricing.
          </p>
        </SheetHeader>

        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-3">
            <CheckCircle2 className="h-16 w-16 text-brand-green" />
            <h3 className="text-xl font-semibold">Quote sent!</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              The supplier will reply within 24 hours with bulk pricing and shipping options.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-3">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No products in your quote list yet</p>
            <p className="text-xs text-muted-foreground max-w-xs">
              Browse products and click <span className="font-semibold text-primary">"Quote"</span> to add them here. You can request bulk pricing for many products at once.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 p-2 border border-border rounded">
                  <div className="w-16 h-16 bg-secondary rounded overflow-hidden shrink-0">
                    {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2">{item.title}</h4>
                    <p className="text-xs text-primary font-semibold">
                      ${parseFloat(item.price.amount).toFixed(2)} / unit
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Button type="button" variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 0)}
                        className="w-16 h-6 text-center text-xs border border-border rounded"
                        min={1}
                      />
                      <Button type="button" variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                      <span className="text-xs text-muted-foreground ml-1">units</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.productId)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-bold">
                      ${(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}

              <div className="border-t border-border pt-4 space-y-3">
                <h4 className="text-sm font-semibold">Your details</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Full name *" value={buyerName} onChange={(e) => setBuyer({ buyerName: e.target.value })} required />
                  <Input placeholder="Company" value={buyerCompany} onChange={(e) => setBuyer({ buyerCompany: e.target.value })} />
                  <Input type="email" placeholder="Email *" value={buyerEmail} onChange={(e) => setBuyer({ buyerEmail: e.target.value })} required />
                  <Input placeholder="Phone (e.g. +250...)" value={buyerPhone} onChange={(e) => setBuyer({ buyerPhone: e.target.value })} />
                </div>
                <Textarea
                  placeholder="Message — shipping destination, delivery date, special requirements..."
                  value={message}
                  onChange={(e) => setBuyer({ message: e.target.value })}
                  rows={3}
                />
              </div>
            </div>

            <div className="border-t border-border px-6 py-4 space-y-3 bg-secondary/40">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Estimated total (list price)</span>
                <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-brand-orange-dark">
                Send Quote Request
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">
                Supplier responds within 24h with bulk pricing & shipping
              </p>
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
};
