import MainLayout from "@/layouts/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { detail } from "@/routes/product";

interface HomePageProps {
  products: Product[];
}

export default function Home({ products }: HomePageProps) {
  return (
    <MainLayout>
      <div className="space-y-6">
        <Card className="max-w-7xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to the Online Shop</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Find the best products at the best prices
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <p className="text-sm text-muted-foreground mb-2">
                  {product.description}
                </p>
                <p className="font-semibold mb-3">
                  Rp. {product.price}
                </p>
                <Button size="sm" className="w-full" asChild>
                  <Link href={detail(product.id)}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
