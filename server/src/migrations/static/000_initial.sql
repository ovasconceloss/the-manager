-- CreateTable
CREATE TABLE "nation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "continent" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL,
    "youth_rating" INTEGER NOT NULL,
    "national_team" INTEGER NOT NULL,
    "image_federation" TEXT,
    "image_flag" TEXT
);

-- CreateTable
CREATE TABLE "stadium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "construction_year" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "club" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "founded_year" INTEGER,
    "reputation" INTEGER NOT NULL,
    "balance" INTEGER,
    "budget" INTEGER,
    "salaries" INTEGER,
    "is_nation" INTEGER,
    "image_logo" TEXT,
    "nation_id" INTEGER NOT NULL,
    "stadium_id" INTEGER NOT NULL,
    CONSTRAINT "Club_nation_id_fkey" FOREIGN KEY ("nation_id") REFERENCES "Nation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Club_stadium_id_fkey" FOREIGN KEY ("stadium_id") REFERENCES "Stadium" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);