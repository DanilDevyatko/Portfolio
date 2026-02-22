import ReactMarkdown from 'react-markdown';
import { getProjectsMarkdown } from '../shared/content/projects';

export function ProjectsPage() {
  const md = getProjectsMarkdown();
  return (
    <div>
      <ReactMarkdown
        // Components prop to open links in new tab
        components={{
          a: ({ node, ...props }) => {
            void node;
            return <a {...props} target="_blank" rel="noopener noreferrer" />;
          },
        }}
      >
        {md}
      </ReactMarkdown>
    </div>
  );
}
