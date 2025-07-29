"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GoPlusCircle } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useGetProductsQuery, useDeleteProductMutation, useUpdateProductMutation } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/productsData";
import { AdminTableSkeleton } from "@/components/ui/skeletons";

export default function ProductsManagementPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: productsResponse, isLoading, error } = useGetProductsQuery(undefined);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  // Handle loading state
  if (isLoading) {
    return <AdminTableSkeleton title="Products Management" />;
  }

  // Handle error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Products Management</CardTitle>
          <CardDescription>
            Manage your company's product offerings and their visibility.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <h3 className="text-red-800 font-medium">Error loading products</h3>
            <p className="text-red-600 mt-1">
              Failed to load product data. Please try again.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const products = productsResponse?.data || [];

  const handleEdit = (product: Product) => {
    router.push(`/admin/products/edit/${product._id}`);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct._id).unwrap();
        toast({
          title: "Product Deleted",
          description: `The product "${selectedProduct.name}" has been deleted successfully.`,
        });
      } catch (error) {
        console.error("Error deleting product:", error);
        toast({
          title: "Error",
          description: "Failed to delete product. Please try again.",
          variant: "destructive",
        });
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedProduct(null);
  };

  const handleTogglePublished = async (product: Product, published: boolean) => {
    try {
      await updateProduct({ _id: product._id, published }).unwrap();
      toast({
        title: "Product Updated",
        description: `The product "${product.name}" is now ${published ? "published" : "unpublished"}.`,
      });
    } catch (error) {
      console.error("Error updating product status:", error);
      toast({
        title: "Error",
        description: "Failed to update product status. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Products Management</CardTitle>
            <CardDescription>
              Manage your company's product offerings and their visibility.
            </CardDescription>
          </div>
          <Button size="sm" asChild>
            <Link href="/admin/products/new">
              <GoPlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: Product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>/products/{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`published-${product._id}`}
                        checked={product.published}
                        onCheckedChange={(checked) =>
                          handleTogglePublished(product, checked)
                        }
                        disabled={isUpdating}
                      />
                      <Badge
                        variant={product.published ? "default" : "secondary"}
                      >
                        {product.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <IoIosMore className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(product)}>
                          <FiEdit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(product)}
                          className="text-destructive"
                        >
                          <FaTrashCan className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedProduct?.name || "the selected product"}
      />
    </>
  );
}