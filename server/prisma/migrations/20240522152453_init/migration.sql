-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "petType" TEXT NOT NULL,
    "questionType" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answerOptions" TEXT NOT NULL,
    "creationTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdateTimestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hasDocuments" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "creationTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdateTimestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "document" BYTEA NOT NULL,
    "creationTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdateTimestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);
