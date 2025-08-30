import MainLayout from "@/layouts/main-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";
import { router } from "@inertiajs/react";
import { pay } from "@/routes/order";

interface OrderListProps {
  orders: Order[];
}

export default function OrderList({ orders }: OrderListProps) {
  const handleCheckout = (orderId: number, url: string | undefined) => {
    if (url) {
      window.location.href = url;
      return;
    }

    router.post(pay(orderId));
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
        {orders.length === 0 && <p>You have no orders yet.</p>}

        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle>Order #{order.id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <span className="font-medium">Address:</span> {order.address}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {order.phone}
              </p>
              <p>
                <span className="font-medium">Postal Code:</span> {order.postal_code}
              </p>
              <p>
                <span className="font-medium">Total:</span> Rp. {order.total}
              </p>
              <p>
                <span className="font-medium">Payment Method:</span> {order.payment_method || "-"}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={
                    order.status === "PAID"
                      ? "text-green-600 font-semibold"
                      : order.status === "FAILED"
                        ? "text-red-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                  }
                >
                  {order.status}
                </span>
              </p>

              {order.status === "PENDING" && (
                <Button
                  className="mt-2 bg-blue-500 text-white"
                  onClick={() => handleCheckout(order.id, order.url)}
                >
                  {order.url ? "Continue Payment" : "Checkout"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
