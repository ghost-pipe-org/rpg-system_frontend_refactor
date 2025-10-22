import { useNavigate } from 'react-router';
import { ROUTES } from '../routes/routes';

export const useAppNavigation = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate(ROUTES.HOME);
  const goToLogin = () => navigate(ROUTES.LOGIN);
  const goToRegister = () => navigate(ROUTES.REGISTER);
  const goToSessions = () => navigate(ROUTES.SESSIONS);
  const goToTest = () => navigate(ROUTES.TEST);

  const goTo = (path: string) => navigate(path);

  return {
    goToHome,
    goToLogin,
    goToRegister,
    goToSessions,
    goToTest,
    goTo,
    navigate,
    routes: ROUTES
  };
};
