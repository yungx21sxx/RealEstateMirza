/*
  Warnings:

  - You are about to drop the `Coords` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `latitude` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Coords_listingId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Coords";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PricePeriod" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "listingId" INTEGER,
    CONSTRAINT "PricePeriod_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Listing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minPrice" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
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
INSERT INTO "new_Listing" ("address", "area", "balcony", "bedDescription", "description", "floor", "id", "maxFloot", "minPrice", "mounthlyRental", "places", "roomCount", "title", "viewDescription", "withAnimal") SELECT "address", "area", "balcony", "bedDescription", "description", "floor", "id", "maxFloot", "minPrice", "mounthlyRental", "places", "roomCount", "title", "viewDescription", "withAnimal" FROM "Listing";
DROP TABLE "Listing";
ALTER TABLE "new_Listing" RENAME TO "Listing";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
