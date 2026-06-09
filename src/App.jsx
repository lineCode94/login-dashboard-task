import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter.jsx';
import { useAuthStore } from './store/authStore.js';
import { getUserInfo } from './api/user.api.js';
import styles from './App.module.scss';

function App() {
  const [ready, setReady] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  useEffect(() => {
    async function initializeAuth() {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setReady(true);
        return;
      }

      try {
        setToken(token);
        const data = await getUserInfo();
        setUser({ id: data.id, name: data.name });
        navigate('/dashboard', { replace: true });
      } catch (error) {
        localStorage.removeItem('auth_token');
        clearAuth();
        navigate('/login', { replace: true });
      } finally {
        setReady(true);
      }
    }

    initializeAuth();
  }, [navigate, setToken, setUser, clearAuth]);

  if (!ready) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader} aria-label="Loading authentication status"></div>
      </div>
    );
  }

  return (
    <div className={styles.appWrapper}>
      <AppRouter />
    </div>
  );
}

function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default RootApp;
