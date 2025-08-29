import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Product } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Heading from "@/components/heading";
import products from "@/routes/products";
import { columns } from "./column";
import { useFlashToast } from "@/hooks/use-flash-toast";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Products',
    href: products.index().url,
  },
];

interface Props {
  productsData: Product[]
}

export default function Index({ productsData }: Props) {
  useFlashToast();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products List" />

      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Products List"
            description="Manage your products here"
          />
          <Button asChild>
            <Link href={products.create().url}>
              <Plus className="size-4" />
              Create Product
            </Link>
          </Button>
        </div>

        <DataTable columns={columns} data={productsData} />
      </div>

    </AppLayout>
  );
}