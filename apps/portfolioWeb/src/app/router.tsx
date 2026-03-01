// This code defines a URL-driven tree where <AppShell /> is permanent, and pages are swapped into its <Outlet /> based on the current path.

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from './AppShell';
import { ProjectsPage } from '../pages/ProjectsPage';
import { HomePage } from '../pages/HomePage';
import { ProjectDetailPage } from '../pages/ProjectDetailPage';
import { AboutPage } from '../pages/AboutPage';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <Navigate to="/home" replace /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/home', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/projects/:slug', element: <ProjectDetailPage /> },
    ],
  },
]);
