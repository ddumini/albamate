'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import Input from '@/shared/components/common/input/Input';
import Modal from '@/shared/components/common/modal/Modal';
import useModalStore from '@/shared/store/useModalStore';

type FormValues = {
  name: string;
  phone: string;
  password: string;
};

const ApplicationListModal = () => {
  const { closeModal } = useModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log('입력 데이터:', data);
    closeModal(); // 실제로는 여기서 API 호출 등을 처리 가능
  };

  return (
    <div className="flex w-full flex-col gap-30 rounded-xl bg-gray-25 p-24 dark:bg-gray-900">
      <Modal.Header showCloseButton>
        <div className="Text-black text-xl font-semibold lg:text-2xl">
          내 지원 내역 확인하기
        </div>
      </Modal.Header>

      <Modal.Body>
        <form
          className="flex flex-col gap-20"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="text-sm font-medium">
            이름
            <Input
              className="mt-1 h-52 rounded border border-gray-300 text-black lg:h-54"
              type="text"
              {...register('name', { required: '이름을 입력해주세요' })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-error">{errors.name.message}</p>
            )}
          </label>

          <label className="text-sm font-medium">
            전화번호
            <Input
              className="mt-1 h-52 rounded border border-gray-300 px-3 py-2 text-black lg:h-54"
              type="tel"
              {...register('phone', {
                required: '전화번호를 입력해주세요',
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: '올바른 전화번호를 입력해주세요',
                },
              })}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-error">{errors.phone.message}</p>
            )}
          </label>

          <label className="text-sm font-medium">
            비밀번호
            <Input
              className="mt-1 h-52 rounded border border-gray-300 text-black lg:h-54"
              type="password"
              {...register('password', {
                required: '비밀번호를 입력해주세요',
                minLength: {
                  value: 8,
                  message: '비밀번호는 8자 이상이어야 합니다',
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-error">
                {errors.password.message}
              </p>
            )}
          </label>

          <PrimaryButton
            className="h-58 w-327 rounded-md bg-mint-400"
            label="지원 내역 상세보기"
            type="submit"
            variant="solid"
          />
        </form>
      </Modal.Body>
    </div>
  );
};

export default ApplicationListModal;
