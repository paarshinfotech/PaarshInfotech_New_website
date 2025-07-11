
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const mediaItems = [
  { src: "https://placehold.co/600x600.png", alt: "Team Meeting", category: "Office Culture" },
  { src: "https://placehold.co/600x600.png", alt: "Cricket Match", category: "Sports" },
  { src: "https://placehold.co/600x600.png", alt: "Diwali Celebration", category: "Celebrations" },
  { src: "https://placehold.co/600x600.png", alt: "New Year Party", category: "Parties" },
  { src: "https://placehold.co/600x600.png", alt: "Collaborative Session", category: "Office Culture" },
  { src: "https://placehold.co/600x600.png", alt: "Team Lunch", category: "Parties" },
];

export default function MediaManagementPage() {
    return (
        <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Media Management</h1>
                    <p className="text-muted-foreground">Manage your website's media gallery.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Upload Media
                </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {mediaItems.map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                        <div className="relative aspect-square">
                            <Image src={item.src} alt={item.alt} fill className="object-cover" />
                        </div>
                        <CardHeader className="p-4">
                            <CardTitle className="text-base">{item.alt}</CardTitle>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0">
                           <Badge variant="outline">{item.category}</Badge>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
