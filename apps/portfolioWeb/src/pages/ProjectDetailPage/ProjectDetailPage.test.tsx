import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ProjectDetailPage } from './ProjectDetailPage';

describe('ProjectDetailPage', () => {
  it('adds safe rel attributes to external links', async () => {
    const router = createMemoryRouter(
      [
        { path: '/projects/:slug', element: <ProjectDetailPage /> },
        { path: '/projects', element: <div>Projects Route</div> },
      ],
      { initialEntries: ['/projects/worldoftanks'] },
    );

    render(<RouterProvider router={router} />);

    const link = await screen.findByRole('link', { name: /world of tanks/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
  });

  it('redirects missing project slugs to the projects list', async () => {
    const router = createMemoryRouter(
      [
        { path: '/projects/:slug', element: <ProjectDetailPage /> },
        { path: '/projects', element: <div>Projects Route</div> },
      ],
      { initialEntries: ['/projects/does-not-exist'] },
    );

    render(<RouterProvider router={router} />);

    expect(await screen.findByText('Projects Route')).toBeInTheDocument();
  });
});
