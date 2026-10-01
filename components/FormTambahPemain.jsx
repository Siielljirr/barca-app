'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { tambahPemain } from '@/app/admin/actions';

export default function FormTambahPemain() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama_pemain: '',
    posisi: '',
    nomor_punggung: '',
    negara: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const fd = new FormData();
    fd.append('nama_pemain', formData.nama_pemain);
    fd.append('posisi', formData.posisi);
    fd.append('nomor_punggung', formData.nomor_punggung);
    fd.append('negara', formData.negara);

    try {
      await tambahPemain(fd);
      alert('Berhasil disimpan!');
      setFormData({ nama_pemain: '', posisi: '', nomor_punggung: '', negara: '' });
      router.refresh();
    } catch (error) {
      alert('Gagal menyimpan data: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Nama Pemain"
        value={formData.nama_pemain}
        onChange={(e) => setFormData({ ...formData, nama_pemain: e.target.value })}
        className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none"
        required
      />
      <input
        type="text"
        placeholder="Posisi"
        value={formData.posisi}
        onChange={(e) => setFormData({ ...formData, posisi: e.target.value })}
        className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none"
        required
      />
      <input
        type="number"
        placeholder="Nomor Punggung"
        value={formData.nomor_punggung}
        onChange={(e) => setFormData({ ...formData, nomor_punggung: e.target.value })}
        className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none"
        required
      />
      <input
        type="text"
        placeholder="Negara"
        value={formData.negara}
        onChange={(e) => setFormData({ ...formData, negara: e.target.value })}
        className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition duration-300 disabled:bg-gray-400"
      >
        {isLoading ? 'Menyimpan...' : 'Simpan Data Pemain'}
      </button>
    </form>
  );
}