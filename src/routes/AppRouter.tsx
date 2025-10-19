import { Routes, Route } from 'react-router';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { AppRoutes, type AppRoute } from './routes.config';

export function AppRouter() {
  return (
    <Routes>
      {AppRoutes.map((route: AppRoute) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute requireAuth={route.requireAuth} redirectTo={route.redirectTo}>
              {route.element}
            </ProtectedRoute>
          }
        />
      ))}
      <Route path="*" element={AppRoutes.find((r: AppRoute) => r.path === '*')?.element} />
    </Routes>
  );
}
