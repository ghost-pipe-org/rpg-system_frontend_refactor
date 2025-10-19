import { Login, Register, NotFound, Home, Sessions } from '../pages';
import { ROUTES, ROUTE_CONFIG } from './routes.constants';

export interface AppRoute {
  path: string;
  element: React.ReactElement;
  requireAuth?: boolean;
  requireMaster?: boolean;
  redirectTo?: string;
  label?: string;
}

export const AppRoutes: AppRoute[] = [
  {
    path: ROUTES.HOME,
    element: <Home />,
    ...ROUTE_CONFIG[ROUTES.HOME]
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    ...ROUTE_CONFIG[ROUTES.LOGIN]
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
    ...ROUTE_CONFIG[ROUTES.REGISTER]
  },
  {
    path: ROUTES.SESSIONS,
    element: <Sessions />,
    ...ROUTE_CONFIG[ROUTES.SESSIONS]
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
    ...ROUTE_CONFIG[ROUTES.NOT_FOUND]
  }
];
