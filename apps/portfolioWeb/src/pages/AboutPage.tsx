import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

const markdowns = import.meta.glob<string>('../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (window.history.length > 1) navigate(-1);
      else navigate('/home');
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  return (
    <>
      <div className="markdown-content">
        <ReactMarkdown>{markdowns['../content/about.md'] ?? ''}</ReactMarkdown>
      </div>
    </>
  );
}
