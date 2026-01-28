// app/admin/dashboard/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SalesChart from "./sales-chart";
import OrderStatusChart from "./order-status-chart";
import TopProductsChart from "./top-products-chart";
import RecentOrders from "./recent-orders";

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
    <div className="space-y-6">
      {/* Welcome message */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Chào mừng, {session?.user.name}!
        </h1>
        <p className="text-gray-500 mt-1">
          Đây là tổng quan về cửa hàng của bạn
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Doanh thu
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(stats.totalRevenue)}
            </div>
            <div className="flex items-center text-sm mt-1">
              {stats.revenueChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={
                  stats.revenueChange >= 0 ? "text-green-500" : "text-red-500"
                }
              >
                {Math.abs(stats.revenueChange)}%
              </span>
              <span className="text-gray-500 ml-1">so với tháng trước</span>
            </div>
          </CardContent>
        </Card>

        {/* Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Đơn hàng
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="flex items-center text-sm mt-1">
              {stats.ordersChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={
                  stats.ordersChange >= 0 ? "text-green-500" : "text-red-500"
                }
              >
                {Math.abs(stats.ordersChange)}%
              </span>
              <span className="text-gray-500 ml-1">so với tháng trước</span>
            </div>
          </CardContent>
        </Card>

        {/* Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Sản phẩm
            </CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <div className="flex items-center text-sm mt-1">
              {stats.productsChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={
                  stats.productsChange >= 0 ? "text-green-500" : "text-red-500"
                }
              >
                {Math.abs(stats.productsChange)}%
              </span>
              <span className="text-gray-500 ml-1">so với tháng trước</span>
            </div>
          </CardContent>
        </Card>

        {/* Customers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Khách hàng
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <div className="flex items-center text-sm mt-1">
              {stats.customersChange >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={
                  stats.customersChange >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {Math.abs(stats.customersChange)}%
              </span>
              <span className="text-gray-500 ml-1">so với tháng trước</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart - Span 2 columns */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        {/* Order Status Chart */}
        <OrderStatusChart />
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <TopProductsChart />

        {/* Recent Orders */}
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