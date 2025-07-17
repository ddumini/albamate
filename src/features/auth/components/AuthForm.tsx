'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';

import AuthFormItem from './AuthFormItem';

interface IFormInput {
  email: string;
  password: string;
}

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-16 lg:gap-32">
        <AuthFormItem label="이메일" type="email" {...register('email')} />
        <AuthFormItem
          label="비밀번호"
          type="password"
          {...register('password')}
        />
      </div>
      <PrimaryButton
        className="mt-16 h-58 w-full"
        disabled={!isValid}
        label="로그인 하기"
        type="submit"
        variant="solid"
      />
    </form>
  );
};

export default AuthForm;
