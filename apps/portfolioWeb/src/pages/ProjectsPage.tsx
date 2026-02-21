import ReactMarkdown from 'react-markdown';
import { getProjectsMarkdown } from '../shared/content/projects';

export function ProjectsPage() {
  const md = getProjectsMarkdown();
  return (
    <div>
      <ReactMarkdown>{md}</ReactMarkdown>
    </div>
  );
}
