# API Design — Bracelet Shop

Backend dùng **Express.js** với REST API. Base URL: `/api`.
Mọi response đều trả về cùng 1 cấu trúc JSON chuẩn định nghĩa bên dưới.

---

## Cấu trúc Response chuẩn — BẮT BUỘC

Copilot luôn dùng 2 helper này khi viết controller, không tự tạo cấu trúc response riêng.

```js
// utils/response.js

// ✅ Thành công
const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// ❌ Thất bại
const sendError = (res, message = 'Error', statusCode = 400, errors = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    errors,  // null hoặc object chi tiết lỗi từng field
  });
};
```

### Ví dụ response thực tế

```json
// GET /api/products — thành công
{
  "success": true,
  "message": "Lấy danh sách sản phẩm thành công",
  "data": {
    "items": [...],
    "total": 48,
    "page": 1,
    "totalPages": 5
  }
}

// POST /api/auth/login — sai mật khẩu
{
  "success": false,
  "message": "Email hoặc mật khẩu không đúng",
  "errors": null
}

// POST /api/products — validation lỗi
{
  "success": false,
  "message": "Dữ liệu không hợp lệ",
  "errors": {
    "name": "Tên sản phẩm không được để trống",
    "price": "Giá phải lớn hơn 0"
  }
}
```

---

## Cấu trúc Pagination chuẩn — BẮT BUỘC

Mọi API có phân trang đều trả về **đúng cấu trúc** này, dùng key `items` thay vì tên riêng như `products`, `orders`, `categories`.

```js
// ✅ ĐÚNG — dùng "items" cho mọi API có phân trang
{
  "success": true,
  "message": "...",
  "data": {
    "items": [...],       // luôn là "items", không đổi theo resource
    "total": 48,          // tổng số bản ghi (không phân trang)
    "page": 1,            // trang hiện tại
    "totalPages": 4,      // tổng số trang
    "limit": 12           // số item mỗi trang
  }
}

// ❌ SAI — không dùng tên riêng theo resource
{ "data": { "products": [...] } }
{ "data": { "orders": [...] } }
{ "data": { "categories": [...] } }
```

Helper tạo pagination response trong controller:

```js
// utils/response.js — thêm helper này
const sendPagination = (res, items, pagination, message = 'Success') => {
  res.status(200).json({
    success: true,
    message,
    data: {
      items,
      total: pagination.total,
      page: pagination.page,
      totalPages: pagination.totalPages,
      limit: pagination.limit,
    },
  });
};

// Dùng trong controller
const page  = parseInt(req.query.page)  || 1;
const limit = parseInt(req.query.limit) || 12;
const total = await Product.countDocuments(filter);

const items = await Product.find(filter)
  .skip((page - 1) * limit)
  .limit(limit);

sendPagination(res, items, {
  total,
  page,
  totalPages: Math.ceil(total / limit),
  limit,
}, 'Lấy danh sách sản phẩm thành công');
```

---

## Xác thực & Phân quyền

```
Public        — Không cần token
Protected     — Cần JWT token: Authorization: Bearer <token>
Admin         — Cần JWT token + role = 'admin'
```

Middleware chain cho từng loại route:

```js
// routes/productRoutes.js
router.get('/',            getProducts);              // Public
router.get('/:id',         getProductById);           // Public
router.post('/',           protect, admin, createProduct);   // Admin
router.put('/:id',         protect, admin, updateProduct);   // Admin
router.delete('/:id',      protect, admin, deleteProduct);   // Admin
router.post('/:id/reviews', protect, addReview);             // Protected
```

---

## Auth Routes — `/api/auth`

| Method | Endpoint | Quyền | Mô tả |
|--------|----------|-------|-------|
| POST | `/api/auth/register` | Public | Đăng ký tài khoản mới |
| POST | `/api/auth/login` | Public | Đăng nhập, trả về JWT |
| GET | `/api/auth/me` | Protected | Lấy thông tin user hiện tại |
| PUT | `/api/auth/me` | Protected | Cập nhật thông tin cá nhân |
| PUT | `/api/auth/change-password` | Protected | Đổi mật khẩu |

### POST `/api/auth/register`

```js
// Request body
{
  "name": "Nguyễn Văn A",
  "email": "a@gmail.com",
  "password": "123456",      // min 6 ký tự
  "phone": "0901234567"      // optional
}

// Response 201
{
  "success": true,
  "message": "Đăng ký thành công",
  "data": {
    "token": "eyJhbGci...",
    "user": { "_id", "name", "email", "role", "phone" }
  }
}
```

### POST `/api/auth/login`

```js
// Request body
{
  "email": "a@gmail.com",
  "password": "123456"
}

// Response 200
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "token": "eyJhbGci...",
    "user": { "_id", "name", "email", "role", "avatar" }
  }
}
```

