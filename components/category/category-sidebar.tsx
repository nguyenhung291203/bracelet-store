'use client'

import { Category } from "@/types/category.type"

type Props = {
  title: string
  categories: Category[]
  activeId?: number | null
  onChange?: (id: number) => void
}

export default function CategorySidebar({
  title,
  categories,
  activeId,
  onChange,
}: Props) {
  return (
    <div className="rounded-lg border bg-background text-foreground">
      {/* Header */}
      <div className="border-b bg-muted px-4 py-3">
        <h2 className="text-sm font-semibold uppercase">
          {title}
        </h2>
      </div>

      {/* List */}
      <ul className="divide-y">
        {categories.map((item) => {
          const isActive = item.id === activeId

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onChange?.(item.id)}
                className={`
                  w-full px-4 py-2 text-left text-sm
                  transition-colors
                  ${
                    isActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground"
                  }
                  hover:bg-accent hover:text-accent-foreground
                `}
              >
                {item.name}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
