
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
  SheetFooter,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
    { href: "/dashboard", label: "Dashboard", icon: Store }, // Added Dashboard link with an icon
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
              {Icon && <Icon className="h-4 w-4" />}
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
          <SheetContent className="py-8">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                    <Button
                      variant={location === item.href ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
            <SheetFooter className="mt-auto">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2" 
                onClick={() => logoutMutation.mutate()}
              >
                <LogOut className="h-4 w-4" />
                Log out
              </Button>
            </SheetFooter>
            
            {/* Profile options in mobile view */}
            <div className="border-t mt-4 pt-4">
              <h3 className="text-sm font-medium mb-3">My Account</h3>
              <div className="flex flex-col gap-2">
                <Link href="/profile" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Profile</Button>
                </Link>
                <Link href="/settings" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Settings</Button>
                </Link>
                <Link href="/privacy" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Privacy</Button>
                </Link>
              </div>
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback>
                {(user?.name || "User")[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/privacy">Privacy</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
