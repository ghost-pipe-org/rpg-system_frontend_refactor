import { Login, Register, NotFound, Home, Sessions, Test } from '../pages';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SESSIONS: '/sessions',
  TEST: '/test'
} as const;

export const ROUTE_LABELS = {
  [ROUTES.HOME]: 'Início',
  [ROUTES.LOGIN]: 'Login',
  [ROUTES.REGISTER]: 'Cadastro',
  [ROUTES.SESSIONS]: 'Sessões',
  [ROUTES.TEST]: 'Testes'
} as const;

export const routes = [
  {
    path: '/',
    element: Home,
    requireAuth: true,
    title: 'Home'
  },
  {
    path: '/login',
    element: Login,
    requireAuth: false,
    title: 'Entrar'
  },
  {
    path: '/register',
    element: Register,
    requireAuth: false,
    title: 'Criar Conta'
  },
  {
    path: '/sessions',
    element: Sessions,
    requireAuth: true,
    title: 'Sessões de RPG'
  },
  {
    path: '/test',
    element: Test,
    requireAuth: true,
    title: 'Testes'
  },
  {
    path: '*',
    element: NotFound,
    requireAuth: false,
    title: 'Página não encontrada'
  }
];
