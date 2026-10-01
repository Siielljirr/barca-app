import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import FormTambahPemain from '@/components/FormTambahPemain';
import TombolHapus from '@/components/TombolHapus';
import LogoutButton from '@/components/LogoutButton';

export default async function AdminPage() {
  // Cek login
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get('isLoggedIn')?.value;

  if (!isLoggedIn) {
    redirect('/login');
  }

  const daftarPemain = await prisma.pemain_barca.findMany({
    orderBy: { no_urut: 'asc' },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-black text-blue-900 tracking-tight">
            ⚽ STARTING XI
          </h1>
          <p className="text-red-700 font-bold italic text-sm mt-1">
            "Més que un club"
          </p>
        </div>
        <LogoutButton />
      </div>

      <FormTambahPemain />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">No</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Posisi</th>
              <th className="p-3">No. Punggung</th>
              <th className="p-3">Negara</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarPemain.map((pemain) => (
              <tr key={pemain.no_urut} className="border-b hover:bg-gray-50">
                <td className="p-3">{pemain.no_urut}</td>
                <td className="p-3 font-semibold">{pemain.nama_pemain}</td>
                <td className="p-3">{pemain.posisi}</td>
                <td className="p-3">{pemain.nomor_punggung}</td>
                <td className="p-3">{pemain.negara}</td>
                <td className="p-3 flex gap-2">
                  <Link href={`/admin/edit/${pemain.no_urut}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition">
                      Edit
                    </button>
                  </Link>
                  <TombolHapus no_urut={pemain.no_urut} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}