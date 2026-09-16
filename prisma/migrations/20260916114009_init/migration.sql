-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('NOUVELLE', 'CONFIRMEE', 'ARCHIVEE');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "BookingStatus" NOT NULL DEFAULT 'NOUVELLE',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3) NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "groupSize" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT,
    "googleEventId" TEXT,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarConnection" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "email" TEXT,
    "refreshToken" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalendarConnection_pkey" PRIMARY KEY ("id")
);
