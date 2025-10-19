import { useNavigate } from 'react-router';
import { ROUTES } from '../routes/routes.constants';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate(ROUTES.HOME);
  const goToLogin = () => navigate(ROUTES.LOGIN);
  const goToRegister = () => navigate(ROUTES.REGISTER);
  const goToSessions = () => navigate(ROUTES.SESSIONS);
  const goToEvents = () => navigate(ROUTES.EVENTS);
  const goToNotFound = () => navigate(ROUTES.NOT_FOUND);

  const goTo = (path: string) => navigate(path);

  return {
    goToHome,
    goToLogin,
    goToRegister,
    goToSessions,
    goToEvents,
    goToNotFound,
    goTo,
    navigate,
    routes: ROUTES
  };
};
