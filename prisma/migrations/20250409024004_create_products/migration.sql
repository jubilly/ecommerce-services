-- CreateTable
CREATE TABLE "Products" (
    "id" UUID NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL NOT NULL,
    "promotionalPrice" DECIMAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_id_key" ON "Products"("id");
