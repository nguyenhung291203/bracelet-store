// components/admin/recent-orders.tsx
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// TODO: Fetch from database
const recentOrders = [
  {
    id: "#ORD001",
    customer: "Nguyễn Văn A",
    product: "Vòng tay đá thạch anh",
    amount: 450000,
    status: "completed",
  },
  {
    id: "#ORD002",
    customer: "Trần Thị B",
    product: "Vòng tay bạc 925",
    amount: 890000,
    status: "processing",
  },
  {
    id: "#ORD003",
    customer: "Lê Văn C",
    product: "Vòng tay gỗ trầm hương",
    amount: 1200000,
    status: "pending",
  },
  {
    id: "#ORD004",
    customer: "Phạm Thị D",
    product: "Vòng tay phong thủy",
    amount: 650000,
    status: "completed",
  },
  {
    id: "#ORD005",
    customer: "Hoàng Văn E",
    product: "Vòng tay ngọc bích",
    amount: 1500000,
    status: "processing",
  },
];

const statusMap = {
  completed: { label: "Hoàn thành", variant: "default" as const },
  processing: { label: "Đang xử lý", variant: "secondary" as const },
  pending: { label: "Chờ xác nhận", variant: "outline" as const },
};

export default function RecentOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mã đơn</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead>Sản phẩm</TableHead>
          <TableHead>Số tiền</TableHead>
          <TableHead>Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>{order.product}</TableCell>
            <TableCell>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(order.amount)}
            </TableCell>
            <TableCell>
              <Badge variant={statusMap[order.status].variant}>
                {statusMap[order.status].label}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}