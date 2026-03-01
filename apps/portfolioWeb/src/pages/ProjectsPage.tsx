import { NavLink } from 'react-router-dom';
import { projectMeta } from '../content/projects';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProjectsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (window.history.length > 1) navigate(-1);
      else navigate('/home');
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

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
