"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // app/login/page.tsx
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("Login result:", res);

    if (res?.error) {
      setLoading(false);
      setError("Email hoặc mật khẩu không chính xác");
      return;
    }

    if (res?.ok) {
      // ✅ Chờ session được set
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Navigate
      router.push(redirect);
      router.refresh(); // ✅ Quan trọng: refresh để proxy check lại token
    } else {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border border-border bg-background shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Đăng nhập</CardTitle>
        <p className="text-sm text-muted-foreground">
          Đăng nhập để tiếp tục mua hàng
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* EMAIL */}
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <Label>Mật khẩu</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                             text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

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
            <a href="/register" className="text-primary hover:underline">
              Đăng ký
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
