export const AUTH_ROUTES = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  ACCOUNT_INFO: '/account-info',
} as const;

export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];
