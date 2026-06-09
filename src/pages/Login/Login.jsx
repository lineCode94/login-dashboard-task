import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth.api.js';
import { getUserInfo } from '../../api/user.api.js';
import { useAuthStore } from '../../store/authStore.js';
import AuthLayout from '../../layouts/AuthLayout.jsx';
import InputField from '../../components/InputField.jsx';
import Button from '../../components/Button.jsx';
import styles from './Login.module.scss';
import smsIcon from '../../assets/sms.png';
import lockIcon from '../../assets/lock.png';

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

function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

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
      navigate('/dashboard', { replace: true });
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
            placeholder="you@example.com"
            autoComplete="email"
            iconSrc={smsIcon}
            iconAlt="email icon"
          />

          <InputField
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Enter your password"
            autoComplete="current-password"
            iconSrc={lockIcon}
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

export default Login;
