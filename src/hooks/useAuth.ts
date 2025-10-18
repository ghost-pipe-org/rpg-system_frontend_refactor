import { useAuth } from '../context/AuthContext';

export function useAuthState() {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    isMaster: user?.masterConfirm || false,
    userName: user?.name || 'Usuário',
    userEmail: user?.email || '',
  };
}

export function useAuthActions() {
  const { login, logout, refreshUser } = useAuth();
  
  return {
    login,
    logout,
    refreshUser,
  };
}
