import { Routes, Route } from 'react-router';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { routes } from './routes';

export function AppRouter() {
  return (
    <Routes>
      {routes.map((route) => {
        const Element = route.element;
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.requireAuth ? (
                <ProtectedRoute>
                  <Element />
                </ProtectedRoute>
              ) : (
                <Element />
              )
            }
          />
        );
      })}
    </Routes>
  );
}
