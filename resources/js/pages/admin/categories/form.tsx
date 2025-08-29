import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Category } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import HeadingSmall from "@/components/heading-small";
import categories from "@/routes/categories";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Categories",
    href: categories.index().url,
  },
];

interface Props {
  category?: Category;
}

export default function Form({ category }: Props) {
  const { data, setData, post, patch, processing, errors, reset } = useForm({
    name: category?.name || "",
    description: category?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category) {
      patch(categories.update(category.id).url, {
        preserveScroll: true,
        onSuccess: () => reset(),
      });
    } else {
      post(categories.store().url, {
        preserveScroll: true,
        onSuccess: () => reset(),
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={category ? "Edit Category" : "Create Category"} />

      <div className="p-6">
        <HeadingSmall 
          title={`${category ? "Edit" : "Create"} Category`}
          description={`Fill out the form below to ${category ? "edit an existing" : "create a new"} category`} 
        />

        <Separator className="my-8" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-y-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              disabled={processing}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-y-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => setData("description", e.target.value)}
              disabled={processing}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <Button type="submit" disabled={processing}>
            {category ? "Update" : "Create"}
          </Button>
        </form>
      </div>

    </AppLayout>
  );
}
