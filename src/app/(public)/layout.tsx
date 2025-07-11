import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PropsWithChildren } from "react";

// This layout is for the public-facing pages and includes the header and footer
export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    )
}
