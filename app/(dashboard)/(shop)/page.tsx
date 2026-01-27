import { categoryApi } from "@/lib/api/category-api"

export default async function Page() {
    const { data: categories } = await categoryApi.getAll()

    return (
        <div className="max-w-xs space-y-4">
            <h2 className="
        text-md font-semibold text-white
        px-4 py-3 rounded-lg
        bg-black
      ">
                Chọn theo danh mục
            </h2>

            <div className="flex flex-col gap-2">
                {categories?.map((item) => (
                    <button
                        key={item.id}
                        className="
              w-20 rounded-lg border px-4 py-2 text-left text-sm
              transition
              hover:bg-black hover:text-white
            "
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
