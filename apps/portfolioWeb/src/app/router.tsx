// This code defines a URL-driven tree where <AppShell /> is permanent, and pages are swapped into its <Outlet /> based on the current path.

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './AppShell';
import { HomePage } from '../pages/HomePage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { InfoPage } from '../pages/InfoPage';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <Navigate to="/home" replace /> },
      { path: '/home', element: <HomePage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/info', element: <InfoPage /> },
    ],
  },
]);
