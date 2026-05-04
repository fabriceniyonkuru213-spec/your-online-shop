import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const signUpSchema = z.object({
  full_name: z.string().trim().min(2, "Name is too short").max(100),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

const signInSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(1, "Password required").max(72),
});

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/", { replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = signUpSchema.safeParse({
      full_name: fd.get("full_name"),
      company: fd.get("company") ?? "",
      phone: fd.get("phone") ?? "",
      email: fd.get("email"),
      password: fd.get("password"),
    });
    if (!parsed.success) {
      toast({ title: "Check your details", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: parsed.data.full_name,
          company: parsed.data.company || null,
          phone: parsed.data.phone || null,
        },
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Sign-up failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Welcome to KigaliTrade!", description: "Your account has been created and saved." });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = signInSchema.safeParse({ email: fd.get("email"), password: fd.get("password") });
    if (!parsed.success) {
      toast({ title: "Check your details", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: parsed.data.email, password: parsed.data.password });
    setLoading(false);
    if (error) {
      toast({ title: "Sign-in failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back!" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/40 px-4 py-10">
      <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-card p-6">
        <Link to="/" className="flex items-center gap-2 mb-6 justify-center">
          <div className="h-10 w-10 rounded-md bg-brand-gradient flex items-center justify-center text-white font-extrabold">K</div>
          <div className="font-extrabold text-xl">Kigali<span className="text-primary">Trade</span></div>
        </Link>

        <Tabs defaultValue="signin">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-3">
              <div>
                <Label htmlFor="si-email">Email</Label>
                <Input id="si-email" name="email" type="email" required placeholder="you@business.com" />
              </div>
              <div>
                <Label htmlFor="si-password">Password</Label>
                <Input id="si-password" name="password" type="password" required placeholder="••••••••" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-brand-orange-dark">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign in
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-3">
              <div>
                <Label htmlFor="su-name">Full name *</Label>
                <Input id="su-name" name="full_name" required placeholder="Jane Mugisha" />
              </div>
              <div>
                <Label htmlFor="su-company">Company (optional)</Label>
                <Input id="su-company" name="company" placeholder="Mugisha Trading Ltd" />
              </div>
              <div>
                <Label htmlFor="su-phone">Phone (optional)</Label>
                <Input id="su-phone" name="phone" placeholder="+250 7XX XXX XXX" />
              </div>
              <div>
                <Label htmlFor="su-email">Email *</Label>
                <Input id="su-email" name="email" type="email" required placeholder="you@business.com" />
              </div>
              <div>
                <Label htmlFor="su-password">Password *</Label>
                <Input id="su-password" name="password" type="password" required placeholder="At least 8 characters" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-brand-orange-dark">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create account
              </Button>
              <p className="text-xs text-muted-foreground text-center pt-1">
                Your email and details are saved securely to your KigaliTrade account.
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
