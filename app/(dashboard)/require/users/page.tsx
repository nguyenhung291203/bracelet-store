import { Button } from "@/components/ui/button";
import { userApi } from "@/lib/api/user-api";

export default async function Page() {
  const { data: users = [] } = await userApi.getAll();
  console.log("users: ", users);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý tài khoản</h1>
        <Button>+ Thêm tài khoản</Button>
      </div>
    </div>
  );
}
