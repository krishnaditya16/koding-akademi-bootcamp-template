import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainLayout from "@/layouts/main-layout";
import { create } from "@/routes/order";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

// dummy cart data
const dummyCart = [
  { id: 3, name: "Product A - Variant A", quantity: 2 },
  { id: 4, name: "Product A - Variant B", quantity: 2 },
];

interface CheckoutFormData {
  address: string;
  phone: string;
  postal_code: string;
  products: { id: number; quantity: number }[];
}

export default function OrderFormPage() {
  const { data, setData, post, processing, errors, reset } =
    useForm<CheckoutFormData>({
      address: "",
      phone: "",
      postal_code: "",
      products: dummyCart.map((item) => ({ id: item.id, quantity: item.quantity })), // dummy, replace with actual cart data
    });

  const handleCheckout = () => {
    post(create().url, {
      onSuccess: () => {
        reset();
        toast.success("Order placed successfully.");
      },
      onError: (errs) => console.log("Checkout errors:", errs),
    });
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Your Cart</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              {dummyCart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between border rounded p-3"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>Qty: {item.quantity}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-medium mb-2">Checkout Details</h3>
            <div className="space-y-4 my-6">
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={data.address}
                  onChange={(e) => setData("address", e.target.value)}
                  disabled={processing}
                />
                {errors.address && (
                  <p className="text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={data.phone}
                  onChange={(e) => setData("phone", e.target.value)}
                  disabled={processing}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div className="flex flex-col gap-y-2">
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  value={data.postal_code}
                  onChange={(e) => setData("postal_code", e.target.value)}
                  disabled={processing}
                />
                {errors.postal_code && (
                  <p className="text-sm text-red-600">{errors.postal_code}</p>
                )}
              </div>
            </div>

            <Button
              className="w-full"
              onClick={handleCheckout}
              disabled={processing}
            >
              {processing ? "Processing..." : "Checkout"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
