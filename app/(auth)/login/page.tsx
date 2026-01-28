"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      router.replace(redirect)
    }, 800)
  }

  return (
    <Card className="border border-border bg-background shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold text-foreground">
          Đăng nhập
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Đăng nhập để tiếp tục mua hàng
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
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
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-muted-foreground
                  hover:text-foreground
                "
              >
                {showPassword ? (
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
            <LogIn className="h-4 w-4" />
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          {/* REGISTER */}
          <p className="text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{" "}
            <a
              href="/register"
              className="text-primary hover:underline"
            >
              Đăng ký
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
