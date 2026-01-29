// app/(dashboard)/layout.tsx

import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/side-bar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;
  console.log({role})
  return (
    <div className="min-h-screen flex">
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-muted/40 flex-1">{children}</main>
      </div>
    </div>
  );
}
