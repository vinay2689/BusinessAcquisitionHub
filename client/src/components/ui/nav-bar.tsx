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
  SheetFooter, // Added SheetFooter import
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
} from "@/components/ui/dropdown-menu"; // Added DropdownMenu imports
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Added Avatar imports


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
    { href: "/dashboard", label: "Dashboard" }, // Added Dashboard link
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
              <div className="flex flex-col space-y-2 mb-4"> {/* Profile options in mobile view */}
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/profile">Profile</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/settings">Settings</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/privacy">Privacy</Link>
                </Button>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => logoutMutation.mutate()}
              >
                Log out
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
      <DropdownMenu> {/* Profile options in desktop view */}
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src={user?.avatarUrl} /> {/* Assuming avatarUrl is available */}
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