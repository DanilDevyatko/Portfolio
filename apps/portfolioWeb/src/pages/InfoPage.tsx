import ReactMarkdown from 'react-markdown';
import { getInfoMarkdown } from '../shared/content/info';
export function InfoPage() {
  const md = getInfoMarkdown();

  return (
    <div>
      <ReactMarkdown>{md}</ReactMarkdown>
    </div>
  );
}
