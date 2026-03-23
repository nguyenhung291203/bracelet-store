# Business Rules — Bracelet Shop

Các quy tắc nghiệp vụ đặc thù của shop vòng tay. Copilot ưu tiên áp dụng
các rule này khi viết controller, service, hoặc logic React.

---

## 1. Sản phẩm & Variant

### Hiển thị sản phẩm ra shop

Sản phẩm chỉ được hiển thị khi **đồng thời** thỏa mãn:

```js
// ✅ Điều kiện hiển thị — bắt buộc có cả 3
{
  isDeleted: false,
  isActive: true,
  'variants.stock': { $gt: 0 }, // ít nhất 1 variant còn hàng
}
```

### Giá sản phẩm

- Giá (`price`) nằm ở **từng variant**, không phải Product
- Khi hiển thị ngoài danh sách, lấy giá thấp nhất trong các variant còn hàng:

```js
// Lấy giá thấp nhất từ variants còn hàng
const minPrice = product.variants
  .filter(v => v.stock > 0)
  .reduce((min, v) => Math.min(min, v.price), Infinity);
```

- Nếu tất cả variants hết hàng → hiển thị badge **"Hết hàng"**, ẩn nút mua

### Chọn variant khi mua

- User phải chọn đúng 1 variant (size + color) trước khi thêm vào giỏ
- Variant có `stock = 0` → hiển thị disabled, không cho chọn
- Sau khi chọn variant, số lượng tối đa user có thể mua = `variant.stock`

### SKU format

```
{MÃ_SP}-{SIZE}-{MÀU_VIẾT_TẮT}

Ví dụ:
  VT001-S-TIM     → Sản phẩm VT001, size S, màu tím
  VT001-FREE-BAC  → Sản phẩm VT001, freesize, màu bạc
  VT002-M-DO      → Sản phẩm VT002, size M, màu đỏ
```

- SKU phải **unique** trong toàn bộ collection products
- SKU viết **HOA**, không dấu, dùng dấu `-` để phân cách

---

## 2. Giỏ hàng (Cart)

> Giỏ hàng lưu ở **client** (localStorage / React Context), không lưu database.

### Thêm vào giỏ

```js
// Mỗi item trong giỏ hàng được định danh bằng SKU (không phải productId)
// Vì cùng 1 product nhưng khác size/color là 2 item khác nhau

const cartItem = {
  productId: product._id,
  sku:       variant.sku,        // key định danh duy nhất
  name:      product.name,
  image:     product.images[0],  // ảnh thumbnail
  price:     variant.price,
  size:      variant.size,
  color:     variant.color,
  quantity:  1,
  maxStock:  variant.stock,      // giới hạn số lượng tối đa
};
```

### Quy tắc giỏ hàng

- Nếu thêm cùng SKU đã có trong giỏ → **cộng dồn** quantity, không thêm item mới
- `quantity` không được vượt quá `maxStock` của variant đó
- Khi tăng quantity trong giỏ, kiểm tra lại `maxStock` trước khi cập nhật:

```js
// ✅ ĐÚNG
const newQty = Math.min(item.quantity + 1, item.maxStock);

// ❌ SAI — không kiểm tra maxStock
item.quantity += 1;
```

- Xóa item khỏi giỏ khi `quantity = 0`
- Giỏ hàng **không** validate stock realtime — chỉ validate khi đặt hàng

---

## 3. Đặt hàng & Tính tiền

### Tổng tiền — BẮT BUỘC tính ở backend

```js
// server/controllers/orderController.js
// KHÔNG tin totalPrice từ client gửi lên — tính lại hoàn toàn ở backend

const calculateTotal = async (items) => {
  let total = 0;

  for (const item of items) {
    const product = await Product.findOne({
      _id: item.productId,
      isDeleted: false,
      isActive: true,
    });

    if (!product) throw new Error(`Sản phẩm không tồn tại`);

    const variant = product.variants.find(v => v.sku === item.sku);

    if (!variant) throw new Error(`Phiên bản sản phẩm không tồn tại`);
    if (variant.stock < item.quantity) {
      throw new Error(`${product.name} (${variant.size} - ${variant.color}) không đủ hàng`);
    }

    total += variant.price * item.quantity;
  }

  return total;
};
```

