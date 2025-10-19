import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { ROUTES, ROUTE_CONFIG } from '../routes/routes.constants';

const BASE_TITLE = 'Interfaces Narrativas';

/**
 * Hook para gerenciar o título do documento baseado na rota atual
 * @param customTitle - Título personalizado opcional (sobrescreve o título da rota)
 */
export const useDocumentTitle = (customTitle?: string) => {
  const location = useLocation();

  useEffect(() => {
    let pageTitle = '';

    if (customTitle) {
      pageTitle = customTitle;
    } else {
      const route = location.pathname;
      
      if (route === ROUTES.HOME) {
        pageTitle = ROUTE_CONFIG[ROUTES.HOME].title;
      } else if (route === ROUTES.LOGIN) {
        pageTitle = ROUTE_CONFIG[ROUTES.LOGIN].title;
      } else if (route === ROUTES.REGISTER) {
        pageTitle = ROUTE_CONFIG[ROUTES.REGISTER].title;
      } else if (route === ROUTES.SESSIONS) {
        pageTitle = ROUTE_CONFIG[ROUTES.SESSIONS].title;
      } else if (route === ROUTES.EVENTS) {
        pageTitle = ROUTE_CONFIG[ROUTES.EVENTS].title;
      } else if (route === ROUTES.NOT_FOUND) {
        pageTitle = ROUTE_CONFIG[ROUTES.NOT_FOUND].title;
      } else {
        pageTitle = ROUTE_CONFIG[ROUTES.NOT_FOUND].title;
      }
    }

    document.title = `${pageTitle} - ${BASE_TITLE}`;
  }, [location.pathname, customTitle]);
};
