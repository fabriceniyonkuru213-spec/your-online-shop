import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { useRfqStore } from "@/stores/rfqStore";
import { Search, User, Globe, MessageSquare, Menu, ListChecks, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Session } from "@supabase/supabase-js";

export const Header = () => {
  const [search, setSearch] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const rfqCount = useRfqStore((s) => s.items.length);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", sectionId: "" },
    { path: "/about", label: "About Us", sectionId: "about" },
    { path: "/services", label: "Services", sectionId: "services" },
    { path: "/grow-club", label: "Grow Club", sectionId: "" },
    { path: "/payment-methods", label: "Payment Methods", sectionId: "payment" },
  ];

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    return () => sub.subscription.unsubscribe();
  }, []);

  /* Scroll spy: highlight sections on the home page */
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = ["about", "services", "payment"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-60px 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  /* Handle nav clicks */
  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    setMobileOpen(false);

    if (item.path === "/") {
      e.preventDefault();
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (location.pathname === "/" && item.sectionId) {
      e.preventDefault();
      const el = document.getElementById(item.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  /* On mount / route change, scroll to hash section on home page */
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
      }
    }
  }, [location.pathname, location.hash]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out" });
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 100);
      return;
    }
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  const isActive = (item: typeof navItems[0]) => {
    if (location.pathname !== "/") {
      return location.pathname === item.path;
    }
    if (item.path === "/") {
      return activeSection === "";
    }
    return activeSection === item.sectionId;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border shadow-sm">
      {/* Top utility bar */}
      <div className="bg-brand-dark text-white text-xs">
        <div className="container-wide flex h-8 items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Deliver to: Worldwide</span>
            <span className="hidden md:inline opacity-70">|</span>
            <a href="#help" className="hidden md:inline hover:text-brand-orange">Help Center</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#sell" className="hover:text-brand-orange">Sell on Online Market</a>
            <span className="opacity-70 hidden sm:inline">|</span>
            {session ? (
              <button onClick={handleSignOut} className="hover:text-brand-orange hidden sm:inline-flex items-center gap-1">
                <LogOut className="h-3 w-3" /> Sign out
              </button>
            ) : (
              <>
                <Link to="/auth" className="hover:text-brand-orange hidden sm:inline">Sign in</Link>
                <Link to="/auth" className="hover:text-brand-orange hidden sm:inline">Register</Link>
              </>
            )}
            <span className="flex items-center gap-1 opacity-80"><Globe className="h-3 w-3" /> EN / USD</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-wide flex h-20 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-10 w-10 rounded-md bg-brand-gradient flex items-center justify-center text-white font-extrabold text-lg">O</div>
          <div className="leading-tight hidden sm:block">
            <div className="font-extrabold text-xl tracking-tight">
              Online<span className="text-primary">Market</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">B2B Marketplace</div>
          </div>
        </Link>

        {/* Search bar */}
        <form className="flex-1 max-w-3xl" onSubmit={onSearchSubmit}>
          <div className="flex h-12 rounded-full border-2 border-primary overflow-hidden shadow-sm">
            <select className="hidden md:block bg-secondary px-4 text-sm border-r border-border outline-none">
              <option>All Categories</option>
              <option>Grains & Beans</option>
              <option>Coffee & Tea</option>
              <option>Packaging</option>
              <option>Fresh Produce</option>
              <option>Electronics</option>
              <option>Computers</option>
            </select>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here..."
              className="flex-1 px-4 text-sm outline-none bg-background"
            />
            <button type="submit" className="bg-primary hover:bg-brand-orange-dark text-primary-foreground px-6 flex items-center gap-2 transition-colors">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline text-sm font-semibold">Search</span>
            </button>
          </div>
          <div className="hidden lg:flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
            <span className="font-medium">Popular:</span>
            {["Coffee beans", "Red beans", "Laptop", "Smartphone", "Honey"].map((t) => (
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
          <Button asChild variant="ghost" size="icon" className="hidden md:inline-flex" title={session ? "Account" : "Sign in"}>
            <Link to="/auth">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main nav */}
      <nav className="border-t border-border bg-secondary/40">
        <div className="container-wide flex h-11 items-center gap-8 overflow-x-auto text-sm font-semibold scrollbar-hide">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative whitespace-nowrap transition-colors py-2 ${
                  active ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-wide py-3 space-y-1">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`block py-2 px-3 rounded-md text-sm font-semibold ${
                    active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
