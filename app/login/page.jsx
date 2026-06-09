'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/auth.api';
import { getUserInfo } from '@/lib/user.api';
import { useAuthStore } from '@/store/authStore';
import AuthLayout from '@/components/AuthLayout';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import styles from './page.module.scss';

const initialForm = {
  email: '',
  password: '',
};

function validateForm(values) {
  const errors = {};
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.password.trim()) {
    errors.password = 'Password is required';
  }

  return errors;
}

export default function LoginPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      const { token } = await loginUser({ email: form.email, password: form.password });
      localStorage.setItem('auth_token', token);
      setToken(token);

      const userData = await getUserInfo();
      setUser({ id: userData.id, name: userData.name });
      router.push('/dashboard');
    } catch (error) {
      setServerError(
        error?.response?.data?.message || 'Unable to login. Check your credentials and try again.'
      );
      localStorage.removeItem('auth_token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled =
    loading || !form.email.trim() || !form.password.trim() || !!validateForm(form).email;

  return (
    <AuthLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Step into our shopping metaverse for an unforgettable shopping experience</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <InputField
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Email"
            autoComplete="email"
            iconSrc="/assets/sms.png"
            iconAlt="email icon"
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Password"
            autoComplete="current-password"
            iconSrc="/assets/lock.png"
            iconAlt="lock icon"
          />

          {serverError && <p className={styles.serverError}>{serverError}</p>}

          <Button type="submit" loading={loading} disabled={isButtonDisabled}>
            Login
          </Button>
        </form>

        <footer className={styles.footer}>
          <p className={styles.signupText}>
            Don't have an account?{' '}
            <a href="#signup" className={styles.signupLink}>
              Sign up
            </a>
          </p>
        </footer>
      </div>
    </AuthLayout>
  );
}
