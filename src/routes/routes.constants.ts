export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  SESSIONS: '/sessions',
  EVENTS: '/events',
  TEST: '/test',
  NOT_FOUND: '*'
} as const;

export const ROUTE_LABELS = {
  [ROUTES.HOME]: 'Início',
  [ROUTES.LOGIN]: 'Login',
  [ROUTES.REGISTER]: 'Cadastro',
  [ROUTES.SESSIONS]: 'Sessões',
  [ROUTES.EVENTS]: 'Eventos',
  [ROUTES.TEST]: 'Testes'
} as const;

export const ROUTE_CONFIG = {
  [ROUTES.HOME]: {
    label: 'Início',
    title: 'Home',
    requireAuth: true,
    requireMaster: false,
    redirectTo: undefined
  },
  [ROUTES.LOGIN]: {
    label: 'Login',
    title: 'Entrar',
    requireAuth: false,
    requireMaster: false,
    redirectTo: ROUTES.HOME
  },
  [ROUTES.REGISTER]: {
    label: 'Cadastro',
    title: 'Criar Conta',
    requireAuth: false,
    requireMaster: false,
    redirectTo: ROUTES.HOME
  },
  [ROUTES.SESSIONS]: {
    label: 'Sessões',
    title: 'Sessões de RPG',
    requireAuth: true,
    requireMaster: false,
    redirectTo: undefined
  },
  [ROUTES.EVENTS]: {
    label: 'Eventos',
    title: 'Eventos',
    requireAuth: true,
    requireMaster: false,
    redirectTo: undefined
  },
  [ROUTES.NOT_FOUND]: {
    label: 'Página não encontrada',
    title: 'Página não encontrada',
    requireAuth: false,
    requireMaster: false,
    redirectTo: undefined
  },
  [ROUTES.TEST]: {
    label: 'Testes',
    title: 'Testes',
    requireAuth: true,
    requireMaster: false,
    redirectTo: undefined
  }
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
export type RouteLabel = typeof ROUTE_LABELS[keyof typeof ROUTE_LABELS];
export type RouteConfig = typeof ROUTE_CONFIG[keyof typeof ROUTE_CONFIG];
