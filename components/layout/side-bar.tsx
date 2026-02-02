"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  List,
  ShoppingCart,
  Package,
  Settings,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Role } from "@/lib/generated/prisma/enums";

 const MENU_BY_ROLE: Record<
  "DEFAULT" | Role,
  {
    label: string;
    items: {
      label: string;
      href: string;
      icon: any;
    }[];
  }[]
> = {
  DEFAULT: [
    {
      label: "Shop",
      items: [
        { label: "Trang chủ", href: "/shop", icon: Home },
        { label: "Sản phẩm", href: "/shop/products", icon: ShoppingBag },
        { label: "Danh mục", href: "/shop/categories", icon: List },
      ],
    },
    {
      label: "Mua hàng",
      items: [
        { label: "Giỏ hàng", href: "/cart", icon: ShoppingCart },
        { label: "Đơn hàng", href: "/orders", icon: Package },
      ],
    },
  ],

  CUSTOMER: [
    {
      label: "Shop",
      items: [
        { label: "Trang chủ", href: "/shop", icon: Home },
        { label: "Sản phẩm", href: "/shop/products", icon: ShoppingBag },
        { label: "Danh mục", href: "/shop/categories", icon: List },
      ],
    },
    {
      label: "Mua hàng",
      items: [
        { label: "Giỏ hàng", href: "/cart", icon: ShoppingCart },
        { label: "Đơn hàng", href: "/orders", icon: Package },
      ],
    },
  ],

  EMPLOYEE: [
    {
      label: "Quản lý đơn hàng",
      items: [
        { label: "Đơn hàng", href: "/admin/orders", icon: Package },
      ],
    },
  ],

  ADMIN: [
    {
      label: "Quản trị",
      items: [
        { label: "Dashboard", href: "/require/dashboard", icon: Settings },
        { label: "Tài khoản", href: "/require/users", icon: User },
        { label: "Sản phẩm", href: "/require/products", icon: ShoppingBag },
        { label: "Danh mục", href: "/require/categories", icon: List },
        { label: "Đơn hàng", href: "/require/orders", icon: Package },
      ],
    },
  ],
};

interface Props {
  role?: Role;
}

export default function Sidebar({ role }: Props) {
  const pathname = usePathname();
  const menus = MENU_BY_ROLE[role ?? "CUSTOMER"];

  return (
    <aside className="w-64 border-r bg-background">
      {/* Logo */}
      <div className="h-14 flex items-center px-6 border-b font-semibold text-lg">
        💎 Bracelet Store
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-6">
        {menus.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase">
              {group.label}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                      active
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
