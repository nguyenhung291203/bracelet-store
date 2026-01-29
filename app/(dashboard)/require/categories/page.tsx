import { Button } from "@/components/ui/button";
import ListCategory from "./list-category";
import { categoryApi } from "@/lib/api/category-api";

export default async function Page() {
  const { data: categories = [] } = await categoryApi.getAll();
  console.log("categories: ",categories)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Quản lý danh mục</h1>
        <Button>+ Thêm danh mục</Button>
      </div>
      <ListCategory categories={categories.splice(0,10)} />
    </div>
  );
}
