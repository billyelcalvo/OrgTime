-- CreateTable
CREATE TABLE "Timer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hours" INTEGER NOT NULL DEFAULT 0,
    "minutes" INTEGER NOT NULL DEFAULT 0,
    "seconds" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "initTime" TIME(0) NOT NULL,
    "finalTime" TIME(0) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "idCourse" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_idCourse_key" ON "Notification"("idCourse");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_idCourse_fkey" FOREIGN KEY ("idCourse") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
