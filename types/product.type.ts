import { Category } from "./category.type";

export type Product = {
  id: number;
  name: string;
  description: string;
  ratingCount: number;
  ratingAvg: number;
  sold: number;
  images: string[];
  variants: ProductVariant[];
  categories: Category[];
};

export type ProductVariant = {
  id: number;
  price: number;
  quantity: number;
  sku: string;
  size: Size;
  color: Color;
};

export type Size = {
  id: number;
  name: string;
  value: number;
};

export type Color = {
  id: number;
  name: string;
  code: string;
};

export type ProductDetail = Product & {
  reviews: Review[];
};

export type Review = {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
};
