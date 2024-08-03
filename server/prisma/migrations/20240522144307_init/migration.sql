-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "petName" TEXT NOT NULL,
    "petPhoto" TEXT NOT NULL,
    "petType" TEXT NOT NULL,
    "petBreed" TEXT NOT NULL,
    "petAge" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "tags" TEXT NOT NULL,
    "creationTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdateTimestamp" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
