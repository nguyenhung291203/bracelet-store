export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* LEFT - BRAND */}
      <div className="hidden md:flex flex-col justify-center items-center bg-black text-white">
        <h1 className="text-3xl font-bold">Bracelet Store</h1>
        <p className="text-sm opacity-80 mt-2">
          Vòng tay phong thủy & trang sức
        </p>
      </div>

      {/* RIGHT - FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
