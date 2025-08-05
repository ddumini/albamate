/**
 * NextAuth 에러 코드에 대한 한국어 메시지 매핑
 */
export const AUTH_ERROR_MESSAGES = {
  USER_TYPE_MISMATCH: '허용되지 않은 사용자 유형입니다.',
  CredentialsSignin: '이메일 또는 비밀번호가 올바르지 않습니다.',
  OAuthSignin: '소셜 로그인 중 오류가 발생했습니다.',
  OAuthCallback: '소셜 로그인 콜백 처리 중 오류가 발생했습니다.',
  OAuthCreateAccount: '소셜 계정 생성 중 오류가 발생했습니다.',
  EmailCreateAccount: '이메일 계정 생성 중 오류가 발생했습니다.',
  Callback: '인증 콜백 처리 중 오류가 발생했습니다.',
  OAuthAccountNotLinked: '이미 다른 방법으로 가입된 계정입니다.',
  EmailSignin: '이메일 로그인 중 오류가 발생했습니다.',
  SessionRequired: '로그인이 필요합니다.',
  Default: '인증 중 오류가 발생했습니다.',
} as const;

export type AuthErrorCode = keyof typeof AUTH_ERROR_MESSAGES;

/**
 * 에러 코드에 해당하는 한국어 메시지를 반환합니다.
 * @param errorCode - NextAuth 에러 코드
 * @returns 한국어 에러 메시지
 */
export function getAuthErrorMessage(errorCode: string): string {
  return (
    AUTH_ERROR_MESSAGES[errorCode as AuthErrorCode] ||
    AUTH_ERROR_MESSAGES.Default
  );
}

/**
 * signIn 결과에서 에러 메시지를 추출합니다.
 * @param result - signIn 함수의 결과
 * @returns 에러 메시지 (에러가 없으면 null)
 */
export function extractAuthErrorMessage(
  result: { error?: string } | undefined
): string | null {
  if (!result?.error) return null;
  return getAuthErrorMessage(result.error);
}
