'use client';
import { usePathname } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { getFormConfig } from '@/features/auth/constants/formFields';
import { AuthContext } from '@/features/auth/context/AuthContextValue';
import type {
  AccountInfoFormData,
  AuthFormData,
  AuthPageType,
  SignInFormData,
  SignUpFormData,
  UserType,
} from '@/features/auth/types';
import { getAuthPageType } from '@/features/auth/utils/authUtils';
import PrimaryButton from '@/shared/components/common/button/PrimaryButton';

import AuthFormFields from './AuthFormFields';

/**
 * 인증 폼 컴포넌트
 *
 * 로그인, 회원가입, 정보작성을 모두 처리하는 통합 폼
 * accountInfo 페이지에서는 지원자/사장님에 따라 다른 필드 표시
 *
 * @example
 * // 로그인 페이지에서
 * <AuthForm />
 *
 * // 회원가입 페이지에서
 * <AuthForm />
 *
 * // 정보작성 페이지에서 (지원자/사장님 자동 구분)
 * <AuthForm />
 */
const AuthForm = () => {
  const pathname = usePathname();
  const authPageType = getAuthPageType(pathname);
  const authContext = useContext(AuthContext);

  // 사용자 타입 (지원자/사장님)
  const userType = authContext?.userType;
  const isOwner = authContext?.isOwner || false;
  const isApplicant = authContext?.isApplicant || false;

  // 폼 구성 가져오기
  const formConfig = getFormConfig(authPageType, userType || undefined);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    watch,
  } = useForm<AuthFormData>({
    mode: 'onChange',
    defaultValues: formConfig.defaultValues,
  });

  // 폼 제출 처리
  const onSubmit: SubmitHandler<AuthFormData> = async data => {
    try {
      switch (authPageType) {
        case 'signin': {
          const signInData = data as SignInFormData;
          await signIn('credentials', {
            email: signInData.email,
            password: signInData.password,
          });
          break;
        }
        case 'signup': {
          const signUpData = data as SignUpFormData;
          // TODO: 회원가입 API 호출
          console.log('회원가입 데이터:', signUpData);
          break;
        }
        case 'accountInfo': {
          const accountData = data as AccountInfoFormData;
          // TODO: 계정 정보 업데이트 API 호출 (사용자 타입별로 다른 엔드포인트)
          console.log(
            '계정 정보 데이터:',
            accountData,
            '사용자 타입:',
            userType
          );
          break;
        }
      }
    } catch (error) {
      console.error('폼 제출 오류:', error);
    }
  };

  // 버튼 텍스트 설정
  const getButtonText = (pageType: AuthPageType, userType?: UserType) => {
    switch (pageType) {
      case 'signin':
        return '로그인 하기';
      case 'signup':
        return '회원가입 하기';
      case 'accountInfo':
        return userType === 'owner'
          ? '사장님 정보 저장하기'
          : '지원자 정보 저장하기';
      default:
        return '제출하기';
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-16 lg:gap-32">
        <AuthFormFields<AuthFormData>
          defaultValues={formConfig.defaultValues}
          errors={errors}
          fields={formConfig.fields}
          register={register}
        />
      </div>
      {/* TODO: 로딩 상태 추가 (isSubmitting) */}
      <PrimaryButton
        className="mt-24 h-58 w-full lg:mt-56"
        disabled={!isValid}
        label={getButtonText(authPageType, userType || undefined)}
        type="submit"
        variant="solid"
      />
    </form>
  );
};

export default AuthForm;
