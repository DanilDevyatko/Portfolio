// This code defines a URL-driven tree where <AppShell /> is permanent, and pages are swapped into its <Outlet /> based on the current path.

import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './AppShell';
import { NotFoundPage, RouteErrorPage } from '../pages/NotFoundPage/NotFoundPage';

const HomePage = lazy(async () => ({
  default: (await import('../pages/HomePage/HomePage')).HomePage,
}));
const AboutPage = lazy(async () => ({
  default: (await import('../pages/AboutPage/AboutPage')).AboutPage,
}));
const ProjectsPage = lazy(async () => ({
  default: (await import('../pages/ProjectsPage/ProjectsPage')).ProjectsPage,
}));
const ProjectDetailPage = lazy(async () => ({
  default: (await import('../pages/ProjectDetailPage/ProjectDetailPage'))
    .ProjectDetailPage,
}));

function withSuspense(element: ReactNode) {
  return <Suspense fallback={null}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    // Last-resort fallback if the shell itself fails.
    errorElement: <RouteErrorPage />,
    children: [
      {
        // Pathless layout route: page errors render inside the shell.
        errorElement: <RouteErrorPage />,
        children: [
          { path: '/', element: <Navigate to="/home" replace /> },
          { path: '/home', element: withSuspense(<HomePage />) },
          { path: '/about', element: withSuspense(<AboutPage />) },
          { path: '/projects', element: withSuspense(<ProjectsPage />) },
          { path: '/projects/:slug', element: withSuspense(<ProjectDetailPage />) },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]);
