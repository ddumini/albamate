import PrimaryButton from '@common/button/PrimaryButton';
import IconInput from '@common/input/IconInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { EditPassword } from '@/shared/types/mypage';

import { useUpdateMyPasswordQuery } from '../queries';
import { PasswordFormValues, passwordSchema } from '../schema/mypage.schema';

interface PwChangeFormProps {
  close: () => void;
}

interface PasswordProps extends EditPassword {
  checkNewPw: string;
}

const PwChangeForm = ({ close }: PwChangeFormProps) => {
  const [curIsVisible, setCurIsVisible] = useState(false);
  const [newIsVisible, setNewIsVisible] = useState(false);
  const [checkIsVisible, setCheckIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const updatePassword = useUpdateMyPasswordQuery();

  const onSubmit = (data: PasswordProps) => {
    const { checkNewPw, ...rquestData } = data;
    updatePassword.mutate(rquestData, {
      onSuccess: () => {
        alert('비밀번호가 성공적으로 수정되었습니다.');
        close();
      },
      onError: error => {
        const axiosError = error as AxiosError<{ message?: string }>;
        const errorMessage =
          axiosError.response?.data?.message ?? '변경 중 오류가 발생했습니다.';
        alert(errorMessage);
      },
    });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-16 h-98 lg:mb-20">
        <label className="mb-8 text-md" htmlFor="name">
          현재 비밀번호
        </label>
        <IconInput
          alt="visible-off"
          iconOnClick={() => {
            setCurIsVisible(prev => !prev);
          }}
          id="currentPw"
          placeholder="비밀번호를 입력해주세요."
          position="right"
          src={
            !curIsVisible
              ? '/icons/visibility-off.svg'
              : '/icons/visibility-on.svg'
          }
          type={!curIsVisible ? 'password' : 'text'}
          variant="outlined"
          {...register('currentPassword')}
          isInvalid={!!errors.currentPassword}
        />
        {errors.currentPassword && (
          <p className="text-sm text-red-500">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="mb-16 h-98 lg:mb-20">
        <label className="mb-8 text-md" htmlFor="newPw">
          새 비밀번호
        </label>
        <IconInput
          alt="visible-off"
          iconOnClick={() => {
            setNewIsVisible(prev => !prev);
          }}
          id="newPw"
          placeholder="새로운 비밀번호를 입력해주세요."
          position="right"
          src={
            !newIsVisible
              ? '/icons/visibility-off.svg'
              : '/icons/visibility-on.svg'
          }
          type={!newIsVisible ? 'password' : 'text'}
          variant="outlined"
          {...register('newPassword')}
          isInvalid={!!errors.newPassword}
        />
        {errors.newPassword && (
          <p className="text-sm text-red-500">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="mb-16 h-98 lg:mb-20">
        <label className="mb-8 text-md" htmlFor="checkNewPw">
          새 비밀번호 확인
        </label>
        <IconInput
          alt="visible-off"
          iconOnClick={() => {
            setCheckIsVisible(prev => !prev);
          }}
          id="checkNewPw"
          placeholder="비밀번호를 입력해주세요."
          position="right"
          src={
            !checkIsVisible
              ? '/icons/visibility-off.svg'
              : '/icons/visibility-on.svg'
          }
          type={!checkIsVisible ? 'password' : 'text'}
          variant="outlined"
          {...register('checkNewPw')}
          isInvalid={!!errors.checkNewPw}
        />
        {errors.checkNewPw && (
          <p className="text-sm text-red-500">{errors.checkNewPw.message}</p>
        )}
      </div>

      <div className="flex gap-11">
        <PrimaryButton
          className="w-158 flex-1 rounded py-16 text-lg font-semibold lg:w-314 lg:py-20 lg:text-2lg"
          label="취소"
          type="button"
          variant="cancelSolid"
          onClick={() => close()}
        />
        <PrimaryButton
          className="w-158 flex-1 rounded py-16 text-lg font-semibold lg:w-314 lg:py-20 lg:text-2lg"
          label="수정하기"
          type="submit"
          variant="solid"
        />
      </div>
    </form>
  );
};

export default PwChangeForm;
