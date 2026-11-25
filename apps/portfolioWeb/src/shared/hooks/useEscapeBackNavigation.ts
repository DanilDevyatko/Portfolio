import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { canGoBack } from '../lib/canGoBack';

type UseEscapeBackNavigationOptions = {
  fallbackPath: string;
};

export function useEscapeBackNavigation({
  fallbackPath,
}: UseEscapeBackNavigationOptions) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (canGoBack()) navigate(-1);
      else navigate(fallbackPath);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [fallbackPath, navigate]);
}
