import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { home, login, logout, register } from "@/routes";
import { form, list } from "@/routes/order";
import { SharedData } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { Archive, ShoppingBag } from "lucide-react";
import React from "react";
import { Toaster } from "sonner";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { auth } = usePage<SharedData>().props;
  const handleLogout = () => {
    router.flushAll();
  };

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Header */}
      <Card className="rounded-none border-b shadow-sm mb-4">
        <div className="flex justify-between items-center px-6">
          <Link href={home()} className="font-bold text-xl">Online Shop</Link>

          <NavigationMenu>
            <NavigationMenuList>
              {auth.user ? (
                <>
                  <NavigationMenuItem>
                    <span className="px-3 py-2 text-sm">
                      Hello {auth.user.name}
                    </span>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href={list()}>
                        <Button size="sm" className="flex items-center">
                          <Archive size={20} className="mr-2" />
                          Order List
                        </Button>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href={form()}>
                        <Button size="sm" className="flex items-center">
                          <ShoppingBag size={20} className="mr-2" />
                          Checkout
                        </Button>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href={logout()} onClick={handleLogout}>
                      Logout
                    </Link>
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href={login()}>
                        <Button size="sm">Login</Button>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href={register()}>
                        <Button size="sm" variant="outline">
                          Register
                        </Button>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </Card>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">{children}</main>
      <Toaster />
    </div>
  );
}
