import { NavLink } from 'react-router-dom';
import { projectMeta } from '../content/projects';
import { useEscapeBackNavigation } from '../shared/hooks/useEscapeBackNavigation';

export function ProjectsPage() {
  useEscapeBackNavigation({ fallbackPath: '/home' });

  return (
    <div>
      {projectMeta.map((project) => (
        <NavLink key={project.slug} to={`/projects/${project.slug}`}>
          <h2>{project.title}</h2>
        </NavLink>
      ))}
    </div>
  );
}
