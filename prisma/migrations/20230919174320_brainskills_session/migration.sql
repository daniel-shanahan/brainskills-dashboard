-- CreateTable
CREATE TABLE "BrainskillsSession" (
    "studentId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "rounds" INTEGER NOT NULL,
    "totalSeconds" INTEGER NOT NULL,
    "completedSeconds" INTEGER NOT NULL,

    CONSTRAINT "BrainskillsSession_pkey" PRIMARY KEY ("studentId","startTime")
);

-- AddForeignKey
ALTER TABLE "BrainskillsSession" ADD CONSTRAINT "BrainskillsSession_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