### GET `/api/auth/me`

```js
// Header: Authorization: Bearer <token>

// Response 200
{
  "success": true,
  "message": "Success",
  "data": {
    "user": { "_id", "name", "email", "role", "phone", "address", "avatar" }
    // KHÔNG có password
  }
}
```

---

## Category Routes — `/api/categories`

| Method | Endpoint | Quyền | Mô tả |
|--------|----------|-------|-------|
| GET | `/api/categories` | Public | Lấy tất cả category |
| GET | `/api/categories/:slug` | Public | Chi tiết category theo slug |
| POST | `/api/categories` | Admin | Tạo category mới |
| PUT | `/api/categories/:id` | Admin | Cập nhật category |
| DELETE | `/api/categories/:id` | Admin | Soft delete category |

### GET `/api/categories`

```js
// Response 200
{
  "success": true,
  "message": "Lấy danh sách danh mục thành công",
  "data": {
    "items": [
      { "_id", "name", "slug", "image" }
    ]
  }
}
```

---

## Product Routes — `/api/products`

| Method | Endpoint | Quyền | Mô tả |
|--------|----------|-------|-------|
| GET | `/api/products` | Public | Danh sách sản phẩm (filter, sort, phân trang) |
| GET | `/api/products/:id` | Public | Chi tiết sản phẩm |
| POST | `/api/products` | Admin | Tạo sản phẩm mới |
| PUT | `/api/products/:id` | Admin | Cập nhật sản phẩm |
| DELETE | `/api/products/:id` | Admin | Soft delete sản phẩm |
| POST | `/api/products/:id/reviews` | Protected | Thêm đánh giá |
| DELETE | `/api/products/:id/reviews/:reviewId` | Protected | Xóa đánh giá của mình |

### GET `/api/products` — Query Params

| Param | Kiểu | Mô tả | Mặc định |
|-------|------|-------|---------|
| `page` | Number | Trang hiện tại | 1 |
| `limit` | Number | Số item mỗi trang | 12 |
| `category` | String | Filter theo category ID | - |
| `material` | String | Filter theo chất liệu | - |
| `minPrice` | Number | Giá tối thiểu (VND) | - |
| `maxPrice` | Number | Giá tối đa (VND) | - |
| `sort` | String | `newest`, `price_asc`, `price_desc`, `best_seller`, `top_rated` | `newest` |
| `search` | String | Tìm theo tên sản phẩm | - |

```js
// Ví dụ: GET /api/products?category=abc&sort=price_asc&page=2&limit=12

// Response 200
{
  "success": true,
  "message": "Lấy danh sách sản phẩm thành công",
  "data": {
    "items": [
      {
        "_id", "name", "images",     // images[0] là thumbnail
        "category": { "name", "slug" },
        "material",
        "rating", "sold",
        "variants": [{ "size", "color", "price", "stock", "sku" }],
        "isActive"
      }
    ],
    "total": 48,
    "page": 2,
    "totalPages": 4,
    "limit": 12
  }
}
```

### GET `/api/products/:id`

```js
// Response 200 — trả về đầy đủ thông tin gồm reviews
{
  "success": true,
  "message": "Lấy sản phẩm thành công",
  "data": {
    "product": {
      "_id", "name", "description", "images",
      "category": { "_id", "name", "slug" },
      "material", "rating", "sold", "isActive",
      "variants": [{ "size", "color", "price", "stock", "sku" }],
      "reviews": [
        {
          "_id",
          "user": { "_id", "name", "avatar" },
          "rating", "comment", "createdAt"
        }
      ]
    }
  }
}
```

### POST `/api/products` — Tạo sản phẩm (Admin)

```js
// Request body
{
  "name": "Vòng đá thạch anh tím",
  "description": "Vòng tay đá thạch anh tím tự nhiên...",
  "images": ["https://...url1", "https://...url2"],
  "category": "categoryId",
  "material": "đá thạch anh tím",
  "variants": [
    { "size": "S", "color": "tím", "price": 150000, "stock": 20, "sku": "VT001-S-TIM" },
    { "size": "M", "color": "tím", "price": 150000, "stock": 15, "sku": "VT001-M-TIM" }
  ]
}

// Response 201
{
  "success": true,
  "message": "Tạo sản phẩm thành công",
  "data": { "product": { ...toàn bộ product } }
}
```

### POST `/api/products/:id/reviews`

```js
// Request body
{
  "rating": 5,               // 1 - 5
  "comment": "Rất đẹp!"     // optional
}

// Response 201
{
  "success": true,
  "message": "Đánh giá thành công",
  "data": {
    "rating": 4.8,           // rating mới sau khi tính lại
    "reviews": [...]
  }
}
```

