// app/admin/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  Package,
  Users,
  DollarSign,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import SalesChart from "./sales-chart";
import OrderStatusChart from "./order-status-chart";
import TopProductsChart from "./top-products-chart";
import RecentOrders from "./recent-orders";
import { StatsCard } from "@/components/dashboard/stats-card";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  const stats = {
    totalRevenue: 125000000,
    totalOrders: 245,
    totalProducts: 89,
    totalCustomers: 156,
    revenueChange: 12.5,
    ordersChange: 8.3,
    productsChange: -2.1,
    customersChange: 15.2,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Chào mừng, {session?.user.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            Đây là tổng quan về cửa hàng của bạn
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue */}
        <StatsCard
          title="Doanh thu"
          icon={<DollarSign className="h-4 w-4" />}
          value={new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(stats.totalRevenue)}
          change={stats.revenueChange}
        />

        {/* Orders */}
        <StatsCard
          title="Đơn hàng"
          icon={<ShoppingCart className="h-4 w-4" />}
          value={stats.totalOrders}
          change={stats.ordersChange}
        />

        {/* Products */}
        <StatsCard
          title="Sản phẩm"
          icon={<Package className="h-4 w-4" />}
          value={stats.totalProducts}
          change={stats.productsChange}
        />

        {/* Customers */}
        <StatsCard
          title="Khách hàng"
          icon={<Users className="h-4 w-4" />}
          value={stats.totalCustomers}
          change={stats.customersChange}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <OrderStatusChart />
      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsChart />

        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
