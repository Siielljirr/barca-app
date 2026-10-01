'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ============ CREATE ============
export async function tambahPemain(formData) {
  const nama_pemain = formData.get("nama_pemain");
  const posisi = formData.get("posisi");
  const nomor_punggung = Number(formData.get("nomor_punggung"));
  const negara = formData.get("negara");

  await prisma.pemain_barca.create({
    data: { nama_pemain, posisi, nomor_punggung, negara },
  });

  revalidatePath("/admin");
}

// ============ UPDATE ============
export async function editPemain(formData) {
  const no_urut = Number(formData.get("no_urut"));
  const nama_pemain = formData.get("nama_pemain");
  const posisi = formData.get("posisi");
  const nomor_punggung = Number(formData.get("nomor_punggung"));
  const negara = formData.get("negara");

  await prisma.pemain_barca.update({
    where: { no_urut },
    data: { nama_pemain, posisi, nomor_punggung, negara },
  });

  revalidatePath("/admin");
  redirect("/admin");
}

// ============ DELETE ============
export async function hapusPemain(formData) {
  const no_urut = Number(formData.get("no_urut"));

  await prisma.pemain_barca.delete({
    where: { no_urut },
  });

  revalidatePath("/admin");
}