### Phí ship

```js
// Quy tắc tính phí ship
const SHIP_FEE = {
  FREE_THRESHOLD: 500_000,  // Miễn phí ship khi đơn >= 500.000đ
  DEFAULT:        30_000,   // Phí ship mặc định: 30.000đ
};

const calcShippingFee = (subtotal) =>
  subtotal >= SHIP_FEE.FREE_THRESHOLD ? 0 : SHIP_FEE.DEFAULT;

// totalPrice = subtotal + shippingFee
const subtotal    = await calculateTotal(items);
const shippingFee = calcShippingFee(subtotal);
const totalPrice  = subtotal + shippingFee;
```

### Snapshot khi đặt hàng

Khi tạo order, **bắt buộc** copy thông tin sản phẩm vào `items` tại thời điểm đặt:

```js
// Lý do: giá/tên/ảnh có thể thay đổi sau khi đặt hàng
// → items phải là "ảnh chụp" tại thời điểm mua

const orderItem = {
  product:  product._id,       // ref để tra cứu nếu cần
  name:     product.name,      // snapshot
  image:    product.images[0], // snapshot
  price:    variant.price,     // snapshot giá của variant
  size:     variant.size,      // snapshot
  color:    variant.color,     // snapshot
  sku:      variant.sku,       // snapshot
  quantity: item.quantity,
};
```

---

## 4. Trạng thái đơn hàng

### Flow trạng thái — chỉ đi 1 chiều

```
pending → confirmed → shipping → delivered
   └──────────────────────────→ cancelled
                  ↑
         (chỉ từ pending hoặc confirmed)
```

### Quy tắc chuyển trạng thái

```js
// Bảng trạng thái hợp lệ — dùng để validate trước khi update
const VALID_TRANSITIONS = {
  pending:   ['confirmed', 'cancelled'],
  confirmed: ['shipping', 'cancelled'],
  shipping:  ['delivered'],
  delivered: [],   // trạng thái cuối — không chuyển được nữa
  cancelled: [],   // trạng thái cuối — không chuyển được nữa
};

// Validate trước khi cập nhật
const canTransition = (currentStatus, newStatus) =>
  VALID_TRANSITIONS[currentStatus]?.includes(newStatus) ?? false;

// Trong controller
if (!canTransition(order.status, newStatus)) {
  return sendError(res, `Không thể chuyển từ "${order.status}" sang "${newStatus}"`, 400);
}
```

### Hành động kèm theo khi đổi trạng thái

| Chuyển sang | Hành động bắt buộc |
|-------------|-------------------|
| `confirmed` | Không có |
| `shipping` | Không có |
| `delivered` | Cộng `sold` + trừ `stock` từng variant |
| `cancelled` | Hoàn `stock` nếu đơn đã `confirmed` trở lên |

```js
// Khi delivered — cộng sold + trừ stock
if (newStatus === 'delivered') {
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
}

// Khi cancelled từ confirmed/shipping — hoàn lại stock
if (newStatus === 'cancelled' && ['confirmed', 'shipping'].includes(order.status)) {
  for (const item of order.items) {
    await Product.updateOne(
      { _id: item.product, 'variants.sku': item.sku },
      { $inc: { 'variants.$.stock': item.quantity } }
    );
  }
}
```

### Ai được hủy đơn?

- **User** chỉ được hủy khi đơn đang ở `pending`
- **Admin** được hủy khi đơn đang ở `pending` hoặc `confirmed`
- Đơn đang `shipping` hoặc đã `delivered` → **không ai được hủy**

```js
// Middleware kiểm tra quyền hủy đơn
const canCancelOrder = (order, user) => {
  if (order.status === 'pending') return true;                        // ai cũng được
  if (order.status === 'confirmed' && user.role === 'admin') return true; // chỉ admin
  return false;
};
```

---

## 5. Đánh giá sản phẩm (Review)

### Điều kiện được đánh giá

