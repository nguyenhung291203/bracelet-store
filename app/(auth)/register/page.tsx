"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, UserPlus } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      router.push("/login")
    }, 1000)
  }

  return (
    <Card className="border border-border bg-background shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-foreground">
          Tạo tài khoản
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Đăng ký để mua sắm nhanh hơn
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* NAME */}
          <div className="space-y-1">
            <Label className="text-foreground">Họ và tên</Label>
            <Input placeholder="Nguyễn Văn A" />
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <Label className="text-foreground">Email</Label>
            <Input placeholder="email@example.com" />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <Label className="text-foreground">Mật khẩu</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="space-y-1">
            <Label className="text-foreground">Xác nhận mật khẩu</Label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full flex items-center gap-2"
            disabled={loading}
          >
            <UserPlus className="h-4 w-4" />
            {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
          </Button>

          {/* LOGIN */}
          <p className="text-center text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <a
              href="/login"
              className="text-primary hover:underline"
            >
              Đăng nhập
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
