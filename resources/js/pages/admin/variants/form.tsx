import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, ProductVariant } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import HeadingSmall from "@/components/heading-small";
import variants from "@/routes/variants";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Product Variant",
    href: variants.index().url,
  },
];

interface Props {
  products?: {
    id: number;
    name: string;
  }[];
  variant?: ProductVariant;
}

export default function Form({ products, variant }: Props) {
  const { data, setData, post, patch, processing, errors, reset } = useForm({
    product_id: variant?.product_id.toString() || "",
    variant_name: variant?.variant_name || "",
    stock: variant?.stock || 0,
    color: variant?.color || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (variant) {
      patch(variants.update(variant.id).url, {
        preserveScroll: true,
        onSuccess: () => reset(),
      })
    } else {
      post(variants.store().url, {
        preserveScroll: true,
        onSuccess: () => reset(),
        onError: () => console.log("error"),
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={variant ? "Edit Product Variant" : "Create Product Variant"} />

      <div className="p-6">
        <HeadingSmall
          title={`${variant ? "Edit" : "Create"} Product Variant`}
          description={`Fill out the form below to ${variant ? "edit an existing" : "create a new"} product variant`}
        />

        <Separator className="my-8" />

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="flex flex-col gap-y-4">
            <Label htmlFor="product_id">Product</Label>
            <Select
              value={data.product_id}
              onValueChange={(value) => setData("product_id", value)}
              disabled={processing}
            >
              <SelectTrigger id="product_id">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {products?.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.product_id && (
              <p className="text-sm text-red-600">{errors.product_id}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-4">
            <Label htmlFor="variant_name">Variant Name</Label>
            <Input
              id="variant_name"
              value={data.variant_name}
              onChange={(e) => setData("variant_name", e.target.value)}
              disabled={processing}
            />
            {errors.variant_name && <p className="text-sm text-red-600">{errors.variant_name}</p>}
          </div>

          <div className="flex flex-col gap-y-4">
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              value={data.color}
              onChange={(e) => setData("color", e.target.value)}
              disabled={processing}
            />
            {errors.color && <p className="text-sm text-red-600">{errors.color}</p>}
          </div>

          <div className="flex flex-col gap-y-4">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={data.stock}
              onChange={(e) => setData("stock", parseInt(e.target.value))}
              disabled={processing}
            />
            {errors.stock && <p className="text-sm text-red-600">{errors.stock}</p>}
          </div>

          <Button type="submit" disabled={processing}>
            {variant ? "Update" : "Create"}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}