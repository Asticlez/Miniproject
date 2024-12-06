-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Accommodation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "checkInDate" DATETIME NOT NULL,
    "checkOutDate" DATETIME,
    "informDate" DATETIME NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "middleName" TEXT,
    "passportNo" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "phoneNo" TEXT,
    "nights" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Accommodation" ("birthDate", "checkInDate", "checkOutDate", "firstName", "gender", "id", "informDate", "lastName", "middleName", "nationality", "nights", "passportNo", "phoneNo") SELECT "birthDate", "checkInDate", "checkOutDate", "firstName", "gender", "id", "informDate", "lastName", "middleName", "nationality", "nights", "passportNo", "phoneNo" FROM "Accommodation";
DROP TABLE "Accommodation";
ALTER TABLE "new_Accommodation" RENAME TO "Accommodation";
CREATE UNIQUE INDEX "Accommodation_passportNo_key" ON "Accommodation"("passportNo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
