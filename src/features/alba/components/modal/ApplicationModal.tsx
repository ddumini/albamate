'use client';

import PrimaryButton from '@common/button/PrimaryButton';
import Input from '@common/input/Input';
import Modal from '@common/modal/Modal';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

import { usePopupStore } from '@/shared/store/popupStore';
import useApplicationStore from '@/shared/store/useApplicationStore';
import useModalStore from '@/shared/store/useModalStore';

import albaApi from '../../api/albaApi';

type FormValues = {
  name: string;
  phone: string;
  password: string;
};

interface ApplicationModalProps {
  id: number;
}

const ApplicationModal = ({ id }: ApplicationModalProps) => {
  const { closeModal } = useModalStore();
  const router = useRouter();
  const { setGuestApplication, setGuestMode } = useApplicationStore(); // Zustand hooks
  const { showPopup } = usePopupStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await albaApi().verifyMyApplication(id, {
        name: data.name,
        phoneNumber: data.phone,
        password: data.password,
      });

      const application = response.data;

      // Zustand에 저장
      setGuestApplication(application);
      setGuestMode(true);

      closeModal();
      router.push(`/myapply/${id}`);
    } catch (error) {
      if (error instanceof Error && 'response' in error) {
        const errorResponse = (error as any).response;
        if (errorResponse?.status === 404) {
          showPopup('일치하는 지원 정보가 없습니다.', 'error');
        } else if (errorResponse?.status === 401) {
          showPopup('비밀번호가 올바르지 않습니다.', 'error');
        } else {
          showPopup('지원자 정보를 확인할 수 없습니다.', 'error');
        }
      } else {
        showPopup('네트워크 오류가 발생했습니다.', 'error');
      }
    }
  };

  return (
    <div className="flex w-full flex-col gap-36 rounded-xl p-24">
      <Modal.Header showCloseButton>
        <div className="Text-black text-xl font-bold lg:text-2xl">
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
              className="mt-1 h-52 rounded border border-gray-300 px-3 py-2 pl-12 text-black lg:h-54"
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

          <label className="mb-12 text-sm font-medium">
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
            className="h-58 w-327 rounded-md bg-mint-400 hover:brightness-92"
            label="지원 내역 상세보기"
            type="submit"
            variant="solid"
          />
        </form>
      </Modal.Body>
    </div>
  );
};

export default ApplicationModal;
