import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-narrow flex h-16 items-center justify-between">
        <nav className="hidden md:flex items-center gap-8 text-sm flex-1">
          <a href="#shop" className="hover:text-clay transition-colors">Shop</a>
          <a href="#story" className="hover:text-clay transition-colors">Story</a>
          <a href="#journal" className="hover:text-clay transition-colors">Journal</a>
        </nav>
        <Link to="/" className="font-serif text-2xl tracking-tight absolute left-1/2 -translate-x-1/2">
          Maison Sable
        </Link>
        <div className="flex items-center gap-1 flex-1 justify-end">
          <Button variant="ghost" size="icon" className="hover:bg-secondary">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-secondary hidden sm:inline-flex">
            <User className="h-5 w-5" />
          </Button>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
