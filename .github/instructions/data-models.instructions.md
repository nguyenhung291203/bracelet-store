# Data Models — Bracelet Shop

Dự án gồm 4 model chính: **User**, **Category**, **Product**, **Order**.
Tất cả dùng **Mongoose** với **MongoDB**. Mọi Schema đều có `timestamps: true`
và kế thừa **Base Fields** định nghĩa bên dưới.

---

## Base Fields (áp dụng cho toàn bộ Model)

Mọi Schema đều có các fields sau. Khai báo trực tiếp trong từng Schema,
**không** dùng kế thừa hay plugin trừ khi được chỉ định.

```js
// Base fields — thêm vào MỌI Schema
{
  createdAt:  { type: Date, default: Date.now },
  createdBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
  updatedAt:  { type: Date, default: null },
  updatedBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
  isDeleted:  { type: Boolean, default: false },
  deletedAt:  { type: Date, default: null },
  deletedBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
}
```

### Quy tắc Soft Delete — BẮT BUỘC

- **KHÔNG BAO GIỜ** dùng `.deleteOne()`, `.findByIdAndDelete()`, `.deleteMany()`
- Thay vào đó luôn dùng soft delete:

```js
// ✅ ĐÚNG — soft delete
await Product.findByIdAndUpdate(id, {
  isDeleted: true,
  deletedAt: new Date(),
  deletedBy: req.user._id,
});

// ❌ SAI — hard delete
await Product.findByIdAndDelete(id);
```

- Mọi query `find` đều **bắt buộc** thêm `{ isDeleted: false }`:

```js
// ✅ ĐÚNG
Product.find({ isDeleted: false, isActive: true })

// ❌ SAI — thiếu isDeleted filter
Product.find({ isActive: true })
```

- Khi update, luôn cập nhật `updatedAt` và `updatedBy`:

```js
await Product.findByIdAndUpdate(id, {
  ...updateData,
  updatedAt: new Date(),
  updatedBy: req.user._id,
});
```

---

## Model 1 — User

```js
const userSchema = new Schema({
  // --- thông tin cơ bản ---
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },   // bcrypt hash — KHÔNG trả về client
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar:   { type: String, default: null },     // URL ảnh đại diện

  // --- thông tin liên hệ ---
  phone:    { type: String, default: null },
  address:  { type: String, default: null },

  // --- base fields ---
  createdAt:  { type: Date, default: Date.now },
  createdBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
  updatedAt:  { type: Date, default: null },
  updatedBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
  isDeleted:  { type: Boolean, default: false },
  deletedAt:  { type: Date, default: null },
  deletedBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
});
```

### Quy tắc User

- `password` **bắt buộc** hash bằng `bcrypt` trong pre-save hook trước khi lưu
- **KHÔNG BAO GIỜ** trả field `password` về client — luôn dùng `.select('-password')`
- `role` dùng để phân quyền trong `adminMiddleware`
- Khi đăng ký, `createdBy` = chính `_id` của user vừa tạo (tự tham chiếu)

```js
// Pre-save hook — bắt buộc có trong User model
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Luôn dùng select('-password') khi query User
const user = await User.findById(id).select('-password');
```

---

## Model 2 — Category

```js
const categorySchema = new Schema({
  name:  { type: String, required: true, trim: true }, // VD: 'Vòng đá tự nhiên'
  slug:  { type: String, required: true, unique: true }, // VD: 'vong-da-tu-nhien'
  image: { type: String, default: null },               // URL ảnh đại diện category

  // --- base fields ---
  createdAt:  { type: Date, default: Date.now },
  createdBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
  updatedAt:  { type: Date, default: null },
  updatedBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
  isDeleted:  { type: Boolean, default: false },
  deletedAt:  { type: Date, default: null },
  deletedBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
});
```

### Quy tắc Category

- `slug` tự động sinh từ `name` khi tạo mới (dùng thư viện `slugify`)
- Khi xóa category, **không được xóa** — kiểm tra xem còn product nào ref đến không

```js
// Tự động tạo slug trước khi save
categorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, locale: 'vi' });
  }
  next();
});
```

---

## Model 3 — Product

