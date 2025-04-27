import Home from '@/pages/Home';
import { pageRoutes } from '@/shared/config';
import Fallback from '@/shared/ui';
import { RouteObject } from 'react-router-dom';

export const pages: RouteObject[] = [
  {
    path: pageRoutes.home,
    element: <Home />,
    errorElement: <Fallback />,
  },
];