---

## Order Routes — `/api/orders`

| Method | Endpoint | Quyền | Mô tả |
|--------|----------|-------|-------|
| POST | `/api/orders` | Protected | Tạo đơn hàng mới |
| GET | `/api/orders/my-orders` | Protected | Đơn hàng của user hiện tại |
| GET | `/api/orders/:id` | Protected | Chi tiết 1 đơn hàng |
| PUT | `/api/orders/:id/cancel` | Protected | Hủy đơn hàng |
| GET | `/api/orders` | Admin | Tất cả đơn hàng |
| PUT | `/api/orders/:id/status` | Admin | Cập nhật trạng thái đơn |

### POST `/api/orders`

```js
// Request body — client chỉ gửi productId + variantSku + quantity
// totalPrice PHẢI tính lại ở backend
{
  "items": [
    { "productId": "abc", "sku": "VT001-M-TIM", "quantity": 2 },
    { "productId": "xyz", "sku": "VT002-FREE-DO", "quantity": 1 }
  ],
  "shippingAddress": {
    "fullName": "Nguyễn Văn A",
    "phone": "0901234567",
    "address": "123 Nguyễn Trãi",
    "city": "Hồ Chí Minh"
  },
  "paymentMethod": "COD",   // 'COD' | 'banking' | 'momo'
  "note": "Giao giờ hành chính"
}

// Response 201
{
  "success": true,
  "message": "Đặt hàng thành công",
  "data": { "order": { "_id", "status", "totalPrice", "items", ... } }
}
```

### GET `/api/orders/my-orders` — Query Params

| Param | Kiểu | Mô tả |
|-------|------|-------|
| `status` | String | Filter theo trạng thái |
| `page` | Number | Phân trang |
| `limit` | Number | Số đơn mỗi trang, mặc định 10 |

```js
// Response 200
{
  "success": true,
  "message": "Lấy danh sách đơn hàng thành công",
  "data": {
    "items": [{ "_id", "status", "totalPrice", "createdAt", ... }],
    "total": 12,
    "page": 1,
    "totalPages": 2,
    "limit": 10
  }
}
```

### PUT `/api/orders/:id/status` — Admin

```js
// Request body
{
  "status": "confirmed"  // 'confirmed' | 'shipping' | 'delivered' | 'cancelled'
}

// Response 200
{
  "success": true,
  "message": "Cập nhật trạng thái đơn hàng thành công",
  "data": { "order": { "_id", "status", "updatedAt" } }
}
```

---

## User Routes — `/api/users` (Admin)

| Method | Endpoint | Quyền | Mô tả |
|--------|----------|-------|-------|
| GET | `/api/users` | Admin | Danh sách tất cả user |
| GET | `/api/users/:id` | Admin | Chi tiết 1 user |
| PUT | `/api/users/:id/role` | Admin | Đổi role user |
| DELETE | `/api/users/:id` | Admin | Soft delete user |

---

## HTTP Status Codes — quy ước dùng trong project

| Code | Dùng khi |
|------|---------|
| 200 | GET, PUT thành công |
| 201 | POST tạo mới thành công |
| 400 | Request body sai / validation lỗi |
| 401 | Chưa đăng nhập (thiếu hoặc sai token) |
| 403 | Đã đăng nhập nhưng không đủ quyền |
| 404 | Không tìm thấy resource |
| 409 | Conflict (email đã tồn tại, đã review rồi...) |
| 500 | Lỗi server không mong muốn |

---

## Error Handling — Pattern bắt buộc trong Controller

```js
// controllers/productController.js
export const getProducts = async (req, res, next) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 12;
    const filter = { isDeleted: false, isActive: true };

    const total = await Product.countDocuments(filter);
    const items = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    sendPagination(res, items, {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    }, 'Lấy danh sách sản phẩm thành công');
  } catch (error) {
    next(error);
  }
};

// middleware/errorMiddleware.js
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  sendError(res, err.message || 'Lỗi server', statusCode);
};
```

---

## Axios Service — Pattern gọi API từ React

```js
// client/src/services/productService.js
import axios from '../utils/axiosInstance'; // Instance đã gắn baseURL và token

export const getProducts = (params) =>
  axios.get('/products', { params });

export const getProductById = (id) =>
  axios.get(`/products/${id}`);

export const createProduct = (data) =>
  axios.post('/products', data);

export const updateProduct = (id, data) =>
  axios.put(`/products/${id}`, data);

export const deleteProduct = (id) =>
  axios.delete(`/products/${id}`);

export const addReview = (id, data) =>
  axios.post(`/products/${id}/reviews`, data);
```

```js
// client/src/utils/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Tự động gắn token vào mọi request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Tự động xử lý lỗi 401 — redirect về login
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
```