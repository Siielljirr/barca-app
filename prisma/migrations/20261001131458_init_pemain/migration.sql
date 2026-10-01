-- CreateTable
CREATE TABLE "pemain_barca" (
    "no_urut" SERIAL NOT NULL,
    "nama_pemain" TEXT NOT NULL,
    "posisi" TEXT NOT NULL,
    "nomor_punggung" INTEGER NOT NULL,
    "negara" TEXT NOT NULL,

    CONSTRAINT "pemain_barca_pkey" PRIMARY KEY ("no_urut")
);
