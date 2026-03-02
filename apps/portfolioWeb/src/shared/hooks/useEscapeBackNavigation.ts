import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type UseEscapeBackNavigationOptions = {
  fallbackPath: string;
};

export function useEscapeBackNavigation({ fallbackPath }: UseEscapeBackNavigationOptions) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (window.history.length > 1) navigate(-1);
      else navigate(fallbackPath);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [fallbackPath, navigate]);
}
