import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Store,
  Users,
  LogOut,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function NavBar() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const navItems = [
    { href: "/courses", label: "Learn", icon: BookOpen },
    { href: "/businesses", label: "Search", icon: Store },
    { href: "/experts", label: "Connect", icon: Users },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={location === item.href ? "default" : "ghost"}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </>
  );

  if (isMobile) {
    return (
      <nav className="border-b px-4 py-3 flex justify-between items-center bg-background">
        <Link href="/">
          <h1 className="font-semibold text-lg">Acquitor</h1>
        </Link>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-2 mt-8">
              <NavLinks />
              <Button
                variant="ghost"
                className="gap-2"
                onClick={() => logoutMutation.mutate()}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    );
  }

  return (
    <nav className="border-b px-6 py-3 flex justify-between items-center bg-background">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="font-semibold text-lg">Acquitor</h1>
        </Link>
        <NavLinks />
      </div>
      <Button
        variant="ghost"
        className="gap-2"
        onClick={() => logoutMutation.mutate()}
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </nav>
  );
}