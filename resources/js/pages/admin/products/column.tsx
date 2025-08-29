"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import products from "@/routes/products";
import { Product } from "@/types";
import { router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

function ActionsCell({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    router.visit(products.edit(product.id));
  };

  const handleDelete = () => {
    router.delete(products.destroy(product.id));
    setOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => {
                setOpen(true);
              }, 50);
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete <strong>{product.name}</strong> permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string | undefined;
      return image ? (
        <img
          src={image}
          alt={row.getValue("name") as string}
          width={100}
          height={100}
        />
      ) : (
        <span className="text-muted-foreground">No image</span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorFn: (row) => row.category?.name,
    id: "category",
    header: "Category",
    cell: ({ row }) => {
      const categoryName = row.original.category?.name;
      return categoryName || "-";
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = Number(row.getValue("price"));
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell product={row.original} />,
  },
];
