import { NavLink } from 'react-router-dom';

import styles from './Nav.module.css';

export function BottomNav() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/projects"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Projects
      </NavLink>
      <NavLink
        to="/info"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Info
      </NavLink>
    </nav>
  );
}
