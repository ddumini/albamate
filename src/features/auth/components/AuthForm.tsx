'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useContext, useState } from 'react';
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
import EditPopup from '@/shared/components/common/popup/EditPopup';
import { extractAuthErrorMessage } from '@/shared/lib/auth/error-messages';

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
  const searchParams = useSearchParams();
  const authPageType = getAuthPageType(pathname);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  // 로그인 상태 관리
  const [loginStatus, setLoginStatus] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    visible: false,
    message: '',
    type: 'success',
  });

  // 사용자 타입 (지원자/사장님)
  const userType = authContext?.userType;
  const isOwner = authContext?.isOwner || false;
  const isApplicant = authContext?.isApplicant || false;

  // 쿼리 파라미터에서 role 가져오기
  const roleFromQuery = searchParams.get('type');

  // 폼 구성 가져오기
  const formConfig = getFormConfig(authPageType, userType || undefined);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    setValue,
  } = useForm<AuthFormData>({
    mode: 'onBlur', // onChange에서 onBlur로 변경
    defaultValues: formConfig.defaultValues,
    resolver: zodResolver(formConfig.validationSchema),
  });

  const formValues = watch();

  // 필수 필드가 모두 채워졌는지 확인하는 함수
  const isFormComplete = () => {
    if (authPageType !== 'accountInfo') return isValid;

    const requiredFields = formConfig.fields
      .filter(field => field.required)
      .map(field => field.name);

    return requiredFields.every(fieldName => {
      const value = (formValues as Record<string, any>)[fieldName];
      return value && value.trim() !== '';
    });
  };

  // 폼 제출 처리
  const onSubmit: SubmitHandler<AuthFormData> = async data => {
    try {
      switch (authPageType) {
        case 'signin': {
          const signInData = data as SignInFormData;

          // 현재 URL 정보를 포함하여 signIn 호출
          const currentUrl = window.location.href;
          console.log('현재 URL:', currentUrl);
          console.log('현재 사용자 타입:', userType);

          const result = await signIn('credentials', {
            email: signInData.email,
            password: signInData.password,
            redirect: false,
            callbackUrl: currentUrl,
            userType: userType, // 사용자 타입 정보 직접 전달
          });

          if (result?.error) {
            console.error('로그인 실패:', result.error);
            const errorMessage = extractAuthErrorMessage(result);
            setLoginStatus({
              visible: true,
              message: errorMessage || '로그인 중 오류가 발생했습니다.',
              type: 'error',
            });
          } else {
            // 로그인 성공 처리
            setLoginStatus({
              visible: true,
              message: '로그인되었습니다.',
              type: 'success',
            });

            // 성공 메시지 표시 후 잠시 대기 후 리다이렉트
            setTimeout(() => {
              router.push('/albalist');
            }, 1500);
          }
          break;
        }
        case 'signup': {
          const signUpData = data as SignUpFormData;

          // 회원가입 첫 단계: 기본 정보를 Context에 저장하고 accountInfo로 이동
          const basicSignUpData = {
            email: signUpData.email,
            password: signUpData.password,
            role: (userType === 'owner' ? 'OWNER' : 'APPLICANT') as
              | 'OWNER'
              | 'APPLICANT',
          };

          // Context에 임시 저장 (메모리 상태 관리)
          authContext?.setTempSignUpData(basicSignUpData);

          // accountInfo 페이지로 이동 (사장님과 지원자 모두)
          const accountInfoUrl =
            userType === 'owner'
              ? '/account-info?type=owner&step=signup'
              : '/account-info?type=applicant&step=signup';

          router.push(accountInfoUrl);
          break;
        }
        case 'accountInfo': {
          const accountData = data as AccountInfoFormData;

          // 회원가입 완료 단계인지 확인
          const isSignUpStep = searchParams.get('step') === 'signup';

          if (isSignUpStep) {
            // 임시 저장된 회원가입 데이터 가져오기
            const tempSignUpData = authContext?.tempSignUpData;
            if (!tempSignUpData) {
              console.error('임시 회원가입 데이터를 찾을 수 없습니다.');
              setLoginStatus({
                visible: true,
                message:
                  '회원가입 정보가 만료되었습니다. 다시 회원가입을 진행해주세요.',
                type: 'error',
              });
              // 회원가입 페이지로 리다이렉트
              setTimeout(() => {
                const signupUrl =
                  userType === 'owner'
                    ? '/signup?type=owner'
                    : '/signup?type=applicant';
                router.push(signupUrl);
              }, 2000);
              return;
            }

            const basicData = tempSignUpData;

            // 최종 회원가입 데이터 구성
            const finalSignUpData = {
              ...basicData,
              ...accountData,
            };

            console.log('최종 회원가입 데이터:', finalSignUpData);

            // 회원가입 API 직접 호출
            try {
              console.log('회원가입 API 요청 시작');
              const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalSignUpData),
              });

              console.log('회원가입 API 응답 상태:', response.status);

              if (response.ok) {
                console.log('회원가입 성공');

                // 임시 데이터 삭제
                authContext?.setTempSignUpData(null);

                // 자동 로그인 처리
                try {
                  const signInResult = (await signIn('credentials', {
                    email: finalSignUpData.email,
                    password: finalSignUpData.password,
                    redirect: false,
                  } as any)) as any;

                  if (signInResult && !signInResult.error) {
                    console.log('자동 로그인 성공');
                    setLoginStatus({
                      visible: true,
                      message: '회원가입이 완료되었습니다!',
                      type: 'success',
                    });
                    setTimeout(() => {
                      router.push('/albalist');
                    }, 1500);
                  } else {
                    console.error('자동 로그인 실패:', signInResult?.error);
                    setLoginStatus({
                      visible: true,
                      message: '회원가입이 완료되었습니다. 로그인해주세요.',
                      type: 'success',
                    });
                    setTimeout(() => {
                      router.push('/signin');
                    }, 1500);
                  }
                } catch (signInError) {
                  console.error('자동 로그인 중 오류:', signInError);
                  setLoginStatus({
                    visible: true,
                    message: '회원가입이 완료되었습니다. 로그인해주세요.',
                    type: 'success',
                  });
                  setTimeout(() => {
                    router.push('/signin');
                  }, 1500);
                }
              } else {
                // 응답 텍스트를 먼저 가져와서 JSON 파싱 시도
                const responseText = await response.text();
                console.log('회원가입 API 응답 텍스트:', responseText);

                let errorData;
                try {
                  errorData = JSON.parse(responseText);
                } catch (parseError) {
                  console.error('응답 JSON 파싱 실패:', parseError);
                  errorData = { error: '응답 파싱에 실패했습니다.' };
                }

                console.error('회원가입 실패:', errorData);
                const errorMessage =
                  errorData.error || '회원가입에 실패했습니다.';
                setLoginStatus({
                  visible: true,
                  message: errorMessage,
                  type: 'error',
                });
              }
            } catch (error) {
              console.error('회원가입 중 오류 발생:', error);
              console.error('에러 상세:', error);
              setLoginStatus({
                visible: true,
                message: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
                type: 'error',
              });
            }
          } else {
            // 일반 계정 정보 업데이트
            console.log(
              '계정 정보 데이터:',
              accountData,
              '사용자 타입:',
              userType
            );
          }
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
        return '다음'; // 회원가입에서 '다음'으로 변경
      case 'accountInfo': {
        const isSignUpStep = searchParams.get('step') === 'signup';
        if (isSignUpStep) {
          return userType === 'owner'
            ? '사장님 회원가입 완료'
            : '지원자 회원가입 완료';
        }
        return userType === 'owner'
          ? '사장님 정보 저장하기'
          : '지원자 정보 저장하기';
      }
      default:
        return '제출하기';
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-16 lg:gap-32">
          <AuthFormFields<AuthFormData>
            defaultValues={formConfig.defaultValues}
            errors={errors}
            fields={formConfig.fields}
            register={register}
            setValue={setValue}
            watch={watch}
          />
        </div>
        {/* TODO: 로딩 상태 추가 (isSubmitting) */}
        <PrimaryButton
          className="mt-24 h-58 w-full lg:mt-56"
          disabled={!isFormComplete()}
          label={getButtonText(authPageType, userType || undefined)}
          type="submit"
          variant="solid"
        />
      </form>

      {/* 로그인 상태 메시지 팝업 */}
      <EditPopup
        duration={3000}
        message={loginStatus.message}
        type={loginStatus.type}
        visible={loginStatus.visible}
        onClose={() => setLoginStatus(prev => ({ ...prev, visible: false }))}
      />
    </>
  );
};

export default AuthForm;
