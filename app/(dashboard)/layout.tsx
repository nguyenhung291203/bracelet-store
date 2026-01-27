// app/(dashboard)/layout.tsx

import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/side-bar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6 bg-muted/40 flex-1">{children}</main>
            </div>
        </div>
    )
}
