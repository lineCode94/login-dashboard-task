'use client';

import styles from './Button.module.scss';

function Button({ children, type = 'button', variant = 'primary', disabled, onClick, loading }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
}

export default Button;
