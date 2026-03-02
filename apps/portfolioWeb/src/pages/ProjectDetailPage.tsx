import { Navigate, useParams } from 'react-router-dom';
import { projectMeta } from '../content/projects';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { useEscapeBackNavigation } from '../shared/hooks/useEscapeBackNavigation';

export function ProjectDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const project = projectMeta.find((p) => p.slug === params.slug);
  const files = import.meta.glob<string>('../content/projects/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  });
  const md = files[`../content/projects/${params.slug}.md`] ?? '';
  const isMissingProject = !project || md.length === 0;

  useEscapeBackNavigation({ fallbackPath: '/projects' });

  if (isMissingProject) return <Navigate to="/projects" replace />;

  return (
    <div>
      <button
        onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/projects'))}
      >
        Back to Projects
      </button>
      <h2>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
          {project.title}
        </a>
      </h2>
      <ReactMarkdown
        components={{
          a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />,
        }}
      >
        {md}
      </ReactMarkdown>
    </div>
  );
}
