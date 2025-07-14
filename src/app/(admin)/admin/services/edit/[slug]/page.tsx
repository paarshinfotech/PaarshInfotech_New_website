
'use client';

import { useParams } from "next/navigation";
import { servicesData } from "@/lib/servicesData";
import { ServiceForm } from "@/components/admin/services/ServiceForm";
import { useEffect, useState } from "react";
import type { Service } from "@/lib/servicesData";

export default function EditServicePage() {
    const params = useParams();
    const { slug } = params;
    const [service, setService] = useState<Service | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (slug) {
            const foundService = servicesData.find(s => s.slug === slug);
            if (foundService) {
                setService(foundService);
            } else {
                setNotFound(true);
            }
        }
    }, [slug]);

    if (notFound) {
        return <div className="p-8">Service not found.</div>;
    }

    if (!service) {
        return <div className="p-8">Loading service data...</div>;
    }

    return <ServiceForm service={service} />;
}