```js
const productSchema = new Schema({
  // --- thông tin cơ bản ---
  name:        { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  images:      [{ type: String }],   // images[0] là ảnh thumbnail chính
  category:    { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  material:    { type: String, default: '' }, // VD: 'bạc 925', 'đá thạch anh tím'
  isActive:    { type: Boolean, default: true }, // false = ẩn khỏi shop

  // --- variants (nhúng trực tiếp) ---
  variants: [
    {
      size:  { type: String, default: 'freesize' }, // 'S' | 'M' | 'L' | 'freesize'
      color: { type: String, default: '' },          // VD: 'đỏ', 'xanh navy', 'vàng gold'
      price: { type: Number, required: true },        // Đơn vị: VND
      stock: { type: Number, default: 0 },            // Số lượng tồn kho của variant này
      sku:   { type: String, default: '' },           // VD: 'VT001-M-DO'
    }
  ],

  // --- thống kê ---
  sold:   { type: Number, default: 0 },  // Tổng số đã bán, cộng dồn khi đơn delivered
  rating: { type: Number, default: 0 },  // Tự tính từ reviews — KHÔNG nhập tay

  // --- đánh giá ---
  reviews: [
    {
      user:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
      rating:    { type: Number, required: true, min: 1, max: 5 },
      comment:   { type: String, default: '' },
      createdAt: { type: Date, default: Date.now },
    }
  ],

  // --- base fields ---
  createdAt:  { type: Date, default: Date.now },
  createdBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
  updatedAt:  { type: Date, default: null },
  updatedBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
  isDeleted:  { type: Boolean, default: false },
  deletedAt:  { type: Date, default: null },
  deletedBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
});
```

### Quy tắc Product

- `images[0]` luôn là ảnh thumbnail hiển thị ngoài danh sách sản phẩm
- `variants` phải có **ít nhất 1** phần tử khi tạo product
- Giá (`price`) và tồn kho (`stock`) quản lý ở **từng variant**, không phải Product
- `rating` được **tính lại tự động** mỗi khi thêm review mới — không cho phép nhập tay
- `sold` chỉ tăng khi đơn hàng chuyển sang trạng thái `delivered`
- Chỉ hiển thị ra shop khi `isActive: true` VÀ có ít nhất 1 variant có `stock > 0`
- SKU format: `{mã SP}-{size}-{màu viết tắt}`, VD: `VT001-M-DO`

```js
// Tự động tính lại rating sau khi thêm review
productSchema.methods.recalculateRating = function () {
  if (this.reviews.length === 0) {
    this.rating = 0;
    return;
  }
  const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);
  this.rating = Math.round((total / this.reviews.length) * 10) / 10;
};

// Tổng stock của product = tổng stock của tất cả variants
productSchema.virtual('totalStock').get(function () {
  return this.variants.reduce((sum, v) => sum + v.stock, 0);
});
```

---

## Model 4 — Order

```js
const orderSchema = new Schema({
  // --- người đặt ---
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  // --- danh sách sản phẩm (snapshot tại thời điểm đặt hàng) ---
  items: [
    {
      product:  { type: Schema.Types.ObjectId, ref: 'Product' },
      name:     { type: String, required: true },  // snapshot tên
      image:    { type: String, required: true },  // snapshot ảnh (images[0])
      price:    { type: Number, required: true },  // snapshot giá của variant
      size:     { type: String, default: 'freesize' }, // snapshot size
      color:    { type: String, default: '' },     // snapshot màu
      sku:      { type: String, default: '' },     // snapshot sku
      quantity: { type: Number, required: true, min: 1 },
    }
  ],

  // --- địa chỉ giao hàng ---
  shippingAddress: {
    fullName: { type: String, required: true },
    phone:    { type: String, required: true },
    address:  { type: String, required: true },
    city:     { type: String, required: true },
  },

  // --- thanh toán ---
  paymentMethod: {
    type: String,
    enum: ['COD', 'banking', 'momo'],
    required: true,
  },
  totalPrice: { type: Number, required: true }, // Tính ở backend — KHÔNG tin client
  isPaid:     { type: Boolean, default: false },
  paidAt:     { type: Date, default: null },

  // --- trạng thái ---
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'],
    default: 'pending',
  },

  // --- ghi chú ---
  note: { type: String, default: '' }, // Ghi chú của khách khi đặt hàng

  // --- base fields ---
  createdAt:  { type: Date, default: Date.now },
  createdBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
  updatedAt:  { type: Date, default: null },
  updatedBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
  isDeleted:  { type: Boolean, default: false },
  deletedAt:  { type: Date, default: null },
  deletedBy:  { type: Schema.Types.ObjectId, ref: 'User', default: null },
});
```

