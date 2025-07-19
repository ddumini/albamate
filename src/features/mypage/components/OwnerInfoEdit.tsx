import { useForm } from 'react-hook-form';

import PrimaryButton from '@/shared/components/common/button/PrimaryButton';
import IconInput from '@/shared/components/common/input/IconInput';
import Input from '@/shared/components/common/input/Input';

interface FormData {
  nickname: string;
  storeName: string;
  storePhone: string;
  ownerPhone: string;
  location: string;
}

interface OwnerInfoEditProps {
  close: () => void;
}

const OwnerInfoEdit = ({ close }: OwnerInfoEditProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.error(data);
    close();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10 h-100 lg:h-110">
        <label className="mb-8 text-md" htmlFor="nickname">
          닉네임 <span className="text-mint-100">*</span>
        </label>
        <Input
          placeholder="닉네임을 입력해주세요."
          variant="outlined"
          {...register('nickname', { required: '닉네임은 필수입니다.' })}
          isInvalid={!!errors.nickname}
        />
        {errors.nickname && (
          <p className="text-sm text-red-500">{errors.nickname.message}</p>
        )}
      </div>

      <div className="mb-10 h-100 lg:h-110">
        <label className="mb-8 text-md" htmlFor="storeName">
          가게 이름 <span className="text-mint-100">*</span>
        </label>
        <Input
          id="storeName"
          placeholder="이름을 입력해주세요."
          variant="outlined"
          {...register('storeName', { required: '가게 이름은 필수입니다.' })}
          isInvalid={!!errors.storeName}
        />
        {errors.storeName && (
          <p className="text-sm text-red-500">{errors.storeName.message}</p>
        )}
      </div>

      <div className="mb-10 h-100 lg:h-110">
        <label className="mb-8 text-md" htmlFor="storePhone">
          가게 전화번호 <span className="text-mint-100">*</span>
        </label>
        <Input
          placeholder="숫자만 입력해주세요."
          variant="outlined"
          {...register('storePhone', {
            required: '연락처는 필수입니다.',
            pattern: {
              value: /^[0-9]+$/,
              message: '숫자만 입력해주세요.',
            },
          })}
          isInvalid={!!errors.storePhone}
        />
        {errors.storePhone && (
          <p className="text-sm text-red-500">{errors.storePhone.message}</p>
        )}
      </div>

      <div className="mb-16">
        <label className="mb-8 text-md" htmlFor="ownerPhone">
          사장님 전화번호
        </label>
        <Input
          placeholder="숫자만 입력해주세요."
          variant="outlined"
          {...register('ownerPhone', {
            pattern: {
              value: /^[0-9]+$/,
              message: '숫자만 입력해주세요.',
            },
          })}
          isInvalid={!!errors.ownerPhone}
        />
        {errors.ownerPhone && (
          <p className="text-sm text-red-500">{errors.ownerPhone.message}</p>
        )}
      </div>

      <div className="mb-10 h-100 lg:h-110">
        <label className="mb-8 text-md" htmlFor="location">
          가게 위치 <span className="text-mint-100">*</span>
        </label>
        <IconInput
          alt="위치"
          id="location"
          placeholder="이름을 입력해주세요."
          position="left"
          src="/icons/pin-solid.svg"
          variant="outlined"
          {...register('location', { required: '가게 이름은 필수입니다.' })}
          isInvalid={!!errors.location}
        />
        {errors.location && (
          <p className="text-sm text-red-500">{errors.location.message}</p>
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

export default OwnerInfoEdit;
