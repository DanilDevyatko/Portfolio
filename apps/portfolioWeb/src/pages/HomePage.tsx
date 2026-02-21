import ReactMarkdown from 'react-markdown';
import { getHomeMarkdown } from '../shared/content/home';

export function HomePage() {
  const md = getHomeMarkdown();

  return (
    <div>
      <ReactMarkdown>{md}</ReactMarkdown>
    </div>
  );
}