### Quy tắc Order

- `items` lưu **snapshot** (tên, ảnh, giá, size, màu, sku) — KHÔNG dùng populate để lấy
  giá, tránh sai giá khi product thay đổi sau khi đặt hàng
- `totalPrice` **bắt buộc** tính ở backend, KHÔNG tin giá từ client gửi lên
- Trạng thái chỉ được chuyển **một chiều** theo flow:
  ```
  pending → confirmed → shipping → delivered
                                 → cancelled (chỉ từ pending hoặc confirmed)
  ```
- Khi `status` chuyển sang `delivered`:
  - Cộng `quantity` vào `product.sold` cho từng item
  - Trừ `stock` tương ứng trong `product.variants`
- `cancelled` chỉ cho phép khi đơn đang ở `pending` hoặc `confirmed`

---

## Quan hệ giữa các Model

```
User ──────────< Order          1 user có nhiều order
Order >──────── Product         items lưu snapshot, không populate giá
Product >─────── Category       nhiều product thuộc 1 category
User ──────────< Review         review nằm trong Product.reviews[]
```

---

## Các Query phổ biến — Copilot ưu tiên gợi ý pattern này

```js
// ─── PRODUCT ───────────────────────────────────────────────

// Lấy danh sách product đang active, còn hàng, chưa bị xóa
Product.find({
  isDeleted: false,
  isActive: true,
  'variants.stock': { $gt: 0 },
}).populate('category', 'name slug');

// Lấy product theo category + phân trang
Product.find({ isDeleted: false, isActive: true, category: categoryId })
  .sort({ createdAt: -1 })
  .skip((page - 1) * limit)
  .limit(limit)
  .populate('category', 'name slug');

// Chi tiết 1 product
Product.findOne({ _id: id, isDeleted: false }).populate('category', 'name slug');

// Tính lại rating sau khi thêm review
const total = product.reviews.reduce((sum, r) => sum + r.rating, 0);
product.rating = Math.round((total / product.reviews.length) * 10) / 10;
await product.save();

// Soft delete product
await Product.findByIdAndUpdate(id, {
  isDeleted: true,
  deletedAt: new Date(),
  deletedBy: req.user._id,
});

// ─── ORDER ─────────────────────────────────────────────────

// Lấy đơn hàng của 1 user, mới nhất lên trước
Order.find({ user: userId, isDeleted: false }).sort({ createdAt: -1 });

// Tất cả đơn hàng cho admin + filter theo status
Order.find({ isDeleted: false, ...(status && { status }) })
  .populate('user', 'name email phone')
  .sort({ createdAt: -1 });

// Cập nhật trạng thái đơn hàng
await Order.findByIdAndUpdate(id, {
  status: newStatus,
  updatedAt: new Date(),
  updatedBy: req.user._id,
});

// Khi đơn delivered: cộng sold + trừ stock
for (const item of order.items) {
  await Product.updateOne(
    { _id: item.product, 'variants.sku': item.sku },
    {
      $inc: {
        sold: item.quantity,
        'variants.$.stock': -item.quantity,
      },
    }
  );
}

// ─── USER ──────────────────────────────────────────────────

// Luôn loại bỏ password khi query
User.findById(id).select('-password');
User.find({ isDeleted: false }).select('-password');
```

---

## Tóm tắt nhanh

| Model    | Collection    | Quan trọng nhất |
|----------|---------------|-----------------|
| User     | users         | Không trả `password`, hash bcrypt |
| Category | categories    | Slug tự động, không xóa nếu còn product |
| Product  | products      | Variant nhúng, rating tự tính, soft delete |
| Order    | orders        | Snapshot items, totalPrice tính backend |