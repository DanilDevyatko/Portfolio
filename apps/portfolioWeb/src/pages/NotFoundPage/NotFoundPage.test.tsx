import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { NotFoundPage, RouteErrorPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders for unknown paths instead of the router default error screen', async () => {
    const router = createMemoryRouter(
      [
        { path: '/home', element: <div>Home Route</div> },
        { path: '*', element: <NotFoundPage /> },
      ],
      { initialEntries: ['/contact'] },
    );

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { name: /page not found/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go home/i })).toHaveAttribute(
      'href',
      '/home',
    );
  });

  it('shows a reload option when a page throws', async () => {
    const Broken = () => {
      throw new Error('chunk failed');
    };
    const router = createMemoryRouter(
      [{ path: '/', element: <Broken />, errorElement: <RouteErrorPage /> }],
      { initialEntries: ['/'] },
    );

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('button', { name: /reload page/i }),
    ).toBeInTheDocument();
  });
});
