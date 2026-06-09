import styles from './InputField.module.scss';

function InputField({ id, label, type = 'text', value, onChange, onBlur, error, placeholder, autoComplete }) {
  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default InputField;
