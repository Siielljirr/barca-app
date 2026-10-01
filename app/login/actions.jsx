'use server';

import { cookies } from 'next/headers';

export async function loginAction(formData) {
  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'admin' && password === 'barca123') {
    const cookieStore = await cookies();
    cookieStore.set('isLoggedIn', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    return { success: true };
  }

  return { success: false, message: 'Username atau password salah!' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('isLoggedIn');
}