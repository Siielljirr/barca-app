import { prisma } from "@/lib/prisma";
import { editPemain } from "@/app/admin/actions";

export default async function EditPemainPage({ params }) {
  const { no_urut } = await params;
  const id = Number(no_urut);

  const pemain = await prisma.pemain_barca.findUnique({
    where: { no_urut: id },
  });

  if (!pemain) return <div className="p-8 text-red-600">Data tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Pemain #{pemain.no_urut}</h2>

      <form action={editPemain} className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <input type="hidden" name="no_urut" value={pemain.no_urut} />

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Nama Pemain:</label>
          <input type="text" name="nama_pemain" defaultValue={pemain.nama_pemain}
            className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none" required />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Posisi:</label>
          <input type="text" name="posisi" defaultValue={pemain.posisi}
            className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none" required />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Nomor Punggung:</label>
          <input type="number" name="nomor_punggung" defaultValue={pemain.nomor_punggung}
            className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none" required />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Negara:</label>
          <input type="text" name="negara" defaultValue={pemain.negara}
            className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none" required />
        </div>

        <button type="submit"
          className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}