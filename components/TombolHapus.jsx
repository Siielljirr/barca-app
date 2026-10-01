'use client';

import { useRouter } from 'next/navigation';
import { hapusPemain } from '@/app/admin/actions';

export default function TombolHapus({ no_urut }) {
  const router = useRouter();

  const handleHapus = async () => {
    if (!window.confirm('Yakin ingin menghapus pemain ini?')) return;
    try {
      const fd = new FormData();
      fd.append('no_urut', no_urut);
      await hapusPemain(fd);
      router.refresh();
    } catch (error) {
      alert('Gagal menghapus data.');
    }
  };

  return (
    <button
      onClick={handleHapus}
      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded transition duration-300"
    >
      Hapus
    </button>
  );
}