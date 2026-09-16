-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'NOUVELLE',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "preferredDate" DATETIME NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "groupSize" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT
);
