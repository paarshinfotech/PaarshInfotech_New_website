"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaUserGraduate, FaHandshake, FaChalkboardTeacher, FaAward, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuArrowRight } from "react-icons/lu";

const quickStats = [
  { title: "Partner Colleges", value: 5, Icon: FaHandshake, href: "/admin/excellence-center/partners" },
  { title: "Programs Offered", value: 3, Icon: FaChalkboardTeacher, href: "/admin/excellence-center/programs" },
  { title: "Total Centers", value: 12, Icon: FaUserGraduate, href: "/admin/excellence-center/centers" },
  { title: "Awards Won", value: 3, Icon: FaAward, href: "/admin/excellence-center/awards" },
  { title: "Upcoming Workshops", value: 2, Icon: FaCalendarAlt, href: "/admin/excellence-center/workshops" },
];

export default function ExcellenceCenterDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Excellence Center Dashboard</h1>
        <p className="text-muted-foreground">
          An overview of your industry-academia collaboration initiatives.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {quickStats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <Button asChild variant="link" className="p-0 h-auto text-xs text-muted-foreground">
                <Link href={stat.href}>
                  Manage <LuArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Welcome to the Excellence Center Management</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                Use the links in the sidebar to manage all aspects of the Centers of Excellence program. You can update partner colleges, add new programs, manage workshops, and much more.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
