import { useParams } from 'react-router-dom';
import { projectMeta } from '../content/projects';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (window.history.length > 1) navigate(-1);
      else navigate('/projects');
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  return (
    <div>
      <button
        onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/projects'))}
      >
        Back to Projects
      </button>
      <h2>
        <a href={project?.liveUrl} target="_blank">
          {project?.title}
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
