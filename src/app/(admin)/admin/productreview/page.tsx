"use client";

import { useState } from "react";
import Image from "next/image";
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
import { ProductReviewForm } from "@/components/admin/products/ProductReviewForm";
import { DeleteConfirmationDialog } from "@/components/admin/DeleteConfirmationDialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAddProductTestimonialMutation, useDeleteProductTestimonialMutation, useGetProductTestimonialsQuery, useUpdateProductTestimonialMutation } from "../../../../services/api";

interface ProductReview {
  _id: string;
  quote: string;
  name: string;
  title: string;
  avatar: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductReviewRowProps {
  review: ProductReview;
  handleEdit: (review: ProductReview) => void;
  handleDelete: (review: ProductReview) => void;
  handleTogglePublished: (reviewId: string, published: boolean) => void;
}

const ProductReviewRow = ({
  review,
  handleEdit,
  handleDelete,
  handleTogglePublished,
}: ProductReviewRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <Image
          src={review.avatar}
          alt={review.name}
          width={40}
          height={40}
          className="rounded-md object-contain"
        />
      </TableCell>
      <TableCell className="font-medium">{review.name}</TableCell>
      <TableCell>{review.title}</TableCell>
      <TableCell>{review.quote?.substring(0, 50)}...</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Switch
            id={`published-${review._id}`}
            checked={review.published}
            onCheckedChange={(checked) =>
              handleTogglePublished(review._id, checked)
            }
          />
          <Badge variant={review.published ? "default" : "secondary"}>
            {review.published ? "Published" : "Draft"}
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
            <DropdownMenuItem onClick={() => handleEdit(review)}>
              <FiEdit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(review)}
              className="text-destructive"
            >
              <FaTrashCan className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default function ProductReviewsManagementPage() {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ProductReview | null>(null);

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useGetProductTestimonialsQuery(undefined);

  const reviews = reviewsData?.data || [];

  const [addProductReview] = useAddProductTestimonialMutation();
  const [updateProductReview] = useUpdateProductTestimonialMutation();
  const [deleteProductReview] = useDeleteProductTestimonialMutation();

  const handleAdd = () => {
    setSelectedReview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (review: ProductReview) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleDelete = (review: ProductReview) => {
    setSelectedReview(review);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedReview) {
      try {
        await deleteProductReview(selectedReview._id).unwrap();
        toast({
          title: "Product Review Deleted",
          description: `${selectedReview.name}'s review has been deleted successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete product review.",
          variant: "destructive",
        });
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedReview(null);
  };

  const handleSave = async (reviewData: {
    quote: string;
    name: string;
    title: string;
    avatarBase64?: string;
    published?: boolean;
  }) => {
    try {
      if (selectedReview) {
        await updateProductReview({
          _id: selectedReview._id,
          quote: reviewData.quote,
          name: reviewData.name,
          title: reviewData.title,
          avatarBase64: reviewData.avatarBase64,
          published: reviewData.published ?? selectedReview.published,
        }).unwrap();
        toast({
          title: "Product Review Updated",
          description: `${reviewData.name}'s review has been updated successfully.`,
        });
      } else {
        await addProductReview({
          quote: reviewData.quote,
          name: reviewData.name,
          title: reviewData.title,
          avatarBase64: reviewData.avatarBase64,
          published: reviewData.published ?? true,
        }).unwrap();
        toast({
          title: "Product Review Created",
          description: `${reviewData.name}'s review has been created successfully.`,
        });
      }
      setIsModalOpen(false);
      setSelectedReview(null);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${selectedReview ? "update" : "create"} product review.`,
        variant: "destructive",
      });
    }
  };

  const handleTogglePublished = async (reviewId: string, published: boolean) => {
    try {
      const review = reviews.find((r: ProductReview) => r._id === reviewId);
      if (!review) return;
      await updateProductReview({
        _id: reviewId,
        quote: review.quote,
        name: review.name,
        title: review.title,
        published,
      }).unwrap();
      toast({
        title: "Status Updated",
        description: `${review.name}'s review visibility has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility status.",
        variant: "destructive",
      });
    }
  };

  if (reviewsLoading) {
    return <div>Loading...</div>;
  }

  if (reviewsError) {
    return <div>Error: Failed to load product reviews</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Product Reviews Management</CardTitle>
          <CardDescription>
            Manage your product reviews and their visibility on the public site.
          </CardDescription>
        </div>
        <Button size="sm" onClick={handleAdd}>
          <GoPlusCircle className="mr-2 h-4 w-4" />
          Add Product Review
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review: ProductReview) => (
              <ProductReviewRow
                key={review._id}
                review={review}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleTogglePublished={handleTogglePublished}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <ProductReviewForm
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        review={selectedReview}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
        onConfirm={confirmDelete}
        itemName={selectedReview?.name || "the selected review"}
      />
    </Card>
  );
}