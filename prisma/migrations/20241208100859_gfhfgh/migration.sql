-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Listing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minPrice" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" TEXT NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "roomCount" INTEGER NOT NULL,
    "bedDescription" TEXT NOT NULL,
    "area" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "maxFloor" INTEGER NOT NULL,
    "balcony" TEXT NOT NULL,
    "viewDescription" TEXT NOT NULL,
    "monthlyRental" BOOLEAN NOT NULL DEFAULT false,
    "withAnimals" BOOLEAN NOT NULL DEFAULT false,
    "places" INTEGER NOT NULL
);
INSERT INTO "new_Listing" ("address", "area", "balcony", "bedDescription", "description", "floor", "id", "latitude", "longitude", "maxFloor", "minPrice", "monthlyRental", "places", "roomCount", "title", "viewDescription", "withAnimals") SELECT "address", "area", "balcony", "bedDescription", "description", "floor", "id", "latitude", "longitude", "maxFloor", "minPrice", "monthlyRental", "places", "roomCount", "title", "viewDescription", "withAnimals" FROM "Listing";
DROP TABLE "Listing";
ALTER TABLE "new_Listing" RENAME TO "Listing";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
