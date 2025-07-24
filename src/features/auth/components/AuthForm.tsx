'use client';
import { signIn } from 'next-auth/react';
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
    formState: { isValid, errors },
  } = useForm<IFormInput>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-16 lg:gap-32">
        <AuthFormItem
          errors={errors}
          label="이메일"
          name="email"
          register={register}
          type="email"
        />
        <AuthFormItem
          errors={errors}
          label="비밀번호"
          name="password"
          register={register}
          type="password"
        />
      </div>
      <PrimaryButton
        className="mt-24 h-58 w-full lg:mt-56"
        disabled={!isValid}
        label="로그인 하기"
        type="submit"
        variant="solid"
      />
    </form>
  );
};

export default AuthForm;
