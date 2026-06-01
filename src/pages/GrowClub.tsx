import { useState } from "react";
import { z } from "zod";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Leaf, Sprout, TreePine } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type TierId = "seedling" | "gardener" | "homestead";

const tiers: Array<{
  id: TierId;
  name: string;
  price: string;
  cadence: string;
  icon: typeof Leaf;
  tagline: string;
  features: string[];
  highlight?: boolean;
}> = [
  {
    id: "seedling",
    name: "Seedling",
    price: "$19",
    cadence: "/month",
    icon: Sprout,
    tagline: "Start your growing journey.",
    features: [
      "4–6 heirloom seed varieties / month",
      "Seasonal growing guide (PDF)",
      "Member-only 10% shop discount",
      "Cancel anytime",
    ],
  },
  {
    id: "gardener",
    name: "Gardener",
    price: "$39",
    cadence: "/month",
    icon: Leaf,
    tagline: "Our most popular plan.",
    highlight: true,
    features: [
      "8–12 heirloom & medicinal varieties",
      "Monthly mini-kit (soil booster, labels, etc.)",
      "Live Q&A with master gardeners",
      "15% shop discount + free shipping",
    ],
  },
  {
    id: "homestead",
    name: "Homestead",
    price: "$79",
    cadence: "/month",
    icon: TreePine,
    tagline: "For serious self-sufficiency.",
    features: [
      "Full seasonal kit (15+ varieties)",
      "Propagation & preservation course access",
      "Quarterly bonus box (tools, herbs, supplies)",
      "20% shop discount + priority support",
    ],
  },
];

const signupSchema = z.object({
  fullName: z.string().trim().max(100).optional(),
  email: z.string().trim().email("Please enter a valid email").max(255),
  tier: z.enum(["seedling", "gardener", "homestead"]),
});

const GrowClub = () => {
  const [selectedTier, setSelectedTier] = useState<TierId>("gardener");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signupSchema.safeParse({ fullName: fullName || undefined, email, tier: selectedTier });
    if (!parsed.success) {
      toast({ title: "Check your details", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("grow_club_signups").insert({
      email: parsed.data.email,
      full_name: parsed.data.fullName ?? null,
      tier: parsed.data.tier,
      user_id: user?.id ?? null,
    });
    setSubmitting(false);

    if (error) {
      toast({ title: "Something went wrong", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Welcome to the Grow Club! 🌱", description: `You're on the list for the ${parsed.data.tier} tier.` });
    setFullName("");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/60 to-background border-b border-border">
        <div className="container-wide py-16 md:py-20 text-center">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/15">Monthly Subscription</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Join the <span className="text-primary">Grow Club</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Heirloom seeds, medicinal herbs, and self-sufficiency know-how delivered to your door every month.
            Cancel anytime.
          </p>
        </div>
      </section>

      {/* Tier cards */}
      <section className="container-wide py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const isSelected = selectedTier === tier.id;
            return (
              <Card
                key={tier.id}
                className={`relative flex flex-col transition-all cursor-pointer ${
                  isSelected ? "border-primary ring-2 ring-primary shadow-lg" : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.highlight && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">Most popular</Badge>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{tier.name}</CardTitle>
                  </div>
                  <CardDescription>{tier.tagline}</CardDescription>
                  <div className="pt-2">
                    <span className="text-4xl font-extrabold text-foreground">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.cadence}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2.5">
                    {tier.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-foreground">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTier(tier.id);
                      document.getElementById("signup")?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                  >
                    {isSelected ? "Selected" : `Choose ${tier.name}`}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Signup form */}
      <section id="signup" className="container-wide pb-16 md:pb-24">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Reserve your spot</CardTitle>
            <CardDescription>
              You're signing up for the{" "}
              <span className="font-semibold text-primary">
                {tiers.find((t) => t.id === selectedTier)?.name}
              </span>{" "}
              tier. We'll email you when your first box ships.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name (optional)</Label>
                <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Gardener" maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required maxLength={255} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Joining..." : "Join the Grow Club"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </section>
    </div>
  );
};

export default GrowClub;
