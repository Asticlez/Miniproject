-- CreateTable
CREATE TABLE "Accommodation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "checkInDate" DATETIME NOT NULL,
    "checkOutDate" DATETIME,
    "informDate" DATETIME NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "passportNo" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "phoneNo" TEXT,
    "nights" INTEGER NOT NULL
);
