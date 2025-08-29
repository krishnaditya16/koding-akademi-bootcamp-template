import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Product } from "@/types";
import { Head, router, useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import HeadingSmall from "@/components/heading-small";
import products from "@/routes/products";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Products",
    href: products.index().url,
  },
];

interface Props {
  categories?: {
    id: number;
    name: string;
  }[];
  product?: Product;
}

export default function Form({ categories, product }: Props) {
  const { data, setData, post, processing, errors, reset } = useForm({
    category_id: product?.category_id.toString() || "",
    name: product?.name || "",
    description: product?.description || "",
    company: product?.company || "",
    price: product?.price || 0,
    image: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      router.post(products.update(product.id), {
        ...data,
        _method: 'put',
      }, {
        preserveScroll: true,
        onSuccess: () => reset(),
      });
    } else {
      post(products.store().url, {
        preserveScroll: true,
        onSuccess: () => reset(),
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={product ? "Edit Products" : "Create Products"} />

      <div className="p-6">
        <HeadingSmall
          title={`${product ? "Edit" : "Create"} Product`}
          description={`Fill out the form below to ${product ? "edit an existing" : "create a new"} product`}
        />

        <Separator className="my-8" />

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="flex flex-col gap-y-4">
            <Label htmlFor="category_id">Category</Label>
            <Select
              value={data.category_id}
              onValueChange={(value) => setData("category_id", value)}
              disabled={processing}
            >
              <SelectTrigger id="category_id">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category_id && (
              <p className="text-sm text-red-600">{errors.category_id}</p>
            )}
          </div>
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

          <div className="flex flex-col gap-y-4">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={data.company}
              onChange={(e) => setData("company", e.target.value)}
              disabled={processing}
            />
            {errors.company && <p className="text-sm text-red-600">{errors.company}</p>}
          </div>

          <div className="flex flex-col gap-y-4">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={data.price}
              onChange={(e) => setData("price", parseFloat(e.target.value))}
              disabled={processing}
            />
            {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
          </div>

          <div className="flex flex-col gap-y-4">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setData("image", e.target.files ? e.target.files[0] : null)}
              disabled={processing}
            />
            {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
            {product?.image && (
              <div className="mt-2">
                <p className="text-sm leading-none font-medium mb-4">Current Image:</p>
                <img src={product.image} alt={product.name} className="size-24! object-cover rounded" />
              </div>
            )}
          </div>

          <Button type="submit" disabled={processing}>
            {product ? "Update" : "Create"}
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}