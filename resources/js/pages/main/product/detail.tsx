import { useState } from "react";
import MainLayout from "@/layouts/main-layout";
import { Product } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const handleQuantityChange = (variantId: number, change: number) => {
    setQuantities((prev) => {
      const current = prev[variantId] || 0;
      const updated = Math.max(0, current + change);
      return { ...prev, [variantId]: updated };
    });
  };

  const handleAddToCart = (variantId: number) => {
    const qty = quantities[variantId] || 0;
    if (qty > 0) {
      console.log(`Added ${qty} of variant ${variantId} to cart`);
    } else {
      console.log("Quantity must be greater than 0");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-muted-foreground mb-3">
              {product.description}
            </p>
            <p className="text-lg font-semibold mb-3">
              Rp. {product.price}
            </p>

            <h3 className="font-medium mb-2">Variants</h3>
            <ul className="space-y-3 mb-6">
              {product.variants?.map((variant) => (
                <li
                  key={variant.id}
                  className="border rounded p-3 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{variant.variant_name}</p>
                      <p className="text-sm text-muted-foreground">
                        Color: {variant.color}
                      </p>
                    </div>
                    <span className="text-sm">
                      Stock:{" "}
                      <span className="font-semibold">{variant.stock}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(variant.id, -1)}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center">
                      {quantities[variant.id] || 0}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(variant.id, 1)}
                    >
                      +
                    </Button>

                    <Button
                      size="sm"
                      className="ml-auto"
                      onClick={() => handleAddToCart(variant.id)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
