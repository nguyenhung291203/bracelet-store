"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function SizeGuideDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="h-auto p-0 text-xs text-blue-600"
        >
          Hướng dẫn chọn size
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Hướng dẫn chọn size vòng tay</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            Size vòng tay được tính theo <b>chu vi cổ tay (cm)</b>.
            Bạn có thể dùng thước dây hoặc sợi chỉ quấn quanh cổ tay rồi đo lại.
          </p>

          <table className="w-full border text-center text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="border px-2 py-1">Size vòng</th>
                <th className="border px-2 py-1">Chu vi cổ tay</th>
                <th className="border px-2 py-1">Phù hợp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border py-1">16cm</td>
                <td className="border">15 – 15.5 cm</td>
                <td className="border">Tay nhỏ / đeo ôm</td>
              </tr>
              <tr>
                <td className="border py-1">17cm</td>
                <td className="border">16 – 16.5 cm</td>
                <td className="border">Tay vừa</td>
              </tr>
              <tr>
                <td className="border py-1">18cm</td>
                <td className="border">17 – 17.5 cm</td>
                <td className="border">Tay to</td>
              </tr>
              <tr>
                <td className="border py-1">19cm</td>
                <td className="border">18 – 18.5 cm</td>
                <td className="border">Tay rất to</td>
              </tr>
            </tbody>
          </table>

          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Nếu thích đeo thoải mái → chọn lớn hơn 0.5–1cm</li>
            <li>• Nếu tay ở giữa 2 size → nên chọn size lớn hơn</li>
            <li>• Vòng đá thường đeo đẹp nhất khi không quá chật</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
