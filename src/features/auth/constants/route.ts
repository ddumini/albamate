export const AUTH_ROUTES = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  APPLICANT_INFO: '/applicant-info',
} as const;

export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];
