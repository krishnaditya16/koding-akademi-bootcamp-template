import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Category } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Heading from "@/components/heading";
import categories from "@/routes/categories";
import { columns } from "./column";
import { useFlashToast } from "@/hooks/use-flash-toast";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    href: categories.index().url,
  },
];

interface Props {
  categoriesData: Category[]
}

export default function Index({ categoriesData }: Props) {
  useFlashToast();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Categories List" />

      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Categories List"
            description="Manage your categories here"
          />
          <Button asChild>
            <Link href={categories.create().url}>
              <Plus className="size-4" />
              Create Category
            </Link>
          </Button>
        </div>

        <DataTable columns={columns} data={categoriesData} />
      </div>

    </AppLayout>
  );
}