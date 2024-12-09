-- CreateTable
CREATE TABLE "Admin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "login" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minPrice" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "roomCount" TEXT NOT NULL,
    "bedDescription" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "maxFloot" INTEGER NOT NULL,
    "balcony" BOOLEAN NOT NULL,
    "viewDescription" TEXT NOT NULL,
    "mounthlyRental" BOOLEAN NOT NULL DEFAULT false,
    "withAnimal" BOOLEAN NOT NULL DEFAULT false,
    "places" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Appliances" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "listingId" INTEGER NOT NULL,
    CONSTRAINT "Appliances_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "InternetAndTV" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "listingId" INTEGER NOT NULL,
    CONSTRAINT "InternetAndTV_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "listingId" INTEGER NOT NULL,
    CONSTRAINT "Amenity_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Coords" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "longitude" REAL NOT NULL,
    "width" REAL NOT NULL,
    "listingId" INTEGER NOT NULL,
    CONSTRAINT "Coords_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "urlMin" TEXT NOT NULL,
    "urlFull" TEXT NOT NULL,
    "rotation" INTEGER NOT NULL DEFAULT 0,
    "position" INTEGER NOT NULL,
    "listingId" INTEGER,
    CONSTRAINT "Photo_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Coords_listingId_key" ON "Coords"("listingId");
