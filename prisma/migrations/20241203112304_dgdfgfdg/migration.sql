/*
  Warnings:

  - You are about to drop the column `maxFloot` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `mounthlyRental` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `withAnimal` on the `Listing` table. All the data in the column will be lost.
  - You are about to alter the column `area` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `roomCount` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `maxFloor` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
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
    "roomCount" INTEGER NOT NULL,
    "bedDescription" TEXT NOT NULL,
    "area" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "maxFloor" INTEGER NOT NULL,
    "balcony" BOOLEAN NOT NULL,
    "viewDescription" TEXT NOT NULL,
    "monthlyRental" BOOLEAN NOT NULL DEFAULT false,
    "withAnimals" BOOLEAN NOT NULL DEFAULT false,
    "places" INTEGER NOT NULL
);
INSERT INTO "new_Listing" ("address", "area", "balcony", "bedDescription", "description", "floor", "id", "latitude", "longitude", "minPrice", "places", "roomCount", "title", "viewDescription") SELECT "address", "area", "balcony", "bedDescription", "description", "floor", "id", "latitude", "longitude", "minPrice", "places", "roomCount", "title", "viewDescription" FROM "Listing";
DROP TABLE "Listing";
ALTER TABLE "new_Listing" RENAME TO "Listing";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
