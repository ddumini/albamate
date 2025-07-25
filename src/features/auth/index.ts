// Auth configuration
export { auth, handlers, signIn, signOut } from '@/auth';
export { authConfig } from '@/auth.config';

// Types
export type {
  AuthResponse,
  SignInRequest,
  SignUpRequest,
  User,
} from '@/features/auth/types/auth.types';

// Schemas and validation
export type {
  SignInFormData,
  SignUpFormData,
} from '@/features/auth/schema/auth.schema';
export { signInSchema, SignupSchema } from '@/features/auth/schema/auth.schema';

// Actions
// export { signUpAction } from './actions/auth.action';

// Hooks
export { useAuthSession } from '@/features/auth/hooks/useAuthSession';

// Constants
export {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from '@/features/auth/constants/auth.message';

// Utils
export { getAuthPageType } from '@/features/auth/utils/authUtils';

// Form fields
export {
  type FormConfig,
  type FormField,
  getFormConfig,
  getFormDefaultValues,
  getFormFields,
  getFormValidationSchema,
} from '@/features/auth/constants/formFields';

// export {
//   getTokenExpiration,
//   isTokenExpired,
//   parseUserId,
//   transformUserForNextAuth,
//   transformUserFromNextAuth,
// } from './utils/jwt.utils';
