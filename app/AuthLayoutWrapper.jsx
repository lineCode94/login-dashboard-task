'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { getUserInfo } from '@/lib/user.api';
import styles from '@/app/layout.module.scss';

export function AuthLayoutWrapper({ children }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    async function initializeAuth() {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      
      if (!token) {
        setReady(true);
        return;
      }

      try {
        setToken(token);
        const data = await getUserInfo();
        setUser({ id: data.id, name: data.name });
        router.push('/dashboard');
      } catch (error) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
        clearAuth();
        router.push('/login');
      } finally {
        setReady(true);
      }
    }

    initializeAuth();
  }, [router, setToken, setUser, clearAuth]);

  if (!ready) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader} aria-label="Loading authentication status"></div>
      </div>
    );
  }

  return <>{children}</>;
}
