import styles from './InputField.module.scss';

function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  autoComplete,
  iconSrc,
  iconAlt = '',
}) {
  const inputClass = `${styles.input} ${error ? styles.inputError : ''} ${
    iconSrc ? styles.hasIcon : ''
  }`;

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <div className={styles.inputWrap}>
        {iconSrc && (
          <img src={iconSrc} alt={iconAlt} className={styles.icon} aria-hidden="true" />
        )}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={inputClass}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>

      {error && (
        <p className={styles.error} id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default InputField;
