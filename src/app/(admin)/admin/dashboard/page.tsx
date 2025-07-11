
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Briefcase, FileText, LineChart, Users } from "lucide-react";

const stats = [
    { title: "Total Services", value: "12", icon: Briefcase },
    { title: "Active Projects", value: "8", icon: LineChart },
    { title: "Team Members", value: "25", icon: Users },
    { title: "Open Positions", value: "4", icon: FileText },
]

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map(stat => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2 h-[300px]">
                        {/* Placeholder for a chart */}
                        <div className="w-full h-full bg-secondary rounded-lg flex items-center justify-center">
                            <BarChart className="w-16 h-16 text-muted-foreground/50" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>A log of recent administrative actions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center">
                            <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                            <p className="text-sm">New team member "John Doe" was added.</p>
                        </div>
                         <div className="flex items-center">
                            <Briefcase className="h-5 w-5 mr-3 text-muted-foreground" />
                            <p className="text-sm">Service "Web Development" was updated.</p>
                        </div>
                         <div className="flex items-center">
                            <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                            <p className="text-sm">New job opening for "React Developer" posted.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
