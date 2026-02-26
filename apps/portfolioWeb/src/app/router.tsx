// This code defines a URL-driven tree where <AppShell /> is permanent, and pages are swapped into its <Outlet /> based on the current path.

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './AppShell';
import { ProjectsPage } from '../pages/ProjectsPage';
import { HomePage } from '../pages/HomePage';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <Navigate to="/projects" replace /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/home', element: <HomePage /> },
    ],
  },
]);
