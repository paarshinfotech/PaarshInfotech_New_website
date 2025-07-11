
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const services = [
  { slug: "web-development", title: "Web Development", status: "Published" },
  { slug: "software-development", title: "Software Development", status: "Published" },
  { slug: 'mobile-app-development', title: 'Mobile App Development', status: "Published" },
  { slug: 'ecommerce-solutions', title: 'E-commerce Solutions', status: "Draft" },
  { slug: 'ai-and-ml', title: 'AI and ML', status: "Published" },
  { slug: 'ui-ux-design', title: 'UI/UX Design', status: "Published" },
];

export default function ServicesManagementPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Services Management</CardTitle>
                    <CardDescription>Manage your company's service offerings.</CardDescription>
                </div>
                <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Service
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
                                    <Badge variant={service.status === 'Published' ? 'default' : 'secondary'}>{service.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
