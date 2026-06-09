'use client';

import styles from './DashboardLayout.module.scss';

function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardShell}>
      <aside className={styles.sidebar}>
        <strong className={styles.brand}>TaskMeet</strong>
        <p className={styles.sidebarText}>Your secure analytics workspace.</p>
      </aside>
      <main className={styles.contentArea}>{children}</main>
    </div>
  );
}

export default DashboardLayout;
