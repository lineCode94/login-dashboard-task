import { useAuthStore } from '../store/authStore.js';

export function useAuth() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return { token, user, setToken, setUser, clearAuth };
}
