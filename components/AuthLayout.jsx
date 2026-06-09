'use client';

import styles from './AuthLayout.module.scss';

function AuthLayout({ children }) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.formSection}>
        <div className={styles.formWrapper}>{children}</div>
      </div>
      <div className={styles.brandingSection}>
        <div className={styles.brandingContent}>
          <img
            src="/meetus.png"
            alt="meetusVR 3D Graphics"
            className={styles.brandImage}
          />
          {/* <h2 className={styles.brandLogo}>meetusVR</h2> */}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
