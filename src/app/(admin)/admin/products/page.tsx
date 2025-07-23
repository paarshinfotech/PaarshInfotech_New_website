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
import { productsData } from "@/lib/productsData";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

export default function ProductsManagementPage() {
  const router = useRouter();
  const [products, setProducts] = useState(productsData);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof productsData)[0] | null
  >(null);

  const handleEdit = (product: (typeof productsData)[0]) => {
    router.push(`/admin/products/edit/${product.id}`);
  };

  const handleDelete = (product: (typeof productsData)[0]) => {
    setSelectedProduct(product);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      setProducts(products.filter((s) => s.id !== selectedProduct.id));
    }
    setIsDeleteAlertOpen(false);
    setSelectedProduct(null);
  };

  const handleTogglePublished = (id: string, published: boolean) => {
    setProducts(products.map((s) => (s.id === id ? { ...s, published } : s)));
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
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>/products/{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`published-${product.id}`}
                        checked={product.published}
                        onCheckedChange={(checked) =>
                          handleTogglePublished(product.id, checked)
                        }
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
