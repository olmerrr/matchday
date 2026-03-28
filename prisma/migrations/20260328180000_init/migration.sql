CREATE TABLE "favorite_competitions" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(32) NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorite_competitions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "favorite_competitions_code_key" ON "favorite_competitions"("code");
