import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { routes } from '../routes/routes';

const BASE_TITLE = 'Interfaces Narrativas';

export const useDocumentTitle = (customTitle?: string) => {
  const location = useLocation();

  useEffect(() => {
    let pageTitle = customTitle || 'Página não encontrada';

    if (!customTitle) {
      const currentRoute = routes.find(route => route.path === location.pathname);
      if (currentRoute) {
        pageTitle = currentRoute.title;
      }
    }

    document.title = `${pageTitle} - ${BASE_TITLE}`;
  }, [location.pathname, customTitle]);
};
