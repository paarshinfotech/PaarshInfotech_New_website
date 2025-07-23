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
import { servicesData } from "@/lib/servicesData";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

export default function ServicesManagementPage() {
  const router = useRouter();
  const [services, setServices] = useState(servicesData);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<
    (typeof servicesData)[0] | null
  >(null);

  const handleAdd = () => {
    router.push("/admin/services/new");
  };

  const handleEdit = (service: (typeof servicesData)[0]) => {
    router.push(`/admin/services/edit/${service.slug}`);
  };

  const handleDelete = (service: (typeof servicesData)[0]) => {
    setSelectedService(service);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = () => {
    if (selectedService) {
      setServices(services.filter((s) => s.slug !== selectedService.slug));
    }
    setIsDeleteAlertOpen(false);
    setSelectedService(null);
  };

  const handleTogglePublished = (slug: string, published: boolean) => {
    setServices(
      services.map((s) => (s.slug === slug ? { ...s, published } : s))
    );
  };

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
                <TableRow key={service.slug}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>/services/{service.slug}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`published-${service.slug}`}
                        checked={service.published}
                        onCheckedChange={(checked) =>
                          handleTogglePublished(service.slug, checked)
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
