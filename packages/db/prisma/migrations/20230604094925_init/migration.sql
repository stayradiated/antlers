-- CreateTable
CREATE TABLE "page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT,
    "content" TEXT NOT NULL,
    "imageCount" INTEGER NOT NULL,
    "wordCount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "region" TEXT,
    "country" TEXT NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "countryMapFile" TEXT,
    CONSTRAINT "location_countryMapFile_fkey" FOREIGN KEY ("countryMapFile") REFERENCES "map" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "page_location_ref" (
    "pageId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    PRIMARY KEY ("pageId", "locationId"),
    CONSTRAINT "page_location_ref_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "page_location_ref_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sojourn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "arriveAt" TEXT NOT NULL,
    "departAt" TEXT,
    "image" TEXT,
    "locationFile" TEXT,
    CONSTRAINT "sojourn_locationFile_fkey" FOREIGN KEY ("locationFile") REFERENCES "location" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "page_sojourn_ref" (
    "pageId" TEXT NOT NULL,
    "sojournId" TEXT NOT NULL,

    PRIMARY KEY ("pageId", "sojournId"),
    CONSTRAINT "page_sojourn_ref_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "page_sojourn_ref_sojournId_fkey" FOREIGN KEY ("sojournId") REFERENCES "sojourn" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "map" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "source" TEXT,
    "coordinatesNorth" REAL NOT NULL,
    "coordinatesEast" REAL NOT NULL,
    "coordinatesSouth" REAL NOT NULL,
    "coordinatesWest" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "page_map_ref" (
    "pageId" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,

    PRIMARY KEY ("pageId", "mapId"),
    CONSTRAINT "page_map_ref_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "page_map_ref_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "map" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "story" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "page_story_ref" (
    "pageId" TEXT NOT NULL,
    "storyId" TEXT NOT NULL,

    PRIMARY KEY ("pageId", "storyId"),
    CONSTRAINT "page_story_ref_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "page_story_ref_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "story" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "travel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "page_travel_ref" (
    "pageId" TEXT NOT NULL,
    "travelId" TEXT NOT NULL,

    PRIMARY KEY ("pageId", "travelId"),
    CONSTRAINT "page_travel_ref_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "page_travel_ref_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "travel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "space" TEXT NOT NULL,
    "hasAlpha" BOOLEAN NOT NULL,
    "hasProfile" BOOLEAN NOT NULL,
    "channels" INTEGER NOT NULL,
    "orientation" INTEGER NOT NULL,
    "exif" TEXT
);

-- CreateTable
CREATE TABLE "page_image_ref" (
    "pageId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    PRIMARY KEY ("pageId", "imageId"),
    CONSTRAINT "page_image_ref_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "page_image_ref_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
