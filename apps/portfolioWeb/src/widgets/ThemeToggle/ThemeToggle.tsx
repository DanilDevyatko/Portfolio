import bulbIcon from '../../assets/the-light-bulb.svg';
import type { Theme } from '../../shared/hooks/useTheme';
import styles from './ThemeToggle.module.css';

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className={styles.button}
      role="switch"
      aria-checked={theme === 'light'}
      onClick={onToggle}
      aria-label="Light theme"
      title={`Switch to ${nextTheme} theme`}
    >
      <span className={styles.pendulum} aria-hidden="true">
        <span className={styles.cord} />
        <span className={styles.lamp}>
          <img className={styles.icon} src={bulbIcon} alt="" />
        </span>
      </span>
      <span className={styles.srOnly}>{theme} theme enabled</span>
    </button>
  );
}
