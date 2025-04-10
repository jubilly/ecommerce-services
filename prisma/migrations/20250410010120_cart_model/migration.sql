-- CreateTable
CREATE TABLE "Cart" (
    "id" UUID NOT NULL,
    "storeId" VARCHAR(32) NOT NULL,
    "customerId" VARCHAR(32) NOT NULL,
    "total" DECIMAL NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartProducts" (
    "id" UUID NOT NULL,
    "productId" VARCHAR(32) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "cartId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CartProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartProducts" ADD CONSTRAINT "CartProducts_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
