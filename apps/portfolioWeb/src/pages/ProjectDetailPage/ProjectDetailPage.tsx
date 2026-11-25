import { Navigate, useParams } from 'react-router-dom';
import { projectMeta } from '../../content/projects';
import ReactMarkdown from 'react-markdown';
import { useEscapeBackNavigation } from '../../shared/hooks/useEscapeBackNavigation';
import { BackButton } from '@shared-ui/BackButton/BackButton';
import { Tags } from '@shared-ui/Tags/Tags';
import styles from './ProjectDetailPage.module.css';

const files = import.meta.glob<string>('../../content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const externalLink = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function ProjectDetailPage() {
  const params = useParams();
  const project = projectMeta.find((p) => p.slug === params.slug);
  const md = files[`../../content/projects/${params.slug}.md`] ?? '';
  const isMissingProject = !project || md.length === 0;

  useEscapeBackNavigation({ fallbackPath: '/projects' });

  if (isMissingProject) return <Navigate to="/projects" replace />;

  const titleUrl = project.liveUrl ?? project.repoUrl;

  return (
    <article className={styles.page}>
      <BackButton fallbackPath="/projects" className={styles.backButton} />

      <header className={styles.header}>
        <p className={styles.meta}>
          {project.client} · {project.period}
        </p>
        <h2>
          {titleUrl ? (
            <a href={titleUrl} {...externalLink}>
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h2>
        <p className={styles.role}>{project.role}</p>
        <Tags items={project.stack} />
      </header>

      <div className={styles.prose}>
        <ReactMarkdown
          components={{
            a: (props) => <a {...props} {...externalLink} />,
          }}
        >
          {md}
        </ReactMarkdown>
      </div>

      {project.highlights.length > 0 && (
        <section aria-labelledby="highlights-title" className={styles.highlights}>
          <h3 id="highlights-title" className={styles.sectionTitle}>
            Highlights
          </h3>
          <ul>
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {(project.liveUrl || project.repoUrl) && (
        <div className={styles.links}>
          {project.liveUrl && (
            <a href={project.liveUrl} {...externalLink}>
              Visit site ↗
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} {...externalLink}>
              Source code ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}
