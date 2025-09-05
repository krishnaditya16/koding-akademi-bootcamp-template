import React from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Card } from "@/components/ui/card";
import { Archive, ShoppingBag } from "lucide-react";
import { form, list } from "@/routes/order";
import { home, login, logout, register } from "@/routes";
import { Toaster } from "sonner";
import { SharedData } from "@/types";

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
          <div className="flex flex-row gap-4">
            <Link href={home()} className="font-bold text-xl">Online Shop</Link>
            <Link href={form()}>
              <Button size="sm" className="flex items-center">
                <ShoppingBag size={20} className="mr-2" />
                Cart
              </Button>
            </Link>
          </div>

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
