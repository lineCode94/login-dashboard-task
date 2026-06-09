import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore.js';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';
import Button from '../../components/Button.jsx';
import styles from './Dashboard.module.scss';

function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  const userInfo = useMemo(
    () => ({ id: user?.id ?? 'N/A', name: user?.name ?? 'Guest' }),
    [user]
  );

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    clearAuth();
    navigate('/login', { replace: true });
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

export default Dashboard;
