'use client';

import { useRouter } from 'next/navigation';
import { logoutAction } from '@/app/login/actions';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    if (!window.confirm('Yakin mau logout?')) return;
    await logoutAction();
    router.push('/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded transition"
    >
      Logout
    </button>
  );
}