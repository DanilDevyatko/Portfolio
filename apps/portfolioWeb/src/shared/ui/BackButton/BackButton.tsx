import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { canGoBack } from '../../lib/canGoBack';
import styles from './BackButton.module.css';

type BackButtonProps = {
  fallbackPath: string;
  label?: ReactNode;
  ariaLabel?: string;
  className?: string;
};

export function BackButton({
  fallbackPath,
  label,
  ariaLabel = 'Go back',
  className,
}: BackButtonProps) {
  const navigate = useNavigate();

  const onClick = () => {
    if (canGoBack()) navigate(-1);
    else navigate(fallbackPath);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={[styles.button, className].filter(Boolean).join(' ')}
    >
      {label ?? (
        <svg
          className={styles.icon}
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M23 5C27.4 5 31 8.6 31 13C31 17.4 27.4 21 23 21H8" />
          <path d="M13 16L8 21L13 26" />
        </svg>
      )}
    </button>
  );
}
