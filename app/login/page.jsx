'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from './actions';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const fd = new FormData();
    fd.append('username', username);
    fd.append('password', password);

    const result = await loginAction(fd);

    if (result.success) {
      router.push('/admin');
      router.refresh();
    } else {
      setError(result.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background gradient Barca */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-red-800"></div>

      {/* Efek lingkaran blur */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      {/* Card Login */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">

        {/* Logo + Kata-kata */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-900 to-red-800 flex items-center justify-center shadow-lg ring-4 ring-white/50">
              <span className="text-4xl font-black text-white tracking-tighter">FCB</span>
            </div>
          </div>
          <h1 className="text-3xl font-black text-blue-900 tracking-tight">
            FC BARCELONA
          </h1>
          <p className="text-red-700 font-bold italic mt-1 text-sm">
            "Més que un club"
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Lebih dari sekadar klub
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-semibold mb-1 text-gray-700 text-sm">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-600 focus:outline-none transition"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700 text-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-600 focus:outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg text-sm text-center">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-700 to-red-700 hover:from-blue-800 hover:to-red-800 text-white p-3 rounded-lg font-bold tracking-wide transition duration-300 disabled:opacity-50 mt-2 shadow-lg hover:shadow-xl"
          >
            {isLoading ? '⚽ Memproses...' : '🔵🔴 MASUK'}
          </button>
        </form>

        {/* Demo Info */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-900 text-center">
            <b>Demo Login:</b><br />
            Username: <code className="bg-white px-1 rounded">admin</code> &nbsp;|&nbsp;
            Password: <code className="bg-white px-1 rounded">barca123</code>
          </p>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          © 2026 FC Barcelona — Panel Admin
        </p>
      </div>
    </div>
  );
}