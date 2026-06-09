import styles from './AuthLayout.module.scss';
import meetusImage from '../meetus.png';
function AuthLayout({ children }) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.formSection}>
        <div className={styles.formWrapper}>{children}</div>
      </div>
      <div className={styles.brandingSection}>
        <div className={styles.brandingContent}>
          <img
            src={meetusImage}
            alt="meetusVR 3D Graphics"
            className={styles.brandImage}
          />
        
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
