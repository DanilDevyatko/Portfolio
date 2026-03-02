import ReactMarkdown from 'react-markdown';
import { useEscapeBackNavigation } from '../shared/hooks/useEscapeBackNavigation';

const markdowns = import.meta.glob<string>('../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export function AboutPage() {
  useEscapeBackNavigation({ fallbackPath: '/home' });

  return (
    <>
      <div className="markdown-content">
        <ReactMarkdown>{markdowns['../content/about.md'] ?? ''}</ReactMarkdown>
      </div>
    </>
  );
}
