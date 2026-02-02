"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import CategorySidebar from "@/components/category/category-sidebar";
import PriceRangeFilter from "@/components/price-range-filter";
import ProductCard from "@/components/product/product-card";

import { Category } from "@/types/category.type";
import { Product } from "@/types/product.type";

interface Props {
  categories: Category[];
  products: Product[];
}

type SortType = "newest" | "price-asc" | "price-desc" | "popular";

type FilterState = {
  categoryId: number | null;
  sort: SortType;
  page: number;
  minPrice: number;
  maxPrice: number;
  keyword: string;
};

const PAGE_SIZE = 6;

export default function Client({ categories, products }: Props) {
  const [filter, setFilter] = useState<FilterState>({
    categoryId: categories[0]?.id ?? null,
    sort: "newest",
    page: 1,
    minPrice: 0,
    maxPrice: 5_000_000,
    keyword: "",
  });

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (filter.keyword.trim()) {
      const keyword = filter.keyword.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(keyword) ||
          product.description.toLowerCase().includes(keyword),
      );
    }

    if (filter.categoryId) {
      result = result.filter((product) =>
        product.categories.some((cat) => cat.id === filter.categoryId),
      );
    }

    result = result.filter((product) => {
      const minVariantPrice = Math.min(...product.variants.map((v) => v.price));

      return (
        minVariantPrice >= filter.minPrice && minVariantPrice <= filter.maxPrice
      );
    });

    switch (filter.sort) {
      case "price-asc":
        result.sort(
          (a, b) =>
            Math.min(...a.variants.map((v) => v.price)) -
            Math.min(...b.variants.map((v) => v.price)),
        );
        break;

      case "price-desc":
        result.sort(
          (a, b) =>
            Math.max(...b.variants.map((v) => v.price)) -
            Math.max(...a.variants.map((v) => v.price)),
        );
        break;

      case "popular":
      default:
        result.sort((a, b) => b.sold - a.sold);
        break;
    }

    return result;
  }, [
    products,
    filter.categoryId,
    filter.minPrice,
    filter.maxPrice,
    filter.sort,
    filter.keyword,
  ]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PAGE_SIZE);

  const paginatedProducts = useMemo(() => {
    const start = (filter.page - 1) * PAGE_SIZE;
    return filteredAndSortedProducts.slice(start, start + PAGE_SIZE);
  }, [filteredAndSortedProducts, filter.page]);

  return (
    <div className="px-6 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="flex flex-col gap-4 lg:order-1  lg:col-span-3">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="search">Tìm kiếm</FieldLabel>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="search"
                  placeholder="Tìm theo tên hoặc mô tả..."
                  className="pl-9"
                  value={filter.keyword}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      keyword: e.target.value,
                      page: 1,
                    }))
                  }
                />
              </div>

              <FieldDescription>Nhập từ khóa để lọc sản phẩm</FieldDescription>
            </Field>
          </FieldGroup>

          <CategorySidebar
            title="Danh mục"
            categories={categories.slice(0, 10)}
            activeId={filter.categoryId}
            onChange={(id) =>
              setFilter((prev) => ({
                ...prev,
                categoryId: id,
                page: 1,
              }))
            }
          />
          <PriceRangeFilter
            value={[filter.minPrice, filter.maxPrice]}
            onChange={([min, max]) =>
              setFilter((prev) => ({
                ...prev,
                minPrice: min,
                maxPrice: max,
                page: 1,
              }))
            }
          />
        </aside>

        <main className="space-y-4 lg:order-2 lg:col-span-9">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">Danh sách sản phẩm</h1>

            <Select
              value={filter.sort}
              onValueChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  sort: value as SortType,
                  page: 1,
                }))
              }
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="price-asc">Giá tăng dần</SelectItem>
                <SelectItem value="price-desc">Giá giảm dần</SelectItem>
                <SelectItem value="popular">Phổ biến</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              Không có sản phẩm
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <Pagination>
            <PaginationContent>
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={filter.page === pageNumber}
                      onClick={(e) => {
                        e.preventDefault();
                        setFilter((prev) => ({
                          ...prev,
                          page: pageNumber,
                        }));
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
}