- User phải **đăng nhập**
- User phải có **đơn hàng đã delivered** chứa sản phẩm đó
- Mỗi user chỉ được đánh giá **1 lần** cho mỗi sản phẩm

```js
// Validate trước khi thêm review
const hasDeliveredOrder = await Order.exists({
  user: userId,
  status: 'delivered',
  'items.product': productId,
  isDeleted: false,
});

if (!hasDeliveredOrder) {
  return sendError(res, 'Bạn cần mua và nhận sản phẩm này trước khi đánh giá', 403);
}

const alreadyReviewed = product.reviews.some(
  r => r.user.toString() === userId.toString()
);

if (alreadyReviewed) {
  return sendError(res, 'Bạn đã đánh giá sản phẩm này rồi', 409);
}
```

### Tính lại rating sau khi thêm review

```js
// Luôn tính lại sau khi push review mới
product.reviews.push(newReview);
const total = product.reviews.reduce((sum, r) => sum + r.rating, 0);
product.rating = Math.round((total / product.reviews.length) * 10) / 10;
await product.save();
```

---

## 6. Phân quyền

### Quy tắc truy cập

| Hành động | User | Admin |
|-----------|------|-------|
| Xem sản phẩm, category | ✅ | ✅ |
| Đặt hàng, xem đơn của mình | ✅ | ✅ |
| Đánh giá sản phẩm | ✅ (đã mua) | ✅ |
| Hủy đơn của mình (pending) | ✅ | ✅ |
| Tạo / sửa / xóa sản phẩm | ❌ | ✅ |
| Xem tất cả đơn hàng | ❌ | ✅ |
| Cập nhật trạng thái đơn | ❌ | ✅ |
| Quản lý user | ❌ | ✅ |

### Middleware chain

```js
// Public — không cần token
router.get('/products', getProducts);

// Protected — cần đăng nhập
router.post('/orders', protect, createOrder);

// Admin — cần đăng nhập + role admin
router.delete('/products/:id', protect, admin, deleteProduct);
```

---

## 7. Tìm kiếm & Lọc sản phẩm

```js
// Xây dựng filter object từ query params
const buildProductFilter = (query) => {
  const filter = { isDeleted: false, isActive: true };

  // Tìm theo tên — không phân biệt hoa thường
  if (query.search) {
    filter.name = { $regex: query.search, $options: 'i' };
  }

  // Lọc theo category
  if (query.category) {
    filter.category = query.category;
  }

  // Lọc theo chất liệu
  if (query.material) {
    filter.material = { $regex: query.material, $options: 'i' };
  }

  // Lọc theo giá — dựa trên variants
  if (query.minPrice || query.maxPrice) {
    filter['variants.price'] = {};
    if (query.minPrice) filter['variants.price'].$gte = Number(query.minPrice);
    if (query.maxPrice) filter['variants.price'].$lte = Number(query.maxPrice);
  }

  return filter;
};

// Bảng sort options
const SORT_MAP = {
  newest:      { createdAt: -1 },
  price_asc:   { 'variants.0.price': 1 },
  price_desc:  { 'variants.0.price': -1 },
  best_seller: { sold: -1 },
  top_rated:   { rating: -1 },
};

const sort = SORT_MAP[query.sort] || SORT_MAP.newest;
```

---

## 8. Hằng số nghiệp vụ — tập trung 1 chỗ

Tất cả hằng số nghiệp vụ đặt tại `server/config/constants.js`, không hardcode rải rác:

```js
// server/config/constants.js
export const ORDER_STATUS = {
  PENDING:   'pending',
  CONFIRMED: 'confirmed',
  SHIPPING:  'shipping',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

export const PAYMENT_METHOD = {
  COD:     'COD',
  BANKING: 'banking',
  MOMO:    'momo',
};

export const SHIPPING = {
  FREE_THRESHOLD: 500_000,  // VND
  DEFAULT_FEE:    30_000,   // VND
};

export const PAGINATION = {
  DEFAULT_PAGE:  1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT:     50,
};

export const ROLES = {
  USER:  'user',
  ADMIN: 'admin',
};
```