import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, ProductVariant } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Heading from "@/components/heading";
import variants from "@/routes/variants";
import { columns } from "./column";
import { useFlashToast } from "@/hooks/use-flash-toast";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Product Variants',
    href: variants.index().url,
  },
];

interface Props {
  variantsData: ProductVariant[]
}

export default function Index({ variantsData }: Props) {
  useFlashToast();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Product Variants List" />

      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Product Variants List"
            description="Manage your product variants here"
          />
          <Button asChild>
            <Link href={variants.create().url}>
              <Plus className="size-4" />
              Create Product Variant
            </Link>
          </Button>
        </div>

        <DataTable columns={columns} data={variantsData} />
      </div>

    </AppLayout>
  );
}