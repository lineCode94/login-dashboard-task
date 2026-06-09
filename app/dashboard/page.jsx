'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import DashboardLayout from '@/components/DashboardLayout';
import Button from '@/components/Button';
import { ProtectedRouteWrapper } from '@/components/ProtectedRouteWrapper';
import styles from './page.module.scss';

function DashboardContent() {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();

  const userInfo = useMemo(
    () => ({ id: user?.id ?? 'N/A', name: user?.name ?? 'Guest' }),
    [user]
  );

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    clearAuth();
    router.push('/login');
  };

  return (
    <DashboardLayout>
      <section className={styles.headerSection}>
        <div>
          <p className={styles.welcome}>Welcome back,</p>
          <h2 className={styles.greeting}>{userInfo.name}</h2>
          <p className={styles.description}>Your user ID is stored safely and your session is protected.</p>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </section>

      <section className={styles.statsCard}>
        <h3>Profile summary</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <p className={styles.label}>User ID</p>
            <p className={styles.value}>{userInfo.id}</p>
          </div>
          <div className={styles.infoCard}>
            <p className={styles.label}>User Name</p>
            <p className={styles.value}>{userInfo.name}</p>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRouteWrapper>
      <DashboardContent />
    </ProtectedRouteWrapper>
  );
}
