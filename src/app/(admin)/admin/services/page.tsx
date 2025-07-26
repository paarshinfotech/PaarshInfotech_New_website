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
import { useGetServicesQuery, useDeleteServiceMutation, useUpdateServiceMutation } from "@/services/api";
import { toast } from "@/hooks/use-toast";


interface Service {
  _id: string;
  title: string;
  slug: string;
  published: boolean;
}

export default function ServicesManagementPage() {
  const router = useRouter();
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editServiceId, setEditServiceId] = useState<string | null>(null);

  const { data: servicesResponse, isLoading, isError, error } = useGetServicesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();

  const services: Service[] = servicesResponse?.data || [];

  const handleEdit = (service: Service) => {
  router.push(`/admin/services/edit/${service._id}`);
  };

  const handleDelete = (service: Service) => {
    setSelectedService(service);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedService) {
      try {
        const response = await deleteService({ id: selectedService._id }).unwrap();
        if (response.success) {
          toast({
            title: "Service Deleted",
            description: `The service "${selectedService.title}" has been deleted successfully.`,
          });
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: `Failed to delete service: ${error?.data?.error || "Something went wrong"}`,
          variant: "destructive",
        });
      }
    }
    setIsDeleteAlertOpen(false);
    setSelectedService(null);
  };


  const handleTogglePublished = async (service: Service, published: boolean) => {
    try {
      const response = await updateService({
        id: service._id,
        published,
      }).unwrap();
      if (response.success) {
        toast({
          title: "Service Updated",
          description: `The service "${service.title}" has been ${published ? "published" : "unpublished"} successfully.`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to update service: ${error?.data?.error || "Something went wrong"}`,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Services...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error Loading Services</CardTitle>
          <CardDescription>{(error as any)?.data?.error || "Failed to load services"}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Services Management</CardTitle>
            <CardDescription>
              Manage your company's service offerings and their visibility.
            </CardDescription>
          </div>
          <Button size="sm" asChild>
            <Link href="/admin/services/new">
              <GoPlusCircle className="mr-2 h-4 w-4" />
              Add Service
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service._id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>/services/{service.slug}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`published-${service._id}`}
                        checked={service.published}
                        onCheckedChange={(checked) =>
                          handleTogglePublished(service, checked)
                        }
                      />
                      <Badge
                        variant={service.published ? "default" : "secondary"}
                      >
                        {service.published ? "Published" : "Draft"}
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
                        <DropdownMenuItem onClick={() => handleEdit(service)}>
                          <FiEdit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(service)}
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
        itemName={selectedService?.title || "the selected service"}
      />
      </>
  );
}