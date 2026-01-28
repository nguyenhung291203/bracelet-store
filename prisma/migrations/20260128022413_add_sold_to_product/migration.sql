-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "ratingAvg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ratingCount" INTEGER NOT NULL DEFAULT 0,
    "sold" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "images" JSONB,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("productId","categoryId")
);

-- CreateTable
CREATE TABLE "sizes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variants" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "sizeId" INTEGER,
    "colorId" INTEGER,
    "price" INTEGER,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "sku" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_sku_key" ON "product_variants"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_productId_sizeId_colorId_key" ON "product_variants"("productId", "sizeId", "colorId");

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "sizes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
