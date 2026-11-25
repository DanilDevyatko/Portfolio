import { Link } from 'react-router-dom';
import { projectMeta } from '../../content/projects';
import { useEscapeBackNavigation } from '../../shared/hooks/useEscapeBackNavigation';
import { Tags } from '@shared-ui/Tags/Tags';
import styles from './ProjectsPage.module.css';

export function ProjectsPage() {
  useEscapeBackNavigation({ fallbackPath: '/home' });

  return (
    <section aria-labelledby="projects-title" className={styles.page}>
      <h2 id="projects-title" className={styles.srOnly}>
        Projects
      </h2>
      <ul className={styles.list}>
        {projectMeta.map((project) => (
          <li key={project.slug}>
            <Link to={`/projects/${project.slug}`} className={styles.card}>
              <span className={styles.meta}>
                {project.client} · {project.period}
              </span>
              <span className={styles.title}>
                {project.title}
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </span>
              <span className={styles.summary}>{project.summary}</span>
              <Tags items={project.stack} className={styles.tags} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
